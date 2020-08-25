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
import DatePickerCustom from '../components/datetime/datetimecustom'
import SelectStatusBrandSetup from '../components/select/selectstatusbrandsetup'
// ====================================
// OTHERS LIBS
import $ from 'jquery'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { Line } from 'react-chartjs-2';
import Flatpickr from "react-flatpickr";
import DatePicker from "react-datepicker";

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

async function createData(formular,tbName) {
    try {
      const res = await airtable.create(formular,{tableName:tbName});
      return res
    } catch(e) {
      console.error(e);
    }
}

function syncBrandSetup(brandID,colID) {
    (async () => {
        try {
            // retrieve all setup list by collection_id
            const setupRes = await airtable.read({
                filterByFormula: `collection_id = "${colID}"`,
            },{tableName:"Setup"});
            console.log("setup list col = ", colID, setupRes)
            await setupRes.forEach(async(setupItem,index) => {
                const brandSetupRes = await airtable.read({
                    filterByFormula: `AND(Brand="${brandID}", Setup="${setupItem.id}")`,
                    maxRecords: 1
                },{tableName:"Brand_Setup"});
                
                if (brandSetupRes.length === 0) {
                    const createRes = await airtable.create({
                        Brand: [`${brandID}`],
                        Setup: [`${setupItem.id}`],
                        status: 0,
                        duedate: new Date().toDateString()
                    },{tableName:"Brand_Setup"})
                    console.log("create Res_____",createRes)
                } else {
                    console.log("NON create" )
                }
            });
        }
        catch(e) {
            console.error(e);
        }
    })()
}

