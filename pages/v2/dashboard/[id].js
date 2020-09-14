import React from 'react';
import Head from 'next/head'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Link from 'next/link';
import $, { data } from 'jquery'
import NavBar from "../../../components_v2/nav"

const BrandEntity = require("../../api/brandEntity")
const brandObject = new BrandEntity()

const BrandPromotionEntity = require("../../api/promotionEntity")
const brandPromotionObject = new BrandPromotionEntity()

const IncubatorEntity = require("../../api/incubatorEntity")
const incubatorObject = new IncubatorEntity()

const MilestoneEntity = require("../../api/milestoneEntity")
const milestoneObject = new MilestoneEntity()

const WorkingHoursEntity = require("../../api/workinghoursEntity")
const workingHoursObject = new WorkingHoursEntity()

export default class LayoutDashboard extends React.Component {
    
    static async getInitialProps({query}) {        
        const res = await brandObject.getBrandByID(query.id)
        return {brand: res}        
    }

    constructor(props) {
        super(props);

        this.state = {
            promotion : null,
            incubator : null,
            milestone : null,
            workingHours : null
        }
    }

    componentDidMount() {        
        let currentComponent = this
        
        brandPromotionObject.getActivePromotionByBrandID(this.props.brand.ID)
        .then(res=> {
            currentComponent.setState({promotion: res})
        })

        incubatorObject.getActiveService()
        .then(res=> {
            currentComponent.setState({incubator: res})
        })

        milestoneObject.getActiveMilestoneByBrandID(this.props.brand.ID)
        .then(res=> {
            currentComponent.setState({milestone: res})
        })

        workingHoursObject.getWorkingHoursByBrandID(this.props.brand.ID)
        .then(res=>{
            currentComponent.setState({workingHours: res})
        })
    }

