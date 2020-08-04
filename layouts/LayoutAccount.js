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
            filterByFormula: `ID = "${cookies.userID}"`,
        },'Account')
        .then(result => {
            console.log('account:', result);
            currentComponent.setState({data:result[0].fields})
        })

        // ===============================================
        // FRONT-END ENGAGEMENT        
        

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
                                                    {data && data.avatar
                                                    ? <img className="avatar-img rounded-circle" src={data.avatar[0].url} alt={data.fullName}/>
                                                    : <img className="avatar-img rounded-circle" src="assets/img/avatars/profiles/avatar-1.jpg"/>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col ml-n2">
                                                <h4 className="mb-1">{ data.fullName}</h4>
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
                                            <input type="text" className="form-control" value={data.fullName}/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" className="form-control" value={data.email}/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input type="text" className="form-control mb-3" value={data.tel}/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label>Birthday</label>
                                            {/* <input type="text" className="form-control flatpickr-input" data-toggle="flatpickr" readonly="readonly"/> */}
                                            <input type="text" className="form-control mb-3" value={data.DOB}/>
                                        </div>
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
                                                    <td><input id='call' type="checkbox" checked/></td>
                                                    <td><input id='email' type="checkbox" checked/></td>
                                                    <td><input id='sms' type="checkbox" checked/></td>
                                                </tr>        
                                                <tr>
                                                    <td><h4 className='font-weight-normal'>Thông báo đơn hàng</h4></td>        
                                                    <td><input id='call' type="checkbox" checked/></td>
                                                    <td><input id='email' type="checkbox" checked/></td>
                                                    <td><input id='sms' type="checkbox" checked/></td>
                                                </tr>        
                                                <tr>
                                                    <td><h4 className='font-weight-normal'>Thông báo từ cửa hàng</h4></td>        
                                                    <td><input id='call' type="checkbox" checked/></td>
                                                    <td><input id='email' type="checkbox" checked/></td>
                                                    <td><input id='sms' type="checkbox" checked/></td>
                                                </tr>   
                                                <tr>
                                                    <td><h4 className='font-weight-normal'>Tư vấn 24/7</h4></td>        
                                                    <td><input id='call' type="checkbox" checked/></td>
                                                    <td><input id='email' type="checkbox" checked/></td>
                                                    <td><input id='sms' type="checkbox" checked/></td>
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