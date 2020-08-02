import $ from 'jquery'
import React from 'react';
import Link from 'next/link'
import DropUpWithImage from './drop_up_with_image';
export default class NavBar extends React.Component {
  componentDidMount() {
    $('.navbar-toggler').click(function(){
      if (!$('.navbar-collapse').hasClass('show')) {
        $('.navbar-collapse').addClass('show')
      } else {
        $('.navbar-collapse').removeClass('show')
        // $(this).removeClass('collapse')
      }
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
          <Link href="#" >
            <a className="navbar-brand"><img src="/assets/img/logo.svg" className="navbar-brand-img mx-auto" /></a>
          </Link>

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

              <DropUpWithImage />

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
      </nav>
      )
    }
}