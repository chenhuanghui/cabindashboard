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
import { Line } from 'react-chartjs-2';
import Flatpickr from "react-flatpickr";
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
    const [brandID, setBrandID] = useState(null);
    const [brand, setBrand] = useState(null)
    const [setupCollection1, setSetupCollection1] = useState([])
    

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
        setBrandID(router.query.id)

        // when docID was assigned successful retrieve data from Contenful
        if(brandID === router.query.id) {
            console.log('cabin_id_____: ',brandID)
            retrieveData({
                filterByFormula: `ID = "${brandID}"`,
                maxRecords: 1
            },`Brand`)
            .then(res => {
                console.log('brand: ', res)
                setBrand(res[0])
            })

            retrieveData({
                view: 'GroupByCollection1',
                filterByFormula: `Brand = "${brandID}"`,
                sort: [ {field: 'duedate', direction: 'asc'},]
            },`Brand_Setup`)
            .then(res => {
                console.log('collection1: ', res)
                setSetupCollection1(res)
            })

        }             

    },[brandID])

    return (
        <div>
            <Head>
                <title> Brand Detail | CabinFood Business</title>
            </Head>

            <NavBar />

            <div className="main-content">
                {/* _start header */}
                <div className="header">
                    <img src="/assets/img/covers/team-cover.jpg" className="header-img-top" alt="..."/>
                    <div className="container-fluid">
                        <div className="header-body mt-n5 mt-md-n6">
                            <div className="row align-items-end">
                                <div className="col-auto">
                                    <div className="avatar avatar-xxl header-avatar-top">
                                        {brand && brand.fields && brand.fields.logo
                                        ? <img src={brand.fields.logo[0].url} alt={brand && brand.fields.brandName} className="avatar-img rounded border border-4 border-body"/>
                                        : <img src="/assets/img/avatars/teams/team-logo-1.jpg" alt={brand && brand.fields.brandName} className="avatar-img rounded border border-4 border-body"/>
                                        }
                                        
                                    </div>
                                </div>
                                <div className="col mb-3 ml-n3 ml-md-n2">
                                    <h6 className="header-pretitle">Brand</h6>
                                    <h1 className="header-title">{brand && brand.fields && brand.fields.brandName}</h1>
                                </div>
                                <div className="col-12 col-md-auto mt-2 mt-md-0 mb-md-3">
                                    <a href="#!" className="btn btn-primary d-block d-md-inline-block lift">Update logo</a>
                                </div>
                            </div>

                            <div className="row align-items-center">
                                <div className="col">
                                    <ul className="nav nav-tabs nav-overflow header-tabs">
                                        <li className="nav-item"> <a href="team-overview.html" className="nav-link ">Overview</a></li>
                                        <li className="nav-item"> <a href="team-projects.html" className="nav-link">Projects</a></li>
                                        <li className="nav-item"> <a href="team-members.html" className="nav-link ">Members</a></li>
                                        <li className="nav-item"> <a href="#!" className="nav-link active">Settings</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* _end header */}

                {/* _start container */}
                <div className="container-fluid">
                    <div className="col-12 col-xl-8">                    
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-header-title">{setupCollection1 && setupCollection1.length>0 && setupCollection1[0].fields.collection_name}</h4>
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush list-group-activity my-n3">
                                    {setupCollection1.map((item, index) => (
                                        <div className="list-group-item" key={index}>
                                            <div className="row">
                                                <div className="col-auto">
                                                    <div className="avatar avatar-sm">
                                                        <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ml-n2">
                                                    <h5 className="mb-1">{item.fields.setup_name}</h5>
                                                    <p className="small text-gray-700 mb-0">{item.fields.setup_desc}</p>
                                                    <small className="text-muted">Hoàn thành trước: {new Date(item.fields.duedate).toDateString()}</small>
                                                    <p className="text-muted small">Trạng thái: 
                                                        <small className={`badge badge-pill ${item.fields.status === 0 ? "badge-secondary":item.fields.status === 0 ? "badge-success" : "badge-warning"}`}>{item.fields.status_desc}</small>  
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    

                                </div>
                            </div>
                        </div>  
                        {/* end .card */}

                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-header-title">Đăng ký thông tin với CabinFood</h4>
                                {/* <a className="small" href="#!">View all</a> */}
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush list-group-activity my-n3">
                                    <div className="list-group-item">
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="avatar avatar-sm">
                                                    <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h5 className="mb-1">Tên thương hiệu</h5>
                                                <small className="text-muted">Hoàn thành trước: 28/08/2020</small>
                                                <p className="text-muted small">Trạng thái: 
                                                    <small className="badge badge-pill badge-success">Đã xác nhận</small> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="list-group-item">
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="avatar avatar-sm">
                                                    <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h5 className="mb-1">Cung cấp logo</h5>
                                                <p className="small text-gray-700 mb-0">Chọn thay đổi logo</p>
                                                <small className="text-muted">Hoàn thành trước: 28/08/2020</small>
                                                <p className="text-muted small">Trạng thái: 
                                                    <small className="badge badge-pill badge-warning">Đợi xác nhận</small> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="list-group-item">
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="avatar avatar-sm">
                                                    <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h5 className="mb-1">Loại món ăn/thức uống</h5>
                                                <p className="small text-gray-700 mb-0">Cơm, Bánh mì hay trà sữa...</p>
                                                <small className="text-muted">Hoàn thành trước: 28/08/2020</small>
                                                <p className="text-muted small">Trạng thái:
                                                    <small className="badge badge-pill badge-warning">Đợi xác nhận</small> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="list-group-item">
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="avatar avatar-sm">
                                                    <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h5 className="mb-1">Cung cấp danh sách món ăn / thức uống</h5>
                                                <small className="text-muted">Hoàn thành trước: 30/08/2020</small>
                                                <p className="text-muted small">Trạng thái:
                                                    <small className="badge badge-pill badge-warning">Đợi xác nhận</small> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="list-group-item">
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="avatar avatar-sm">
                                                    <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h5 className="mb-1"> Xác nhận giá bán </h5>
                                                <p className="small text-gray-700 mb-0">Khoảng giá có bao gồm chiết khấu của kênh bán hàng hay chưa, có cần CabinFood tư vấn không?</p>
                                                <small className="text-muted">Hoàn thành trước: 28/08/2020</small>
                                                <p className="text-muted small">Trạng thái:
                                                    <small className="badge badge-pill badge-warning">Đợi xác nhận</small> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="list-group-item">
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="avatar avatar-sm">
                                                    <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h5 className="mb-1"> Nơi sản xuất </h5>
                                                <p className="small text-gray-700 mb-0">Cung cấp thông tin nơi sản xuất, và các chứng chỉ về VSATP</p>
                                                <small className="text-muted">Hoàn thành trước: 28/08/2020</small>
                                                <p className="text-muted small">Trạng thái:
                                                    <small className="badge badge-pill badge-warning">Đợi xác nhận</small> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="list-group-item">
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="avatar avatar-sm">
                                                    <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h5 className="mb-1"> Đầu mối liên hệ </h5>
                                                <p className="small text-gray-700 mb-0">Thông tin liên lạc (Họ tên, chức vụ, điện thoại, email, địa chỉ liên lạc)</p>
                                                <small className="text-muted">Hoàn thành trước: 28/08/2020</small>
                                                <p className="text-muted small">Trạng thái:
                                                    <small className="badge badge-pill badge-warning">Đợi xác nhận</small> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div> 
                        {/* end .card */}

                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-header-title">Tài khoản hệ thống CabinFood</h4>
                                {/* <a className="small" href="#!">View all</a> */}
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush list-group-activity my-n3">
                                    <div className="list-group-item">
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="avatar avatar-sm">
                                                    <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h5 className="mb-1">Cung cấp thông tin tài khoản</h5>
                                                <p className="text-muted small">Trạng thái: 
                                                    <small className="badge badge-pill badge-success">Đã hoàn thành</small> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="list-group-item">
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="avatar avatar-sm">
                                                    <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h5 className="mb-1">Kiểm tra và cập nhật thông tin hoàn thiện</h5>
                                                <p className="text-muted small">Trạng thái: 
                                                    <small className="badge badge-pill badge-success">Đã xác nhận</small> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div> 
                        {/* end .card */}

                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-header-title">Nhận bàn giao Cabin</h4>
                                {/* <a className="small" href="#!">View all</a> */}
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush list-group-activity my-n3">
                                    <div className="list-group-item">
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="avatar avatar-sm">
                                                    <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h5 className="mb-1">Thời điểm bàn giao cabin cho nhãn hàng</h5>
                                                <p className="small text-gray-700 mb-0">10:30, ngày 29/08/2020</p>
                                                <p className="text-muted small">Trạng thái: 
                                                    <small className="badge badge-pill badge-secondary">Đợi thực hiện</small> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="list-group-item">
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="avatar avatar-sm">
                                                    <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h5 className="mb-1">Ký xác nhận biên bản bàn giao</h5>
                                                <p className="text-muted small">Trạng thái: 
                                                    <small className="badge badge-pill badge-secondary">Đợi thực hiện</small> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div> 
                        {/* end .card */}

                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-header-title">Hình ảnh sản phẩm, menu</h4>
                                {/* <a className="small" href="#!">View all</a> */}
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush list-group-activity my-n3">
                                    <div className="list-group-item">
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="avatar avatar-sm">
                                                    <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h5 className="mb-1">Xác nhận danh sách món - giá bán</h5>
                                                <p className="small text-gray-700 mb-0">10:30, ngày 29/08/2020</p>
                                                <p className="text-muted small">Trạng thái: 
                                                    <small className="badge badge-pill badge-secondary">Đợi thực hiện</small> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="list-group-item">
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="avatar avatar-sm">
                                                    <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h5 className="mb-1">Thời điểm chụp ảnh sản phẩm</h5>
                                                <p className="text-muted small">Trạng thái: 
                                                    <small className="badge badge-pill badge-secondary">Đợi thực hiện</small> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="list-group-item">
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="avatar avatar-sm">
                                                    <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h5 className="mb-1">Nhận hình ảnh sản phẩm</h5>
                                                <p className="text-muted small">Trạng thái: 
                                                    <small className="badge badge-pill badge-secondary">Đợi thực hiện</small> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        {/* end .card */}

                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-header-title">Đăng ký kênh bán hàng app Food delivery</h4>
                                {/* <a className="small" href="#!">View all</a> */}
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush list-group-activity my-n3">
                                    <div className="list-group-item">
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="avatar avatar-sm">
                                                    <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h5 className="mb-1">Thông tin HĐ với app trước đây nếu có (Kênh - số HĐ - mức chiết khấu - người liên hệ)</h5>
                                                <p className="small text-gray-700 mb-0">10:30, ngày 29/08/2020</p>
                                                <p className="text-muted small">Trạng thái: 
                                                    <small className="badge badge-pill badge-secondary">Đợi thực hiện</small> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="list-group-item">
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="avatar avatar-sm">
                                                    <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h5 className="mb-1">Thời điểm chụp ảnh sản phẩm</h5>
                                                <p className="text-muted small">Trạng thái: 
                                                    <small className="badge badge-pill badge-secondary">Đợi thực hiện</small> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="list-group-item">
                                        <div className="row">
                                            <div className="col-auto">
                                                <div className="avatar avatar-sm">
                                                    <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h5 className="mb-1">Nhận hình ảnh sản phẩm</h5>
                                                <p className="text-muted small">Trạng thái: 
                                                    <small className="badge badge-pill badge-secondary">Đợi thực hiện</small> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        {/* end .card */}

                        
                    </div>
                    <div className="col-12 col-xl-4"></div>
                </div>
                {/* _end container */}
                
            </div>

        </div>
    )

}