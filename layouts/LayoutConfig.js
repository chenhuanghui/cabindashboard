// ====================================
// REACT
import React from 'react';
import Head from 'next/head'
import Link from 'next/link';

// ====================================
// COMPONENTS
import NavBar from '../components/nav/nav_bar';

// ====================================
// OTHERS LIBS
import $, { data } from 'jquery'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import loadable from '@loadable/component';
import Router from 'next/router';

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
// MAIN COMPONENT LAYOUT CONFIG
export default class LayoutConfig extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            onboardingList1: [],
            onboardingList2: [],
            onboardingList3: [],
            onboardingList4: [],

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
        retrieveData({
            view: 'GroupByCollection1',
            sort: [ {field: 'orderInCollection', direction: 'asc'},]
        },'Onboarding')
        .then(result => {
            console.log('Onboarding:', result);
            currentComponent.setState({onboardingList1:result})
        })

        // _ GET ONBOARDING BY GROUP BY COLLECTION 2
        retrieveData({
            view: 'GroupByCollection2',
            sort: [ {field: 'orderInCollection', direction: 'asc'},]
        },'Onboarding')
        .then(result => {
            console.log('Onboarding:', result);
            currentComponent.setState({onboardingList2:result})
        })

        // _ GET ONBOARDING BY GROUP BY COLLECTION 3
        retrieveData({
            view: 'GroupByCollection3',
            sort: [ {field: 'orderInCollection', direction: 'asc'},]
        },'Onboarding')
        .then(result => {
            console.log('Onboarding:', result);
            currentComponent.setState({onboardingList3:result})
        })

        // _ GET ONBOARDING BY GROUP BY COLLECTION 4
        retrieveData({
            view: 'GroupByCollection4',
            sort: [ {field: 'orderInCollection', direction: 'asc'},]
        },'Onboarding')
        .then(result => {
            console.log('Onboarding:', result);
            currentComponent.setState({onboardingList4:result})
        })


        // ===============================================
        // FRONT-END ENGAGEMENT
       

    }

    render() {
        const { onboardingList1, onboardingList2, onboardingList3, onboardingList4 } = this.state;
        return (
            <div>
                <Head>
                    {/* <script src="../assets/js/theme.min.js"></script> */}
                    <title> CONFIG | CabinFood Business</title>
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
                                                <h1 className="header-title">Thông số hệ thống</h1>
                                            </div>                                            
                                        </div> {/* row align-items-center */}
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <ul className="nav nav-tabs nav-overflow header-tabs">
                                                    <li className="nav-item"><a className="nav-link active" href="#!">Hội nhập</a></li>
                                                    <li className="nav-item"><a className="nav-link" href="#!">Tài liệu</a></li>
                                                    <li className="nav-item"><a className="nav-link" href="#!">Tài liệu - Hội nhập</a></li>
                                                </ul>            
                                            </div>
                                        </div>  {/* row align-items-center */}
                                    </div>
                                </div>
                                
                                {/* COLLECTION 1 */}
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-header-title">{onboardingList1 && onboardingList1.length>0 && onboardingList1[0].fields.collection_name}</h4>
                                        <Link href='/brands/create'>
                                            <a className="btn btn-sm btn-white" id='add-product'>Thêm hạng mục</a> 
                                        </Link>
                                    </div>{/* end card header */}

                                    <div className="table-responsive mb-0">
                                        <table className='table table-sm table-nowrap card-table table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>Hạng mục</th>
                                                    <th>Loại</th>
                                                    <th>Hành động</th>
                                                    <th>Thứ tự</th>
                                                </tr>
                                            </thead>
                                            <tbody className="list">
                                                { onboardingList1 && onboardingList1.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className='col-auto'><h4 className="font-weight-normal mb-1">{item.fields.title}</h4></td>
                                                        <td>{item.fields.type_desc}</td>
                                                        <td>{item.fields.valueAction}</td>
                                                        <td className='col-auto'>{item.fields.orderInCollection}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>     

                                {/* COLLECTION 2 */}
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-header-title">{onboardingList2 && onboardingList2.length>0 && onboardingList2[0].fields.collection_name}</h4>
                                        <Link href='/brands/create'>
                                            <a className="btn btn-sm btn-white" id='add-product'>Thêm hạng mục</a> 
                                        </Link>
                                    </div>{/* end card header */}

                                    <div className="card-body">
                                        <table className='table table-sm table-nowrap card-table table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>Hạng mục</th>
                                                    <th>Loại</th>
                                                    <th>Hành động</th>
                                                    <th>Thứ tự</th>
                                                </tr>
                                            </thead>
                                            <tbody className="list">
                                                { onboardingList2 && onboardingList2.map((item, index) => (
                                                    <tr>
                                                        <td className='col-auto'><h4 className="font-weight-normal mb-1">{item.fields.title}</h4></td>
                                                        <td>{item.fields.type_desc}</td>
                                                        <td>{item.fields.valueAction}</td>
                                                        <td className='col-auto'>{item.fields.orderInCollection}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>      

                                {/* COLLECTION 3 */}
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-header-title">{onboardingList3 && onboardingList3.length>0 && onboardingList3[0].fields.collection_name}</h4>
                                        <Link href='/brands/create'>
                                            <a className="btn btn-sm btn-white" id='add-product'>Thêm hạng mục</a> 
                                        </Link>
                                    </div>{/* end card header */}

                                    <div className="card-body">
                                        <table className='table table-sm table-nowrap card-table table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>Hạng mục</th>
                                                    <th>Loại</th>
                                                    <th>Hành động</th>
                                                    <th>Thứ tự</th>
                                                </tr>
                                            </thead>
                                            <tbody className="list">
                                                { onboardingList3 && onboardingList3.map((item, index) => (
                                                    <tr>
                                                        <td className='col-auto'><h4 className="font-weight-normal mb-1">{item.fields.title}</h4></td>
                                                        <td>{item.fields.type_desc}</td>
                                                        <td>{item.fields.valueAction}</td>
                                                        <td className='col-auto'>{item.fields.orderInCollection}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>    

                                {/* COLLECTION 4 */}
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-header-title">{onboardingList4 && onboardingList4.length>0 && onboardingList4[0].fields.collection_name}</h4>
                                        <Link href='/brands/create'>
                                            <a className="btn btn-sm btn-white" id='add-product'>Thêm hạng mục</a> 
                                        </Link>
                                    </div>{/* end card header */}

                                    <div className="card-body">
                                        <table className='table table-sm table-nowrap card-table table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>Hạng mục</th>
                                                    <th>Loại</th>
                                                    <th>Hành động</th>
                                                    <th>Thứ tự</th>
                                                </tr>
                                            </thead>
                                            <tbody className="list">
                                                { onboardingList4 && onboardingList4.map((item, index) => (
                                                    <tr>
                                                        <td className='col-auto'><h4 className="font-weight-normal mb-1">{item.fields.title}</h4></td>
                                                        <td>{item.fields.type_desc}</td>
                                                        <td>{item.fields.valueAction}</td>
                                                        <td className='col-auto'>{item.fields.orderInCollection}</td>
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
                
                <style jsx>{`
                    .dropdown-toggle {cursor: pointer}
                `}</style>
            </div>
        )
    }
}
