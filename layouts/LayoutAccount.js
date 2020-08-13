import React from 'react';
import Head from 'next/head'
import NavBar from '../components/nav/nav_bar';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Link from 'next/link';
import $, { data } from 'jquery'
import Router from 'next/router';

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
            filterByFormula: `ID = "${cookies.userID}"`,
        },'Account')
        .then(result => {
            console.log('account:', result[0]);
            currentComponent.setState({data:result[0]})
        })

        // ===============================================
        // FRONT-END ENGAGEMENT        
        $('#update-password').click(function(){
            console.log($('#new-password').val())
            console.log($('#new-password-cfm').val())
            console.log($('#current-password').val())

            if($('#new-password').val() !== $('#new-password-cfm').val()){
                $('#notice-pass-cfm').show()
                $('#new-password').removeClass('is-valid')
                $('#new-password-cfm').removeClass('is-valid')
                $('#new-password').addClass('is-invalid')
                $('#new-password-cfm').addClass('is-invalid')
            } else {
                $('#new-password').removeClass('is-invalid')
                $('#new-password-cfm').removeClass('is-invalid')
                $('#new-password').addClass('is-valid')
                $('#new-password-cfm').addClass('is-valid')
                $('#notice-pass-cfm').hide()

                if( $('#current-password').val() === currentComponent.state.data.fields.password) {
                    $('#notice-pass-current').hide()
                    $('#success-update-notice').hide()

                    console.log('true')
                    updateData(currentComponent.state.data.id,{password:$('#new-password').val()},`Account`)
                    .then(res=>{
                        console.log('res: ', res)
                        if(res) {
                            $('#success-update-notice').show()
                            $('#new-password').removeClass('is-valid')
                            $('#new-password-cfm').removeClass('is-valid')
                            Router.push('/')
                        }
                    })
                } else {
                    $('#notice-pass-current').show()
                }
            }
        })

    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <Head>
                    {/* <script src="../assets/js/theme.min.js"></script> */}
                    <title> Account | CabinFood Business</title>
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
                                            <h1 className="header-title">Tài khoản</h1>
                                        </div>                                            
                                    </div> {/* row align-items-center */}

                                    <div className="row align-items-center">
                                        <div className="col">
                                            <ul className="nav nav-tabs nav-overflow header-tabs">
                                                <li className="nav-item ">
                                                    <Link href='/account'>
                                                        <a className="nav-link active">Thông tin</a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link href='/account/brand'>
                                                        <a className="nav-link">Nhãn hiệu</a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link href='/account/invoice'>
                                                        <a className="nav-link">Hóa đơn</a>
                                                    </Link>
                                                </li>
                                            </ul>            
                                        </div>
                                    </div> {/* row align-items-center */}
                                </div>
                            </div>

                            <div>
                                <div className="row justify-content-between align-items-center">
                                    <div className="col">
                                        <div className="row align-items-center">
                                            <div className="col-auto">
                                                <div className="avatar">
                                                    {data && data.fields && data.fields.avatar
                                                    ? <img className="avatar-img rounded-circle" src={data.fields.avatar[0].url} alt={data.fields.fullName}/>
                                                    : <img className="avatar-img rounded-circle" src="assets/img/avatars/profiles/avatar-1.jpg"/>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h4 className="mb-1">{data && data.fields &&  data.fields.fullName}</h4>
                                                <small className="text-muted">PNG or JPG no bigger than 1000px wide and tall.</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-sm btn-primary">Upload</button>
                                    </div>
                                </div> {/* .row profile overview */}

                                <hr className="my-5"></hr> {/* .divider */}

                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label>Họ và tên</label>
                                            <input type="text" className="form-control" value={data && data.fields && data.fields.fullName}/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" className="form-control" value={data && data.fields && data.fields.email}/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input type="text" className="form-control mb-3" value={data && data.fields && data.fields.tel}/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label>Birthday</label>
                                            {/* <input type="text" className="form-control flatpickr-input" data-toggle="flatpickr" readonly="readonly"/> */}
                                            <input type="text" className="form-control mb-3" value={data && data.fields && data.fields.DOB}/>
                                        </div>
                                    </div>
                                </div>
                                
                                <hr className="my-5"></hr> {/* .divider */}

                                <div className="row">
                                    <div className="col-12 col-md-4">
                                        <div className="form-group ">
                                            <label>Mật khẩu mới</label>
                                            {/* <input type="text" className="form-control mb-3"/> */}
                                            <input type="password" className="form-control form-control-appended required" placeholder="Enter your password" id='new-password'/>
                                        </div>                                            
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <div className="form-group ">
                                            <label>Xác nhận mật khẩu mới</label>
                                            {/* <input type="text" className="form-control mb-3"/> */}
                                            <input type="password" className="form-control form-control-appended required" placeholder="Enter your password" id='new-password-cfm'/>
                                            {/* <p className='hide alert alert-danger alert-dismissible' id='notice-pass-cfm'></p> */}
                                            <div className="invalid-feedback" id='notice-pass-cfm'>Mật khẩu mới không trùng khớp.</div>
                                        </div>                                            
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="form-group ">
                                            <label>Mật khẩu hiện tại</label>                                            
                                            <input type="password" className="form-control form-control-appended required" placeholder="Enter your password" id='current-password'/>
                                            <div className="invalid-feedback" id='notice-pass-current'>Mật khẩu không đúng.</div>
                                        </div>                                            
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-sm btn-primary" id='update-password'>Đổi mật khẩu</button>
                                        <div className="valid-feedback" id='success-update-notice'>Đã cập nhật thành công!</div>
                                    </div>
                                </div>
                                
                                
                                <hr className="my-5"></hr> {/* .divider */}

                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-header-title">Thông báo</h4>
                                    </div>{/* end card header */}
                                    
                                    <div className="table-responsive mb-0">
                                        <table className="table table-sm table-nowrap card-table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Loại</th>
                                                    <th>Điện thoại</th>
                                                    <th>Email</th>
                                                    <th>SMS</th>
                                                </tr>
                                            </thead>
                                            <tbody className="list">{/* table item */} 
                                                <tr>
                                                    <td><h4 className='font-weight-normal'>Thông báo từ hệ thống</h4></td>        
                                                    <td><input id='call' type="checkbox" defaultChecked readOnly/></td>
                                                    <td><input id='email' type="checkbox" defaultChecked readOnly/></td>
                                                    <td><input id='sms' type="checkbox" defaultChecked readOnly/></td>
                                                </tr>        
                                                <tr>
                                                    <td><h4 className='font-weight-normal'>Thông báo đơn hàng</h4></td>        
                                                    <td><input id='call' type="checkbox" defaultChecked readOnly/></td>
                                                    <td><input id='email' type="checkbox" defaultChecked readOnly/></td>
                                                    <td><input id='sms' type="checkbox" defaultChecked readOnly/></td>
                                                </tr>        
                                                <tr>
                                                    <td><h4 className='font-weight-normal'>Thông báo từ cửa hàng</h4></td>        
                                                    <td><input id='call' type="checkbox" defaultChecked readOnly/></td>
                                                    <td><input id='email' type="checkbox" defaultChecked readOnly/></td>
                                                    <td><input id='sms' type="checkbox" defaultChecked readOnly/></td>
                                                </tr>   
                                                <tr>
                                                    <td><h4 className='font-weight-normal'>Tư vấn 24/7</h4></td>        
                                                    <td><input id='call' type="checkbox" defaultChecked readOnly/></td>
                                                    <td><input id='email' type="checkbox" defaultChecked readOnly/></td>
                                                    <td><input id='sms' type="checkbox" defaultChecked readOnly/></td>
                                                </tr>             
                                            </tbody>
                                        </table>
                                    </div>
                                </div> {/* .card */}
                            </div>                            
                        </div> {/* .col-12 col-lg-10 col-xl-8 */}
                    </div>
                </div>
                <style jsx>{`
                    .dropdown-toggle {cursor: pointer}
                `}</style>
            </div>
        )
    }
}