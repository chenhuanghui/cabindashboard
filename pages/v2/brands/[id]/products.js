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
        $("#btn_add_product").click(function(){
            $("#showAddProduct").show()
            $("#showAddProduct input").focus()
        })
        $("#btnAddCategoryCancel").click(function(){
            $("#showAddProduct").hide()
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
                        <div class="header mt-md-5">
                            <div class="header-body">
                                <div class="row align-items-center">
                                <div class="col">
                                    <h6 class="header-pretitle">Thực đơn</h6>
                                    <h1 class="header-title">Sản phẩm</h1>
                                </div>
                                </div>
                                <div class="row align-items-center">
                                    <div class="col">
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
                            <div className="col-12">
                                <div className="mt-4">
                                    <hr/>
                                    <h3 className="text text-primary"><a href="#" id="btn_add_product">+ Thêm danh mục mới</a></h3>
                                    <div className="card" id="showAddProduct" style={{display: "none"}}>
                                        <div className="row py-2" style={{position: "relative"}}>                                            
                                            <div className="col-10">
                                                <input type="text" className="form-control form-control-flush ml-4" placeholder="Form control flush"/>
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