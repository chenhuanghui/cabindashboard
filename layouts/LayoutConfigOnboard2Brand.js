// ====================================
// REACT
import React from 'react';
import Head from 'next/head'
import Link from 'next/link';
import Router from 'next/router';
// ====================================
// COMPONENTS
import NavBar from '../components/nav/nav_bar';

// ====================================
// OTHERS LIBS
import $, { data } from 'jquery'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import loadable from '@loadable/component';
import Select from "react-dropdown-select"; 
// ====================================
// INIT GLOBAL VARIABLES
const ReactFilestack = loadable(() => import('filestack-react'), { ssr: false });
const AirtablePlus = require('airtable-plus');  
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

async function createData(formular,tbName) {
    try {
      const readRes = await airtable.create(formular,{tableName:tbName});
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

// ====================================
// MAIN COMPONENT LAYOUT DOCUMENT
export default class LayoutOnboard2Doc extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            brandAvailable: [],
            brandOnboardingList1: [],
            brandOnboardingList2: [],
            brandOnboardingList3: [],
            brandOnboardingList4: []
        }
    }

    componentDidMount() {
        // INIT VARIABLE
        const cookies = parseCookies();
        let currentComponent = this
        
        // ===============================================
        // CHECKING AUTHENTICATE
        if (!cookies.isLoggedIn | !cookies.userID | !cookies.brandID | cookies.role > 2) Router.push('/signin');
        console.log('current brandID:', cookies.brandID);
        
        // ===============================================
        // RETRIEVE DATA FROM AIRTABLE
        // _ GET ONBOARDING BY GROUP BY COLLECTION 1
        retrieveData({},'Brand')
        .then(result => {
            var temp = []
            for(var i=0; i<result.length; i++) {
                if(result[i].fields.status === true) temp.push(result[i].fields)
            }
            currentComponent.setState({brandAvailable: temp})
            console.log('Brand:', currentComponent.state.brandAvailable);
        })

        $(document).on(`click`,`#fetch-data`, function(){
            if( !$(`#brand-selected`).attr(`data`) |($(`#brand-selected`).attr(`data`) === '')) {
                alert('Vui lòng chọn nhãn hiệu')
                return
            }
            
            $(this).append(`<div class="spinner-grow spinner-grow-sm" role="status"><span class="sr-only">Loading...</span></div>`)
            retrieveData({
                view: 'GroupByCollection1',
                filterByFormula: `Brand = "${$(`#brand-selected`).attr(`data`)}"`,
                sort: [ {field: 'orderInCollection', direction: 'asc'},]
              },'Brand_Onboarding')
              .then(response=> {
                console.log('brand_onboarding group 1: ',response);
                currentComponent.setState({brandOnboardingList1: response})
                $('.spinner-grow').remove()
            })

            retrieveData({
                view: 'GroupByCollection2',
                filterByFormula: `Brand = "${$(`#brand-selected`).attr(`data`)}"`,
                sort: [ {field: 'orderInCollection', direction: 'asc'},]
              },'Brand_Onboarding')
              .then(response=> {
                console.log('brand_onboarding group 2: ',response);
                currentComponent.setState({brandOnboardingList2: response})
                $('.spinner-grow').remove()
            })

            retrieveData({
                view: 'GroupByCollection3',
                filterByFormula: `Brand = "${$(`#brand-selected`).attr(`data`)}"`,
                sort: [ {field: 'orderInCollection', direction: 'asc'},]
              },'Brand_Onboarding')
              .then(response=> {
                console.log('brand_onboarding group 3: ',response);
                currentComponent.setState({brandOnboardingList3: response})
                $('.spinner-grow').remove()
            })

            retrieveData({
                view: 'GroupByCollection4',
                filterByFormula: `Brand = "${$(`#brand-selected`).attr(`data`)}"`,
                sort: [ {field: 'orderInCollection', direction: 'asc'},]
              },'Brand_Onboarding')
              .then(response=> {
                console.log('brand_onboarding group 4: ',response);
                currentComponent.setState({brandOnboardingList4: response})
                $('.spinner-grow').remove()
            })
        })

        // ===============================================
        // FRONT-END ENGAGEMENT

        $(document).on(`click`,`.action-link`,function(){
            $(this).append(`<div class="spinner-grow spinner-grow-sm" role="status"><span class="sr-only">Loading...</span></div>`)

            var isActiveSetting = false
            if ($(this).attr(`data4`) === `inactivate`) {
                isActiveSetting = true
                console.log('setting to acctive !!! ')
            }
            
            console.log('activate status setting: ', isActiveSetting)
            updateData($(this).attr(`data3`),{
                isActive: isActiveSetting
            },`Brand_Onboarding`)
            .then( res => {
                console.log(`response update: `, res)
                if (isActiveSetting === true) {
                    $(this).attr(`data4`,`activate`)
                    $(this).text('Ngưng kết nối')
                } else{
                    $(this).attr(`data4`,`inactivate`)
                    $(this).text('Kết nối')
                }
                $('.spinner-grow').remove()
            })
        })


    }

    render() {
        const { brandAvailable, brandOnboardingList1, brandOnboardingList2, brandOnboardingList3, brandOnboardingList4} = this.state;
        return (
            <div>
                <Head>
                    {/* <script src="../assets/js/theme.min.js"></script> */}
                    <title> LINK ONBOARDING AND BRAND | CabinFood Business</title>
                </Head>

                <NavBar />

                <div className="main-content">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-10 col-xl-8">                                
                                <div className="header mt-md-5">
                                    <div className="header-body">                                    
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h6 className="header-pretitle">THIẾT LẬP</h6>
                                                <h1 className="header-title">Liên kết chương trình hội nhập cho Nhãn hiệu</h1>
                                            </div>                                            
                                        </div> {/* row align-items-center */}
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <ul className="nav nav-tabs nav-overflow header-tabs">
                                                    <li className="nav-item">
                                                        <Link href='/config'><a className="nav-link">Hội nhập</a></Link>                                                        
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href='/config/document'><a className="nav-link">Tài liệu</a></Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href='/config/onboard2doc'><a className="nav-link ">Tài liệu - Hội nhập</a></Link>
                                                    </li>
                                                    <li className="nav-item"><Link href='/config/onboard2brand'><a className="nav-link active">Hội nhập - Nhãn hiệu</a></Link></li>
                                                </ul>            
                                            </div>
                                        </div>  {/* row align-items-center */}
                                    </div>
                                </div>
                                
                                
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-header-title"> LIÊN KẾT HOẠT ĐỘNG HỘI NHẬP CHO NHÃN HIỆU</h4>
                                        <span id="brand-selected" className='hide' data=''></span>
                                        <Select
                                            className='form-control col-auto' 
                                            options={brandAvailable} 
                                            labelField= 'brandName'
                                            valueField='ID'
                                            dropdownHandle='false'
                                            // searchable='false'
                                            onChange={(valSelected) => {
                                                console.log('seleted: ',valSelected)
                                                $('#brand-selected').attr('data',valSelected[0].ID)
                                            }}
                                            onDropdownOpen={()=>{
                                                console.log('open dropdown')
                                                $('.react-dropdown-select-dropdown').css({'width': '100%'})
                                            }}
                                        />                                           
                                        <button className="btn btn-sm btn-white btn-modal" id='fetch-data'>Lấy dữ liệu</button> 
                                    </div>
                                </div>    
                                
                                {brandOnboardingList1 && brandOnboardingList1.length > 0
                                ? 
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-header-title">COLLECTION 1 - {brandOnboardingList1[0].fields.collectionName}</h4>
                                        </div>                                    
                                        <div className="table-responsive mb-0">
                                            <table className='table table-sm table-nowrap card-table table-hover'>
                                                <thead>
                                                    <tr>
                                                        <th>Hội nhập</th>
                                                        <th>Nhãn hiệu</th>
                                                        <th>Trạng thái liên kết</th>
                                                        <th>Thiết lập liên kết</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list">
                                                    { brandOnboardingList1 && brandOnboardingList1.map((item, index) => (
                                                        <tr key={index} data={item.id}>
                                                            <td className='col-auto'><h4 className="font-weight-normal mb-1" data={item.id}>{item.fields.onboardingTitle}</h4></td>
                                                            <td><span className="font-weight-normal mb-1" data={item.fields.Brand}>{item.fields.brandName}</span></td>
                                                            <td className='col-auto'>
                                                                <label className='label-status'>{item.fields.isActive ? 'Đang áp dụng' : 'Chưa áp dụng'}</label>
                                                            </td>
                                                            <td>
                                                                <button className='btn btn-sm btn-white action-link' 
                                                                    data1={item.fields.Brand} 
                                                                    data2={item.fields.Onboarding} 
                                                                    data3={item.id} 
                                                                    data4={item.fields.isActive ? 'activated' : 'inactivate'}
                                                                > {item.fields.isActive ? 'Ngưng kết nối' : 'Kết nối'} 
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div> 
                                    </div>
                                : null
                                }

                                {brandOnboardingList2 && brandOnboardingList2.length > 0
                                ? 
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-header-title">COLLECTION 2 - {brandOnboardingList2[0].fields.collectionName}</h4>
                                        </div>                                    
                                        <div className="table-responsive mb-0">
                                            <table className='table table-sm table-nowrap card-table table-hover'>
                                                <thead>
                                                    <tr>
                                                        <th>Hội nhập</th>
                                                        <th>Nhãn hiệu</th>
                                                        <th>Trạng thái liên kết</th>
                                                        <th>Thiết lập liên kết</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list">
                                                    { brandOnboardingList2 && brandOnboardingList2.map((item, index) => (
                                                        <tr key={index} data={item.id}>
                                                            <td className='col-auto'><h4 className="font-weight-normal mb-1" data={item.id}>{item.fields.onboardingTitle}</h4></td>
                                                            <td><span className="font-weight-normal mb-1" data={item.fields.Brand}>{item.fields.brandName}</span></td>
                                                            <td className='col-auto'>
                                                                <label className='label-status'>{item.fields.isActive ? 'Đang áp dụng' : 'Chưa áp dụng'}</label>
                                                            </td>
                                                            <td>
                                                                <button className='btn btn-sm btn-white action-link' 
                                                                    data1={item.fields.Brand} 
                                                                    data2={item.fields.Onboarding} 
                                                                    data3={item.id} 
                                                                    data4={item.fields.isActive ? 'activated' : 'inactivate'}
                                                                > {item.fields.isActive ? 'Ngưng kết nối' : 'Kết nối'} 
                                                                </button>
                                                            </td>
                                                            
                                                            
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div> 
                                    </div>
                                : null
                                }

                                {brandOnboardingList3 && brandOnboardingList3.length > 0
                                ? 
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-header-title">COLLECTION 3 - {brandOnboardingList3[0].fields.collectionName}</h4>
                                        </div>                                    
                                        <div className="table-responsive mb-0">
                                            <table className='table table-sm table-nowrap card-table table-hover'>
                                                <thead>
                                                    <tr>
                                                        <th>Hội nhập</th>
                                                        <th>Nhãn hiệu</th>
                                                        <th>Trạng thái liên kết</th>
                                                        <th>Thiết lập liên kết</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list">
                                                    { brandOnboardingList3 && brandOnboardingList3.map((item, index) => (
                                                        <tr key={index} data={item.id}>
                                                            <td className='col-auto'><h4 className="font-weight-normal mb-1" data={item.id}>{item.fields.onboardingTitle}</h4></td>
                                                            <td><span className="font-weight-normal mb-1" data={item.fields.Brand}>{item.fields.brandName}</span></td>
                                                            <td className='col-auto'>
                                                                <label className='label-status'>{item.fields.isActive ? 'Đang áp dụng' : 'Chưa áp dụng'}</label>
                                                            </td>
                                                            <td>
                                                                <button className='btn btn-sm btn-white action-link' 
                                                                    data1={item.fields.Brand} 
                                                                    data2={item.fields.Onboarding} 
                                                                    data3={item.id} 
                                                                    data4={item.fields.isActive ? 'activated' : 'inactivate'}
                                                                > {item.fields.isActive ? 'Ngưng kết nối' : 'Kết nối'} 
                                                                </button>
                                                            </td>
                                                            
                                                            
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div> 
                                    </div>
                                : null
                                }

                                {brandOnboardingList4 && brandOnboardingList4.length > 0
                                ? 
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-header-title">COLLECTION 4 - {brandOnboardingList4[0].fields.collectionName}</h4>
                                        </div>                                    
                                        <div className="table-responsive mb-0">
                                            <table className='table table-sm table-nowrap card-table table-hover'>
                                                <thead>
                                                    <tr>
                                                        <th>Hội nhập</th>
                                                        <th>Nhãn hiệu</th>
                                                        <th>Trạng thái liên kết</th>
                                                        <th>Thiết lập liên kết</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list">
                                                    { brandOnboardingList4 && brandOnboardingList4.map((item, index) => (
                                                        <tr key={index} data={item.id}>
                                                            <td className='col-auto'><h4 className="font-weight-normal mb-1" data={item.id}>{item.fields.onboardingTitle}</h4></td>
                                                            <td><span className="font-weight-normal mb-1" data={item.fields.Brand}>{item.fields.brandName}</span></td>
                                                            <td className='col-auto'>
                                                                <label className='label-status'>{item.fields.isActive ? 'Đang áp dụng' : 'Chưa áp dụng'}</label>
                                                            </td>
                                                            <td>
                                                                <button className='btn btn-sm btn-white action-link' 
                                                                    data1={item.fields.Brand} 
                                                                    data2={item.fields.Onboarding} 
                                                                    data3={item.id} 
                                                                    data4={item.fields.isActive ? 'activated' : 'inactivate'}
                                                                > {item.fields.isActive ? 'Ngưng kết nối' : 'Kết nối'} 
                                                                </button>
                                                            </td>
                                                            
                                                            
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div> 
                                    </div>
                                : null
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
                
                <style jsx>{`
                    .dropdown-toggle {cursor: pointer}
                `}</style>
            </div>
        )
    }
}
