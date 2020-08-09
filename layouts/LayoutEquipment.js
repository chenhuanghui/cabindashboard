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
            equipList: [],
            cabinOptionsData: []
        }
    }

    componentDidMount() {
        // INIT VARIABLE
        const cookies = parseCookies();
        let currentComponent = this
        var isAction = false;
        
        // ===============================================
        // CHECKING AUTHENTICATE
        if (!cookies.isLoggedIn | !cookies.userID || !cookies.brandID) Router.push('/signin');
        console.log('current brandID:', cookies.brandID);
        
        // ===============================================
        // RETRIEVE DATA FROM AIRTABLE

        retrieveData({
            filterByFormula: `Brand = "${cookies.brandID}"`,
        },'Brand_Equipment')
        .then(result => {
            console.log('brand_equip:', result);
            var temp=[];
            for(var i=0; i<result.length; i++) {
                temp.push(result[i].fields)
            }
            currentComponent.setState({equipList:temp})
            console.log('brand_equip:', currentComponent.state.equipList);
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
        $(document).on('click', `.btn-modal` , function() {
            if (!$('body').hasClass('modal-open')) {
                $('#modalEquipment').addClass('show');
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
                    $('#modalEquipment').removeClass('show')
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

        $(document).on('click', '#asset-action', function() {
            if (isAction ) return;
            console.log('name:', $('#equip-name').val())
            console.log('desc:', $('#equip-desc').val())
            console.log('voltage:', $('#equip-voltage').val())
            console.log('cabin:', $('#cabin-assigned').attr('data'))

            // if ($('#staff-name').val() === '' | $('#staff-salary').val() === '' | $('#staff-image').attr('image-url') === '') return;
            if ($('#equip-name').val() === '' | $('#cabin-assigned').attr('data') === '') return;
            
            isAction = true;
            createData({
                name: $('#equip-name').val(),
                desc: $('#equip-desc').val(),
                voltage: $('#equip-voltage').val(),
                photos:[{
                    url: $('#equip-image').attr('image-url')
                }]
            },'Equipment')
            .then(equipRes => {
                console.log('equip data:', equipRes)
                if (equipRes) {
                    createData({
                        Brand: [cookies.brandID],
                        Equipment:[equipRes.id],
                        Cabin: [`${$('#cabin-assigned').attr('data')}`],
                        status: "1"
                    },'Brand_Equipment')                
                }
            })
            .finally( () => {
                $('#modalEquipment').removeClass('show')
                $('body').removeClass('modal-open')
                $('.modal-backdrop').remove()
                console.log('modal close finished')
                isAction = false;
            })
        })

    }

    render() {
        const { equipList, cabinOptionsData } = this.state;
        return (
            <div>
                <Head>
                    {/* <script src="../assets/js/theme.min.js"></script> */}
                    <title> Equiment | CabinFood Business</title>
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
                                            <h1 className="header-title">Thiết bị</h1>
                                        </div>                                            
                                    </div> {/* row align-items-center */}

                                    <div className="row align-items-center">
                                        <div className="col">
                                            <ul className="nav nav-tabs nav-overflow header-tabs">
                                                <li className="nav-item"><a className="nav-link active" href="#!">Đăng ký</a></li>
                                                <li className="nav-item"><a className="nav-link" href="#!">Đang đợi chuyển</a></li>
                                                <li className="nav-item"><a className="nav-link" href="#!">Đã vào trạm</a></li>
                                            </ul>            
                                        </div>
                                    </div>  
                                    {/* row align-items-center */}
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-header-title">Danh sách thiết bị</h4>
                                    <button className="btn btn-sm btn-white btn-modal" id='add-product'>Thêm thiết bị</button>
                                </div>{/* end card header */}
                                
                                <div className="table-responsive mb-0">
                                    <table className="table table-sm table-nowrap card-table table-hover">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>THIẾT BỊ</th>
                                                <th>MÔ TẢ</th>
                                                <th>ĐIỆN ÁP</th>
                                                <th>CABIN</th>
                                            </tr>
                                        </thead>
                                        <tbody className="list">{/* table item */} 
                                        { equipList && equipList.length >0 && equipList.map((item, index) => (
                                            <tr key={index}>
                                                <td className="col-auto">
                                                    {item.equipPhotos && item.equipPhotos.length > 0
                                                    ? <div className="avatar avatar-xs"><img src={item.equipPhotos[0].url} alt='....' className="avatar-img rounded-circle"/></div>
                                                    : <div className="avatar avatar-xs"><img src='../assets/img/logo2.jpg' alt='....' className="avatar-img rounded-circle"/></div>
                                                    }
                                                </td>        
                                                <td><h4 className="mb-1">{item.equipName}</h4></td>
                                                <td> <span className="mb-1">{item.equipDesc}</span></td>
                                                <td> <span className="mb-1">{item.equipVoltage}</span></td>
                                                <td><span className="badge badge-success">{item.cabinName}</span></td>
                                            </tr>        
                                        ))

                                        }    
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* MODAL EDIT PRODUCT */}
                            <div className="modal fade fixed-right" id="modalEquipment" tabIndex="-1">
                                <div className="modal-dialog modal-dialog-vertical">
                                    <div className="modal-content">
                                        <div className="modal-body">

                                            <div className="header">
                                                <div className="header-body">
                                                    <h1 className="header-title">Thêm thiết bị</h1>
                                                    <p className='text-muted'>Cung cấp các thông tin về thiết bị để chủ động và có được sử hỗ trợ tốt nhất.</p>
                                                </div>
                                            </div>

                                            <div className="my-n3">
                                                <div className="form-group">
                                                    <label>Tên thiết bị</label>
                                                    <input className="form-control" id='equip-name' data=''/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Mô tả</label>
                                                    <input className="form-control" id='equip-desc' data=''/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Điện áp (V)</label>
                                                    <input className="form-control" id='equip-voltage' data=''/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Cabin</label>
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
                                                <div className="form-group">
                                                    <label>Hình ảnh thiết bị</label>
                                                    <ReactFilestack
                                                        apikey={'A88NrCjOoTtq2X3RiYyvSz'}
                                                        customRender={({ onPick }) => (
                                                            <div className="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" id='equip-image' image-url=''>
                                                                <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>
                                                                <div className="dz-default dz-message">
                                                                    <button className="dz-button" type="button" onClick={onPick}>Chọn file</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                        onSuccess={(res) => {
                                                            console.log('filestack:',res)
                                                            $('#equip-image').attr('image-url',res.filesUploaded[0].url);
                                                            $('.dz-preview').text(res.filesUploaded[0].filename);
                                                            console.log('add file url to element:', $('#equip-image').attr('image-url'))
                                                        }}
                                                    />
                                                </div>
                                            </div>                                            
                                            <hr className="my-5" />   
                                            <button className="btn btn-lg btn-block btn-primary mb-3" id="asset-action">Lưu</button>
                                            
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
