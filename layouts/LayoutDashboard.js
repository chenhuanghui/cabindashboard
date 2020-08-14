import Head from 'next/head'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import NavBar from '../components/nav/nav_bar';
import { useRouter } from 'next/router'
import Router from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { data } from 'jquery';

const AirtablePlus = require('airtable-plus');  
const airtable = new AirtablePlus({
  baseID: 'appmREe03n1MQ6ydq',
  apiKey: 'keyLNupG6zOmmokND',
  tableName: 'Brand',
});

function countCompleteOnBoarding(dataFromAirtable) {
  var count = 0;
  for(var i=0; i<dataFromAirtable.length; i++) {
    if (dataFromAirtable[i].fields.status && dataFromAirtable[i].fields.status === true) {
      count ++
    }
  }
  return count
}

export default function Dashboard () {
  const router = useRouter();
  const cookies = parseCookies();
  const [brandID, setBrandID] = useState(null);
  const [brand, setBrand] = useState(null);
  const [brandCabin, setBrandCabin] = useState([]);
  const [brandSellChannelGroupByChannel, setbrandSellChannelGroupByChannel] = useState([]);
  
  // _Onboarding group state
  const [onboarding, setOnboarding] = useState([]);
  const [onboardingGroup1, setOnboardingGroup1] = useState(null);
  const [onboardingGroup2, setOnboardingGroup2] = useState(null);
  const [onboardingGroup3, setOnboardingGroup3] = useState(null);

  async function retrieveData(formular,tbName) {
    try {
      const readRes = await airtable.read(formular,{tableName:tbName});
      return readRes
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    // ===============================================
    // CHECKING AUTHENTICATE
    const cookies = parseCookies()
    if (!cookies.isLoggedIn | !cookies.userID | !cookies.brandID | !cookies.role) Router.push('/signin');
    
    // ===============================================
    setBrandID(router.query.id);
    
    if(brandID === router.query.id) {
      
      // save current brandID to cookie
      setCookie(null,'brandID', brandID, {
        maxAge: 30 * 24 * 60 * 60,
        path:'/'
      })
      // =======================================

      // retrieve data of brand
      retrieveData({
        filterByFormula: `ID = "${brandID}"`,
        maxRecords: 1
      }, 'Brand')
      .then(result => {
        setBrand(result[0].fields);
        console.log('promise result',result[0])

        // ******************************************************
        // RETRIEVE ALL BRAND - CABIN
        var promises = []
        for(var i=0; i<result[0].fields.Brand_Cabin.length; i++) {
          promises.push(
            retrieveData({
              filterByFormula: `ID = "${result[0].fields.Brand_Cabin[i]}"`,
            },'Brand_Cabin')
          )
        }

        Promise.all(promises)
        .then(brandCabinData => {
          // re-structure data response to save to BrandCabin-state
          var temp = []
          for (var i=0; i<brandCabinData.length; i++) {
            temp.push(brandCabinData[i][0].fields)
          }
          console.log('read again:', temp);
          setBrandCabin(temp)
        })

        // ******************************************************
        // RETRIEVE ONBOARDING DATA
        retrieveData({
          filterByFormula: `Brand = "${brandID}"`,
        },'Brand_Onboarding')
        .then(onboardingRes=> {
          console.log('onboarding: ',onboardingRes);
          setOnboarding(onboardingRes);
          console.log('onboarding state: ',onboarding);
        })

        retrieveData({
          view: 'GroupByCollection1',
          filterByFormula: `Brand = "${brandID}"`,
          sort: [ {field: 'orderInCollection', direction: 'asc'},]
        },'Brand_Onboarding')
        .then(response=> {
          console.log('onboarding group 1: ',response);
          setOnboardingGroup1(response)
        })

        retrieveData({
          view: 'GroupByCollection2',
          filterByFormula: `Brand = "${brandID}"`,
          sort: [ {field: 'orderInCollection', direction: 'asc'},]
        },'Brand_Onboarding')
        .then(response=> {
          console.log('onboarding group 2: ',response);
          setOnboardingGroup2(response)
        })        

        retrieveData({
          view: 'GroupByCollection3',
          filterByFormula: `Brand = "${brandID}"`,
          sort: [ {field: 'orderInCollection', direction: 'asc'},]
        },'Brand_Onboarding')
        .then(response=> {
          console.log('onboarding group 3: ',response);
          setOnboardingGroup3(response)
        })        

        // ******************************************************
        // RETRIEVE SELL CHANNEL DATA
        var channelListing = ['Grab','Now','Baemin','Loship','GoJek','Hotline']
        var channelPromises = []
        for (var i=0; i<6; i++) {
          channelPromises.push(
            retrieveData({
              filterByFormula: `AND(brandID = "${brandID}",sellChannelName="${channelListing[i]}")`
            }, 'SellChannel_Brand_Cabin')
          )
        }
        Promise.all(channelPromises)
        .then (sellChannelData => {
          console.log('sellChannelData:', sellChannelData)      
          setbrandSellChannelGroupByChannel(sellChannelData);
        }) 
      })
    }
    
    
  },[brandID])

  // ******************************************************
  function checkStatusFoodDelivery() {
    var count = 0;
    for(var i=0; i<brandSellChannelGroupByChannel.length; i++) {
      // BUG of designer - this is overview layout, so can not show how many channel connect with current layout
      // to fixed for using, I used [0] in list brandSellChannelByChannel
      if (brandSellChannelGroupByChannel[i][0].fields.status === true) count++;
    }
    return count;
  }

  function checkOnBoarding(data) {
    var count = 0;
    for (var i=0; i < data.length; i++) {
      if (data[i] == 1) count ++
    }
    return count
  }

  function checkLicense(data) {
    var count = 0;
    for (var i=0; i < data.length; i++) {
      if (data[i] == true) count ++
    }
    return count
  }

  return (
    <div>
      <Head>
        <title>{brand ? brand.brandName :''} | CabinFood Business</title>
      </Head>

      <NavBar />

      <div className="main-content">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              
              <div className="header">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-end">
                          <div className="col">
                                <h6 className="header-pretitle">NHÃN HIỆU</h6>
                                <h1 className="header-title">{brand ? brand.brandName:''}</h1>
                            </div>
                            
                        </div>
                    </div>
                </div>
              </div>

              <div className="row">

                <div className="col-12 col-lg-6">
                  <div className="card card-fill-lg">
                    <div className="card-body text-center">
                      <span className="card-avatar avatar avatar-lg mx-auto">
                        { brand && brand.logo && brand.logo.length >0
                          ? <img src={brand && brand.logo ? brand.logo[0].url : ''} alt="" className="avatar-img rounded" />
                          : <img src="../assets/img/logo2.jpg" className="avatar-img rounded-circle" alt="..."/>  
                        }                                          
                      </span>
                      <h2 className="mb-3">{brand ? brand.brandName : ''}</h2>
                      <p className="card-text text-muted">{brand ? brand.brandIntro : ''}</p>
                    </div>

                    <div className="card-footer card-footer-boxed">
                      <div className="row align-items-center">
                        <div className="col"><small className="text-muted"><i className="fe fe-clock"></i> Updated 2hr ago</small></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <img src={brand && brand.notificationImage ? brand.notificationImage[0].url :''} className="avatar-img rounded" />
                        </div>
                        <div className="col ml-n2">
                          <h4 className="mb-1">{brand ? brand.notificationTitle : ''}</h4>
                          <small className="text-muted">{brand ? brand.notificationDesc : ''}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <div className="list-group list-group-flush my-n3">

                        <div className="list-group-item">
                          <div className="row align-items-center">
                            <div className="col-auto">
                                <span className="fe fe-briefcase fe-modify"></span>
                            </div>
                            <div className="col ml-n2">
                              <a href='#food-delivery'>
                                <h4 className="mb-1">Kênh bán hàng</h4>
                              </a>
                              
                              { brand && (checkStatusFoodDelivery(brand.grab, brand.loship, brand.now, brand.baemin, brand.goJek) == 4)
                              ? <span className="text-success">● <small className="text-muted"> Kết nối thành công </small></span>
                              : <span className="text-warning">● <small className="text-muted">Đang kết nối</small></span>
                              }
                            </div>   
                              <button className="btn btn-sm btn-outline-dard">{brand && checkStatusFoodDelivery(brand.grab, brand.loship, brand.now, brand.baemin, brand.goJek, brand.hotline)}/6</button>                         
                          </div>
                        </div>

                        <div className="list-group-item">
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <span className="fe fe-briefcase fe-modify"></span>
                            </div>
                            <div className="col ml-n2">
                              <a href='#onboarding'>
                                <h4 className="mb-1">On boarding</h4>
                              </a>

                              {brand && brand.onboardingStatus && (checkOnBoarding(brand.onboardingStatus) == brand.onboardingStatus.length)
                              ? <span className="text-success">● <small className="text-muted">Hoàn thành</small></span>
                              : <span className="text-warning">● <small className="text-muted">Đang thực hiện</small></span>
                              }

                            </div>                          
                            <button className="btn btn-sm btn-outline-dard">
                              {brand && brand.onboardingStatus && checkOnBoarding(brand.onboardingStatus)}/{brand && brand.onboardingStatus && brand.onboardingStatus.length}
                            </button>
                          </div>
                        </div>
                        
                        <div className="list-group-item">
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <span className="fe fe-briefcase fe-modify"></span>
                            </div>
                            <div className="col ml-n2">
                              <a href='#license'>
                                <h4 className="mb-1">Giấy phép</h4>
                              </a>
                              
                              {brand && brand.licenseStatus && (checkLicense(brand.licenseStatus) == brand.licenseStatus.length)
                              ? <span className="text-success">● <small className="text-muted">Hoàn thành</small></span>
                              : <span className="text-warning">● <small className="text-muted">Đang thực hiện</small></span>
                              }

                            </div>                          

                            <button className="btn btn-sm btn-outline-dard">
                            {brand && brand.licenseStatus && checkLicense(brand.licenseStatus)}/{brand && brand.licenseStatus && brand.licenseStatus.length}
                            </button>                         
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <TableChecklist tableSetup={cabinData} /> */}
              <div className="card">
                <div className="card-header"><h4 className="card-header-title">ĐIỂM KINH DOANH</h4></div>
                <div className="table-responsive mb-0">
                    <table className="table table-sm table-nowrap card-table table-hover">
                        <thead>
                            <tr>
                                <th>CABIN</th>
                                <th>TRẠNG THÁI</th>
                                <th>ĐIỆN</th>
                                <th>NƯỚC</th>
                                <th>NHÂN SỰ</th>
                            </tr>
                        </thead>

                        <tbody className="list">
                          {brandCabin && brandCabin.map((item,index) => (
                            <tr key={index}> 
                              <td className="project-project">
                                <h4 className="font-weight-normal mb-1">
                                  <Link href='/cabins/[id]' as={`/cabins/${item.cabinRecID}`}>
                                    <a>{item.cabinName}</a>
                                  </Link>                                
                                </h4>
                                <small className="text-muted">{item.cabinAddr}</small>
                              </td>

                              <td className="project-status">
                                {item.status == true
                                ? <span className="badge badge-success">Hoạt động</span>
                                : <span className="badge badge-warning">Đang thiết lập</span>
                                }
                              </td>

                              <td className="project-electric"><h4 className="font-weight-normal mb-1">{item.electricUsedByCurrentMonth} kwh</h4></td>
                              <td className="project-water"><h4 className="font-weight-normal mb-1">{ item.waterUsedByCurrentMonth} m3</h4></td>
                              <td className="text-right">
                                <div className="avatar-group">
                                  {item && item.staffPhotos && item.staffPhotos.map((s,index) => (
                                    <span className="avatar avatar-xs" key={index}>
                                      <img src= {s.url} className="avatar-img rounded-circle"/>
                                    </span>
                                  ))}
                                </div>
                              </td>
                              {/* <td className="text-right">
                                <div className="dropdown">
                                  <span href="#" className="dropdown-ellipses dropdown-toggle"><i className="fe fe-more-vertical"></i></span>
                                  <div className="dropdown-menu dropdown-menu-right">
                                      <a href="#!" className="dropdown-item">Action</a>
                                      <a href="#!" className="dropdown-item">Another action</a>
                                      <a href="#!" className="dropdown-item">Something else here</a>
                                  </div>
                                </div>
                              </td> */}
                          </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
              </div>
              
              <hr className="navbar-divider my-3"/>                                      
              
              <div className="row" id='food-delivery'>
                {/* theo đúng layout gốc thì bộ .card sẽ được chia ra 2 bên, mỗi bên 3 block .card, và mỗi bên nằm trong bộ div col-12 col-lg-6 */}
                {/* <div className="col-12 col-lg-6">   */}
                <div className="col-12 col-lg-12 col-xl-12">  
                  <h6 className="header-pretitle col-12 head-block">KÊNH BÁN HÀNG</h6>
                  {brandSellChannelGroupByChannel && brandSellChannelGroupByChannel.length > 0 && brandSellChannelGroupByChannel.map((p,index) => (
                      <div className="card col-lg-6 _cardPartner" key={index}>
                        <div className="card-body">
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <span href="#" className="avatar">
                                <img src={p.length>0 && p[0].fields.photo && p[0].fields.photo[0].url} alt="..." className="avatar-img rounded" />
                              </span>
                            </div>                      
                            <div className="col ml-n2">
                              <h4 className="mb-1">{p[0].fields.sellChannelName}</h4>
                              {p.map((cab) => {
                                return cab.fields.status === true
                                ? <span className="text-success _partnerItem" key={cab.toString()}>●
                                    <small className="text-muted"> {cab.fields.cabinName}</small>
                                  </span>
                                : <span className="text-warning _partnerItem" key={cab.toString()}>●
                                    <small className="text-muted"> {cab.fields.cabinName}</small>
                                  </span>                              
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                  ))}
                </div> 
              </div>

              <hr className="navbar-divider my-3"/>                                      

              <div className="row" id='onboarding'>              
                <div className="col-12 col-lg-12 col-xl-12">
                  <h6 className="header-pretitle col-12 head-block">HỘI NHẬP CÙNG CABINFOOD</h6>  
                  {/* GROUP BY COLLECTION 1 */}
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-header-title">{onboardingGroup1 && onboardingGroup1[0].fields.collectionName}</h4>
                      <span className="badge badge-soft-secondary">{onboardingGroup1 && countCompleteOnBoarding(onboardingGroup1)} hạng mục hoàn thành</span>
                    </div>
                    <div className="card-body">
                      <div className="checklist" tabIndex="0">
                          { onboardingGroup1 && onboardingGroup1.length > 0 && onboardingGroup1.map((item,index) => (
                            <div className = "custom-control custom-checkbox checklist-control" tabIndex="0" key={item.id}>
                              {item.fields.status == true 
                              ? <input className="custom-control-input" id="checklistTwo" type="checkbox" checked />
                              : <input className="custom-control-input" id="checklistTwo" type="checkbox" />
                              }
                              <label className = "custom-control-label" ></label>
                              <span className = "custom-control-caption">
                              { item.fields.documentID
                              ?  <Link href='/documents/[id]' as={`/documents/${item.fields.documentID}`}>
                                  <a>{item.fields.onboardingTitle} <span className='fe fe-arrow-right mr-4'></span></a>
                                  </Link>
                              : item.fields.onboardingTitle
                              }
                              </span>                            
                            </div>    
                          ))
                        }
                      </div>
                    </div>
                  </div>

                  {/* GROUP BY COLLECTION 2 */}
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-header-title">{onboardingGroup2 && onboardingGroup2[0].fields.collectionName}</h4>
                      <span className="badge badge-soft-secondary">{onboardingGroup2 && countCompleteOnBoarding(onboardingGroup2)} hạng mục hoàn thành</span>
                    </div>
                    <div className="card-body">
                      <div className="checklist" tabIndex="0">
                          { onboardingGroup2 && onboardingGroup2.length > 0 && onboardingGroup2.map((item,index) => (
                            <div className = "custom-control custom-checkbox checklist-control" tabIndex="0" key={item.id}>
                              {item.fields.status == true 
                              ? <input className="custom-control-input" id="checklistTwo" type="checkbox" checked />
                              : <input className="custom-control-input" id="checklistTwo" type="checkbox" />
                              }
                              <label className = "custom-control-label" ></label>
                              <span className = "custom-control-caption">
                              { item.fields.documentID
                              ?  <Link href='/documents/[id]' as={`/documents/${item.fields.documentID}`}>
                                  <a>{item.fields.onboardingTitle} <span className='fe fe-arrow-right mr-4'></span></a>
                                  </Link>
                              : item.fields.onboardingTitle
                              }
                              </span>                            
                            </div>    
                          ))
                        }
                      </div>
                    </div>
                  </div>

                  {/* GROUP BY COLLECTION 3 */}
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-header-title">{onboardingGroup3 && onboardingGroup3[0].fields.collectionName}</h4>
                      <span className="badge badge-soft-secondary">{onboardingGroup3 && countCompleteOnBoarding(onboardingGroup3)} hạng mục hoàn thành</span>
                    </div>
                    <div className="card-body">
                      <div className="checklist" tabIndex="0">
                          { onboardingGroup3 && onboardingGroup3.length > 0 && onboardingGroup3.map((item,index) => (
                            <div className = "custom-control custom-checkbox checklist-control" tabIndex="0" key={item.id}>
                              {item.fields.status == true 
                              ? <input className="custom-control-input" id="checklistTwo" type="checkbox" checked />
                              : <input className="custom-control-input" id="checklistTwo" type="checkbox" />
                              }
                              <label className = "custom-control-label" ></label>
                              <span className = "custom-control-caption">
                              { item.fields.documentID
                              ?  <Link href='/documents/[id]' as={`/documents/${item.fields.documentID}`}>
                                  <a>{item.fields.onboardingTitle} <span className='fe fe-arrow-right mr-4'></span></a>
                                  </Link>
                              : item.fields.onboardingTitle
                              }
                              </span>                            
                            </div>    
                          ))
                        }
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              
              <hr className="navbar-divider my-3"/>

              <div className="row" id='license'>
                <div className="col-12 col-lg-12 col-xl-12">
                  <h6 className="header-pretitle col-12 head-block">THỦ TỤC PHÁP LÝ</h6>
                  <div className="card">
                    {/* <div className="card-header">
                      <h4 className="card-header-title">THỦ TỤC PHÁP LÝ</h4>
                    </div> */}
                    <div className="card-body">
                      <div className="kanban-category" tabIndex="0">
                        {
                          brand && brand.licenseTitle && brand.licenseTitle.map((item,index) => (
                            <div className="kanban-item" tabIndex="0" key={item.toString()}>
                              <div className="card card-sm mb-3" data-toggle="modal" data-target="#modalKanbanTask">
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col"><p className="mb-0">{item}</p></div>
                                    { brand.licenseStatus && brand.licenseStatus.length > 0 && brand.licenseStatus[index] === true
                                    ? <div className="col-auto"><div className="small text-success" >{brand.licenseStatusValue[index]}</div></div>
                                    : <div className="col-auto"><div className="small text-warning" >{brand.licenseStatusValue[index]}</div></div>
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .fe-modify {font-size: 1.5em;}
        .head-block {margin-top: 1.5rem;}
        .card {margin-bottom: 1rem !important}
        ._partnerItem {margin-right: 5px}
        ._cardPartner {float:left}
      `}</style>
    </div>
  )
}