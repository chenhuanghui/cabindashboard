import React from 'react';
import Head from 'next/head'
import NavBar from '../components/nav/nav_bar';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Link from 'next/link';
import $, { data } from 'jquery'
import loadable from '@loadable/component';
import Select from "react-dropdown-select"; 
import Flatpickr from "react-flatpickr";

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

function resetInput(paneID) {
    console.log('reseting')
    $('#modalStaffCreate input').each(function(index){
        console.log('clear ',index)
        $(this).attr('data','')
        $(this).val('')
    })
}

export default class LayoutStaff extends React.Component {
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
        if (!cookies.isLoggedIn | !cookies.userID | !cookies.brandID | !cookies.role) Router.push('/signin');
        console.log('current brandID:', cookies.brandID);
        
        // ===============================================
        // RETRIEVE DATA FROM AIRTABLE

        retrieveData({
            filterByFormula: `Brand = "${cookies.brandID}"`,
        },'Brand_Staff')
        .then(result => {
            console.log('brand_staff:', result);
            currentComponent.setState({data:result})
        })

        // Retrieve Cabin belong to Brand
        retrieveData({filterByFormula: `BrandID = "${cookies.brandID}"`},'Brand_Cabin')
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
        
        $('input, textarea').keyup(function(event) {
            // skip for arrow keys
            if(event.which >= 37 && event.which <= 40) return;
            $(this).attr('data',$(this).val())
        });

        // ***********************************************
        // _SHOW modal StaffCreate
        $(document).on('click', `.btn-modal` , function() {
            if (!$('body').hasClass('modal-open')) {
                $('body').addClass('modal-open')
                $('#modalStaffCreate').addClass('show')
                $('.modal-backdrop').show()
                resetInput('#modalStaffCreate')

                console.log('open modal create staff.');

            } else console.log('modal was opened before.');
        });

        // ***********************************************
        // _HIDE modal StaffCreate        
        $(document).on('click', function() {
            if ( 
                $('.modal-body').has(event.target).length == 0 //checks if descendants of modal was clicked
                &&
                $('.modal-body').is(event.target) //checks if the modal itself was clicked
            ){ console.log('clicked inside');} 
            else {
                if ($(event.target).hasClass('modal')) {
                    $('#modalStaffCreate').removeClass('show')
                    $('body').removeClass('modal-open')
                    $('.modal-backdrop').hide()
                    console.log('modal close finished')
                }
            } 
        });
        
        /* action on per product item */
        $(document).on('click', '.dropdown-toggle', function(){
            // $(this).parent().find('.dropdown-menu-right').addClass('show')
        })

        $(document).on('click', '#staff-action', function() {            
            // checkvalid .required form
            if(!checkValid('#modalStaffCreate')) {
                $('.spinner-grow').remove();
                return;
            }

            $(this).append(`<div class="spinner-grow spinner-grow-sm" role="status"><span class="sr-only">Loading...</span></div>`)


            // 1. CREATE STAFF ON DATABASE
            createData({
                name: $('#staff-name').attr('data'),
                // salary: parseInt($('#staff-salary').attr('data').replace(/,/g,'')),
                personalID : $('#staff-personal-id').attr('data'),
                DOB: $('#DOB-data').attr('data'),
                idPhotoFront:[{url: $('#staff-id-front').attr('data')}],
                idPhotoBack:[{url: $('#staff-id-back').attr('data')}],
                status: true,
            },'Staff')
            .then(staffRes => {
                console.log('staff data:', staffRes)
                if (staffRes) {
                    // 2. CREATE BRAND_STAFF LINKKING
                    createData({
                        Brand: [cookies.brandID],
                        Staff: [staffRes.id],
                        timeStaffWorkingByCurrentMonth:0,
                        Cabin: [`${$('#cabin-assigned').attr('data')}`]                  
                    },'Brand_Staff')
                    .then(brandStaffRes => {
                        // 4. ADD RECORD TO STATE VARIABLE
                        var temp = currentComponent.state.data
                        temp.push(brandStaffRes)
                        currentComponent.setState({data:temp})
                    })              
                    
                    // 3. ADD TO STAFFLIST ON BRAND_CABIN
                    retrieveData({
                        filterByFormula: `ID = "${$('#cabin-assigned').attr('brand-cabin')}"`,
                    },'Brand_Cabin')
                    .then( brandCabinRes => {
                        console.log('brand_cabin:', brandCabinRes)
                        
                        var tempStaffList = []                        
                        //in case have stafflist before, need to retrieve data first and add more record later
                        if(brandCabinRes[0].fields.StaffList) { 
                            var temp = []
                            temp = brandCabinRes[0].fields.StaffList
                            console.log('temp:', temp)
                        }                                                
                        // insert record staff was added recently to temp stafflist
                        tempStaffList.push(staffRes.id)                        
                        // do update data
                        updateData(brandCabinRes[0].id,{StaffList:tempStaffList},'Brand_Cabin')
                    })                    
                    
                }                
            })
            .finally( () => {
                $('#modalStaffCreate').removeClass('show')
                $('body').removeClass('modal-open')
                $('.modal-backdrop').hide()
                $('.spinner-grow').remove()
                console.log('modal close finished')                    
            })
        })