export default function LayoutCabinDetail () {
    const router = useRouter();
    const cookies = parseCookies();
    const [brandID, setBrandID] = useState(null);
    const [brand, setBrand] = useState(null)
    const [setupCollection1, setSetupCollection1] = useState([])
    const [setupCollection2, setSetupCollection2] = useState([])
    const [setupCollection3, setSetupCollection3] = useState([])
    const [setupCollection4, setSetupCollection4] = useState([])
    const [setupCollection5, setSetupCollection5] = useState([])
    const [setupCollection6, setSetupCollection6] = useState([])
    const [setupCollection7, setSetupCollection7] = useState([])
    const [setupCollection8, setSetupCollection8] = useState([])
    const [setupCollection9, setSetupCollection9] = useState([])
    const [setupCollection10, setSetupCollection10] = useState([])
    const [isBusy, setBusy] = useState(false)

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
                sort: [ {field: 'order', direction: 'asc'},]
            },`Brand_Setup`)
            .then(res => {
                console.log('collection1: ', res)
                setSetupCollection1(res)
            })

            retrieveData({
                view: 'GroupByCollection2',
                filterByFormula: `Brand = "${brandID}"`,
                sort: [ {field: 'order', direction: 'asc'},]
            },`Brand_Setup`)
            .then(res => {
                console.log('collection2: ', res)
                setSetupCollection2(res)
            })

            retrieveData({
                view: 'GroupByCollection3',
                filterByFormula: `Brand = "${brandID}"`,
                sort: [ {field: 'order', direction: 'asc'},]
            },`Brand_Setup`)
            .then(res => {
                console.log('collection3: ', res)
                setSetupCollection3(res)
            })

            retrieveData({
                view: 'GroupByCollection4',
                filterByFormula: `Brand = "${brandID}"`,
                sort: [ {field: 'order', direction: 'asc'},]
            },`Brand_Setup`)
            .then(res => {
                console.log('collection4: ', res)
                setSetupCollection4(res)
            })

            retrieveData({
                view: 'GroupByCollection5',
                filterByFormula: `Brand = "${brandID}"`,
                sort: [ {field: 'order', direction: 'asc'},]
            },`Brand_Setup`)
            .then(res => {
                console.log('collection5: ', res)
                setSetupCollection5(res)
            })

            retrieveData({
                view: 'GroupByCollection6',
                filterByFormula: `Brand = "${brandID}"`,
                sort: [ {field: 'order', direction: 'asc'},]
            },`Brand_Setup`)
            .then(res => {
                console.log('collection6: ', res)
                setSetupCollection6(res)
            })

            retrieveData({
                view: 'GroupByCollection7',
                filterByFormula: `Brand = "${brandID}"`,
                sort: [ {field: 'order', direction: 'asc'},]
            },`Brand_Setup`)
            .then(res => {
                console.log('collection7: ', res)
                setSetupCollection7(res)
            })

            retrieveData({
                view: 'GroupByCollection8',
                filterByFormula: `Brand = "${brandID}"`,
                sort: [ {field: 'order', direction: 'asc'},]
            },`Brand_Setup`)
            .then(res => {
                console.log('collection8: ', res)
                setSetupCollection8(res)
            })

            retrieveData({
                view: 'GroupByCollection9',
                filterByFormula: `Brand = "${brandID}"`,
                sort: [ {field: 'order', direction: 'asc'},]
            },`Brand_Setup`)
            .then(res => {
                console.log('collection9: ', res)
                setSetupCollection9(res)
            })

            retrieveData({
                view: 'GroupByCollection10',
                filterByFormula: `Brand = "${brandID}"`,
                sort: [ {field: 'order', direction: 'asc'},]
            },`Brand_Setup`)
            .then(res => {
                console.log('collection10: ', res)
                setSetupCollection10(res)
            })

            // FRONTEND ENGAGEMENT
            $(document).ready(function(){
                if(parseInt(cookies.role) <= 2) {
                    $(".btn-control").hide()
                }
            })

            $(document).on("click",".sync", function(){
                if (isBusy === true) {
                    alert('he thong dang xu ly, xin vui long doi')
                    return;
                }
                setBusy(true)            
                var col_id = $(this).attr("collection_id")
                console.log("col_id: ", col_id)
                syncBrandSetup(brandID, col_id)
            })

            $(document).on("click",".btn-control-edit", function(){
                // alert($(this).attr("setup-id"))
            })

            $(document).on("click",".btn-control-cfm", function(){
                // alert($(this).attr("id"))
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

                            {/* <div className="row align-items-center">
                                <div className="col">
                                    <ul className="nav nav-tabs nav-overflow header-tabs">
                                        <li className="nav-item"> <a href="team-overview.html" className="nav-link ">Overview</a></li>
                                        <li className="nav-item"> <a href="team-projects.html" className="nav-link">Projects</a></li>
                                        <li className="nav-item"> <a href="team-members.html" className="nav-link ">Members</a></li>
                                        <li className="nav-item"> <a href="#!" className="nav-link active">Settings</a></li>
                                    </ul>
                                </div>
                            </div> */}
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
                                {parseInt(cookies.role) === 1 
                                ? <button type="button" className="small sync btn btn-sm btn-outline-primary mb-2" collection_id="1">Đồng bộ</button>
                                : null
                                }
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush list-group-activity my-n3">
                                    {setupCollection1 && setupCollection1.length > 0 && setupCollection1.map((item, index) => (
                                        <div className="list-group-item" key={index}>
                                            <div className="row">
                                                <div className="col-auto">
                                                    <div className="avatar avatar-sm">
                                                        <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ml-n2">
                                                    <h5 className="mb-1">
                                                        {item.fields.setup_name}
                                                        <span className="fe fe-edit mr-4 small btn-control btn-control-edit btn-control-edit-setup-title ml-2" setup-id={item.fields.setup_id}></span>
                                                    </h5>
                                                    <p className="small text-gray-700">{item.fields.setup_desc} </p>
                                                    
                                                    <small className="text-muted">
                                                        Hoàn thành trước:                                                        
                                                        <DatePickerCustom> 
                                                            <span className="hide" record_id={item.id} date={new Date(item.fields.duedate)}></span>
                                                        </DatePickerCustom>
                                                    </small>

                                                    <div className="text-muted small mt-2">
                                                        Trạng thái: 
                                                        <span className={`ml-2  ${item.fields.status === 0 ? "text-primary" : item.fields.status === 1 ? "text-warning" : item.fields.status === 2 ? "text-success" : "text-danger"}`}>●</span>
                                                        <SelectStatusBrandSetup>
                                                            <span className="hide" record_id={item.id} selected_value={item.fields.status}></span>
                                                        </SelectStatusBrandSetup>
                                                    </div>
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
                                <h4 className="card-header-title">{setupCollection2 && setupCollection2.length>0 && setupCollection2[0].fields.collection_name}</h4>
                                {parseInt(cookies.role) === 1  
                                ? <button type="button" className="small sync btn btn-sm btn-outline-primary mb-2" collection_id="2">Đồng bộ</button>
                                : null
                                }
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush list-group-activity my-n3">
                                    {setupCollection2 && setupCollection2.length > 0 && setupCollection2.map((item, index) => (
                                        <div className="list-group-item" key={index}>
                                            <div className="row">
                                                <div className="col-auto">
                                                    <div className="avatar avatar-sm">
                                                        <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ml-n2">
                                                    <h5 className="mb-1">
                                                        {item.fields.setup_name}
                                                        <span className="fe fe-edit mr-4 small btn-control btn-control-edit btn-control-edit-setup-title ml-2" setup-id={item.fields.setup_id}></span>
                                                    </h5>
                                                    <p className="small text-gray-700 mb-0">{item.fields.setup_desc}</p>
                                                    <small className="text-muted">
                                                        Hoàn thành trước:                                                        
                                                        <DatePickerCustom> 
                                                            <span className="hide" record_id={item.id} date={new Date(item.fields.duedate)}></span>
                                                        </DatePickerCustom>
                                                    </small>

                                                    <div className="text-muted small mt-2">
                                                        Trạng thái: 
                                                        <span className={`ml-2  ${item.fields.status === 0 ? "text-primary" : item.fields.status === 1 ? "text-warning" : item.fields.status === 2 ? "text-success" : "text-danger"}`}>●</span>
                                                        <SelectStatusBrandSetup>
                                                            <span className="hide" record_id={item.id} selected_value={item.fields.status}></span>
                                                        </SelectStatusBrandSetup>
                                                    </div>
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
                                <h4 className="card-header-title">{setupCollection3 && setupCollection3.length>0 && setupCollection3[0].fields.collection_name}</h4>
                                {parseInt(cookies.role) === 1 
                                ? <button type="button" className="small sync btn btn-sm btn-outline-primary mb-2" collection_id="3">Đồng bộ</button>
                                : null
                                }
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush list-group-activity my-n3">
                                    {setupCollection3 && setupCollection3.length > 0 && setupCollection3.map((item, index) => (
                                        <div className="list-group-item" key={index}>
                                            <div className="row">
                                                <div className="col-auto">
                                                    <div className="avatar avatar-sm">
                                                        <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ml-n2">
                                                    <h5 className="mb-1">
                                                        {item.fields.setup_name}
                                                        <span className="fe fe-edit mr-4 small btn-control btn-control-edit btn-control-edit-setup-title ml-2" setup-id={item.fields.setup_id}></span>
                                                    </h5>
                                                    <p className="small text-gray-700 mb-0">{item.fields.setup_desc}</p>
                                                    <small className="text-muted">
                                                        Hoàn thành trước:                                                        
                                                        <DatePickerCustom> 
                                                            <span className="hide" record_id={item.id} date={new Date(item.fields.duedate)}></span>
                                                        </DatePickerCustom>
                                                    </small>

                                                    <div className="text-muted small mt-2">
                                                        Trạng thái: 
                                                        <span className={`ml-2  ${item.fields.status === 0 ? "text-primary" : item.fields.status === 1 ? "text-warning" : item.fields.status === 2 ? "text-success" : "text-danger"}`}>●</span>
                                                        <SelectStatusBrandSetup>
                                                            <span className="hide" record_id={item.id} selected_value={item.fields.status}></span>
                                                        </SelectStatusBrandSetup>
                                                    </div>
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
                                <h4 className="card-header-title">{setupCollection4 && setupCollection4.length>0 && setupCollection4[0].fields.collection_name}</h4>
                                {parseInt(cookies.role) === 1 
                                ? <button type="button" className="small sync btn btn-sm btn-outline-primary mb-2" collection_id="4">Đồng bộ</button>
                                : null
                                }
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush list-group-activity my-n3">
                                    {setupCollection4 && setupCollection4.length > 0 && setupCollection4.map((item, index) => (
                                        <div className="list-group-item" key={index}>
                                            <div className="row">
                                                <div className="col-auto">
                                                    <div className="avatar avatar-sm">
                                                        <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ml-n2">
                                                    <h5 className="mb-1">
                                                        {item.fields.setup_name}
                                                        <span className="fe fe-edit mr-4 small btn-control btn-control-edit btn-control-edit-setup-title ml-2" setup-id={item.fields.setup_id}></span>
                                                    </h5>
                                                    <p className="small text-gray-700 mb-0">{item.fields.setup_desc}</p>
                                                    <small className="text-muted">
                                                        Hoàn thành trước:                                                        
                                                        <DatePickerCustom> 
                                                            <span className="hide" record_id={item.id} date={new Date(item.fields.duedate)}></span>
                                                        </DatePickerCustom>
                                                    </small>

                                                    <div className="text-muted small mt-2">
                                                        Trạng thái: 
                                                        <span className={`ml-2  ${item.fields.status === 0 ? "text-primary" : item.fields.status === 1 ? "text-warning" : item.fields.status === 2 ? "text-success" : "text-danger"}`}>●</span>
                                                        <SelectStatusBrandSetup>
                                                            <span className="hide" record_id={item.id} selected_value={item.fields.status}></span>
                                                        </SelectStatusBrandSetup>
                                                    </div>
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
                                <h4 className="card-header-title">{setupCollection5 && setupCollection5.length>0 && setupCollection5[0].fields.collection_name}</h4>
                                {parseInt(cookies.role) === 1 
                                ? <button type="button" className="small sync btn btn-sm btn-outline-primary mb-2" collection_id="5">Đồng bộ</button>
                                : null
                                }
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush list-group-activity my-n3">
                                    {setupCollection5 && setupCollection5.length > 0 && setupCollection5.map((item, index) => (
                                        <div className="list-group-item" key={index}>
                                            <div className="row">
                                                <div className="col-auto">
                                                    <div className="avatar avatar-sm">
                                                        <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ml-n2">
                                                    <h5 className="mb-1">
                                                        {item.fields.setup_name}
                                                        <span className="fe fe-edit mr-4 small btn-control btn-control-edit btn-control-edit-setup-title ml-2" setup-id={item.fields.setup_id}></span>
                                                    </h5>
                                                    <p className="small text-gray-700 mb-0">{item.fields.setup_desc}</p>
                                                    <small className="text-muted">
                                                        Hoàn thành trước:                                                        
                                                        <DatePickerCustom> 
                                                            <span className="hide" record_id={item.id} date={new Date(item.fields.duedate)}></span>
                                                        </DatePickerCustom>
                                                    </small>

                                                    <div className="text-muted small mt-2">
                                                        Trạng thái: 
                                                        <span className={`ml-2  ${item.fields.status === 0 ? "text-primary" : item.fields.status === 1 ? "text-warning" : item.fields.status === 2 ? "text-success" : "text-danger"}`}>●</span>
                                                        <SelectStatusBrandSetup>
                                                            <span className="hide" record_id={item.id} selected_value={item.fields.status}></span>
                                                        </SelectStatusBrandSetup>
                                                    </div>
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
                                <h4 className="card-header-title">{setupCollection6 && setupCollection6.length>0 && setupCollection6[0].fields.collection_name}</h4>
                                {parseInt(cookies.role) === 1 
                                ? <button type="button" className="small sync btn btn-sm btn-outline-primary mb-2" collection_id="6">Đồng bộ</button>
                                : null
                                }
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush list-group-activity my-n3">
                                    {setupCollection6 && setupCollection6.length > 0 && setupCollection6.map((item, index) => (
                                        <div className="list-group-item" key={index}>
                                            <div className="row">
                                                <div className="col-auto">
                                                    <div className="avatar avatar-sm">
                                                        <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ml-n2">
                                                    <h5 className="mb-1">
                                                        {item.fields.setup_name}
                                                        <span className="fe fe-edit mr-4 small btn-control btn-control-edit btn-control-edit-setup-title ml-2" setup-id={item.fields.setup_id}></span>
                                                    </h5>
                                                    <p className="small text-gray-700 mb-0">{item.fields.setup_desc}</p>
                                                    <small className="text-muted">
                                                        Hoàn thành trước:                                                        
                                                        <DatePickerCustom> 
                                                            <span className="hide" record_id={item.id} date={new Date(item.fields.duedate)}></span>
                                                        </DatePickerCustom>
                                                    </small>

                                                    <div className="text-muted small mt-2">
                                                        Trạng thái: 
                                                        <span className={`ml-2  ${item.fields.status === 0 ? "text-primary" : item.fields.status === 1 ? "text-warning" : item.fields.status === 2 ? "text-success" : "text-danger"}`}>●</span>
                                                        <SelectStatusBrandSetup>
                                                            <span className="hide" record_id={item.id} selected_value={item.fields.status}></span>
                                                        </SelectStatusBrandSetup>
                                                    </div>
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
                                <h4 className="card-header-title">{setupCollection7 && setupCollection7.length>0 && setupCollection7[0].fields.collection_name}</h4>
                                {parseInt(cookies.role) === 1 
                                ? <button type="button" className="small sync btn btn-sm btn-outline-primary mb-2" collection_id="7">Đồng bộ</button>
                                : null
                                }
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush list-group-activity my-n3">
                                    {setupCollection7 && setupCollection7.length > 0 && setupCollection7.map((item, index) => (
                                        <div className="list-group-item" key={index}>
                                            <div className="row">
                                                <div className="col-auto">
                                                    <div className="avatar avatar-sm">
                                                        <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ml-n2">
                                                    <h5 className="mb-1">
                                                        {item.fields.setup_name}
                                                        <span className="fe fe-edit mr-4 small btn-control btn-control-edit btn-control-edit-setup-title ml-2" setup-id={item.fields.setup_id}></span>
                                                    </h5>
                                                    <p className="small text-gray-700 mb-0">{item.fields.setup_desc}</p>
                                                    <small className="text-muted">
                                                        Hoàn thành trước:                                                        
                                                        <DatePickerCustom> 
                                                            <span className="hide" record_id={item.id} date={new Date(item.fields.duedate)}></span>
                                                        </DatePickerCustom>
                                                    </small>

                                                    <div className="text-muted small mt-2">
                                                        Trạng thái: 
                                                        <span className={`ml-2  ${item.fields.status === 0 ? "text-primary" : item.fields.status === 1 ? "text-warning" : item.fields.status === 2 ? "text-success" : "text-danger"}`}>●</span>
                                                        <SelectStatusBrandSetup>
                                                            <span className="hide" record_id={item.id} selected_value={item.fields.status}></span>
                                                        </SelectStatusBrandSetup>
                                                    </div>
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
                                <h4 className="card-header-title">{setupCollection8 && setupCollection8.length>0 && setupCollection8[0].fields.collection_name}</h4>
                                {parseInt(cookies.role) === 1 
                                ? <button type="button" className="small sync btn btn-sm btn-outline-primary mb-2" collection_id="8">Đồng bộ</button>
                                : null
                                }
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush list-group-activity my-n3">
                                    {setupCollection8 && setupCollection8.length > 0 && setupCollection8.map((item, index) => (
                                        <div className="list-group-item" key={index}>
                                            <div className="row">
                                                <div className="col-auto">
                                                    <div className="avatar avatar-sm">
                                                        <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ml-n2">
                                                    <h5 className="mb-1">
                                                        {item.fields.setup_name}
                                                        <span className="fe fe-edit mr-4 small btn-control btn-control-edit btn-control-edit-setup-title ml-2" setup-id={item.fields.setup_id}></span>
                                                    </h5>
                                                    <p className="small text-gray-700 mb-0">{item.fields.setup_desc}</p>
                                                    <small className="text-muted">
                                                        Hoàn thành trước:                                                        
                                                        <DatePickerCustom> 
                                                            <span className="hide" record_id={item.id} date={new Date(item.fields.duedate)}></span>
                                                        </DatePickerCustom>
                                                    </small>

                                                    <div className="text-muted small mt-2">
                                                        Trạng thái: 
                                                        <span className={`ml-2  ${item.fields.status === 0 ? "text-primary" : item.fields.status === 1 ? "text-warning" : item.fields.status === 2 ? "text-success" : "text-danger"}`}>●</span>
                                                        <SelectStatusBrandSetup>
                                                            <span className="hide" record_id={item.id} selected_value={item.fields.status}></span>
                                                        </SelectStatusBrandSetup>
                                                    </div>
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
                                <h4 className="card-header-title">{setupCollection9 && setupCollection9.length>0 && setupCollection9[0].fields.collection_name}</h4>
                                {parseInt(cookies.role) === 1 
                                ? <button type="button" className="small sync btn btn-sm btn-outline-primary mb-2" collection_id="9">Đồng bộ</button>
                                : null
                                }
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush list-group-activity my-n3">
                                    {setupCollection9 && setupCollection9.length > 0 && setupCollection9.map((item, index) => (
                                        <div className="list-group-item" key={index}>
                                            <div className="row">
                                                <div className="col-auto">
                                                    <div className="avatar avatar-sm">
                                                        <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ml-n2">
                                                    <h5 className="mb-1">
                                                        {item.fields.setup_name}
                                                        <span className="fe fe-edit mr-4 small btn-control btn-control-edit btn-control-edit-setup-title ml-2" setup-id={item.fields.setup_id}></span>
                                                    </h5>
                                                    <p className="small text-gray-700 mb-0">{item.fields.setup_desc}</p>
                                                    <small className="text-muted">
                                                        Hoàn thành trước:                                                        
                                                        <DatePickerCustom> 
                                                            <span className="hide" record_id={item.id} date={new Date(item.fields.duedate)}></span>
                                                        </DatePickerCustom>
                                                    </small>

                                                    <div className="text-muted small mt-2">
                                                        Trạng thái: 
                                                        <span className={`ml-2  ${item.fields.status === 0 ? "text-primary" : item.fields.status === 1 ? "text-warning" : item.fields.status === 2 ? "text-success" : "text-danger"}`}>●</span>
                                                        <SelectStatusBrandSetup>
                                                            <span className="hide" record_id={item.id} selected_value={item.fields.status}></span>
                                                        </SelectStatusBrandSetup>
                                                    </div>
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
                                <h4 className="card-header-title">{setupCollection10 && setupCollection10.length>0 && setupCollection10[0].fields.collection_name}</h4>
                                {parseInt(cookies.role) === 1 
                                ? <button type="button" className="small sync btn btn-sm btn-outline-primary mb-2" collection_id="10">Đồng bộ</button>
                                : null
                                }
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush list-group-activity my-n3">
                                    {setupCollection10 && setupCollection10.length > 0 && setupCollection10.map((item, index) => (
                                        <div className="list-group-item" key={index}>
                                            <div className="row">
                                                <div className="col-auto">
                                                    <div className="avatar avatar-sm">
                                                        <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary"> <i className="fe fe-mail"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col ml-n2">
                                                    <h5 className="mb-1">
                                                        {item.fields.setup_name}
                                                        <span className="fe fe-edit mr-4 small btn-control btn-control-edit btn-control-edit-setup-title ml-2" setup-id={item.fields.setup_id}></span>
                                                    </h5>
                                                    <p className="small text-gray-700 mb-0">{item.fields.setup_desc}</p>
                                                    <small className="text-muted">
                                                        Hoàn thành trước:                                                        
                                                        <DatePickerCustom> 
                                                            <span className="hide" record_id={item.id} date={new Date(item.fields.duedate)}></span>
                                                        </DatePickerCustom>
                                                    </small>

                                                    <div className="text-muted small mt-2">
                                                        Trạng thái: 
                                                        <span className={`ml-2  ${item.fields.status === 0 ? "text-primary" : item.fields.status === 1 ? "text-warning" : item.fields.status === 2 ? "text-success" : "text-danger"}`}>●</span>
                                                        <SelectStatusBrandSetup>
                                                            <span className="hide" record_id={item.id} selected_value={item.fields.status}></span>
                                                        </SelectStatusBrandSetup>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div> 
                        {/* end .card */}

                        
                    </div>
                    <div className="col-12 col-xl-4"></div>
                </div>
                {/* _end container */}
                
            </div>
            <style jsx>{`
            .btn-control:hover {
                cursor: pointer
            }
            `}</style>
        </div>
    )

}