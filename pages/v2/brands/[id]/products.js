import React from 'react';
import Head from 'next/head'
import Link from 'next/link';
import $, { data } from 'jquery'
import NavBar from "../../../../components_v2/nav"

const BrandEntity = require("../../../../entity/BrandEntity")
const brandObject = new BrandEntity()

export default class LayoutInfo extends React.Component {
    
    static async getInitialProps({query}) {        
        console.log("query id:", query.id)
        const res = await brandObject.getBrandByID(query.id)
        return {brand: res}        
    }

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {        
        let currentComponent = this        
        $("#btnAddCategory").click(function(){
            $("#showAddCategory").show()
            $("#showAddProduct input").focus()
        })
        $("#btnAddCategoryCancel").click(function(){
            $("#showAddCategory").hide()
        })

        $(".btnAddProduct").click(function(){
            let catID = $(this).attr("data")
            $(catID).find(".showAddProduct").show()
            $(catID).find(".showAddProduct input:first").focus()
        })
    }

    render() {
        return (
            <>
                <Head>
                    <title>  {this.props.brand.name} | Dashboard</title>
                </Head>

                <NavBar 
                    active_nav_item = "#products"
                    brand_id={this.props.brand.ID}
                    brand_name={this.props.brand.name}
                />

                <div className="main-content">
                    <div className="container-fluid">
                        <div className="header mt-md-5">
                            <div className="header-body">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h6 className="header-pretitle">Thực đơn</h6>
                                        <h1 className="header-title">Sản phẩm</h1>
                                    </div>
                                </div>

                                <div className="row align-items-center">
                                    <div className="col">
                                        <ul className="nav nav-tabs nav-overflow header-tabs">
                                            <li className="nav-item">
                                                <a href="team-overview.html" className="nav-link">Tất cả</a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="team-projects.html" className="nav-link">Đang bán</a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="team-members.html" className="nav-link active">Hết món</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-12" id="catname">
                                <h3 className="">Đồ uống</h3>                            
                                <div className="card">
                                    <div className="card-body">
                                        <div className="list-group list-group-flush my-n4">
                                            <div className="list-group-item">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <a href="#" className="avatar avatar-4by3">
                                                            <img src="/assets/img/avatars/profiles/avatar-1.jpg" alt="..." className="avatar-img rounded"/>
                                                        </a>
                                                    </div>
                                                    <div className="col-2">
                                                        <h5 className="mb-1 text-focus">Coldbrew cam vàng thơm ngon khó cưỡng</h5>
                                                    </div>
                                                    <div className="col-4">
                                                        <p className="mb-1 text-muted small text-center">Sự kết hợp vừa quen vừa lạ giữa cà phê ngâm lạnh (100% Arabica Cầu...</p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="mb-1 small text-center"><span className="fe fe-tag mr-2"></span>120.000</p>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div className="custom-control custom-switch">
                                                            <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
                                                            <label className="custom-control-label" for="customSwitch1"></label>
                                                        </div>
                                                    </div>
                                                </div>                                                
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-body">
                                        <div className="list-group list-group-flush my-n4">
                                            <div className="list-group-item">
                                                <div className="row align-items-center">
                                                    <div className="col-auto">
                                                        <a href="#" className="avatar avatar-4by3">
                                                            <img src="/assets/img/avatars/profiles/avatar-1.jpg" alt="..." className="avatar-img rounded"/>
                                                        </a>
                                                    </div>
                                                    <div className="col-2">
                                                        <h5 className="mb-1 text-focus">Coldbrew cam vàng thơm ngon khó cưỡng</h5>
                                                    </div>
                                                    <div className="col-4">
                                                        <p className="mb-1 text-muted small text-center">Sự kết hợp vừa quen vừa lạ giữa cà phê ngâm lạnh (100% Arabica Cầu...</p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="mb-1 small text-center"><span className="fe fe-tag mr-2"></span>120.000</p>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div className="custom-control custom-switch">
                                                            <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
                                                            <label className="custom-control-label" for="customSwitch1"></label>
                                                        </div>
                                                    </div>
                                                </div>                                                
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>
                                


                                <h4 className="text text-primary my-5"><a href="#" className="btnAddProduct" data="#catname">+ Thêm sản phẩm mới</a></h4>
                                <div className="card showAddProduct" style={{display: "none"}}>
                                    <div className="row py-2" style={{position: "relative"}}>                                            
                                        <div className="col-8">
                                            <input type="text" className="form-control form-control-flush ml-4" placeholder="Thêm sản phẩm mới"/>
                                        </div>
                                        <div className="col-auto py-n4">
                                            <p className="mb-1 small text-center text-muted">
                                                <div className="input-group input-group-flush">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="fe fe-tag"></i></span>
                                                    </div>
                                                    <input className="form-control list-search" placeholder="0.000 đ"/>
                                                </div>
                                            </p>
                                        </div>
                                        <div className="col-auto py-2" style={{position:"absolute", right: "10px"}}>
                                            <button className="btn btn-white mr-3 btn-sm" id="btnAddCategoryCancel"> Hủy</button>
                                            <button className="btn btn-primary btn-sm" id="btnAddCategoryCreate"> Tạo</button>
                                        </div>
                                        
                                    </div>                                        
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className="row">
                            <div className="col-12">
                                <div className="mt-4">
                                    <hr/>
                                    <h2 className="text text-primary"><a href="#" id="btnAddCategory">+ Thêm danh mục mới</a></h2>
                                    <div className="card" id="showAddCategory" style={{display: "none"}}>
                                        <div className="row py-2" style={{position: "relative"}}>                                            
                                            <div className="col-10">
                                                <input type="text" className="form-control form-control-flush ml-4" placeholder="Thêm danh mục mới"/>
                                            </div>
                                            <div className="col-auto py-2" style={{position:"absolute", right: "10px"}}>
                                                <button className="btn btn-white mr-3 btn-sm" id="btnAddCategoryCancel"> Hủy</button>
                                                <button className="btn btn-primary btn-sm" id="btnAddCategoryCreate"> Tạo</button>
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