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
// MAIN COMPONENT
export default class LayoutProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isBusy : false,
        }
    }

    componentDidMount() {        
        // ===============================================
        // CHECKING AUTHENTICATE
        const cookies = parseCookies();
        if (!cookies.isLoggedIn | !cookies.userID || !cookies.brandID) Router.push('/signin');
        console.log('current brandID:', cookies.brandID);
        
        // ===============================================        
        // INIT VARIABLE
        let currentComponent = this

        // RETRIEVE DATA FROM AIRTABLE
        // _ GET BRAND_PRODUCT RECORD BY BRAND ID
        retrieveData({
            filterByFormula: `Brand = "${cookies.brandID}"`,
        },'Brand_Product')
        .then(result => {
            console.log('brand_product:', result);
            currentComponent.setState({data:result})
        })

        // ===============================================
        // FRONT-END ENGAGEMENT
        // _AUTO SYNC INPUT, TEXTAREA VAL TO DATA PROPERTY
        $('input, textarea').keyup(function(event) {
            // skip for arrow keys
            if(event.which >= 37 && event.which <= 40) return;
            $(this).attr('data',$(this).val())
        });

        // _SHOW MODAL WHEN WAS CLICKED
        $(document).on('click', `.btn-modal` , function() {
            if (!$('body').hasClass('modal-open')) {
                $('.modal-backdrop').show()
                $('#modalProductCreate').addClass('show')                
            }
            console.log('modal create opened');
        });

        // _EDIT PRODUCT ON MODAL
        $(document).on('click', `.item-row` , function() {
            // show modal
            if (!$('body').hasClass('modal-open')) {
                $('#modalProductEdit').addClass('show');
                $('.modal-backdrop').show()
            }

            //load data to modal
            $('#modalProductEdit').attr('data',$(this).attr('data'))            // record product id
            $('#modalProductEdit').attr('item-index',$(this).attr('item-index'))            // record product id
            
            
            $('#product-name-edit').val($(this).find('.item-name').text())      // product name
            $('#product-name-edit').attr('data',($(this).find('.item-name').text()))      // product name
            
            $('#product-desc-edit').val($(this).find('.item-desc').text())      // product desc
            $('#product-desc-edit').attr('data',$(this).find('.item-desc').text())      // product desc
            
            $('#product-price-edit').val($(this).find('.item-price').attr('data').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))    // product price
            $('#product-price-edit').attr('data',$(this).find('.item-price').attr('data'))    // product price

            $('#product-image-preview').attr('data',$(this).find('.product-image').attr('data'))    // product image
            $('#cur-product-image').attr('src',$(this).find('.product-image').attr('data'))
            

            // if( $(`.item-status`).attr(data) === `true`) $('#product-status-edit').prop('checked', true)
            if ($(this).find('.item-status').attr('data') === `true`) $('#product-status-edit').prop('checked', true)
            
        });
        
        // _CLOSED MODAL WHEN CLICK OUTSIDE
        $(document).on('click', function() {
            if ( 
                $('.modal-body').has(event.target).length == 0 //checks if descendants of modal was clicked
                &&
                $('.modal-body').is(event.target) //checks if the modal itself was clicked
            ){ console.log('clicked inside');} 
            else {
                if ($(event.target).hasClass('modal')) {
                    $('#modalProductCreate').removeClass('show')
                    $('#modalProductEdit').removeClass('show')
                    $('body').removeClass('modal-open')
                    $('.modal-backdrop').hide()
                    $('.spinner-grow').remove()
                    console.log('modal close finished')
                }
            } 
        });        
        
        // _CREATE PRODUCT
        $(document).on('click', '#product-create', function() {
            if (currentComponent.state.isBusy === true) {
                alert('Have a process was handling. Please wait for a moment.')
                return;
            }

            // add loading spinner icon
            $(this).append(`<div class="spinner-grow spinner-grow-sm" role="status"><span class="sr-only">Loading...</span></div>`)            
            
            // checkvalid .required form
            if(!checkValid('#modalProductCreate')) {
                $('.spinner-grow').remove();
                return;
            }

            // If all input required valid
            // Create Product -> Link to Brand_Product -> Insert new success record to table
            currentComponent.setState({isBusy: true})
            createData({
                name: $('#product-name').attr('data'),
                desc: $('#product-desc').attr('data'),
                price4Sell: parseInt($('#product-price').attr('data')),
                images:[{
                    url: $('#product-image').attr('data')
                }],
                status: true,
            },'Product')
            .then(result => {
                if (result) {
                    createData({
                        Brand: [cookies.brandID],
                        Product: [result.id]
                    },'Brand_Product')
                    .then(brandProductRes => {
                        console.log(`brand product data:`, brandProductRes)
                        // _UPDATE STATE
                        var temp = currentComponent.state.data
                        temp.push(brandProductRes)
                        currentComponent.setState({data:temp})
                    })
                    .finally( () => {
                        $('#modalProductCreate').removeClass('show')
                        $('body').removeClass('modal-open')
                        $('.modal-backdrop').hide()
                        $('.spinner-grow').remove()
                        console.log('modal close finished')
                        // location.reload();
                        currentComponent.setState({isBusy: false})
                    })
                }   
            })
        })

        $(document).on('click', '#product-update', function() {
            if (currentComponent.state.isBusy === true) {
                alert('Have a process was handling. Please wait for a moment.')
                return;
            }

            // add loading spinner icon
            $(this).append(`<div class="spinner-grow spinner-grow-sm" role="status"><span class="sr-only">Loading...</span></div>`)            
            
            // checkvalid .required form
            if(!checkValid('#modalProductEdit')) {
                $('.spinner-grow').remove();
                return;
            }
            var imageUpdateUrl = $('#product-image-preview').attr('data')
            console.log('image update 2: ', imageUpdateUrl)

            console.log('image update 1: ', $('#product-image-preview').attr('data'))
           
            currentComponent.setState({isBusy: true})
            var productStatusUpdate = !$('#product-status-edit:checked').val() ? false : true
            

            updateData($('#modalProductEdit').attr('data'), {
                name: $('#product-name-edit').attr('data'),
                desc: $('#product-desc-edit').attr('data'),
                price4Sell: parseInt($('#product-price-edit').attr('data')),
                images:[{
                    url: imageUpdateUrl
                }],
                status: productStatusUpdate
            },`Product`)
            .then( res=> {
                console.log('res product update: ', res)
                
                // $('#modalProductEdit').removeClass('show')
                $('body').removeClass('modal-open')
                $('.modal-backdrop').hide()
                $('.spinner-grow').remove()
                console.log('modal close update finished')
                // location.reload();
                currentComponent.setState({isBusy: false})
            })
            .finally(() => {console.log('update finished')})
        })
        
        // AUTO INSERT COMMAS ON EACH THOUSAND
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
        
            // saving true value on data property
            $(this).attr('data',$(this).val().replace(/,/g,''));
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
                    <div className="container-fluid">
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
                                                    <li className="nav-item"><a className="nav-link active" href="#!">Sản phẩm</a></li>
                                                    <li className="nav-item"><a className="nav-link" href="#!">Danh mục</a></li>
                                                    <li className="nav-item"><a className="nav-link" href="#!">Kho</a></li>
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
                                                    <th scope="col" className='col-auto'></th>
                                                    <th scope="col" >TÊN</th>
                                                    <th scope="col" >GIÁ BÁN</th>
                                                    <th scope="col">MÔ TẢ</th>                                                    
                                                </tr>
                                            </thead>
                                            <tbody className="list">{/* table item */} 
                                                {data && data.length > 0 && data.map((item, index) => (
                                                    <tr key={index} className='item-row' data={item.fields.Product} item-index={index}>
                                                        <td className='col-auto' scope="row">
                                                            { item.fields.productImage && item.fields.productImage.length > 0
                                                            ? <div className="avatar"><img src={item.fields.productImage[0].url} alt={item.fields.productName} className="avatar-img rounded product-image" data={item.fields.productImage[0].url} /></div>
                                                            : ''
                                                            }                                                            
                                                        </td>        
                                                        <td>
                                                            <h4 className="font-weight-normal mb-1 item-name">{item.fields.productName}</h4>
                                                            { item.fields.productStatus && item.fields.productStatus.length > 0 && item.fields.productStatus[0] === true
                                                            ? <span className="badge badge-success item-status" data='true'>Đang kinh doanh</span>
                                                            : <span className="badge badge-danger item-status" data='false'> Ngừng kinh doanh</span>
                                                            }
                                                        </td>
                                                        <td>
                                                            { item.fields.productPrice4Sell && item.fields.productPrice4Sell.length > 0 
                                                            ? <h4 className="font-weight-normal mb-1 item-price" data={item.fields.productPrice4Sell[0]}>{item.fields.productPrice4Sell[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                                                            : ''
                                                            }                                                            
                                                        </td>
                                                        <td>
                                                            <small className="text-muted item-desc">{item.fields.productDesc}</small>
                                                        </td>
                                                    </tr>        
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* MODAL CREATE PRODUCT */}
                                <div className="modal fade fixed-right" id="modalProductCreate" tabIndex="-1">
                                    <div className="modal-dialog modal-dialog-vertical">
                                        <div className="modal-content">
                                            <div className="modal-body">

                                                <div className="header">
                                                    <div className="header-body">
                                                        <h1 className="header-title">Thêm sản phẩm</h1>
                                                        <p className='text-muted'>Cập nhật các thông tin về sản phẩm vào hệ thống quản lý.</p>
                                                    </div>
                                                </div>

                                                <div className="my-n3">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Tên sản phẩm</label>
                                                        <input className="form-control required" id='product-name' data=''/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Mô tả</label>
                                                        <input className="form-control required" id='product-desc' data=''/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Giá bán</label>
                                                        <input className="form-control input-number required" id='product-price' data=''/>
                                                    </div>
                                                </div>
                                                    
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Hình ảnh sản phẩm:</label>
                                                    <ReactFilestack
                                                        apikey={'A88NrCjOoTtq2X3RiYyvSz'}
                                                        customRender={({ onPick }) => (
                                                            <div className="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" id='product-image' data=''>
                                                                <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>
                                                                <div className="dz-default dz-message">
                                                                    <button className="dz-button" type="button" onClick={onPick}>Chọn file</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                        onSuccess={(res) => {
                                                            console.log('filestack:',res)
                                                            $('#product-image').attr('data',res.filesUploaded[0].url);
                                                            $('.dz-preview').text(res.filesUploaded[0].filename);
                                                            console.log('add file url to element:', $('#product-image').attr('data'))
                                                        }}
                                                    />
                                                </div>
                                                
                                                <hr className="my-5" />   
                                                <button className="btn btn-lg btn-block btn-primary mb-3" id="product-create">Lưu</button>                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* MODAL EDIT PRODUCT */}
                                <div className="modal fade fixed-right" id="modalProductEdit" tabIndex="-1" data='' item-index=''>
                                    <div className="modal-dialog modal-dialog-vertical">
                                        <div className="modal-content">
                                            <div className="modal-body">

                                                <div className="header">
                                                    <div className="header-body">
                                                        <h1 className="header-title">Chỉnh sửa sản phẩm</h1>
                                                        <p className='text-muted'>Cập nhật các thông tin về sản phẩm vào hệ thống quản lý.</p>
                                                    </div>
                                                </div>

                                                <div className="my-n3">
                                                    <div className="form-group">
                                                        <label>Tên sản phẩm</label>
                                                        <input className="form-control required" id='product-name-edit' data=''/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Mô tả</label>
                                                        {/* <input className="form-control required" id='product-desc-edit' data=''/> */}
                                                        <textarea className="form-control required" data-toggle="autosize" rows="5" placeholder="Try typing something..." id='product-desc-edit' data=''></textarea>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Giá bán</label>
                                                        <input className="form-control input-number required" id='product-price-edit' data=''/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Tình trạng kinh doanh</label>
                                                        <input type="checkbox" className='ml-3' id='product-status-edit' data=''/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Hình ảnh sản phẩm</label>
                                                        <ReactFilestack
                                                            apikey={'A88NrCjOoTtq2X3RiYyvSz'}
                                                            customRender={({ onPick }) => (
                                                                <div className="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" id='product-image-preview' data=''>
                                                                    <button type="button" className="btn btn-outline-primary mb-2" onClick={onPick}>Chọn ảnh mới</button>
                                                                    <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush">
                                                                        <li className="list-group-item dz-processing dz-image-preview">
                                                                            <div className="row align-items-center thumbnail-preview-dropzone">
                                                                                <div className="col-auto">
                                                                                    <div className="avatar"><img className="avatar-img rounded product-image" id='cur-product-image' src="https://dl.airtable.com/.attachments/61b42a68b3a175385e9610f7e80675a6/e4647d40/hQ5EQDRdT5WAYCROI0Ku"/></div>
                                                                                </div>
                                                                                <div className="col ml-n3">
                                                                                    <small className="text-muted" data-dz-size=""><strong>53.2</strong> KB</small>
                                                                                </div>
                                                                                <div className="col-auto"></div>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                    {/* <div className="dz-default dz-message"> */}
                                                                        
                                                                    {/* </div> */}
                                                                </div>
                                                            )}
                                                            onSuccess={(res) => {
                                                                console.log('filestack:',res)
                                                                $('#product-image-preview').attr('data',res.filesUploaded[0].url);
                                                                $('#product-image-preview .dz-preview').html(
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
                                                                console.log('add file url to element:', $('#product-image-preview').attr('data'))
                                                            }}
                                                        />                                                    
                                                    </div>             
                                                </div>
                                                    
                                                <hr className="my-5" />                                  
                                                <button className="btn btn-lg btn-block btn-primary mb-3" id="product-update">Lưu</button>                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .item-row:hover{ cursor: pointer}
                `}</style>
            </div>
        )
    }
}