import React from 'react';
import Head from 'next/head'
import NavBar from '../components/nav/nav_bar';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Link from 'next/link';
import $, { data } from 'jquery'

import loadable from '@loadable/component';
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
            console.log('name:', $('#product-name').val())
            console.log('desc:', $('#product-desc').val())
            console.log('price:', $('#product-price').val())
            console.log('image-url:', $('#product-image').attr('image-url'))
            if ($('#product-name').val() === '' | $('#product-desc').val() === '' | $('#product-price').val() === '' | $('#product-image').attr('image-url') === '') return;

            createData({
                name: $('#product-name').val(),
                desc: $('#product-desc').val(),
                price4Sell: parseInt($('#product-price').val()),
                images:[{
                    url: $('#product-image').attr('image-url')
                }],
                status: true,
            },'Product')
            .then(result => {
                console.log('create res:', result)
                if (result) {
                    createData({
                        Brand: [cookies.brandID],
                        Product: [result.id]
                    },'Brand_Product')
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
                    <title> Product | CabinFood Business</title>
                </Head>

                <NavBar />
                {/* <ModalProductEdit /> */}

                <div className="main-content">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">

                            <div className="header mt-md-5">
                                <div className="header-body">
                                    
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h6 className="header-pretitle">QUẢN LÝ</h6>
                                            <h1 className="header-title">Sản phẩm</h1>
                                        </div>                                            
                                    </div> {/* row align-items-center */}

                                    <div className="row align-items-center">
                                        <div className="col">
                                            <ul className="nav nav-tabs nav-overflow header-tabs">
                                                <li className="nav-item"><a className="nav-link active" href="#!">Thông tin</a></li>
                                                <li className="nav-item"><a className="nav-link" href="#!">Nhãn hiệu</a></li>
                                                <li className="nav-item"><a className="nav-link" href="#!">Hóa đơn</a></li>
                                            </ul>            
                                        </div>
                                    </div> {/* row align-items-center */}
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
                                                        { item.fields.productImage && item.fields.productImage.length > 0
                                                        ? <div className="avatar"><img src={item.fields.productImage[0].url} alt={item.fields.productName} className="avatar-img rounded"/></div>
                                                        : ''
                                                        }
                                                        
                                                    </td>        
                                                    <td className="project-project">
                                                        <h4 className="font-weight-normal mb-1">{item.fields.productName}</h4>
                                                        <small className="text-muted">{item.fields.productDesc}</small>
                                                    </td>
                                                    <td>
                                                        { item.fields.productStatus && item.fields.productStatus.length > 0 && item.fields.productStatus[0] === true
                                                        ? <span className="badge badge-success">Đang kinh doanh</span>
                                                        : <span className="badge badge-danger">Ngừng bán</span>
                                                        }
                                                        
                                                    </td>
                                                    <td> 
                                                        { item.fields.productCategory && item.fields.productCategory.length > 0 
                                                        ? <h4 className="font-weight-normal mb-1">{item.fields.productCategory[0]}</h4>
                                                        : ''
                                                        }                                                        
                                                    </td>
                                                    <td>
                                                        { item.fields.productPrice4Sell && item.fields.productPrice4Sell.length > 0 
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
                                                    <input className="form-control" id='product-name'/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Mô tả</label>
                                                    <input className="form-control" id='product-desc'/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Giá bán</label>
                                                    <input className="form-control" id='product-price'/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="addSaleOff">Giá khuyến mãi</label>
                                                    <input className="form-control" id='product-promotion'/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="addCategory">Danh mục</label>
                                                    <input className="form-control" id='product-cat'/>
                                                </div>
                                            </div>
                                                
                                            <div className="card">
                                                <ReactFilestack
                                                    apikey={'A88NrCjOoTtq2X3RiYyvSz'}
                                                    customRender={({ onPick }) => (
                                                        <div className="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" id='product-image' image-url=''>
                                                            <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>
                                                            <div className="dz-default dz-message">
                                                                <button className="dz-button" type="button" onClick={onPick}>Chọn file</button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    onSuccess={(res) => {
                                                        console.log('filestack:',res)
                                                        $('#product-image').attr('image-url',res.filesUploaded[0].url);
                                                        $('.dz-preview').text(res.filesUploaded[0].filename);
                                                        console.log('add file url to element:', $('#product-image').attr('image-url'))
                                                    }}
                                                />
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