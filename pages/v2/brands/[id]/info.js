import React from 'react';
import Head from 'next/head'
import Link from 'next/link';
import $, { data } from 'jquery'
import NavBar from "../../../../components_v2/nav"

const BrandEntity = require("../../../../entity/BrandEntity")
const brandObject = new BrandEntity()

const WorkingHoursEntity = require("../../../../entity/WorkinghoursEntity")
const workingHoursObject = new WorkingHoursEntity()

const OwnerEntity = require("../../../../entity/OwnerEntity")
const ownerObject = new OwnerEntity()

export default class LayoutInfo extends React.Component {
    
    static async getInitialProps({query}) {        
        console.log("query id:", query.id)
        const res = await brandObject.getBrandByID(query.id)
        return {brand: res}        
    }

    constructor(props) {
        super(props);

        this.state = {
            promotion : null,
            incubator : null,
            milestone : null,
            workingHours : null,
            owner : []
        }
    }

    async componentDidMount() {        
        let currentComponent = this        

        const workingHours = await workingHoursObject.getWorkingHoursByBrandID(this.props.brand.ID)
        currentComponent.setState({workingHours: workingHours})

        const owner = await ownerObject.getOwnerByBrandID(this.props.brand.ID)
        currentComponent.setState({owner: owner})
    }

    render() {
        const {promotion, incubator, milestone, workingHours, owner} = this.state
        return (
            <>
                <Head>
                    <title>  {this.props.brand.name} | Dashboard</title>
                </Head>

                <NavBar 
                    active_nav_item = "#info"
                    brand_id={this.props.brand.ID}
                    brand_name={this.props.brand.name}
                    // user_id={cookies.userID}
                    // avatar = {user && user.avatar ? user.avatar[0].url : "../assets/img/avatars/profiles/avatar-1.jpg"}
                />

                <div className="main-content">
                    <div className="container-fluid">
                        <div className="row mt-4 mt-md-5 justify-content-center">
                            <div className="col-12 col-lg-10 col-xl-8">                                
                            
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
                                        <p className="card-text text-muted">{this.props.brand.intro}</p>
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
                                                            <div className="col-auto"><small className="text-muted">{owner.ownerName}</small></div>
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Số điện thoại liên hệ</h5></div>
                                                            <div className="col-auto"><small className="text-muted">{owner.ownerTel}</small></div>
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">CMND/CCCD</h5></div>
                                                            <div className="col-auto"><small className="text-muted">{owner.ownerID}</small></div>
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Ngày sinh</h5></div>
                                                            <div className="col-auto"><small className="text-muted">{owner.ownerDOB}</small></div>
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">CMND/CCCD</h5></div>
                                                            
                                                            <div className="col">
                                                                <div className="col-auto dropzone dropzone-multiple dz-clickable" data-toggle="dropzone">
                                                                    <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>
                                                                    <div className="dz-default dz-message"><button className="dz-button" type="button">Mặt trước</button></div>
                                                                </div>
                                                                <div className="col-auto dropzone dropzone-multiple dz-clickable mt-3" data-toggle="dropzone">
                                                                    <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>
                                                                    <div className="dz-default dz-message"><button className="dz-button" type="button">Mặt sau</button></div>
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
                                                            <div className="col-auto"><small className="text-muted">{this.props.brand.bankName}</small></div>
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Chi nhánh</h5></div>
                                                            <div className="col-auto"><small className="text-muted">{this.props.brand.bankBranch}</small></div>
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Chủ tài khoản</h5></div>
                                                            <div className="col-auto"><small className="text-muted">{this.props.brand.bankAcc}</small></div>
                                                        </div>
                                                    </div>
                                                    <div className="list-group-item">
                                                        <div className="row align-items-center">
                                                            <div className="col"><h5 className="mb-0">Số tài khoản</h5></div>
                                                            <div className="col-auto"><small className="text-muted">{this.props.brand.bankNo}</small></div>
                                                        </div>
                                                    </div>
                                                    
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