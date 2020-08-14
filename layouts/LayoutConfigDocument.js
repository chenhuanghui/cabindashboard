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

        $('input, textarea').keyup(function(event) {
            // skip for arrow keys
            if(event.which >= 37 && event.which <= 40) return;
            $(this).attr('data',$(this).val())
        });

        $(document).on('click', `.btn-modal` , function() {
            if (!$('body').hasClass('modal-open')) {
                $('body').addClass('modal-open')
                $('#modalCreateDocument').addClass('show')
                $('.modal-backdrop').show()
                console.log('open modal link onboarding documents.');

            } else console.log('modal was opened before.');
        });
       
        $(document).on('click', function() {
            if ( 
                $('.modal-body').has(event.target).length == 0 //checks if descendants of modal was clicked
                &&
                $('.modal-body').is(event.target) //checks if the modal itself was clicked
            ){ console.log('clicked inside');} 
            else {
                if ($(event.target).hasClass('modal')) {
                    $('#modalCreateDocument').removeClass('show')
                    $('body').removeClass('modal-open')
                    $('.modal-backdrop').hide()
                    console.log('modal close finished')
                }
            } 
        });

        $(document).on('click', '#create-action', function() {
            var docName = $('#doc-name').attr(`data`);
            var docContentfulID = $('#contenful-ID').attr(`data`);

            if (!docName | !docContentfulID) return;

            $(this).append(`<div class="spinner-grow spinner-grow-sm" role="status"><span class="sr-only">Loading...</span></div>`)
            console.log('document: ', docName)
            console.log('onboarding: ', docContentfulID)

            createData({
                title: docName,
                contentfulID: docContentfulID,
                status: true
            },`Document`)
            .then(res => {
                console.log ('linked: ', res)
            })
            .finally(()=>{
                $('#modalCreateDocument').removeClass('show')
                $('body').removeClass('modal-open')
                $('.modal-backdrop').hide()
                $('.spinner-grow').remove()
                location.reload()
            })
        })

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
                                                <li className="nav-item">
                                                        <Link href='/config'><a className="nav-link">Hội nhập</a></Link>                                                        
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href='/config/document'><a className="nav-link active">Tài liệu</a></Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href='/config/onboard2doc'><a className="nav-link">Tài liệu - Hội nhập</a></Link>
                                                    </li>
                                                </ul>            
                                            </div>
                                        </div>  {/* row align-items-center */}
                                    </div>
                                </div>
                                
                                {/* COLLECTION 1 */}
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-header-title">TÀI LIỆU SỬ DỤNG DÀNH CHO MERCHANT</h4>
                                        <button className="btn btn-sm btn-white btn-modal" id='add-product'>Thêm hạng mục</button> 
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
                                                        <td className='col-auto'><h4 className="font-weight-normal mb-1">{item && item.fields && item.fields.title}</h4></td>
                                                        <td>{item && item.fields && item.fields.contentfulID}</td>
                                                        <td className='col-auto'>{item && item.fields && item.fields.status ? 'Đang sử dụng' : 'Ngừng sử dụng'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>     

                                {/*  MODAL CREATE DOCUMENT */}
                                <div className="modal fade fixed-right" id="modalCreateDocument" tabIndex="-1">
                                    <div className="modal-dialog modal-dialog-vertical">
                                        <div className="modal-content">
                                            <div className="modal-body">

                                                <div className="header">
                                                    <div className="header-body">
                                                        <h1 className="header-title">Thêm tài liệu</h1>
                                                        {/* <p className='text-muted'>Cung cấp các thông tin về nhân sự, để giúp việc quản lý được thực hiện tốt hơn</p> */}
                                                    </div>
                                                </div>

                                                <div className="my-n3">
                                                    <div className="form-group">
                                                        <label>Tên tài liệu</label>
                                                        <input className="form-control required" id='doc-name' data=''/>                                  
                                                    </div>

                                                    <div className="form-group">
                                                        <label>ContenfulID</label>
                                                        <input className="form-control required" id='contenful-ID' data=''/>                                  
                                                    </div>
                                                </div>
                                                <hr className="my-5" />   
                                                <button className="btn btn-lg btn-block btn-primary mb-3" id="create-action">Lưu</button>
                                            </div>
                                        </div>
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
