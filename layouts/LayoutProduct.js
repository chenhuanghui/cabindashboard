import React from 'react';
import Head from 'next/head'
import NavBar from '../components/nav/nav_bar';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Link from 'next/link';
import $ from 'jquery'
import ModalProductEdit from '../components/modal/modal_product_edit';

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

export default class LayoutProduct extends React.Component {

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
        },'Brand_Product')
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
                    $('#modalProductEdit').removeClass('show');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    console.log('modal close finished');
                }
            }
            
        });

    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <Head>
                    {/* <script src="../assets/js/theme.min.js"></script> */}
                    <title> Product | CabinFood Business</title>
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
                                                <h1 className="header-title">Sản phẩm</h1>
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-12'>
                                    <ul className="nav nav-tabs mb-4">
                                        <li className="nav-item"><span className="nav-link active" href="#!">Tất cả</span></li>
                                        <li className="nav-item"><span className="nav-link" href="#!">Danh mục</span></li>
                                        <li className="nav-item"><span className="nav-link" href="#!">Kho</span></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-header-title">Danh sách sản phẩm</h4>
                                    <Link href='#'>
                                        <a className="btn btn-sm btn-white btn-modal" id='add-product'>Thêm sản phẩm</a> 
                                    </Link>                                    
                                </div>{/* end card header */}
                                
                                <div className="table-responsive mb-0">
                                    <table className="table table-sm table-nowrap card-table table-hover">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>TÊN</th>
                                                <th>TRẠNG THÁI</th>
                                                <th>DANH MỤC</th>
                                                <th>GIÁ BÁN</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody className="list">{/* table item */} 
                                            {data && data.length > 0 && data.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="col-auto">
                                                        { item.fields.productImage.length > 0
                                                        ? <div className="avatar"><img src={item.fields.productImage[0].url} alt={item.fields.productName} className="avatar-img rounded"/></div>
                                                        : ''
                                                        }
                                                        
                                                    </td>        
                                                    <td className="project-project">
                                                        <h4 className="font-weight-normal mb-1">{item.fields.productName}</h4>
                                                        <small className="text-muted">{item.fields.productDesc}</small>
                                                    </td>
                                                    <td>
                                                        { item.fields.productStatus.length > 0 && item.fields.productStatus[0] === true
                                                        ? <span className="badge badge-success">Đang kinh doanh</span>
                                                        : <span className="badge badge-danger">Ngừng bán</span>
                                                        }
                                                        
                                                    </td>
                                                    <td> 
                                                        { item.fields.productCategory.length > 0 
                                                        ? <h4 className="font-weight-normal mb-1">{item.fields.productCategory[0]}</h4>
                                                        : ''
                                                        }                                                        
                                                    </td>
                                                    <td>
                                                        { item.fields.productPrice4Sell.length > 0 
                                                        ? <h4 className="font-weight-normal mb-1">{item.fields.productPrice4Sell[0]}</h4>
                                                        : ''
                                                        }                                                        
                                                    </td>
                                                    <td className="text-right">
                                                        <div className="dropdown">
                                                            <span className="dropdown-ellipses dropdown-toggle"><i className="fe fe-more-vertical"></i></span>
                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                <a href="#" className="dropdown-item">Chỉnh sửa</a>
                                                                <a href="#" className="dropdown-item">Xóa</a>
                                                            </div>
                                                        </div>
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
                                                    <h1 className="header-title">Thêm sản phẩm</h1>
                                                    <p className='text-muted'>Set preferences that will be cookied for your live preview desmonstration.</p>                                    
                                                </div>
                                            </div>

                                            <div className="my-n3">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Tên sản phẩm</label>
                                                    <input className="form-control"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Mô tả</label>
                                                    <input className="form-control"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Giá bán</label>
                                                    <input className="form-control"/>
                                                </div>
                                                <div className="form-group">
                                                    <label for="addSaleOff">Giá khuyến mãi</label>
                                                    <input className="form-control"/>
                                                </div>
                                                <div className="form-group">
                                                    <label for="addCategory">Danh mục</label>
                                                    <input className="form-control"/>
                                                </div>
                                            </div>
                                                
                                            <div class="card">
                                                <div class="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" data-options="{&quot;url&quot;: &quot;https://&quot;}">
                                                    <ul class="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>
                                                    <div class="dz-default dz-message">
                                                        <button class="dz-button" type="button">Drop files here to upload</button>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <button className="btn btn-lg btn-block btn-primary mb-3">Lưu</button>
                                            
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