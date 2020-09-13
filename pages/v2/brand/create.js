import $ from 'jquery';
import React from 'react';
import Head from 'next/head'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Link from 'next/link'

import TextareaAutosize from 'react-textarea-autosize';
import NavBar from "../../../components_v2/nav"

const AirtablePlus = require('airtable-plus');  

export default class BrandCreate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            account:[]
        }
    }

    componentDidMount() {
        
    }

    componentDidUpdate (prevProps, prevState) {
        
    }

    render() {
        return(
            <>
                <Head>
                    <title>  {``} | Dashboard</title>
                </Head>

                <NavBar 
                    brand_name="Create Brand"
                />

                <div className="main-content">
                    <div className="container-fluid">
                        <div className="row mt-4 mt-md-5 justify-content-center">
                            <div className="col-12 col-lg-10 col-xl-8">
                                <div className="header">
                                    <div className="header-body">
                                        <div className="row align-items-end">
                                            <div className="col-auto">
                                                <button className="btn btn-lg btn-rounded-circle btn-white"> + </button>    
                                                <span class="fe fe-arrow-left mr-4"></span>
                                            </div>
                                            
                                            <div className="col">
                                                <h6 className="header-pretitle">ĐĂNG KÝ</h6>
                                                <h1 className="header-title">THƯƠNG HIỆU KINH DOANH</h1>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>                                
                                <div className="form-group">
                                    <label className="mb-1">Logo</label>
                                    <small className="form-text text-muted">Vui lòng chọn file ảnh có chất lượng.</small>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone">
                                                <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>
                                                <div className="dz-default dz-message">
                                                    <button className="dz-button" type="button">Drop files here to upload</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>     

                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title"> Thông tin cơ bản</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>Tên thương hiệu</label>
                                            <input type="text" className="form-control"/>
                                        </div>

                                        <div className="form-group">
                                            <label>Giới thiệu</label>
                                            <TextareaAutosize 
                                                className="form-control" 
                                                id="post-content" data-toggle="autosize" minRows="3" placeholder="Start a post..." 
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title"> Thông tin pháp lý đăng ký kênh bán hàng</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>Họ và tên</label>
                                            <input type="text" className="form-control"/>                                            
                                        </div>
                                        <div className="form-group">
                                            <label>Số điện thoại</label>
                                            <input type="text" className="form-control"/>                                            
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" className="form-control"/>                                            
                                        </div>
                                        <div className="form-group">
                                            <label>CMND mặt trước</label>
                                            <input type="text" className="form-control"/>                                            
                                        </div>
                                        <div className="form-group">
                                            <label>CMND mặt sau</label>
                                            <input type="text" className="form-control"/>                                            
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title"> Giờ hoạt động</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>Thứ hai</label>
                                            <input type="text" className="form-control"/>                                            
                                        </div>
                                        <div className="form-group">
                                            <label>Thứ ba</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Thứ tư</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Thứ năm</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Thứ sáu</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Thứ bảy</label>
                                            <input type="text" className="form-control"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Chủ nhật</label>
                                            <input type="text" className="form-control"/>
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