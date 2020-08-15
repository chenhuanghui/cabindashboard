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

function checkValid(paneID) {
    console.log('check valid inputs')
    var isValid = true
    $(paneID+ ' .required').each(function(index){
        if ($(this).hasClass('required') && ($(this).attr('data') === '' | $(this).attr('data') === undefined)) {
            $(this).removeClass('is-valid')
            $(this).addClass('is-invalid')            
            console.log(index + ": invalid" )
            isValid = false
            return;
        } else {
            console.log(index + ": valid " + $(this).attr('data'))
            $(this).removeClass('is-invalid')
            $(this).addClass('is-valid')   
        }
    })
    console.log('checked status:', isValid)
    return isValid;
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
            brandAvailable: []
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

        retrieveData({},'Brand')
        .then(result => {
            var temp = []
            for(var i=0; i<result.length; i++) {
                if(result[i].fields.status === true) temp.push(result[i].fields)
            }
            currentComponent.setState({brandAvailable: temp})
            console.log('Brand:', currentComponent.state.brandAvailable);
        })

        // ===============================================
        // FRONT-END ENGAGEMENT

        $('input, textarea').keyup(function(event) {
            // skip for arrow keys
            if(event.which >= 37 && event.which <= 40) return;
            $(this).attr('data',$(this).val())
        });
        
        // _SHOW MODAL
        $(document).on('click', `.btn-modal` , function() {
            if (!$('body').hasClass('modal-open')) {
                $('body').addClass('modal-open')
                $('#modalCreateOnboarding').addClass('show')
                $('.modal-backdrop').show()
                console.log('open modal onboarding.');
                console.log(`collection_name: `, $(this).attr('collection-name'))
                
                $(`#onboarding-collection`).val($(this).attr('collection-name'))
                $(`#onboarding-collection`).attr(`data`,$(this).attr('collection'))
            } else console.log('modal was opened before.');
        });
        
        // _CLOSED MODAL WHEN CLICKED OUTSIDE
        $(document).on('click', function() {
            if ( 
                $('.modal-body').has(event.target).length == 0 //checks if descendants of modal was clicked
                &&
                $('.modal-body').is(event.target) //checks if the modal itself was clicked
            ){ console.log('clicked inside');} 
            else {
                if ($(event.target).hasClass('modal')) {
                    $('#modalCreateOnboarding').removeClass('show')
                    $('#modalUpdateOnboarding').removeClass('show')
                    $('body').removeClass('modal-open')
                    $('.modal-backdrop').hide()
                    $('.spinner-grow').remove()
                    console.log('modal close finished')
                }
            } 
        });

        // _CREATE ONBOARDING ITEM
        $(document).on('click',`#create-action`, function() {
            $(this).append(`<div class="spinner-grow spinner-grow-sm" role="status"><span class="sr-only">Loading...</span></div>`)
            if(!checkValid(`#modalCreateOnboarding`)) {
                $('.spinner-grow').remove()
                return;
            }

            createData({
                title: $(`#onboarding-name`).attr('data'),
                collection: $(`#onboarding-collection`).attr(`data`),
                type: $(`#onboarding-type-selected`).attr(`data`),
                valueAction: $(`#onboarding-valueAction`).attr(`data`),
                orderInCollection: parseInt($(`#onboarding-order`).attr(`data`)),
                status: true
            },`OnBoarding`)
            .then(res=> {
                console.log(`onboradingCreated: `, res)
                var brandAvailableList = currentComponent.state.brandAvailable
                console.log(`brandAvailableList: `, brandAvailableList)
                
                // _CREATE LINKING OF ONBOARDING AND BRAND ON BRAND_ONBOARDING TABLE
                var promiseLinkBrandOnboarding = []
                for (var i=0; i<brandAvailableList.length; i++) {
                    promiseLinkBrandOnboarding.push(
                        createData({
                            Brand: [brandAvailableList[i].ID],
                            Onboarding: [res.id]
                        },`Brand_OnBoarding`)
                    )
                }

                Promise.all(promiseLinkBrandOnboarding)
                .then(res => {
                    console.log(`res: `, res)
                    location.reload()
                })
            })
            .finally(()=> {
                $('#modalCreateOnboarding').removeClass('show')
                $('body').removeClass('modal-open')
                $('.modal-backdrop').hide()
                $('.spinner-grow').remove()
                console.log('modal close finished')
            })
        })
        
        // _SELECT ITEM-ROW
        $(document).on('click', `.item-row` , function() {
            // show modal
            if (!$('body').hasClass('modal-open')) {
                $('#modalUpdateOnboarding').addClass('show');
                $('.modal-backdrop').show()
            }

            $('#modalUpdateOnboarding').attr('data',$(this).attr('data'))            
            
            $('#onboarding-name-edit').val($(this).find('.item-title').text())
            $('#onboarding-name-edit').attr('data',($(this).find('.item-title').text()))

            $('#onboarding-order-edit').val($(this).find('.item-order-collection').text())
            $('#onboarding-order-edit').attr('data',$(this).find('.item-order-collection').text())

            $('#onboarding-valueAction-edit').val($(this).find('.item-value-action').text())
            $('#onboarding-valueAction-edit').attr('data',$(this).find('.item-value-action').text())                        
        });

        // _UPDATE ONBOARDING DATA
        $(document).on('click', `#update-action` , function() {
            // add loading spinner icon
            $(this).append(`<div class="spinner-grow spinner-grow-sm" role="status"><span class="sr-only">Loading...</span></div>`)            
            
            // checkvalid .required form
            if(!checkValid('#modalUpdateOnboarding')) {
                $('.spinner-grow').remove();
                return;
            }
            console.log(`collection `, $(`#onboarding-collection-selected-edit`).attr(`data`))

            updateData($(`#modalUpdateOnboarding`).attr('data'),{
                title: $(`#onboarding-name-edit`).attr('data'),
                collection: $(`#onboarding-collection-selected-edit`).attr(`data`),
                type: $(`#onboarding-type-selected-edit`).attr(`data`),
                valueAction: $(`#onboarding-valueAction-edit`).attr(`data`),
                orderInCollection: parseInt($(`#onboarding-order-edit`).attr(`data`))
            },`OnBoarding`)
            .then(res => {
                console.log('success', res)

            })
            .finally(()=>{
                $('#modalUpdateOnboarding').removeClass('show')
                $('body').removeClass('modal-open')
                $('.modal-backdrop').hide()
                $('.spinner-grow').remove()
                console.log('modal close finished')
                location.reload()
            })
        })
        

    }

    render() {
        const { onboardingList1, onboardingList2, onboardingList3, onboardingList4 } = this.state;
        return (
            <div>
                <Head>
                    {/* <script src="../assets/js/theme.min.js"></script> */}
                    <title> CONFIG ONBOARDING | CabinFood Business</title>
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
                                                <h1 className="header-title">Chương trình hội nhập</h1>
                                            </div>                                            
                                        </div> {/* row align-items-center */}
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <ul className="nav nav-tabs nav-overflow header-tabs">
                                                <li className="nav-item">
                                                        <Link href='/config'><a className="nav-link active">Hội nhập</a></Link>                                                        
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href='/config/document'><a className="nav-link">Tài liệu</a></Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href='/config/onboard2doc'><a className="nav-link">Tài liệu - Hội nhập</a></Link>
                                                    </li>
                                                    <li className="nav-item"><Link href='/config/onboard2brand'><a className="nav-link">Hội nhập - Nhãn hiệu</a></Link></li>
                                                </ul>            
                                            </div>
                                        </div>  {/* row align-items-center */}
                                    </div>
                                </div>
                                
                                {/* COLLECTION 1 */}
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-header-title">COLLECTION 1 - {onboardingList1 && onboardingList1.length>0 && onboardingList1[0].fields.collection_name}</h4>
                                        <button className="btn btn-sm btn-white btn-modal" collection={onboardingList1 && onboardingList1.length>0 && onboardingList1[0].fields.collection.toString()} collection-name={onboardingList1 && onboardingList1.length>0 && onboardingList1[0].fields.collection_name.toString()}>Thêm hạng mục</button> 
                                    </div>{/* end card header */}

                                    <div className="table-responsive mb-0">
                                        <table className='table table-sm table-nowrap card-table table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>Hạng mục</th>
                                                    <th>Loại</th>
                                                    <th>Hành động</th>
                                                    <th>Thứ tự</th>
                                                    <th>Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody className="list">
                                                { onboardingList1 && onboardingList1.map((item, index) => (
                                                    <tr key={index} className='item-row' collection-name={item.fields.collection_name} collection={item.fields.collection} data={item.id}>
                                                        <td className='col-auto'><h4 className="font-weight-normal mb-1 item-title">{item.fields.title}</h4></td>
                                                        <td className='item-type-desc'>{item.fields.type_desc}</td>
                                                        <td className='item-value-action'>{item.fields.valueAction}</td>
                                                        <td className='item-order-collection'>{item.fields.orderInCollection}</td>
                                                        <td className='col-auto item-status' data={item.fields.status ? 'true' : 'false'}>{item.fields.status ? "Đang sử dụng" : 'Ngưng sử dụng'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>     

                                {/* COLLECTION 2 */}
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-header-title">COLLECTION 2 - {onboardingList2 && onboardingList2.length>0 && onboardingList2[0].fields.collection_name}</h4>
                                        <button className="btn btn-sm btn-white btn-modal" collection={onboardingList2 && onboardingList2.length>0 && onboardingList2[0].fields.collection.toString()} collection-name={onboardingList2 && onboardingList2.length>0 && onboardingList2[0].fields.collection_name.toString()}>Thêm hạng mục</button> 
                                    </div>{/* end card header */}

                                    <div className="table-responsive mb-0">
                                        <table className='table table-sm table-nowrap card-table table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>Hạng mục</th>
                                                    <th>Loại</th>
                                                    <th>Hành động</th>
                                                    <th>Thứ tự</th>
                                                    <th>Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody className="list">
                                                { onboardingList2 && onboardingList2.map((item, index) => (
                                                    <tr key={index} className='item-row' collection-name={item.fields.collection_name} collection={item.fields.collection} data={item.id}>
                                                        <td className='col-auto'><h4 className="font-weight-normal mb-1 item-title">{item.fields.title}</h4></td>
                                                        <td className='item-type-desc'>{item.fields.type_desc}</td>
                                                        <td className='item-value-action'>{item.fields.valueAction}</td>
                                                        <td className='item-order-collection'>{item.fields.orderInCollection}</td>
                                                        <td className='col-auto item-status' data={item.fields.status ? 'true' : 'false'}>{item.fields.status ? "Đang sử dụng" : 'Ngưng sử dụng'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>      

                                {/* COLLECTION 3 */}
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-header-title">COLLECTION 3 - {onboardingList3 && onboardingList3.length>0 && onboardingList3[0].fields.collection_name}</h4>
                                        <button className="btn btn-sm btn-white btn-modal" collection={onboardingList3 && onboardingList3.length>0 && onboardingList3[0].fields.collection.toString()} collection-name={onboardingList3 && onboardingList3.length>0 && onboardingList3[0].fields.collection_name.toString()}>Thêm hạng mục</button> 
                                    </div>{/* end card header */}

                                    <div className="table-responsive mb-0">
                                        <table className='table table-sm table-nowrap card-table table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>Hạng mục</th>
                                                    <th>Loại</th>
                                                    <th>Hành động</th>
                                                    <th>Thứ tự</th>
                                                    <th>Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody className="list">
                                                { onboardingList3 && onboardingList3.map((item, index) => (
                                                    <tr key={index} className='item-row' collection-name={item.fields.collection_name} collection={item.fields.collection} data={item.id}>
                                                        <td className='col-auto'><h4 className="font-weight-normal mb-1 item-title">{item.fields.title}</h4></td>
                                                        <td className='item-type-desc'>{item.fields.type_desc}</td>
                                                        <td className='item-value-action'>{item.fields.valueAction}</td>
                                                        <td className='item-order-collection'>{item.fields.orderInCollection}</td>
                                                        <td className='col-auto item-status' data={item.fields.status ? 'true' : 'false'}>{item.fields.status ? "Đang sử dụng" : 'Ngưng sử dụng'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>    

                                {/* COLLECTION 4 */}
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-header-title">COLLECTION 4 - {onboardingList4 && onboardingList4.length>0 && onboardingList4[0].fields.collection_name}</h4>
                                        <button className="btn btn-sm btn-white btn-modal" collection={onboardingList4 && onboardingList4.length>0 && onboardingList4[0].fields.collection.toString()} collection-name={onboardingList4 && onboardingList4.length>0 && onboardingList4[0].fields.collection_name.toString()}>Thêm hạng mục</button> 
                                    </div>{/* end card header */}

                                    <div className="table-responsive mb-0">
                                        <table className='table table-sm table-nowrap card-table table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>Hạng mục</th>
                                                    <th>Loại</th>
                                                    <th>Hành động</th>
                                                    <th>Thứ tự</th>
                                                    <th>Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody className="list">
                                                { onboardingList4 && onboardingList4.map((item, index) => (
                                                    <tr key={index} className='item-row' collection-name={item.fields.collection_name} collection={item.fields.collection} data={item.id}>
                                                        <td className='col-auto'><h4 className="font-weight-normal mb-1 item-title">{item.fields.title}</h4></td>
                                                        <td className='item-type-desc'>{item.fields.type_desc}</td>
                                                        <td className='item-value-action'>{item.fields.valueAction}</td>
                                                        <td className='item-order-collection'>{item.fields.orderInCollection}</td>
                                                        <td className='col-auto item-status' data={item.fields.status ? 'true' : 'false'}>{item.fields.status ? "Đang sử dụng" : 'Ngưng sử dụng'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>      

                                {/*  MODAL CREATE ONBOARDING */}
                                <div className="modal fade fixed-right" id="modalCreateDocument" tabIndex="-1">
                                    <div className="modal-dialog modal-dialog-vertical">
                                        <div className="modal-content">
                                            <div className="modal-body">

                                                <div className="header">
                                                    <div className="header-body">
                                                        <h1 className="header-title">Thêm hạng mục hội nhập</h1>
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
                                
                                {/*  MODAL CREATE ONBOARDING */}
                                <div className="modal fade fixed-right" id="modalCreateOnboarding" tabIndex="-1">
                                    <div className="modal-dialog modal-dialog-vertical">
                                        <div className="modal-content">
                                            <div className="modal-body">

                                                <div className="header">
                                                    <div className="header-body">
                                                        <h1 className="header-title">Thêm hạng mục hội nhập</h1>
                                                        {/* <p className='text-muted'>Cung cấp các thông tin về nhân sự, để giúp việc quản lý được thực hiện tốt hơn</p> */}
                                                    </div>
                                                </div>

                                                <div className="my-n3" id='onboarding-setup'>
                                                    <div className="form-group">
                                                        <label>Tiêu đề: </label>
                                                        <input className="form-control required" id='onboarding-name' data=''/>                                  
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Thứ tự: </label>
                                                        <input className="form-control required" id='onboarding-order' data=''/>                                  
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Loại: </label>
                                                        <span className='hide required' id='onboarding-type-selected' data=''></span>
                                                        <Select
                                                            className='form-control' 
                                                            options={[{title:'Tự động hoàn thành',ID:1},{title:'Xác nhận', ID: 2}]} 
                                                            labelField= 'title'
                                                            valueField='ID'
                                                            dropdownHandle='false'
                                                            searchable='false'
                                                            onChange={(valSelected) => {
                                                                console.log('seleted: ',valSelected)
                                                                $('#onboarding-type-selected').attr('data',valSelected[0].ID)

                                                                if (valSelected[0].ID === 2) {
                                                                    $(`#form-value-action`).hide()
                                                                } else {
                                                                    $(`#form-value-action`).show()
                                                                }

                                                            }}
                                                            onDropdownOpen={()=>{
                                                                console.log('open dropdown')
                                                                $('.react-dropdown-select-dropdown').css({'width': '100%'})
                                                            }}
                                                            />   
                                                    </div>

                                                    <div className="form-group" id='form-value-action'>
                                                        <label>Di chuyển đến đường link: </label>
                                                        <input className="form-control required" id='onboarding-valueAction' data='-'/>                                  
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Nhóm: </label>
                                                        <input className="form-control required" id='onboarding-collection' data='' readOnly/>
                                                    </div>
                                                </div>
                                                <hr className="my-5" />   
                                                <button className="btn btn-lg btn-block btn-primary mb-3" id="create-action">Lưu</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*  MODAL UPDATE ONBOARDING */}
                                <div className="modal fade fixed-right" id="modalUpdateOnboarding" tabIndex="-1">
                                    <div className="modal-dialog modal-dialog-vertical">
                                        <div className="modal-content">
                                            <div className="modal-body">

                                                <div className="header">
                                                    <div className="header-body">
                                                        <h1 className="header-title">Điều chỉnh thông tin hội nhập</h1>
                                                        {/* <p className='text-muted'>Cung cấp các thông tin về nhân sự, để giúp việc quản lý được thực hiện tốt hơn</p> */}
                                                    </div>
                                                </div>

                                                <div className="my-n3" id='onboarding-setup'>
                                                    <div className="form-group">
                                                        <label>Tiêu đề: </label>
                                                        <input className="form-control required" id='onboarding-name-edit' data=''/>                                  
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Thứ tự: </label>
                                                        <input className="form-control required" id='onboarding-order-edit' data=''/>                                  
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Loại: </label>
                                                        <span className='hide required' id='onboarding-type-selected-edit' data=''></span>
                                                        <Select
                                                            className='form-control' 
                                                            options={[{title:'Tự động hoàn thành',ID:1},{title:'Xác nhận', ID: 2}]} 
                                                            labelField= 'title'
                                                            valueField='ID'
                                                            dropdownHandle='false'
                                                            searchable='false'
                                                            onChange={(valSelected) => {
                                                                console.log('seleted: ',valSelected)
                                                                $('#onboarding-type-selected-edit').attr('data',valSelected[0].ID)
                                                                if (valSelected[0].ID === 2) $(`#form-value-action-edit`).hide()
                                                                else $(`#form-value-action-edit`).show()
                                                            }}
                                                            onDropdownOpen={()=>{
                                                                console.log('open dropdown')
                                                                $('.react-dropdown-select-dropdown').css({'width': '100%'})
                                                            }}
                                                            />   
                                                    </div>

                                                    <div className="form-group" id='form-value-action'>
                                                        <label>Di chuyển đến đường link: </label>
                                                        <input className="form-control required" id='onboarding-valueAction-edit' data='-'/>                                  
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Nhóm: </label>
                                                        <span className='hide required' id='onboarding-collection-selected-edit' data=''></span>
                                                        <Select
                                                            className='form-control' 
                                                            options={[
                                                                {collection_name:'HỆ THỐNG CABINFOOD',collection:1},
                                                                {collection_name:'KÊNH BÁN HÀNG',collection:2},
                                                                {collection_name:'QUY ĐỊNH',collection:3},
                                                                {collection_name:'QUY TRÌNH',collection:4},
                                                            ]} 
                                                            labelField= 'collection_name'
                                                            valueField='collection'
                                                            dropdownHandle='false'
                                                            searchable='false'
                                                            onChange={(valSelected) => {
                                                                console.log('seleted: ',valSelected)
                                                                $('#onboarding-collection-selected-edit').attr('data',valSelected[0].collection)
                                                                
                                                                if (valSelected[0].ID === 2) $(`#form-value-action-edit`).hide()
                                                                else $(`#form-value-action-edit`).show()
                                                            }}
                                                            onDropdownOpen={()=>{
                                                                console.log('open dropdown')
                                                                $('.react-dropdown-select-dropdown').css({'width': '100%'})
                                                            }}
                                                        />   
                                                    </div>
                                                </div>
                                                <hr className="my-5" />   
                                                <button className="btn btn-lg btn-block btn-primary mb-3" id="update-action">Lưu</button>
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
