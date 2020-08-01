import Head from 'next/head'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import NavBar from '../components/nav/nav_bar';
import { useRouter } from 'next/router'
import Router from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies'


export default function Dashboard () {
  const router = useRouter();
  const cookies = parseCookies();
  const [brandID, setBrandID] = useState(null);
  const [brand, setBrand] = useState(null);
  
  var Airtable = require('airtable');
  var base = new Airtable({apiKey: 'keyLNupG6zOmmokND'}).base('appmREe03n1MQ6ydq');

  useEffect(() => {
    // if not loggined yet 
    if (!cookies.isLoggedIn) Router.push('/signin');

    setBrandID(router.query.id);
    
    if(brandID === router.query.id) {
      base('Brand').find(brandID, function(err, record) {
          if (err) { console.error(err); return; }
          setBrand(record.fields)        
      });
    }

  },[brandID])

  function checkStatusFoodDelivery(grab,loship,now,beamin,goJek) {
    var count = 0;
    if (grab=='Thành công') count++;
    if (loship=='Thành công') count++;
    if (now=='Thành công') count++;
    if (beamin=='Thành công') count++;
    if (goJek=='Thành công') count++;
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
      if (data[i] == 'Hoàn thành') count ++
    }
    return count
  }
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="A fully featured admin theme which can be used to build CRM, CMS, etc." />
        <title>{brand ? brand.brandName :''} | CabinFood Dashboard</title>
      </Head>

      <NavBar />

      <div className="main-content">
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
                      <img src={brand && brand.logo ? brand.logo[0].url : ''} alt="" className="avatar-img rounded" />
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
                            <h4 className="mb-1">Kênh food delivery</h4>
                              { brand && (checkStatusFoodDelivery(brand.grab, brand.loship, brand.now, brand.baemin, brand.goJek) == 4)
                              ? <span className="text-success">● <small className="text-muted"> Kết nối thành công </small></span>
                              : <span className="text-warning">● <small className="text-muted">Đang kết nối</small></span>
                              }
                              
                          </div>   
                            <button className="btn btn-sm btn-outline-dard">{brand && checkStatusFoodDelivery(brand.grab, brand.loship, brand.now, brand.baemin, brand.goJek)}/5</button>                         
                        </div>
                      </div>

                      <div className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="fe fe-briefcase fe-modify"></span>
                          </div>
                          <div className="col ml-n2">
                            <h4 className="mb-1">On boarding</h4>
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
                            <h4 className="mb-1">Giấy phép</h4>
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
                              <th>STATUS</th>
                              <th>ĐIỆN</th>
                              <th>NƯỚC</th>
                              <th>NHÂN SỰ</th>
                          </tr>
                      </thead>

                      <tbody className="list">
                        {brand && brand.CabinList && brand.CabinList.map((item,index) => (
                          <tr key={item.toString()}> 
                            <td className="project-project">
                              <h4 className="font-weight-normal mb-1">
                                <Link href='#'>
                                  <a>{brand.cabinName[index]}</a>
                                </Link>
                                
                              </h4>
                              <small className="text-muted">{brand.cabinAddress[index]}</small>
                            </td>
                            <td className="project-status"><span className="badge badge-success">Hoạt động</span></td>
                            <td className="project-electric"><h4 className="font-weight-normal mb-1">10Kwh</h4></td>
                            <td className="project-water"><h4 className="font-weight-normal mb-1">25m3</h4></td>
                            <td className="text-right">
                                <div className="avatar-group">
                                    {brand && brand.staffAvatar
                                      ? brand.staffAvatar.map((s,index) => (
                                        <span className="avatar avatar-xs" key={index}>
                                          <img src= {brand.staffAvatar[index].url} className="avatar-img rounded-circle"/>
                                        </span>
                                      ))
                                      :''
                                    }
                                </div>
                            </td>
                            <td className="text-right">
                              <div className="dropdown">
                                <a href="#" className="dropdown-ellipses dropdown-toggle"><i className="fe fe-more-vertical"></i></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a href="#!" className="dropdown-item">Action</a>
                                    <a href="#!" className="dropdown-item">Another action</a>
                                    <a href="#!" className="dropdown-item">Something else here</a>
                                </div>
                              </div>
                            </td>
                        </tr>
                        ))}
                      </tbody>
                  </table>
              </div>
            </div>
            
            <hr className="navbar-divider my-3"/>                                      
            
            <div className="row">
              <h6 className="header-pretitle col-12 head-block">KÊNH FOOD DELIVERY</h6>
              
              <div className="col-12 col-lg-6">  
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto"><span href="#" className="avatar"><img src="../assets/img/avatar-square.png" alt="..." className="avatar-img rounded" /></span></div>
                      
                      <div className="col ml-n2">
                        <h4 className="mb-1">Grab</h4>
                        <small className="text-muted"><i className="fe fe-clock"></i> Đã kết nối</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto"><span href="#" className="avatar"><img src="../assets/img/avatar-square.png" alt="..." className="avatar-img rounded" /></span></div>
                      <div className="col ml-n2">
                        <h4 className="mb-1">Now</h4>
                        <small className="text-muted"><i className="fe fe-clock"></i> Đã kết nối</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto"><span href="#" className="avatar"><img src="../assets/img/avatar-square.png" alt="..." className="avatar-img rounded" /></span></div>
                      <div className="col ml-n2">
                        <h4 className="mb-1">Loship</h4>
                        <small className="text-muted"><i className="fe fe-clock"></i> Đã kết nối</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6">                  
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto"><span href="#" className="avatar"><img src="../assets/img/avatar-square.png" alt="..." className="avatar-img rounded" /></span></div>
                      
                      <div className="col ml-n2">
                        <h4 className="mb-1">Baemin</h4>
                        <small className="text-muted"><i className="fe fe-clock"></i> Đã kết nối</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto"><span href="#" className="avatar"><img src="../assets/img/avatar-square.png" alt="..." className="avatar-img rounded" /></span></div>
                      <div className="col ml-n2">
                        <h4 className="mb-1">GoJek</h4>
                        <small className="text-muted"><i className="fe fe-clock"></i> Đã kết nối</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto"><span href="#" className="avatar"><img src="../assets/img/avatar-square.png" alt="..." className="avatar-img rounded" /></span></div>
                      <div className="col ml-n2">
                        <h4 className="mb-1">Hotline</h4>
                        <small className="text-muted"><i className="fe fe-clock"></i> Đã kết nối</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <hr className="navbar-divider my-3"/>                                       */}

            <div className="row">
              {/* <h6 className="header-pretitle col-12 head-block">NHẬP MÔN CABINFOOD</h6> */}
              <div className="col-12 col-lg-12 col-xl-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-header-title">NHẬP MÔN CABINFOOD</h4>
                    
                    <span className="badge badge-soft-secondary">{brand && brand.onboardingStatus && checkOnBoarding(brand.onboardingStatus)} hạng mục hoàn thành</span>
                  </div>

                  <div className="card-body">
                    <div className="checklist" tabIndex="0">
                      {
                        brand && brand.onboardingTitle && brand.onboardingTitle.map((item,index) => (
                          <div className="custom-control custom-checkbox checklist-control" tabIndex="0" key={item.toString()}>
                            {brand.onboardingStatus[index] == true 
                            ? <input className="custom-control-input" id="checklistTwo" type="checkbox" checked/>
                            : <input className="custom-control-input" id="checklistTwo" type="checkbox"/>
                            }
                            
                            <label className="custom-control-label" ></label>
                            <span className="custom-control-caption">{item}</span>
                          </div>    
                        ))
                      }
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* <hr className="navbar-divider my-3"/>                                       */}

            <div className="row">
              <div className="col-12 col-lg-12 col-xl-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-header-title">THỦ TỤC PHÁP LÝ</h4>
                  </div>
                  <div className="card-body">
                    <div className="kanban-category" tabIndex="0">
                      {
                        brand && brand.licenseTitle && brand.licenseTitle.map((item,index) => (
                          <div className="kanban-item" tabIndex="0" key={item.toString()}>
                            <div className="card card-sm mb-3" data-toggle="modal" data-target="#modalKanbanTask">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col"><p className="mb-0">{item}</p></div>
                                  { brand.licenseStatus[index] == 'Hoàn thành'
                                  ? <div className="col-auto"><div className="small text-success" >{brand.licenseStatus[index]}</div></div>
                                  : <div className="col-auto"><div className="small text-warning" >{brand.licenseStatus[index]}</div></div>
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
      <style jsx>{`
        .fe-modify {font-size: 1.5em;}
        .head-block {margin-top: 1.5rem;}
        .card {margin-bottom: 1rem !important}
      `}</style>
    </div>
  )
}