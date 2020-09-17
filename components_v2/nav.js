import $ from 'jquery';
import React from 'react';
import Router from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Link from 'next/link'

const UserEntity = require("../entity/UserEntity")
const userObject = new UserEntity()

const cookies = parseCookies()

export default class NavBarNew extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user:[]
        }
    }

    async componentDidMount() {    
        let currentComponent = this
        const user = await userObject.getUserByID(cookies.userID)
        currentComponent.setState({user: user})

        // set active nav item
        $(this.props.active_nav_item).addClass('active')

        //toggle main menu xs
        $('.navbar-toggler').click(function(){
            if (!$('.navbar-collapse').hasClass('show')) $('.navbar-collapse').addClass('show')
            else $('.navbar-collapse').removeClass('show')
        })

        //toggle account menu xs
        $('.navbar-user').click(function(){
            if (!$('.dropdown').hasClass('show')) {
                $('.dropdown').addClass('show')
                $('.dropdown-menu-right').addClass('show')
            } else {
                $('.dropdown').removeClass('show')
                $('.dropdown-menu-right').removeClass('show')
            }
        })    
            
        // logout
        $('.logout').click(function(){
            destroyCookie(null, 'isLoggedIn', {path:'/'})
            Router.push(`/v2/signin`)
        })

    }

    componentDidUpdate (prevProps, prevState) {
        
    }

    render() {
        const {user} = this.state
        return(
            <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light" id="sidebar">
                <div className="container-fluid">
                    {/* toggle button */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* logo */}
                    <div className="navbar-brand text-left">
                        <h1 className="brand_name mb-0">{this.props.brand_name}</h1>
                    </div>
                
                    {/* menu user xs */}
                    <div className="navbar-user d-md-none">
                        <div className="dropdown">
                            <a href="#" id="sidebarIcon" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div className="avatar avatar-sm avatar-online">
                                    <img src="/assets/img/avatars/projects/project-1.jpg" className="avatar-img rounded-circle" alt="..."/>
                                </div>
                            </a>

                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="sidebarIcon">                 
                                <span className="dropdown-item" id="create-brand">Create Brand</span>
                                <hr className="dropdown-divider" />
                                <span className="dropdown-item logout">Logout</span>
                            </div>
                        </div>
                    </div>

                    <div className="collapse navbar-collapse" id="sidebarCollapse">
                        {/* menu group block */}
                        {
                            this.props.brand_id
                            ? 
                            <>
                                <ul className="navbar-nav">
                                    <li className="nav-item">                                
                                        <Link href="/v2/brands/[id]/dashboard" as={`/v2/brands/${this.props.brand_id}/dashboard`}><a className="nav-link" id="dashboard"><i className="fe fe-home"></i> Trang chủ</a></Link>                                
                                        <Link href="/v2/brands/[id]/feed" as={`/v2/brands/${this.props.brand_id}/feed`}><a className="nav-link" id="feed"><i className="fe fe-feather"></i> Bài viết</a></Link>                                
                                        <Link href="/v2/brands/[id]/info" as={`/v2/brands/${this.props.brand_id}/info`}><a className="nav-link" id="info"><i className="fe fe-calendar"></i> Thông tin</a></Link>
                                        <Link href="/v2/brands/[id]/stores" as={`/v2/brands/${this.props.brand_id}/stores`}><a className="nav-link" id="stores"><i className="fe fe-cpu"></i> Cửa hàng</a></Link>
                                        <Link href="/v2/brands/[id]/products" as={`/v2/brands/${this.props.brand_id}/products`}><a className="nav-link" id="products"><i className="fe fe-package"></i> Sản phẩm</a></Link>
                                        <Link href="/v2/brands/[id]/services" as={`/v2/brands/${this.props.brand_id}/services`}><a className="nav-link" id="services"><i className="fe fe-compass"></i> Dịch vụ</a></Link>
                                        <Link href="/v2/brands/[id]/users" as={`/v2/brands/${this.props.brand_id}/users`}><a className="nav-link" id="users"><i className="fe fe-users"></i> Người dùng</a></Link>
                                    </li>
                                </ul>
                                <hr className="navbar-divider my-3" />
                                </>
                            : null
                        }
                        
                        <h6 className="navbar-heading">Hệ thống hỗ trợ</h6>
                        <ul className="navbar-nav">
                            <li className="nav-item">                                
                                <Link href="#"><a className="nav-link"><i className="fe fe-aperture"></i> Supply</a></Link>
                                <Link href="#"><a className="nav-link"><i className="fe fe-github"></i> HRM</a></Link>
                                <Link href="#"><a className="nav-link"><i className="fe fe-user-check"></i> CRM</a></Link>
                                <Link href="#"><a className="nav-link"><i className="fe fe-server"></i>CabinPOS</a></Link>                                
                                <Link href="#"><a className="nav-link"><i className="fe fe-globe"></i> CabinEat</a></Link>
                                <Link href="#"><a className="nav-link"><i className="fe fe-cloud-drizzle"></i> TableEat</a></Link>
                            </li>
                        </ul>
                        
                        <div className="mt-auto"></div>

                        <div className="navbar-user d-none d-md-flex" id="sidebarUser">
                            <a href="#sidebarModalActivity" className="navbar-user-link" data-toggle="modal">
                                <span className="icon"><i className="fe fe-bell"></i></span>
                            </a>

                            {/* <DropUpWithImage /> */}
                            <div className="dropup">
                                <a href="#" id="sidebarIconCopy" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <div className="avatar avatar-sm avatar-online">
                                        <img src={user.avatar ? user.avatar[0].url : "../assets/img/avatars/profiles/avatar-1.jpg"} className="avatar-img rounded-circle" alt={user.name}/>
                                    </div>
                                </a>
                                {/* Menu */}
                                
                                <div className="dropdown-menu" aria-labelledby="sidebarIconCopy">
                                    <span className="dropdown-item" id="create-brand">Create Brand</span>
                                    <hr className="dropdown-divider" />                  
                                    <span className="dropdown-item logout">Logout</span>
                                </div>
                            </div>

                            {/* Icon */}
                            <a href="#sidebarModalSearch" className="navbar-user-link" data-toggle="modal">
                                <span className="icon">
                                <i className="fe fe-search"></i>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                .logout{cursor: pointer;}
                .navbar-brand {
                    white-space: normal !important;
                }
                @media (max-width: 768px) {
                    .navbar-brand {
                        max-width: 80%;
                    }
                    .navbar-brand .brand_name{
                        overflow-wrap: break-word;
                        text-align: center;
                        font-size: 100%
                    }   
                }
                .brand_name {
                    overflow-wrap: break-word
                }
            `}</style>
            </nav>
        )
    }
}