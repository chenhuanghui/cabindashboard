import React from 'react';
import Head from 'next/head'
import Link from 'next/link';
import $, { data } from 'jquery'
import NavBar from "../../../../components_v2/nav"

const BrandEntity = require("../../../../entity/BrandEntity")
const brandObject = new BrandEntity()

const WorkingHoursEntity = require("../../../../entity/WorkinghoursEntity")
const workingHoursObject = new WorkingHoursEntity()

export default class LayoutInfo extends React.Component {
    
    static async getInitialProps({query}) {        
        console.log("query id:", query.id)
        const res = await brandObject.getBrandByID(query.id)
        return {brand: res}        
    }

    constructor(props) {
        super(props);

        this.state = {
            workingHours : null,
        }
    }

    async componentDidMount() {        
        let currentComponent = this        

        const workingHours = await workingHoursObject.getWorkingHoursByBrandID(this.props.brand.ID)
        currentComponent.setState({workingHours: workingHours})

    }

    render() {
        const {workingHours} = this.state
        return (
            <>
                <Head>
                    <title>  {this.props.brand.name} | Dashboard</title>
                </Head>

                <NavBar 
                    active_nav_item = "#stores"
                    brand_id={this.props.brand.ID}
                    brand_name={this.props.brand.name}
                    // user_id={cookies.userID}
                    // avatar = {user && user.avatar ? user.avatar[0].url : "../assets/img/avatars/profiles/avatar-1.jpg"}
                />

                <div className="main-content">
                    <div className="container-fluid">
                        <div className="row mt-4 mt-md-5 justify-content-center">
                            <div className="col-12 col-lg-10 col-xl-8">                                

                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <div className="card">
                                                <div className="card-body">
                                                    <div className="list-group list-group-flush my-n3">
                                                        <div className="list-group-item">
                                                            <div className="row align-items-center">
                                                                <div className="col"><h5 className="mb-0">Tên cửa hàng</h5></div>
                                                                <div className="col-auto"><small className="text-muted">Broken Rice - Phan Ngữ</small></div>
                                                            </div>
                                                        </div>
                                                        <div className="list-group-item">
                                                            <div className="row align-items-center">
                                                                <div className="col"><h5 className="mb-0">Địa chỉ</h5></div>
                                                                <div className="col-auto"><small className="text-muted">126 Nguyễn Thị Minh Khai, Quận 3</small></div>
                                                            </div>
                                                        </div>
                                                        <div className="list-group-item">
                                                            <div className="row align-items-center">
                                                                <div className="col"><h5 className="mb-0">Số điện thoại cửa hàng</h5></div>
                                                                <div className="col-auto"><small className="text-muted">012012012021</small></div>
                                                            </div>
                                                        </div>
                                                        <div className="list-group-item">
                                                            <div className="row align-items-center">
                                                                <div className="col"><h5 className="mb-0">Hình ảnh mặt tiền</h5></div>
                                                                <div className="col-auto">
                                                                    <div className="col-auto dropzone dropzone-multiple dz-clickable" data-toggle="dropzone">
                                                                        <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>
                                                                        <div className="dz-default dz-message"><button className="dz-button" type="button">Chọn ảnh</button></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>      
                                                        <div className="list-group-item">
                                                            <div className="row align-items-center">
                                                                <div className="col"><h5 className="mb-0">Hình ảnh khu vực làm việc</h5></div>
                                                                <div className="col-auto">
                                                                    <div className="col-auto dropzone dropzone-multiple dz-clickable" data-toggle="dropzone">
                                                                        <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>
                                                                        <div className="dz-default dz-message"><button className="dz-button" type="button">Chọn ảnh</button></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>                                                    
                                                    </div>
                                                </div>
                                            </div>    
                                    </div>
                                    <div className="col-12 col-lg-6">
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
                                </div>
                                     

                                
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}