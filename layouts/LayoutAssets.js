import React from 'react';
import Head from 'next/head'
import NavBar from '../components/nav/nav_bar';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Link from 'next/link';
import $, { data } from 'jquery'
import loadable from '@loadable/component';
import Select from "react-dropdown-select"; 

const ReactFilestack = loadable(() => import('filestack-react'), { ssr: false });
const AirtablePlus = require('airtable-plus');  
const airtable = new AirtablePlus({
  baseID: 'appmREe03n1MQ6ydq',
  apiKey: 'keyLNupG6zOmmokND',
  tableName: 'Brand',
});

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

export default class LayoutAssets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            cabinOptionsData: []
        }
    }

    componentDidMount() {
        // INIT VARIABLE
        const cookies = parseCookies();
        let currentComponent = this
        
        // ===============================================
        // CHECKING AUTHENTICATE
        if (!cookies.isLoggedIn | !cookies.userID || !cookies.brandID) Router.push('/signin');
        console.log('current brandID:', cookies.brandID);
        
        // ===============================================
        // RETRIEVE DATA FROM AIRTABLE

        retrieveData({
            filterByFormula: `Brand = "${cookies.brandID}"`,
        },'Brand_Staff')
        .then(result => {
            console.log('brand_product:', result);
            currentComponent.setState({data:result})
        })

        retrieveData({filterByFormula: `brand_cabin = ""`},'Cabin')
        .then(cabinRes => {
            var tempTitle = []
            for (var i=0; i<cabinRes.length; i++) {
                tempTitle.push(cabinRes[i].fields)
            }
            currentComponent.setState({cabinOptionsData:tempTitle})
            console.log('cabin title:', currentComponent.state.cabinOptionsData)
        })

        // ===============================================
        // FRONT-END ENGAGEMENT
        $(document).on('click', `.btn-modal` , function() {
            if (!$('body').hasClass('modal-open')) {
                $('#modalDevice').addClass('show');
                $('body').addClass('modal-open').append('<div class="modal-backdrop fade show"></div>');
            }
            console.log('modal opened');
        });
        
        $(document).on('click', function() {
            if ( 
                $('.modal-body').has(event.target).length == 0 //checks if descendants of modal was clicked
                &&
                $('.modal-body').is(event.target) //checks if the modal itself was clicked
            ){ console.log('clicked inside');} 
            else {
                if ($(event.target).hasClass('modal')) {
                    $('#modalDevice').removeClass('show')
                    $('body').removeClass('modal-open')
                    $('.modal-backdrop').remove()
                    console.log('modal close finished')
                }
            } 
        });
        
        /* action on per product item */
        $(document).on('click', '.dropdown-toggle', function(){
            // $(this).parent().find('.dropdown-menu-right').addClass('show')
        })

    }

    render() {
        const { data, cabinOptionsData } = this.state;
        return (
            <div>
                <Head>
                    {/* <script src="../assets/js/theme.min.js"></script> */}
                    <title> Staff | CabinFood Business</title>
                </Head>

                <NavBar />

                <div className="main-content">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">
                            
                            <div className="header mt-md-5">
                                <div className="header-body">
                                    
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h6 className="header-pretitle">QUẢN LÝ</h6>
                                            <h1 className="header-title">Tài sản</h1>
                                        </div>                                            
                                    </div> {/* row align-items-center */}

                                    {/* <div className="row align-items-center">
                                        <div className="col">
                                            <ul className="nav nav-tabs nav-overflow header-tabs">
                                                <li className="nav-item"><a className="nav-link active" href="#!">Tất cả</a></li>
                                                <li className="nav-item"><a className="nav-link" href="#!">Xếp ca</a></li>
                                                <li className="nav-item"><a className="nav-link" href="#!">Xin nghỉ</a></li>
                                            </ul>            
                                        </div>
                                    </div>  */}
                                    {/* row align-items-center */}
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-header-title">Danh sách tài sản</h4>
                                    <button className="btn btn-sm btn-white btn-modal" id='add-product'>Thêm tài sản</button>
                                </div>{/* end card header */}
                                
                                <div className="table-responsive mb-0">
                                    <table className="table table-sm table-nowrap card-table table-hover">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>THIẾT BỊ</th>
                                                <th>KÍCH THƯỚC(D*R*C)</th>
                                                <th>ĐIỆN ÁP</th>
                                                <th>CABIN</th>
                                            </tr>
                                        </thead>
                                        <tbody className="list">{/* table item */} 
                                                <tr>
                                                    <td className="col-auto">
                                                        <div className="avatar avatar-xs"><img src='../assets/img/logo2.jpg' alt='....' className="avatar-img rounded-circle"/></div>                                                        
                                                    </td>        
                                                    <td>
                                                        <h4 className="mb-1">LÒ VI SÓNG</h4>
                                                    </td>
                                                    <td> 
                                                        <span className="mb-1">20cm X 40cm X 30cm</span>
                                                    </td>
                                                    <td> 
                                                        <span className="mb-1">220V</span>
                                                    </td>
                                                    <td>
                                                        <span className="badge badge-success">C02-PN</span>                                                        
                                                    </td>
                                                </tr>        
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* MODAL EDIT PRODUCT */}
                            <div className="modal fade fixed-right" id="modalDevice" tabIndex="-1">
                                <div className="modal-dialog modal-dialog-vertical">
                                    <div className="modal-content">
                                        <div className="modal-body">

                                            <div className="header">
                                                <div className="header-body">
                                                    <h1 className="header-title">Thêm tài sản</h1>
                                                    <p className='text-muted'>Cung cấp các thông tin về thiết bị để chủ động và có được sử hỗ trợ tốt nhất.</p>
                                                </div>
                                            </div>

                                            <div className="my-n3">
                                                <div className="form-group">
                                                    <label>Tên thiết bị</label>
                                                    <input className="form-control" id='device-name'/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Kích thước</label>
                                                    <input className="form-control" id='device-demension'/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Điện áp</label>
                                                    <input className="form-control" id='device-voltage'/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Cabin</label>
                                                    <span className='hide required' id='cabin-assigned' data=''></span>
                                                    <Select 
                                                    className='form-control' 
                                                    options={cabinOptionsData} 
                                                    labelField= 'name'
                                                    valueField='recID'
                                                    dropdownHandle='false'
                                                    searchable='false'
                                                    onChange={(valSelected) => {
                                                        console.log('cabin seleted: ',valSelected)
                                                        $('#cabin-assigned').attr('data',valSelected[0].recID)
                                                    }}
                                                    onDropdownOpen={()=>{
                                                        console.log('open dropdown')
                                                        $('.react-dropdown-select-dropdown').css({'width': '100%'})
                                                    }}
                                                    />
                                                </div>
                                            </div>                                            
                                            <hr className="my-5" />   
                                            <button className="btn btn-lg btn-block btn-primary mb-3" id="staff-action">Lưu</button>
                                            
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
