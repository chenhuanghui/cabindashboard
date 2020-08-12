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


export default function LayoutCabinDetail () {
    const router = useRouter();
    const cookies = parseCookies();
    const [staffList, setStaffList] = useState([]);
    const [cabinID, setCabinID] = useState(null);
    

    useEffect(() => {
        // if not user --> redirect to Sign In page
        if(!cookies.userID | !cookies.isLoggedIn | !cookies.brandID | !cookies.role) {
            destroyCookie(userID)
            destroyCookie(isLoggedIn)
            destroyCookie(brandID)
            destroyCookie(role)
            Router.push('/signin')
        }
        
        // ===============================================
        setCabinID(router.query.id)
        console.log('router: ',router.query.id)

        // when docID was assigned successful retrieve data from Contenful
        if(cabinID === router.query.id) {
            console.log('cabin_id: ',cabinID)
            console.log('brand_id: ',cookies.brandID)

            // _GET CABIN INFORMATION
            retrieveData({filterByFormula: `AND(BrandID = "${cookies.brandID}",CabinID= "${cabinID}" )`},'Brand_Cabin')
            .then(res => {
                console.log('cabinRes: ', res)               
                if (res && res.length > 0) {
                    // _GET STAFF LIST
                } else {
                    console.log('dont have data')
                }
            })

            retrieveData({filterByFormula: `Brand = "${cookies.brandID}"`},'Brand_Staff')
            .then(brandStaffRes => {
                console.log('staffRes: ', brandStaffRes)
                setStaffList(brandStaffRes)}
            )
            
        }             

    },[cabinID])

    return (
        <div>
            <Head>
                {/* <script src="../assets/js/theme.min.js"></script> */}
                <title> Cabin Detail | CabinFood Business</title>
            </Head>

            <NavBar />

            <div className="main-content pb-6">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">

                            <div className="header">
                                <div className="container-fluid">
                                    <div className="header-body">
                                        <div className="row align-items-end">
                                            <div className="col-auto">
                                                <button className="btn btn-lg btn-rounded-circle btn-white mr-4"> 
                                                    <span className='fe fe-arrow-left'></span>
                                                </button>    
                                            </div>
                                            
                                            <div className="col">
                                                <h6 className="header-pretitle">BRAND 01 - 31 PHAN NGỮ , DAKAO, Q.1, HCM</h6>
                                                <h1 className="header-title">Cabin 05</h1>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-auto">
                                            <a href="profile-posts.html" className="avatar avatar-lg">
                                                <img src="/assets/img/avatars/profiles/avatar-1.jpg" alt="..." className="avatar-img rounded-circle"/>
                                            </a>
                                        </div>
                                        
                                        <div className="col ml-n2">
                                            <h4 className="mb-1"><a href="profile-posts.html">Cabin 05 - BRAND 01</a></h4>                                            
                                            <p className="small text-muted mb-1">Ngày bắt đầu kinh doanh: 16/06/2020</p>
                                            <p className="small mb-0"><span className="text-success">●</span> Đang hoạt động</p>
                                        </div>

                                        <div className="col-auto"><a href="#!" className="btn btn-sm btn-primary d-none d-md-inline-block">Thay đổi</a></div>
                                        
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-header-title">Danh sách nhân sự</h4>
                                </div>{/* end card header */}
                                
                                <div className="table-responsive mb-0">
                                    <table className="table table-sm table-nowrap card-table table-hover">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>NHÂN VIÊN</th>
                                                <th>TRẠNG THÁI</th>
                                                <th>SỐ GIỜ</th>
                                                <th>CHI NHÁNH</th>
                                                <th>LƯƠNG</th>
                                            </tr>
                                        </thead>
                                        <tbody className="list">{/* table item */} 
                                            {staffList && staffList.length > 0 && staffList.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="col-auto">
                                                        { item.fields.staffPhoto && item.fields.staffPhoto.length > 0
                                                        ? <div className="avatar avatar-xs"><img src={item.fields.staffPhoto[0].url} alt={item.fields.staffName} className="avatar-img rounded-circle"/></div>
                                                        : ''
                                                        }
                                                        
                                                    </td>        
                                                    <td className="project-project">
                                                        <h4 className="mb-1">{item.fields.staffName}</h4>
                                                    </td>
                                                    <td>
                                                        { item.fields.staffStatus && item.fields.staffStatus.length > 0 && item.fields.staffStatus[0] === true
                                                        ? <span className="badge badge-success">Đang làm việc</span>
                                                        : <span className="badge badge-danger">Nghỉ việc</span>
                                                        }
                                                        
                                                    </td>
                                                    <td> <h4 className="mb-1">{item.fields.timeStaffWorkingByCurrentMonth}</h4></td>
                                                    <td>                                            
                                                        <span className="mb-1">{item.fields.cabinName}</span>              
                                                    </td>
                                                    <td className="text-right">
                                                        { item.fields.staffSalary && item.fields.staffSalary.length > 0 
                                                        ? <span className="mb-1">{item.fields.staffSalary[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                                        : ''
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