    render() {
        const {promotion, incubator, milestone, workingHours} = this.state
        return (
            <>
                <Head>
                    <title>  {this.props.brand.name} | Dashboard</title>
                </Head>

                <NavBar 
                    active_nav_item = "#home"
                    brand_id={this.props.brand.ID}
                    brand_name={this.props.brand.name}
                    // user_id={cookies.userID}
                    // avatar = {user && user.avatar ? user.avatar[0].url : "../assets/img/avatars/profiles/avatar-1.jpg"}
                />

                <div className="main-content">
                    <div className="container-fluid">
                        <div className="row mt-4 mt-md-5 justify-content-center">
                            <div className="col-12 col-lg-10 col-xl-8">                                
                                {promotion 
                                ? <div className="card">
                                    <div className="card-body text-center">
                                        <div className="row justify-content-center">
                                            <div className="col-12 col-md-10 col-xl-8">
                                                <img src={promotion.promotionAttachments} alt="..." className="img-fluid mt-n5 mb-4" style={{maxWidth: "272px"}}/>
                                                <h2>{promotion.promotionName}</h2>
                                                <p className="text-muted">{promotion.promotionDesc}</p>
                                                <a href="#!" className="btn btn-primary lift">Nhận ưu đãi ngay</a>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                                : null

                                }
                                

                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <div className="card">
                                            <div className="card-header">
                                                <h4 className="card-header-title">Dịch vụ hỗ trợ</h4>
                                            </div>
                                            <div className="card-body">
                                                <div className="list-group list-group-flush my-n3">
                                                    {incubator && incubator.map((item, index)=> (
                                                        <div className="list-group-item" key={index}>
                                                            <div className="row align-items-center">
                                                                <div className="col-auto">
                                                                    <a href="#" className="avatar avatar-4by3">
                                                                        <img src={item.attachments} alt="..." className="avatar-img rounded"/>
                                                                    </a>
                                                                </div>
                                                                <div className="col ml-n2">
                                                                    <h5 className="mb-1 text-focus">{item.name}</h5>
                                                                    <p className="card-text small text-muted">{item.desc}</p>
                                                                </div>
                                                                <div className="col-auto">
                                                                    <button type="button" className="btn btn-sm btn-primary d-block d-md-inline-block lift"> <span className="fe fe-check"></span></button>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <div className="card">
                                            <div className="card-header">
                                                <h4 className="card-header-title">Lịch trình làm việc</h4>
                                            </div>
                                            <div className="card-body">
                                                <div className="list-group list-group-flush list-group-activity my-n3">
                                                    {milestone && milestone.map((item, index)=> (
                                                        <div className="list-group-item" key={index}>
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <div className="avatar avatar-sm">
                                                                        <div className="avatar-title font-size-lg bg-primary-soft rounded-circle text-primary">
                                                                            <i className="fe fe-mail"></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col ml-n2">
                                                                    <h5 className="mb-1">{item.milestoneName}</h5>
                                                                    <p className="small text-gray-700 mb-0">{item.milestoneDesc}</p>
                                                                    <p className="text-muted small">{item.milestoneDuedate}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr className="my-5"/>

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

                                        <h2 className="mb-3">{this.props.brand.name}</h2>
                                        <p className="card-text text-muted">Launchday is a SaaS website builder with a focus on quality, easy to build product sites.</p>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-12 col-lg-6">                                        
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="list-group list-group-flush my-n3">
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Nhóm món chính</h5></div>
                                                            <div className="col-auto"><small className="text-muted">{this.props.brand.mainCategory}</small></div>
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Website</h5></div>
                                                            <div className="col-auto"><small className="text-muted">{this.props.brand.website}</small></div>
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Facebook</h5></div>
                                                            <div className="col-auto"><small className="text-muted">{this.props.brand.facebook}</small></div>
                                                        </div>
                                                    </div>                                                    
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Thông tin giờ làm việc</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="list-group list-group-flush my-n3">
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Thứ 2</h5></div>
                                                            <div className="col-auto"><small className="text-muted">{workingHours && workingHours.Mon}</small></div>
                                                        </div>
                                                    </div>        
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Thứ 3</h5></div>
                                                            <div className="col-auto"><small className="text-muted">{workingHours && workingHours.Tue}</small></div>
                                                        </div>
                                                    </div>        
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Thứ 4</h5></div>
                                                            <div className="col-auto"><small className="text-muted">{workingHours && workingHours.Wed}</small></div>
                                                        </div>
                                                    </div>        
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Thứ 5</h5></div>
                                                            <div className="col-auto"><small className="text-muted">{workingHours && workingHours.Thu}</small></div>
                                                        </div>
                                                    </div>        
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Thứ 6</h5></div>
                                                            <div className="col-auto"><small className="text-muted">{workingHours && workingHours.Fri}</small></div>
                                                        </div>
                                                    </div>        
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Thứ 7</h5></div>
                                                            <div className="col-auto"><small className="text-muted">{workingHours && workingHours.Sat}</small></div>
                                                        </div>
                                                    </div>        
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Chủ nhật</h5></div>
                                                            <div className="col-auto"><small className="text-muted">{workingHours && workingHours.Sun}</small></div>
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
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">CMND/CCCD</h5></div>
                                                            <div className="col-auto"><small className="text-muted">0909090909</small></div>
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Ngày cấp</h5></div>
                                                            <div className="col-auto"><small className="text-muted">11/11/2011</small></div>
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">CMND/CCCD</h5></div>
                                                            
                                                            <div className="col">
                                                                <div class="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone">
                                                                    <ul class="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>
                                                                    <div class="dz-default dz-message"><button class="dz-button" type="button">Mặt trước</button></div>
                                                                </div>
                                                                <div class="dropzone dropzone-multiple dz-clickable mt-3" data-toggle="dropzone">
                                                                    <ul class="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>
                                                                    <div class="dz-default dz-message"><button class="dz-button" type="button">Mặt sau</button></div>
                                                                </div>
                                                            </div>
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
                                
                                <hr className="my-5"/>
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
                                                    <th colSpan="2"> <a href="#" className="text-muted list-sort" data-sort="products-sales">Danh mục</a></th>
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
                                
                                

                                <hr className="my-5"/>
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <h3 className="card-title">Thêm người dùng</h3>
                                                <p className="card-text small">Thêm tài khoản cùng quản lý hệ thống, giúp việc cập nhật thông tin dễ dàng và linh động hơn.</p>
                                                <a href="#" className="btn btn-primary">Thêm tài khoản</a>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <h3 className="card-title">Nội quy</h3>
                                                <p className="card-text small">Nắm rõ các quy định khi làm việc tại trạm kinh doanh, sẽ giúp việc vận hành trong quá trình làm việc được diễn ra thuận lợi nhất.</p>
                                                <a href="#" className="btn btn-primary">Xem thông tin</a>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <h3 className="card-title">Phần mềm NowMerchant</h3>
                                                <p className="card-text small">Hướng dẫn sử dụng sẽ giúp bạn hiểu rõ phần mềm sẽ giúp bạn dễ dàng quản lý và chủ động hơn trong công việc.</p>
                                                <a href="#" className="btn btn-primary">Xem thông tin</a>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <h3 className="card-title">Phần mềm GrabMerchant</h3>
                                                <p className="card-text small">Hướng dẫn sử dụng sẽ giúp bạn hiểu rõ phần mềm sẽ giúp bạn dễ dàng quản lý và chủ động hơn trong công việc.</p>
                                                <a href="#" className="btn btn-primary">Xem thông tin</a>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <h3 className="card-title">Phần mềm Loship-Chủ cửa hàng</h3>
                                                <p className="card-text small">Hướng dẫn sử dụng sẽ giúp bạn hiểu rõ phần mềm sẽ giúp bạn dễ dàng quản lý và chủ động hơn trong công việc.</p>
                                                <a href="#" className="btn btn-primary">Xem thông tin</a>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <h3 className="card-title">Phần mềm Baemin Merchant</h3>
                                                <p className="card-text small">Hướng dẫn sử dụng sẽ giúp bạn hiểu rõ phần mềm sẽ giúp bạn dễ dàng quản lý và chủ động hơn trong công việc.</p>
                                                <a href="#" className="btn btn-primary">Xem thông tin</a>
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