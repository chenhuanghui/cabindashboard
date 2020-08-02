import $ from 'jquery'
import React from 'react';
import Link from 'next/link'
import Router from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies'

export default class NavBar extends React.Component {
  componentDidMount() {
    const cookies = parseCookies()

    //toggle main menu xs
    $('.navbar-toggler').click(function(){
      if (!$('.navbar-collapse').hasClass('show')) {
        $('.navbar-collapse').addClass('show')
      } else {
        $('.navbar-collapse').removeClass('show')
      }
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
      destroyCookie(null, 'isLoggedIn')
      Router.push(`/signin`)
    })
  }

  render () {
    return (
      <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light" id="sidebar">
        <div className="container-fluid">
          {/* toggle button */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* logo */}
          <div className="navbar-brand"><img src="/assets/img/logo.svg" className="navbar-brand-img mx-auto" /></div>
          
          {/* menu user xs */}
          <div className="navbar-user d-md-none">
            <div className="dropdown">
              <a href="#" id="sidebarIcon" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="avatar avatar-sm avatar-online">
                  <img src="../assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="sidebarIcon"> 
                <Link href="#" >
                  <a className="dropdown-item">Tài khoản</a>
                </Link>
                <Link href="#" >
                  <a className="dropdown-item">Hóa đơn</a>
                </Link>

                <hr className="dropdown-divider" />
                <span className="dropdown-item logout">Logout</span>
              </div>
            </div>
          </div>

          <div className="collapse navbar-collapse" id="sidebarCollapse">
            {/* menu group block */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="#"><a className="nav-link"><i className="fe fe-home"></i> Tổng quan</a></Link>
                <Link href="#"><a className="nav-link"><i className="fe fe-file"></i> Sản phẩm</a></Link>
                <Link href="#"><a className="nav-link"><i className="fe fe-user"></i> Nhân sự</a></Link>  
              </li>
            </ul>

            <hr className="navbar-divider my-3" />
            <h6 className="navbar-heading">Ứng dụng</h6>
            <ul className="navbar-nav">
              <li className="nav-item"><Link href="#"><a className="nav-link"><i className="fe fe-clipboard"></i> CRM</a></Link></li>
              <li className="nav-item"><Link href="#"><a className="nav-link"><i className="fe fe-book-open"></i> Học viện</a></Link></li>
            </ul>

            {/* Push content down */}
            <div className="mt-auto"></div>

            <div className="navbar-user d-none d-md-flex" id="sidebarUser">

              <a href="#sidebarModalActivity" className="navbar-user-link" data-toggle="modal">
                <span className="icon"><i className="fe fe-bell"></i></span>
              </a>

              {/* <DropUpWithImage /> */}
              <div className="dropup">
                <a href="#" id="sidebarIconCopy" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div className="avatar avatar-sm avatar-online">
                        <img src="/assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..." />
                    </div>
                </a>
                {/* Menu */}
                <div className="dropdown-menu" aria-labelledby="sidebarIconCopy">
                  <Link href="#" >
                    <a className="dropdown-item">Tài khoản</a>
                  </Link>
                  <Link href="#" >
                    <a className="dropdown-item">Hóa đơn</a>
                  </Link>

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
          {/* end .navbar-collapse */}
        </div>
    <style jsx>{`
    .logout{
      cursor: pointer;
    }
    `}</style>
      </nav>
      )
    }
}