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

export default class LayoutStaffCheckin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            staffList: [],
            checkinList : [],
            isBusy : false,
        }
    }

    componentDidMount() {
        // INIT VARIABLE
        const cookies = parseCookies();
        let currentComponent = this
        
        // ===============================================
        // CHECKING AUTHENTICATE
        if (!cookies.isLoggedIn || !cookies.userID || !cookies.brandID || !cookies.role) {
            destroyCookie(userID)
            destroyCookie(isLoggedIn)
            destroyCookie(brandID)
            destroyCookie(role)
            Router.push('/signin')
        }
        console.log('current brandID:', cookies.brandID);
        
        // ===============================================
        // RETRIEVE DATA FROM AIRTABLE

        retrieveData({
            filterByFormula: `AND(brandID = "${cookies.brandID}")`,
            sort: [ {field: 'checkinDate', direction: 'desc'},{field: 'checkinTime', direction: 'desc'}]
        },'CheckInActivities')
        .then(result => {
            console.log('brand_staff:', result);
            currentComponent.setState({checkinList: result})
        })
        
        // ===============================================
        // FRONT-END ENGAGEMENT

        $(document).on(`click`,`.action-confirm`, function(){
            if (currentComponent.state.isBusy === true) {
                alert('Have a process was handling. Please wait for a moment.')
                return;
            }
            
            // add loading spinner icon
            $(this).append(`<div class="spinner-grow spinner-grow-sm" role="status"><span class="sr-only">Loading...</span></div>`)
            console.log($(this).attr(`data-confirm`))

            updateData($(this).attr(`data-id`),{
                isConfirmed: $(this).attr("data-confirm")
            },`CheckInActivities`)
            .then(res => {
                console.log('update: ', res)
                $('.spinner-grow').remove()
                currentComponent.setState({isBusy: false})
            })
        })
    }

    render() {
        const {staffList,checkinList} = this.state;
        return (
            <div>
                <Head>
                    <title> STAFF CHECKIN ACTIVITES | CabinFood Business</title>
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
                                                <h6 className="header-pretitle">QUẢN LÝ</h6>
                                                <h1 className="header-title">Nhân sự </h1>
                                            </div>                                            
                                        </div> {/* row align-items-center */}

                                        <div className="row align-items-center">
                                            <div className="col">
                                                <ul className="nav nav-tabs nav-overflow header-tabs">
                                                    <li className="nav-item"><Link href='/staffs'><a className="nav-link">Tất cả</a></Link></li>
                                                    <li className="nav-item"><Link href='/staffs/checkin'><a className="nav-link active">Check-in</a></Link></li>
                                                    {/* <li className="nav-item"><a className="nav-link" href="#!">Xin nghỉ</a></li> */}
                                                </ul>            
                                            </div>
                                        </div> {/* row align-items-center */}
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-header-title">Hoạt động check-in</h4>
                                        {/* <button className="btn btn-sm btn-white btn-modal" id='add-product'>Thêm nhân sự</button>  */}
                                    </div>{/* end card header */}
                                    
                                    <div className="table-responsive mb-0">
                                        <table className="table table-sm table-nowrap card-table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>THỜI GIAN</th>
                                                    <th>NHÂN VIÊN</th>
                                                    <th>HÌNH ẢNH</th>
                                                    <th>XÁC THỰC</th>
                                                </tr>
                                            </thead>
                                            <tbody className="list">{/* table item */} 
                                                {checkinList && checkinList.length > 0 && checkinList.map((item, index) => (
                                                    <tr className='item-row' key={index}>
                                                        <td className='col-auto'>
                                                            <h5>{item.fields.checkinDate}, {item.fields.checkinTime}</h5>
                                                            <small>
                                                            {parseInt(item.fields.type) === 1
                                                            ? <span className="text-warning mr-2">●</span>
                                                            : <span className="text-success mr-2">●</span>
                                                            }
                                                            {item.fields.type_desc}</small>
                                                        </td>
                                                        
                                                        <td className='col-auto'>
                                                            <h4 className="font-weight-bold mb-1"> {item.fields.staffName}</h4>
                                                            <small>{item.fields.staffIDValue}</small>
                                                        </td>
                                                        <td className='avatar avatar-xl'>
                                                            <img className='avatar-img rounded' src={item.fields.curPhoto[0].url} atl={item.fields.staffName}/>
                                                        </td>
                                                        <td>
                                                            {parseInt(item.fields.isConfirmed) === 0 || !item.fields.isConfirmed
                                                            ?
                                                                <div>
                                                                    <h5><span className="text-warning mr-2">●</span>{item.fields.isConfirmedDesc}</h5>
                                                                    <button className='btn btn-sm btn-white alert-success mr-3 action-confirm' data-id={item.id} data-confirm="1">Chính xác</button>
                                                                    <button className='btn btn-sm btn-white alert-danger action-confirm' data-id={item.id} data-confirm="2">Không chính xác</button>
                                                                </div>                                                            
                                                            : parseInt(item.fields.isConfirmed) === 1
                                                            ? <h5><span className="text-success mr-2">●</span>{item.fields.isConfirmedDesc}</h5>
                                                            : <h5><span className="text-danger mr-2">●</span>{item.fields.isConfirmedDesc}</h5>
                                                            }
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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
