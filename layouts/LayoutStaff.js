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
        if (!cookies.isLoggedIn | !cookies.userID || !cookies.brandID) Router.push('/signin');
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
        
        // ***********************************************
        // _SHOW modal StaffCreate
        $(document).on('click', `.btn-modal` , function() {
            if (!$('body').hasClass('modal-open')) {
                $('#modalStaffCreate').addClass('show');
                $('body').addClass('modal-open').append('<div class="modal-backdrop fade show"></div>');
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
                    $('.modal-backdrop').remove()
                    console.log('modal close finished')
                }
            } 
        });
        
        /* action on per product item */
        $(document).on('click', '.dropdown-toggle', function(){
            // $(this).parent().find('.dropdown-menu-right').addClass('show')
        })

        $(document).on('click', '#staff-action', function() {
            console.log('name:', $('#staff-name').val())
            console.log('salary:', $('#staff-salary').val())
            console.log('image-url-staff:', $('#staff-image').attr('image-url'))

            // if ($('#staff-name').val() === '' | $('#staff-salary').val() === '' | $('#staff-image').attr('image-url') === '') return;
            if ($('#staff-name').val() === '') return;

            createData({
                name: $('#staff-name').val(),
                salary: parseInt($('#staff-salary').val().replace(/,/g,'')),
                photos:[{
                    url: $('#staff-image').attr('image-url')
                }],
                status: true,
            },'Staff')
            .then(staffRes => {
                console.log('staff data:', staffRes)
                if (staffRes) {
                    createData({
                        Brand: [cookies.brandID],
                        Staff: [staffRes.id],
                        timeStaffWorkingByCurrentMonth:0,
                        Cabin: [`${$('#cabin-assigned').attr('data')}`]                  
                    },'Brand_Staff')
                
                }
            })
            .finally( () => {
                $('#modalStaffCreate').removeClass('show')
                $('body').removeClass('modal-open')
                $('.modal-backdrop').remove()
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
                                                <th>TRẠNG THÁI</th>
                                                <th>SỐ GIỜ</th>
                                                <th>CHI NHÁNH</th>
                                                <th>LƯƠNG</th>
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

                            {/* MODAL EDIT PRODUCT */}
                            <div className="modal fade fixed-right" id="modalStaffCreate" tabIndex="-1">
                                <div className="modal-dialog modal-dialog-vertical">
                                    <div className="modal-content">
                                        <div className="modal-body">

                                            <div className="header">
                                                <div className="header-body">
                                                    <h1 className="header-title">Thêm nhân sự</h1>
                                                    <p className='text-muted'>Set preferences that will be cookied for your live preview desmonstration.</p>                                    
                                                </div>
                                            </div>

                                            <div className="my-n3">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Tên nhân sự</label>
                                                    <input className="form-control" id='staff-name'/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Mức lương</label>
                                                    <input className="form-control input-number" id='staff-salary'/>
                                                </div>
                                                <div className="card">
                                                    <label>Hình ảnh nhân sự</label>
                                                    <ReactFilestack
                                                        apikey={'A88NrCjOoTtq2X3RiYyvSz'}
                                                        customRender={({ onPick }) => (
                                                            <div className="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" id='staff-image' image-url=''>
                                                                <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>
                                                                <div className="dz-default dz-message">
                                                                    <button className="dz-button" type="button" onClick={onPick}>Chọn file</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                        onSuccess={(res) => {
                                                            console.log('filestack:',res)
                                                            $('#staff-image').attr('image-url',res.filesUploaded[0].url);
                                                            $('.dz-preview').text(res.filesUploaded[0].filename);
                                                            console.log('add file url to element:', $('#staff-image').attr('image-url'))
                                                        }}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Cabin làm việc</label>
                                                    <span className='hide required' id='cabin-assigned' data=''></span>
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
