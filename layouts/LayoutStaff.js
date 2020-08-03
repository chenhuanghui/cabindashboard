import React from 'react';
import Head from 'next/head'
import NavBar from '../components/nav/nav_bar';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Link from 'next/link';
import $, { data } from 'jquery'

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
            data: []
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

        // ===============================================
        // FRONT-END ENGAGEMENT
        $(document).on('click', `.btn-modal` , function() {
            if (!$('body').hasClass('modal-open')) {
                $('#modalProductEdit').addClass('show');
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
                    $('#modalProductEdit').removeClass('show')
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

        $(document).on('click', '#product-action', function() {
            console.log('name:', $('#staff-name').val())
            console.log('salary:', $('#staff-salary').val())
            if ($('#staff-name').val() === '' | $('#staff-salary').val() === '') return;

            createData({
                name: $('#staff-name').val(),
                salary: parseInt($('#staff-salary').val()),
                status: true,
            },'Staff')
            .then(result => {
                console.log('create res:', result)
                if (result) {
                    createData({
                        Brand: [cookies.brandID],
                        Staff: [result.id],
                        timeStaffWorkingByCurrentMonth:0                        
                    },'Brand_Staff')
                }   
            })
            .finally( () => {
                $('#modalProductEdit').removeClass('show')
                $('body').removeClass('modal-open')
                $('.modal-backdrop').remove()
                console.log('modal close finished')
            })
        })

    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <Head>
                    {/* <script src="../assets/js/theme.min.js"></script> */}
                    <title> Staff | CabinFood Business</title>
                </Head>

                <NavBar />
                {/* <ModalProductEdit /> */}

                <div className="main-content">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">

                            <div className="header">
                                <div className="container-fluid">
                                    <div className="header-body">
                                        <div className="row align-items-end">
                                            <div className="col">
                                                <h6 className="header-pretitle">QUẢN LÝ</h6>
                                                <h1 className="header-title">Nhân sự</h1>
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-12'>
                                    <ul className="nav nav-tabs mb-4">
                                        <li className="nav-item"><span className="nav-link active" href="#!">Tất cả</span></li>
                                        <li className="nav-item"><span className="nav-link" href="#!">Xếp ca</span></li>
                                        <li className="nav-item"><span className="nav-link" href="#!">Xin nghỉ</span></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-header-title">Danh sách nhân sự</h4>
                                    <Link href='#'>
                                        <a className="btn btn-sm btn-white btn-modal" id='add-product'>Thêm nhân sự</a> 
                                    </Link>                                    
                                </div>{/* end card header */}
                                
                                <div className="table-responsive mb-0">
                                    <table className="table table-sm table-nowrap card-table table-hover">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>NHÂN VIÊN</th>
                                                <th>TRẠNG THÁI</th>
                                                <th>SỐ GIỜ</th>
                                                <th>LOẠI</th>
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
                                                        { item.fields.staffType && item.fields.staffType.length > 0 
                                                        ? <h4 className="mb-1">{item.fields.staffType[0]}</h4>
                                                        : ''
                                                        }                                                        
                                                    </td>
                                                    <td className="text-right">
                                                        { item.fields.staffSalary && item.fields.staffSalary.length > 0 
                                                        ? <h4 className="mb-1">{item.fields.staffSalary[0]}</h4>
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
                            <div className="modal fade fixed-right" id="modalProductEdit" tabIndex="-1">
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
                                                    <input className="form-control" id='staff-salary'/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Hình thức làm việc</label>
                                                    <input className="form-control" id='staff-type'/>
                                                </div>
                                                {/* <div className="form-group">
                                                    <label htmlFor="addSaleOff">Chi nhánh</label>
                                                    <input className="form-control" id='staff-brand'/>
                                                </div> */}
                                            </div>
                                                
                                            <div className="card">
                                                <div className="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" data-options="{&quot;url&quot;: &quot;https://&quot;}">
                                                    <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>
                                                    <div className="dz-default dz-message">
                                                        <button className="dz-button" type="button">Drop files here to upload</button>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <button className="btn btn-lg btn-block btn-primary mb-3" id="product-action">Lưu</button>
                                            
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