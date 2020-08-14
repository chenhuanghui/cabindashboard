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
// MAIN COMPONENT LAYOUT DOCUMENT
export default class LayoutDocument extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            documentListing: [],

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
        retrieveData({},'Document')
        .then(result => {
            console.log('Document:', result);
            currentComponent.setState({documentListing:result})
        })

        // ===============================================
        // FRONT-END ENGAGEMENT
       

    }

    render() {
        const { documentListing} = this.state;
        return (
            <div>
                <Head>
                    {/* <script src="../assets/js/theme.min.js"></script> */}
                    <title> CONFIG DOCUMENT | CabinFood Business</title>
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
                                                <h1 className="header-title">Tài liệu sử dụng</h1>
                                            </div>                                            
                                        </div> {/* row align-items-center */}
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <ul className="nav nav-tabs nav-overflow header-tabs">
                                                    <li className="nav-item"><a className="nav-link " href="#!">Hội nhập</a></li>
                                                    <li className="nav-item"><a className="nav-link active" href="#!">Tài liệu</a></li>
                                                    <li className="nav-item"><a className="nav-link" href="#!">Tài liệu - Hội nhập</a></li>
                                                </ul>            
                                            </div>
                                        </div>  {/* row align-items-center */}
                                    </div>
                                </div>
                                
                                {/* COLLECTION 1 */}
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-header-title">TÀI LIỆU SỬ DỤNG DÀNH CHO MERCHANT</h4>
                                        <Link href='/brands/create'>
                                            <a className="btn btn-sm btn-white" id='add-product'>Thêm hạng mục</a> 
                                        </Link>
                                    </div>{/* end card header */}

                                    <div className="table-responsive mb-0">
                                        <table className='table table-sm table-nowrap card-table table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>Tên tài liệu</th>
                                                    <th>ContenfulID</th>
                                                    <th>Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody className="list">
                                                { documentListing && documentListing.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className='col-auto'><h4 className="font-weight-normal mb-1">{item.fields.title}</h4></td>
                                                        <td>{item.fields.contentfulID}</td>
                                                        <td className='col-auto'>{item.fields.status ? 'Đang sử dụng' : 'Ngừng sử dụng'}</td>
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
