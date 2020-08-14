// ====================================
// REACT
import Head from 'next/head'
import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router'
import Link from 'next/link';

// ====================================
// COMPONENTS
import NavBar from '../components/nav/nav_bar';

// ====================================
// OTHERS LIBS
import $ from 'jquery'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { Line } from 'react-chartjs-2';
import Flatpickr from "react-flatpickr";
const AirtablePlus = require('airtable-plus');  

// ====================================
// INIT GLOBAL VARIABLES
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

async function updateData(rowID, data,tbName) {
    try {
      const res = await airtable.update(rowID, data,{tableName:tbName});
      return res
    } catch(e) {
      console.error(e);
    }
}

export default function LayoutCabinDetail () {
    const router = useRouter();
    const cookies = parseCookies();
    const [cabin, setCabin] = useState(null);
    const [staffList, setStaffList] = useState([]);
    const [cabinID, setCabinID] = useState(null);
    const [sellChannel, setSellChannel] = useState(null);
    const [electricData, setElectricData] = useState(null);
    const [chartOption, setChartOption] = useState(null);
    const [selectStatusOptionData, setSelectStatusOptionData] = useState([{title:'Chưa kết nối',value:false},{title:'Đã kết nối',value:true}])
    

    useEffect(() => {        
        // if not user --> redirect to Sign In page
        if(!cookies.userID | !cookies.isLoggedIn | !cookies.brandID | !cookies.role) {
            destroyCookie(userID)
            destroyCookie(isLoggedIn)
            destroyCookie(brandID)
            destroyCookie(role)
            Router.push('/signin')
        }
        
        // ===============================================
        setCabinID(router.query.id)
        console.log('router 1: ',router)
        console.log('router id 1: ',router.query.id)

        // when docID was assigned successful retrieve data from Contenful
        if(cabinID === router.query.id) {
            console.log('cabin_id: ',cabinID)
            console.log('brand_id: ',cookies.brandID)

            // _GET CABIN INFORMATION
            retrieveData({filterByFormula: `recID="${cabinID}"`},'Cabin')
            .then(cabinRes => {
                console.log('cabinRes: ', cabinRes)               
                if (cabinRes && cabinRes.length > 0) {
                    setCabin(cabinRes[0])
                    
                    // _GET STAFF LIST
                    retrieveData({filterByFormula: `AND(Brand = "${cookies.brandID}", CabinID="${cabinID}")`},'Brand_Staff')
                    .then(brandStaffRes => {
                        console.log('staffRes: ', brandStaffRes)
                        setStaffList(brandStaffRes)}
                    )

                    // GET SELL CHANNEL INFORMATION OF CURRENT CABIN BY ROUTER CABINS/[ID]   
                    // _ RETRIEVE ALL SELL CHANNEL
                    retrieveData({},'SellChannel')
                    .then(sellChannelRes => {
                        console.log('sellChannelRes: ',sellChannelRes)
                        
                        // _ RETRIEVE BRAND_CABIN DATA
                        retrieveData({filterByFormula: `AND(BrandID = "${cookies.brandID}", CabinRecID="${cabinID}")`},'Brand_Cabin')
                        .then(brandCabinRes => {
                            console.log('brandCabinRes: ', brandCabinRes)
                            
                            var sellChannelPromises = []
                            for(var i=0; i<sellChannelRes.length; i++) {
                                sellChannelPromises.push(
                                    // _ ADD QUERY ALL DATA SELLCHANNEL_BRAND_CABIN
                                    retrieveData({
                                        filterByFormula: `AND(Brand_Cabin="${brandCabinRes[0].id}",SellChannel="${sellChannelRes[i].id}")`
                                    },'SellChannel_Brand_Cabin')
                                )
                            }
                            
                            // _ RETRIEVE ALL DATA SELLCHANNEL_BRAND_CABIN
                            Promise.all(sellChannelPromises)
                            .then(result => {
                                console.log(result);
                                var temp = []
                                for(var i=0; i<result.length; i++) {
                                    temp.push(result[i][0])
                                }
                                setSellChannel(temp);
                            })
                        })
                    })

                    // FRONTEND ACTION
                    // _AUTO SYNC INPUT, TEXTAREA VAL TO DATA PROPERTY
                    $('input, textarea').keyup(function(event) {
                        // skip for arrow keys
                        if(event.which >= 37 && event.which <= 40) return;
                        $(this).attr('data',$(this).val())
                    });

                    // _ SHOW MODAL EDIT WHEN CLICK ITEM-ROW
                    $(document).on('click', `.item-row` , function() {
                        // IF NOT ADMIN OR SUPPER ADMIN NOT ALLOW TO UPDATE INFORMATION
                        if(cookies.role > 2) return;
            
                        // show modal
                        if (!$('body').hasClass('modal-open')) {
                            $('#modalSellChannelEdit').addClass('show');
                            $('.modal-backdrop').show()
                        }
            
                        //load data to modal
                        $('#modalSellChannelEdit').attr('data',$(this).attr('data'))        
                        $('#channel-name').val($(this).find('.sellChannelName').text())     
                        $('#channel-account').val($(this).find('.sellChannelAccount').text())
                        
                    });

                    // _HIDE MODAL EDIT WHEN CLICK OUTIDE
                    $(document).on('click', function() {
                        if ( 
                            $('.modal-body').has(event.target).length == 0 //checks if descendants of modal was clicked
                            &&
                            $('.modal-body').is(event.target) //checks if the modal itself was clicked
                        ){ console.log('clicked inside');} 
                        else {
                            if ($(event.target).hasClass('modal')) {
                                $('#modalSellChannelEdit').removeClass('show')
                                $('body').removeClass('modal-open')
                                $('.modal-backdrop').hide()
                                console.log('modal close finished')
                            }
                        } 
                    });

                    // _UPDATE CHANNEL INFORMATION
                    $(document).on('click', `#channel-update`,function() {

                        // IF NOT ADMIN OR SUPPER ADMIN NOT ALLOW TO UPDATE INFORMATION
                        if(cookies.role > 2) return;

                        // add loading spinner icon
                        $(this).append(`<div class="spinner-grow spinner-grow-sm" role="status"><span class="sr-only">Loading...</span></div>`)            
                        var channelStatus = !$('#channel-status:checked').val() ? false : true
                        var estDateSelected = new Date().toDateString()

                        if ($('#est-date').attr('data') !== '') {
                            estDateSelected = new Date($('#est-date').attr('data')).toDateString()
                            console.log('date ', estDateSelected)
                                                        
                            updateData($('#modalSellChannelEdit').attr('data'),{
                                sellChannelAccount: $('#channel-account').attr('data'),
                                estStart: estDateSelected,
                                status: channelStatus
                            },`SellChannel_Brand_Cabin`)
                            .then(res => {console.log('res: ',res)})
                            .finally( () => {
                                $('#modalSellChannelEdit').removeClass('show')
                                $('body').removeClass('modal-open')
                                $('.modal-backdrop').hide()
                                $('.spinner-grow').remove()
                                console.log('modal close finished')
                            })
                        } else {
                            console.log('none date');
                            updateData($('#modalSellChannelEdit').attr('data'),{
                                sellChannelAccount: $('#channel-account').attr('data'),
                                status: channelStatus
                            },`SellChannel_Brand_Cabin`)
                            .then(res => {console.log('res: ',res)})
                            .finally( () => {
                                $('#modalSellChannelEdit').removeClass('show')
                                $('body').removeClass('modal-open')
                                $('.modal-backdrop').hide()
                                $('.spinner-grow').remove()
                                console.log('modal close finished')
                            })
                        }

                    })

                } else {
                    console.log('dont have data')
                }
            })
        }             

    },[cabinID])

    return (
        <div>
            <Head>
                <title> Cabin Detail | CabinFood Business</title>
            </Head>

            <NavBar />

            <div className="main-content pb-6">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">

                            <div className="header">
                                <div className="container-fluid">
                                    <div className="header-body">
                                        <div className="row align-items-end">
                                            <div className="col-auto">
                                                <button className="btn btn-lg btn-rounded-circle btn-white mr-4"> 
                                                    <span className='fe fe-arrow-left'></span>
                                                </button>    
                                            </div>
                                            
                                            <div className="col">
                                                <h6 className="header-pretitle"> {cabin && cabin.fields.brandName} - {cabin && cabin.fields.fullAddr}</h6>
                                                <h1 className="header-title">{cabin && cabin.fields.name}</h1>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-auto">
                                            <a href="#" className="avatar avatar-lg">
                                                <img src={cabin && cabin.fields.storefrontPhoto && cabin.fields.storefrontPhoto[0].url} alt="..." className="avatar-img rounded-circle"/>
                                            </a>
                                        </div>
                                        
                                        <div className="col ml-n2">
                                            <h4 className="mb-1"><a href="#">{cabin && cabin.fields.name} - {cabin && cabin.fields.brandName}</a></h4>
                                            <p className="small text-muted mb-1">Ngày bắt đầu kinh doanh: {cabin && cabin.fields.brandStartDate}</p>
                                            <p className="small mb-0"><span className="text-success">●</span> Đang hoạt động</p>
                                        </div>

                                        <div className="col-auto"><a href="#!" className="btn btn-sm btn-primary d-none d-md-inline-block">Thay đổi</a></div>
                                        
                                    </div>
                                </div>
                            </div>
                            
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-header-title">Kênh bán hàng</h4>
                                </div>
                                
                                <div className="table-responsive mb-0">
                                    <table className="table table-sm table-nowrap card-table table-hover">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>KÊNH</th>
                                                <th>TRẠNG THÁI</th>
                                                <th>NGÀY HOẠT ĐỘNG</th>
                                                <th>TÀI KHOẢN</th>
                                                <th>CHI NHÁNH</th>
                                            </tr>
                                        </thead>
                                        <tbody className="list">
                                            {sellChannel && sellChannel.length > 0 && sellChannel.map((item, index) => (
                                                <tr key={index} className='item-row sell-channel-item' data={item.id}>
                                                    <td className="col-auto">
                                                        { item.fields.photo && item.fields.photo.length > 0
                                                        ? <div className="avatar avatar-xs"><img src={item.fields.photo[0].url} alt={item.fields.sellChannelName} className="avatar-img rounded-circle"/></div>
                                                        : ''
                                                        }
                                                    </td>
                                                    <td><h4 className="mb-1 sellChannelName">{item.fields.sellChannelName}</h4></td>
                                                    <td><span className="mb-1 sellChannelValue">{ item.fields.value}</span></td>
                                                    <td><span className="mb-1 sellChannelValue">{ new Date(item.fields.estStart).toDateString()}</span></td>
                                                    <td> <span className="mb-1 sellChannelAccount">{item.fields.sellChannelAccount}</span></td>
                                                    <td> <span className="mb-1 sellChannelCabinName">{item.fields.cabinName}</span></td>
                                                </tr>        
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-header-title">Danh sách nhân sự</h4>
                                </div>
                                
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
                                        <tbody className="list">
                                            {staffList && staffList.length > 0 && staffList.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="col-auto">
                                                        { item.fields.staffPhoto && item.fields.staffPhoto.length > 0
                                                        ? <div className="avatar avatar-xs"><img src={item.fields.staffPhoto[0].url} alt={item.fields.staffName} className="avatar-img rounded-circle"/></div>
                                                        : ''
                                                        }
                                                    </td>        
                                                    <td><h4 className="mb-1">{item.fields.staffName}</h4></td>
                                                    <td><span className="mb-1">{item.fields.staffID}</span></td>
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
                                                </tr>        
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="modal fade fixed-right" id="modalSellChannelEdit" tabIndex="-1">
                                <div className="modal-dialog modal-dialog-vertical">
                                    <div className="modal-content">
                                        <div className="modal-body">

                                            <div className="header">
                                                <div className="header-body">
                                                    <h1 className="header-title">KÊNH BÁN HÀNG</h1>
                                                    <p className='text-muted'>Cập nhật các thông tin liên quan đến KÊNH BÁN HÀNG của THƯƠNG HIỆU tại CABIN</p>
                                                </div>
                                            </div>

                                            <div className="my-n3">
                                                <div className="form-group">
                                                    <label>Kênh bán hàng</label>
                                                    <input className="form-control" id='channel-name' data=''/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Tài khoản</label>
                                                    <input className="form-control" id='channel-account' data=''/>
                                                </div>
                                                
                                                <div className="form-group">
                                                    <label>Đã sẵn sàng hoạt động: </label>
                                                    <input type="checkbox" className='ml-3' id='channel-status' data=''/>
                                                </div>
                                                
                                                <div className="form-group">
                                                    <label>Ngày dự kiến</label>
                                                    <span className='hide required' data='' id='est-date'></span>
                                                    <Flatpickr className="form-control" id='est-date' data=''
                                                        onChange={date => {
                                                            console.log('new date:', date)
                                                            $('#est-date').attr('data',date)
                                                        }}
                                                    />
                                                </div>
                                               
                                            </div>    

                                            <hr className="my-5" />   
                                            <button className="btn btn-lg btn-block btn-primary mb-3" id="channel-update">Lưu</button>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}

// ====================================