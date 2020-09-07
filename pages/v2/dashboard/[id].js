import React from 'react';
import Head from 'next/head'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Link from 'next/link';
import $, { data } from 'jquery'
import NavBar from "../../../components_v2/nav"
// ====================================
// GLOBAL FUNCTIONS

const AirtablePlus = require('airtable-plus');  
const airtableFEED = new AirtablePlus({
    baseID: process.env.AIR_TABLE_BASE_ID_FEED,
    apiKey: process.env.AIR_TABLE_API_KEY,
});
const airtableUSER = new AirtablePlus({
    baseID: process.env.AIR_TABLE_BASE_ID_USER,
    apiKey: process.env.AIR_TABLE_API_KEY,
});
const airtableSOPERATION = new AirtablePlus({
    baseID: process.env.AIR_TABLE_BASE_ID_SOPERATION,
    apiKey: process.env.AIR_TABLE_API_KEY,
});

const airtableBRAND = new AirtablePlus({
    baseID: process.env.AIR_TABLE_BASE_ID_BRAND,
    apiKey: process.env.AIR_TABLE_API_KEY,
});

export default class LayoutDashboard extends React.Component {
    static async getInitialProps({query}) {
        console.log("______ initialprops:", query.id)    
        
        const brandData = await airtableBRAND.read({
            filterByFormula: `ID = "${query.id}"`,
            maxRecords: 1
        },{tableName:"Brand"});
        console.log("brand information: ", brandData)    
        
        return { brand: brandData[0]}
    }

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        

    }

    render() {
        return (
            <>
                <Head>
                    <title>  {this.props.brand.fields.name} | Dashboard</title>
                </Head>

                <NavBar 
                    brand_id={this.props.brand.fields.ID}
                    brand_name={this.props.brand.fields.name}
                    // user_id={cookies.userID}
                    // avatar = {user && user.avatar ? user.avatar[0].url : "../assets/img/avatars/profiles/avatar-1.jpg"}
                />

                <div className="main-content">
                    <div className="container-fluid">
                        <div className="row mt-4 mt-md-5 justify-content-center">
                            <div className="col-12 col-lg-10 col-xl-8">                                
                                
                                <div className="card">
                                    <div className="card-body text-center">
                                        <div className="row justify-content-center">
                                            <div className="col-12 col-md-10 col-xl-8">
                                                <img src="/assets/img/illustrations/happiness.svg" alt="..." className="img-fluid mt-n5 mb-4" style={{maxWidth: "272px"}}/>
                                                <h2>Chào mừng bạn đã tham gia cùng CabinFood.</h2>
                                                <p className="text-muted">Thân tặng bạn gói tài trợ truyền thông trị giá 2.000.000đ khi tham gia vào chuỗi hoạt động khai trương cửa hàng thúc đẩy doanh số delivery .</p>
                                                <a href="#!" className="btn btn-primary lift">Nhận ưu đãi ngay</a>
                                            </div>
                                        </div> 
                                    </div>
                                </div>

                                <div className="card bg-light border">
                                    <div className="card-body">
                                        <h4 className="mb-2">Hoàn thành cung cấp thông tin</h4>
                                        <p className="small text-muted mb-2"> Với một hồ sơ hoàn chỉnh, sẽ giúp rút ngắn thời gian hoàn thành đăng ký các kênh bán hàng delivery và hiển thị tốt hơn trên hệ thống tìm kiếm của Google</p>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-body text-center">                                        
                                        <div className="card-avatar avatar avatar-lg mx-auto">
                                            <img src="/assets/img/avatars/teams/team-logo-1.jpg" alt="" className="avatar-img rounded"/>
                                        </div>

                                        <h2 className="mb-3">{this.props.brand.fields.name}</h2>
                                        <p className="card-text text-muted">Launchday is a SaaS website builder with a focus on quality, easy to build product sites.</p>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <div className="card">
                                            <div className="card-header">
                                                <h4 className="card-header-title">Thông tin</h4>
                                            </div>
                                            <div className="card-body">
                                                <div className="list-group list-group-flush my-n3">
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col-auto">
                                                                <a href="project-overview.html" className="avatar avatar-xs">
                                                                    <img src="/assets/img/avatars/projects/project-1.jpg" alt="..." className="avatar-img rounded"/>
                                                                </a>
                                                            </div>
                                                            <div className="col ml-n2">
                                                                <h5 className="mb-1"><a href="project-overview.html">Nhận Cabin</a></h5>
                                                                <p className="card-text small text-muted"><time datetime="2018-05-24">10h, 01/09/2020</time></p>
                                                            </div>                 
                                                            <div className="col-auto">
                                                                <button type="button" className="btn btn-sm btn-white d-block d-md-inline-block lift"> Xác nhận</button>
                                                            </div>                                                                                               
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col-auto">
                                                                <a href="project-overview.html" className="avatar avatar-xs">
                                                                    <img src="/assets/img/avatars/projects/project-1.jpg" alt="..." className="avatar-img rounded"/>
                                                                </a>
                                                            </div>
                                                            <div className="col ml-n2">
                                                                <h5 className="mb-1"><a href="project-overview.html">Chụp ảnh sản phẩm</a></h5>
                                                            </div>        
                                                            <div className="col-auto">
                                                                <button type="button" className="btn btn-sm btn-white d-block d-md-inline-block lift"> Đặt dịch vụ</button>
                                                            </div>                                                    
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col-auto">
                                                                <a href="project-overview.html" className="avatar avatar-xs">
                                                                    <img src="/assets/img/avatars/projects/project-1.jpg" alt="..." className="avatar-img rounded"/>
                                                                </a>
                                                            </div>
                                                            <div className="col ml-n2">
                                                                <h5 className="mb-1"><a href="project-overview.html">Đăng ký kênh bán hàng</a></h5>
                                                                <p className="card-text small text-muted">Grab, Now, Baemin, Loship, GoJek</p>
                                                            </div>        
                                                            <div className="col-auto">
                                                                <button type="button" className="btn btn-sm btn-white d-block d-md-inline-block lift"> Đặt dịch vụ</button>
                                                            </div>                                                    
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col-auto">
                                                                <a href="project-overview.html" className="avatar avatar-xs">
                                                                    <img src="/assets/img/avatars/projects/project-1.jpg" alt="..." className="avatar-img rounded"/>
                                                                </a>
                                                            </div>
                                                            <div className="col ml-n2">
                                                                <h5 className="mb-1"><a href="project-overview.html">Website bán hàng</a></h5>
                                                                <p className="card-text small text-muted">Sở hữu kênh bán hàng hiện đại của ngay trong 1 phút.</p>
                                                            </div>        
                                                            <div className="col-auto">
                                                                <button type="button" className="btn btn-sm btn-white d-block d-md-inline-block lift"> Đặt dịch vụ</button>
                                                            </div>                                                    
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="list-group list-group-flush my-n3">
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Nhóm món chính</h5></div>
                                                            <div className="col-auto"><small className="text-muted">Món cơm, đồ nướng</small></div>
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Website</h5></div>
                                                            <div className="col-auto"><small className="text-muted">Chưa cập nhật</small></div>
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Facebook</h5></div>
                                                            <div className="col-auto"><small className="text-muted">Chưa cập nhật</small></div>
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Đại diện</h5></div>
                                                            <div className="col-auto"><small className="text-muted">Nguyễn Văn A</small></div>
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Số điện thoại liên hệ</h5></div>
                                                            <div className="col-auto"><small className="text-muted">0909090909</small></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="list-group list-group-flush my-n3">
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Tên ngân hàng</h5></div>
                                                            <div className="col-auto"><small className="text-muted">ACB</small></div>
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Chủ tài khoản</h5></div>
                                                            <div className="col-auto"><small className="text-muted">Nguyễn Văn A</small></div>
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Số tài khoản</h5></div>
                                                            <div className="col-auto"><small className="text-muted">123123123</small></div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-header-title">Quản lý sản phẩm</h4>
                                        <a href="#!" className="btn btn-sm btn-white">Thêm sản phẩm</a>
                                    </div>
                                    <div className="table-responsive mb-0">
                                        <table className="table table-sm table-nowrap table-hover card-table">
                                            <thead>
                                                <tr>
                                                    <th> <a href="#" className="text-muted list-sort" data-sort="products-product">Sản phẩm</a></th>
                                                    <th> <a href="#" className="text-muted list-sort" data-sort="products-stock">Trạng thái</a></th>
                                                    <th> <a href="#" className="text-muted list-sort" data-sort="products-price">Giá</a></th>
                                                    <th colspan="2"> <a href="#" className="text-muted list-sort" data-sort="products-sales">Danh mục</a></th>
                                                </tr>
                                            </thead>
                                            <tbody className="list">
                                                <tr>
                                                    <td className="products-product">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar">
                                                                <img className="avatar-img rounded mr-3" src="/assets/img/avatars/products/product-1.jpg" alt="..." />
                                                            </div>
                                                            <div className="ml-3">
                                                                <h4 className="font-weight-normal mb-1">Sketchpad</h4>
                                                                <small className="text-muted">3" x 5" Size</small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="products-stock"> <span className="badge badge-soft-success">Available</span></td>
                                                    <td className="products-price">$14.99</td>
                                                    <td className="products-sales">$3,145.23</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="mb-1">Hình ảnh menu thực tế</label>
                                    <small className="form-text text-muted">Với file ảnh rõ ràng và đầy đủ, sẽ giúp rút ngắn quy trình duyệt hồ sơ của các kênh Delivery.</small>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" data-options="{&quot;url&quot;: &quot;https://&quot;}">
                                                <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>
                                                <div className="dz-default dz-message">
                                                    <button className="dz-button" type="button">Drop files here to upload</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}