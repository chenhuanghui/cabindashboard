// ====================================
// REACT
import Head from 'next/head'
import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router'
import Link from 'next/link';

// ====================================
// COMPONENTS
import NavBar from '../components/nav/nav_bar';

// ====================================
// OTHERS LIBS
import $ from 'jquery'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
const AirtablePlus = require('airtable-plus');  

// ====================================
// INIT GLOBAL VARIABLES
const airtable = new AirtablePlus({
  baseID: 'appmREe03n1MQ6ydq',
  apiKey: 'keyLNupG6zOmmokND',
  tableName: 'Brand',
});

// ====================================
// GLOBAL FUNCTIONS
async function retrieveData(formular,tbName) {
    try {
        const readRes = await airtable.read(formular,{tableName:tbName});
        return readRes
    } catch(e) {
        console.error(e);
    }
}

async function updateData(rowID, data,tbName) {
    try {
      const res = await airtable.update(rowID, data,{tableName:tbName});
      return res
    } catch(e) {
      console.error(e);
    }
}

async function getStaffByID(staffID) {
    try {
        const readRes = await airtable.read({
            filterByFormula: `ID = "${staffID}"`,
        },{tableName:`Staff`});
        return readRes
    } catch(e) {
        console.error(e);
    }
}


export default function LayoutDocumentDetail () {
    const router = useRouter();
    const cookies = parseCookies();
    const [staffID, setStaffID] = useState(null);
    const [staffData, setStaffData] = useState(null);
    const [checkinList, setCheckinList] = useState(null);
    const [isBusy, setBusy] = useState(null);

    useEffect(() => {
        // if not user --> redirect to Sign In page
        if(!cookies.userID || !cookies.isLoggedIn || !cookies.brandID || !cookies.role) {
            destroyCookie(userID)
            destroyCookie(isLoggedIn)
            destroyCookie(brandID)
            destroyCookie(role)
            Router.push('/signin')
        }
        
        // ===============================================
        setStaffID(router.query.id)
        console.log('router: ',router.query.id)

        // when docID was assigned successful retrieve data from Contenful
        if(staffID === router.query.id) {
            // ===============================================
            // RETRIEVE DATA FROM AIRTABLE
            retrieveData({filterByFormula: `ID = "${staffID}"`,},`Staff`)
            .then(res => {setStaffData(res[0])})

            retrieveData({
                filterByFormula: `AND(brandID = "${cookies.brandID}", staffID = "${staffID}")`,
                sort: [ {field: 'checkinDate', direction: 'desc'},{field: 'checkinTime', direction: 'desc'}]
            },'CheckInActivities')
            .then(result => {
                console.log('brand_staff_checkinlist:', result);
                setCheckinList(result)
            })
            
            // ===============================================
            // FRONT-END ENGAGEMENT
            $(document).on(`click`,`.action-confirm`, function(){
                if (isBusy === true) {
                    alert('Have a process was handling. Please wait for a moment.')
                    return;
                }
                
                // add loading spinner icon
                $(this).append(`<div class="spinner-grow spinner-grow-sm" role="status"><span class="sr-only">Loading...</span></div>`)
                console.log($(this).attr(`data-confirm`))
                setBusy(true)
                
                updateData($(this).attr(`data-id`),{
                    isConfirmed: $(this).attr("data-confirm")
                },`CheckInActivities`)
                .then(res => {
                    console.log('update: ', res)
                    $('.spinner-grow').remove()
                    setBusy(false)
                })
    
            })
        }             

    },[staffID])

    function markUnderstand() {
        console.log('asdf')
    }

    return (
        <div>
            <Head>
                {/* <script src="../assets/js/theme.min.js"></script> */}
                <title> HUMAN INSIGHT | CabinFood Business</title>
            </Head>

            <NavBar />

            <div className="main-content pb-6">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">

                            <div className="header mt-md-5">
                                <div className="header-body">
                                    <h6 className="header-pretitle">Quản lý</h6>
                                    <h1 className="header-title display-4">Thông tin nhân sự</h1>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-xl-6'>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="list-group list-group-flush my-n3">
                                                <div className="list-group-item">
                                                    <div className="row align-items-center">
                                                        <div className="col"><h5 className="mb-0">Họ và tên</h5></div>
                                                        <div className="col-auto"><small className="small text-muted">{staffData && staffData.fields.name} </small></div>
                                                    </div>
                                                </div>
                                                <div className="list-group-item">
                                                    <div className="row align-items-center">
                                                        <div className="col"><h5 className="mb-0">Mã nhân viên</h5></div>
                                                        <div className="col-auto"><small className="small text-muted">{staffData && staffData.fields.ID} </small></div>
                                                    </div>
                                                </div>
                                                <div className="list-group-item">
                                                    <div className="row align-items-center">
                                                        <div className="col"><h5 className="mb-0">Ngày sinh</h5></div>
                                                        <div className="col-auto"><time className="small text-muted">{staffData && staffData.fields.DOB}</time></div>
                                                    </div>
                                                </div>
                                                <div className="list-group-item">
                                                    <div className="row align-items-center">
                                                        <div className="col"><h5 className="mb-0">Giới tính</h5></div>
                                                        <div className="col-auto"><small className="text-muted">{staffData && staffData.fields.gender}</small></div>
                                                    </div>
                                                </div>
                                                <div className="list-group-item">
                                                    <div className="row align-items-center">
                                                        <div className="col"><h5 className="mb-0">Số điện thoại</h5></div>
                                                        <div className="col-auto"><small className="text-muted">{staffData && staffData.fields.tel}</small></div>
                                                    </div>
                                                </div>
                                                <div className="list-group-item">
                                                    <div className="row align-items-center">
                                                        <div className="col"><h5 className="mb-0">Làm việc tại</h5></div>
                                                        <div className="col-auto"><small className="small">{staffData && staffData.fields.brandName}</small></div>
                                                    </div>
                                                </div>
                                                <div className="list-group-item">
                                                    <div className="row align-items-center">
                                                        <div className="col"><h5 className="mb-0">Trạng thái</h5></div>
                                                        
                                                        <div className="col-auto">
                                                            { staffData && staffData.fields.status === true
                                                            ? <h5><span className="text-success mr-2">●</span>{ staffData && staffData.fields.statusValue}</h5>
                                                            : <h5><span className="text-danger mr-2">●</span>{ staffData && staffData.fields.statusValue}</h5>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-12 col-xl-6'>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="list-group list-group-flush my-n3">
                                                <div className="list-group-item">
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h5 className="mb-0">CMND/CCCD</h5>
                                                        </div>
                                                        <div className="col-auto">
                                                            <small className="small text-muted">{staffData && staffData.fields.personalID}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="list-group-item">
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h5 className="mb-0">Ảnh CMND/CCCD</h5>
                                                        </div>
                                                        <div className="avatar avatar-xl mr-3">
                                                            { staffData && staffData.fields.idPhotoFront
                                                            ? <img className='avatar-img rounded' src={staffData.fields.idPhotoFront[0].url}/>
                                                            : <img className='avatar-img rounded' src='https://dl.airtable.com/.attachments/61b42a68b3a175385e9610f7e80675a6/e4647d40/hQ5EQDRdT5WAYCROI0Ku'/>
                                                            }                                                            
                                                        </div>
                                                        <div className="avatar avatar-xl">
                                                            { staffData && staffData.fields.idPhotoBack
                                                            ? <img className='avatar-img rounded' src={staffData.fields.idPhotoBack[0].url}/>
                                                            : <img className='avatar-img rounded' src='https://dl.airtable.com/.attachments/61b42a68b3a175385e9610f7e80675a6/e4647d40/hQ5EQDRdT5WAYCROI0Ku'/>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>                                                
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-body">
                                            <div className="list-group list-group-flush my-n3">
                                                <div className="list-group-item">
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h5 className="mb-0">Ảnh nhân sự</h5>
                                                        </div>
                                                        <div className="avatar">
                                                            <img className='avatar-img rounded' src='https://dl.airtable.com/.attachments/61b42a68b3a175385e9610f7e80675a6/e4647d40/hQ5EQDRdT5WAYCROI0Ku'/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="list-group-item">
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h5 className="mb-0">Ngày làm việc gần nhất:</h5>
                                                        </div>
                                                        <div className="col-auto">
                                                            <small className="small text-muted">{checkinList && checkinList.length > 0 && checkinList[0].fields.checkinDate}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div> {/*.row */}
                            
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-header-title">Hoạt động check-in</h4>
                                    {/* <button className="btn btn-sm btn-white btn-modal" id='add-product'>Thêm nhân sự</button>  */}
                                </div>{/* end card header */}
                                
                                <div className="table-responsive mb-0">
                                    <table className="table table-sm table-nowrap card-table table-hover">
                                        <thead>
                                            <tr>
                                                <th>THỜI GIAN</th>
                                                <th>NHÂN VIÊN</th>
                                                <th>HÌNH ẢNH</th>
                                                <th>XÁC THỰC</th>
                                            </tr>
                                        </thead>
                                        <tbody className="list">{/* table item */} 
                                            {checkinList && checkinList.length > 0 && checkinList.map((item, index) => (
                                                <tr className='item-row' key={index}>
                                                    <td className='col-auto'>
                                                        <h5>{item.fields.checkinDate}, {item.fields.checkinTime}</h5>
                                                        <small>
                                                        {parseInt(item.fields.type) === 1
                                                        ? <span className="text-warning mr-2">●</span>
                                                        : <span className="text-success mr-2">●</span>
                                                        }
                                                        {item.fields.type_desc}</small>
                                                    </td>
                                                    
                                                    <td className='col-auto'>
                                                        <h4 className="font-weight-bold mb-1"> {item.fields.staffName}</h4>
                                                        <small>{item.fields.staffIDValue}</small>
                                                    </td>
                                                    <td className='avatar avatar-xl'>
                                                        <img className='avatar-img rounded' src={item.fields.curPhoto[0].url} atl={item.fields.staffName}/>
                                                    </td>
                                                    <td>
                                                        {parseInt(item.fields.isConfirmed) === 0 || !item.fields.isConfirmed
                                                        ?
                                                            <div>
                                                                <h5><span className="text-warning mr-2">●</span>{item.fields.isConfirmedDesc}</h5>
                                                                <button className='btn btn-sm btn-white alert-success mr-3 action-confirm' data-id={item.id} data-confirm="1">Chính xác</button>
                                                                <button className='btn btn-sm btn-white alert-danger action-confirm' data-id={item.id} data-confirm="2">Không chính xác</button>
                                                            </div>                                                            
                                                        : parseInt(item.fields.isConfirmed) === 1
                                                        ? <h5><span className="text-success mr-2">●</span>{item.fields.isConfirmedDesc}</h5>
                                                        : <h5><span className="text-danger mr-2">●</span>{item.fields.isConfirmedDesc}</h5>
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

// ====================================