        $('.input-number').keyup(function(event) {
            // skip for arrow keys
            if(event.which >= 37 && event.which <= 40) return;
          
            // format number
            $(this).val(function(index, value) {
              return value
              .replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              ;
            });
            
            $(this).attr('data',$(this).val().replace(/,/g,''));
        });

    }

    render() {
        const { data, cabinOptionsData} = this.state;
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
                                            <h1 className="header-title">Nhân sự</h1>
                                        </div>                                            
                                    </div> {/* row align-items-center */}

                                    <div className="row align-items-center">
                                        <div className="col">
                                            <ul className="nav nav-tabs nav-overflow header-tabs">
                                                <li className="nav-item"><a className="nav-link active" href="#!">Tất cả</a></li>
                                                <li className="nav-item"><a className="nav-link" href="#!">Xếp ca</a></li>
                                                <li className="nav-item"><a className="nav-link" href="#!">Xin nghỉ</a></li>
                                            </ul>            
                                        </div>
                                    </div> {/* row align-items-center */}
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-header-title">Danh sách nhân sự</h4>
                                    <button className="btn btn-sm btn-white btn-modal" id='add-product'>Thêm nhân sự</button> 
                                </div>{/* end card header */}
                                
                                <div className="table-responsive mb-0">
                                    <table className="table table-sm table-nowrap card-table table-hover">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>NHÂN VIÊN</th>
                                                <th>MÃ NHÂN VIÊN</th>
                                                <th>TRẠNG THÁI</th>
                                                <th>SỐ GIỜ</th>
                                                <th>CHI NHÁNH</th>
                                            </tr>
                                        </thead>
                                        <tbody className="list">{/* table item */} 
                                            {data && data.length > 0 && data.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="col-auto">
                                                        { item.fields.staffPhoto && item.fields.staffPhoto.length > 0
                                                        ? <div className="avatar avatar-xs"><img src={item.fields.staffPhoto[0].url} alt={item.fields.staffName} className="avatar-img rounded-circle"/></div>
                                                        : ''
                                                        }
                                                        
                                                    </td>        
                                                    <td className="project-project">
                                                        <h4 className="mb-1">{item.fields.staffName}</h4>
                                                    </td>
                                                    <td className="project-project">
                                                        <span className="mb-1">{item.fields.staffID}</span>
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
                                                    {/* <td className="text-right">
                                                        { item.fields.staffSalary && item.fields.staffSalary.length > 0 
                                                        ? <span className="mb-1">{item.fields.staffSalary[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                                        : ''
                                                        }                                                        
                                                    </td> */}
                                                </tr>        
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* MODAL STAFF CREATE */}
                            <div className="modal fade fixed-right" id="modalStaffCreate" tabIndex="-1">
                                <div className="modal-dialog modal-dialog-vertical">
                                    <div className="modal-content">
                                        <div className="modal-body">

                                            <div className="header">
                                                <div className="header-body">
                                                    <h1 className="header-title">Thêm nhân sự</h1>
                                                    <p className='text-muted'>Cung cấp các thông tin về nhân sự, để giúp việc quản lý được thực hiện tốt hơn</p>
                                                </div>
                                            </div>

                                            <div className="my-n3">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Tên nhân sự</label>
                                                    <input className="form-control required" id='staff-name' data=''/>
                                                </div>
                                                <div className='form-group'>
                                                    <label>Ngày sinh (*)</label>
                                                    <span className='hide required' data='' id='DOB'></span>
                                                    <Flatpickr className="form-control" id='DOB' data=''
                                                        onChange={date => {
                                                            console.log('new date:', date)
                                                            $('#DOB').attr('data',date)
                                                        }}
                                                    />
                                                </div>

                                                {/* <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Mức lương</label>
                                                    <input className="form-control input-number required" id='staff-salary' data=''/>
                                                </div> */}

                                                <div className="form-group">
                                                    <label>Cabin làm việc</label>
                                                    <span className='hide required' id='cabin-assigned' data='' brand-cabin=''></span>
                                                    <Select 
                                                        className='form-control' 
                                                        options={cabinOptionsData} 
                                                        labelField= 'cabinName'
                                                        valueField='ID'
                                                        dropdownHandle='false'
                                                        searchable='false'
                                                        onChange={(valSelected) => {
                                                            console.log('cabin seleted: ',valSelected)
                                                            $('#cabin-assigned').attr('data',valSelected[0].CabinID)
                                                            $('#cabin-assigned').attr('brand-cabin',valSelected[0].ID)
                                                        }}
                                                        onDropdownOpen={()=>{
                                                            console.log('open dropdown')
                                                            $('.react-dropdown-select-dropdown').css({'width': '100%'})
                                                        }}
                                                        />
                                                    </div>                                                
                                                </div>                                            
                                                
                                                <hr className="my-5" />   
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">CMND/CCCD/Hộ chiếu</label>
                                                    <input className="form-control required" id='staff-personal-id' data=''/>
                                                </div>
                                                <div className='form-group'>
                                                    <label>Ngày cấp (*)</label>
                                                    <span className='hide required' data='' id='issued-data'></span>
                                                    <Flatpickr className="form-control" id='issued' data=''
                                                        onChange={date => {
                                                            console.log('new date:', date)
                                                            $('#issued-data').attr('data',date)
                                                        }}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label>CMND mặt trước</label>
                                                    <ReactFilestack
                                                        apikey={'A88NrCjOoTtq2X3RiYyvSz'}
                                                        customRender={({ onPick }) => (
                                                            <div className="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" id='staff-id-front' data=''>
                                                                <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>
                                                                <div className="dz-default dz-message">
                                                                    <button className="dz-button" type="button" onClick={onPick}>Chọn file</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                        onSuccess={(res) => {
                                                            console.log('filestack:',res)
                                                            $('#staff-id-front').attr('data',res.filesUploaded[0].url);
                                                            $('#staff-id-front .dz-preview').html(
                                                                `<li class="list-group-item dz-processing dz-image-preview">
                                                                    <div class="row align-items-center thumbnail-preview-dropzone" style="flex-wrap: initial !important; overflow:hidden">
                                                                        <div class="col-auto">
                                                                            <div class="avatar">
                                                                            <img class="avatar-img rounded" src="${res.filesUploaded[0].url}"/>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col ml-n3">
                                                                            <h4 class="mb-1" data-dz-name="">${res.filesUploaded[0].filename}</h4>
                                                                            <small class="text-muted" data-dz-size=""><strong>53.2</strong> KB</small>
                                                                        </div>
                                                                        <div class="col-auto"></div>
                                                                    </div>
                                                                </li>`
                                                            );
                                                            console.log('add file url to element:', $('#staff-id-front').attr('data'))
                                                        }}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label>CMND mặt sau</label>
                                                    <ReactFilestack
                                                        apikey={'A88NrCjOoTtq2X3RiYyvSz'}
                                                        customRender={({ onPick }) => (
                                                            <div className="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" id='staff-id-back' data=''>
                                                                <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush">

                                                                </ul>
                                                                <div className="dz-default dz-message">
                                                                    <button className="dz-button" type="button" onClick={onPick}>Chọn file</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                        onSuccess={(res) => {
                                                            console.log('filestack:',res)
                                                            $('#staff-id-back').attr('data',res.filesUploaded[0].url);
                                                            $('#staff-id-back .dz-preview').html(
                                                                `<li class="list-group-item dz-processing dz-image-preview">
                                                                    <div class="row align-items-center thumbnail-preview-dropzone" style="flex-wrap: initial !important; overflow:hidden">
                                                                        <div class="col-auto">
                                                                            <div class="avatar">
                                                                            <img class="avatar-img rounded" src="${res.filesUploaded[0].url}"/>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col ml-n3">
                                                                            <h4 class="mb-1" data-dz-name="">${res.filesUploaded[0].filename}</h4>
                                                                            <small class="text-muted" data-dz-size=""><strong>53.2</strong> KB</small>
                                                                        </div>
                                                                        <div class="col-auto"></div>
                                                                    </div>
                                                                </li>`
                                                                )
                                                            console.log('add file url to element:', $('#staff-id-back').attr('data'))
                                                        }}
                                                    />                                                    
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
                    .thumbnail-preview-dropzone {
                        flex-wrap: none !important;
                    }
                `}</style>
            </div>
        )
    }
}
