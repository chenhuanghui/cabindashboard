import React from 'react';
import Head from 'next/head'
import NavBar from '../components/nav/nav_bar';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Link from 'next/link';

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


export default class LayoutAccountBrand extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            brandList: []
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
            console.log('account:', result[0].fields);

            var promises = []
            for (var i=0; i<result[0].fields.Brand.length; i++) {
                promises.push(
                    retrieveData({
                      filterByFormula: `ID = "${result[0].fields.Brand[i]}"`,
                    },'Brand')
                )
            }
            Promise.all(promises)
            .then(brandListRes => {
                console.log('brandList:', brandListRes);
                currentComponent.setState({brandList:brandListRes})
            })
        })
        

        // ===============================================
        // FRONT-END ENGAGEMENT


    }

    render() {
        const { data, brandList } = this.state;
        return (
            <div>
                <Head>
                    {/* <script src="../assets/js/theme.min.js"></script> */}
                    <title> Brand Setting | CabinFood Business</title>
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
                                            <h6 className="header-pretitle">TỔNG QUAN</h6>
                                            <h1 className="header-title">Tài khoản</h1>
                                        </div>                                            
                                    </div> {/* row align-items-center */}

                                    <div className="row align-items-center">
                                        <div className="col">
                                            <ul className="nav nav-tabs nav-overflow header-tabs">
                                                <li className="nav-item">
                                                    <Link href='/account'>
                                                        <a className="nav-link">Thông tin</a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item ">
                                                    <Link href='/account/brand'>
                                                        <a className="nav-link active">Nhãn hiệu</a>
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

                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-header-title">Nhãn hiệu</h4>
                                    <Link href='/account/brandnew'>
                                        <a className="btn btn-sm btn-white btn-modal" id='add-product'>Thêm nhãn hiệu</a> 
                                    </Link>                                    
                                </div>{/* end card header */}
                                
                                <div className="table-responsive mb-0">
                                    <table className="table table-sm table-nowrap card-table table-hover">
                                        <tbody className="list">{/* table item */} 
                                            { brandList && brandList.length > 0 && brandList.map((item,index) => (
                                                <tr key={index}>
                                                    <td className="col-auto">
                                                        { brandList[index][0].fields.logo && brandList[index][0].fields.logo.length > 0
                                                        ? <div className="avatar avatar-xs"><img src={brandList[index][0].fields.logo[0].url} className="avatar-img rounded-circle"/></div>                                                        
                                                        : <div className="avatar avatar-xs"><img src='/assets/img/logo.png' className="avatar-img rounded-circle"/></div>                                                        
                                                        }
                                                    </td>        
                                                    <td className="col-8">
                                                        <h4 className="mb-1">{brandList[index][0].fields.brandName}</h4>
                                                        <small className="text-muted"> {brandList[index][0].fields.ownerEmail}</small>
                                                    </td>
                                                    <td className='col-3'>
                                                        { brandList[index][0].fields.status === true
                                                        ? <span className="badge badge-success"> Đang hoạt động</span>
                                                        : <span className="badge badge-warning"> Tạm ngưng hoạt động</span>
                                                        }                                                        
                                                    </td>
                                                </tr>        
                                            ))
                                            }
                                        </tbody>
                                    </table>
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
