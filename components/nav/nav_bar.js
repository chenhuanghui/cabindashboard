import $ from 'jquery'
import React from 'react';
import Link from 'next/link'
import Router from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const AirtablePlus = require('airtable-plus');  
const airtable = new AirtablePlus({
  baseID: 'appmREe03n1MQ6ydq',
  apiKey: 'keyLNupG6zOmmokND',
  tableName: 'Brand',
});

async function retrieveData(formular,tbName) {
  try {
    const readRes = await airtable.read(formular,{tableName:tbName});
    return readRes
  } catch(e) {
    console.error(e);
  }
}

export default class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    let currentComponent = this;
    const cookies = parseCookies()
    
    if(cookies.userID && cookies.isLoggedIn) {
      retrieveData({
        view: 'Grid view',
        filterByFormula:`ID="${cookies.userID}"`
      },'Account')
      .then (result => {
        console.log('nav data:',result);
        currentComponent.setState({data:result[0].fields})
      })  
    }
    
    // ==========================================
    // javascript action
    // ==========================================

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
      destroyCookie(null, 'isLoggedIn', {path:'/'})
      destroyCookie(null, 'userID', {path:'/'})
      destroyCookie(null, 'brandID', {path:'/'})
      Router.push(`/signin`)
    })


  }

  render () {
    const {data} = this.state;
    return (
      <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light" id="sidebar">
        <div className="container-fluid">
          {/* toggle button */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* logo */}
          <div className="navbar-brand"><img src="/assets/img/logo.png" className="navbar-brand-img mx-auto" /></div>
          
          {/* menu user xs */}
          <div className="navbar-user d-md-none">
            <div className="dropdown">
              <a href="#" id="sidebarIcon" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="avatar avatar-sm avatar-online">
                  {data && data.avatar
                  ? <img src={data.avatar[0].url} className="avatar-img rounded-circle" alt="..."/>
                  : <img src="../assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
                  }
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="sidebarIcon"> 
                {data && data.brandName && data.brandName.map((b,index) => (
                  <Link href="/brands/{ID}" as={`/brands/${data.brandID[index]}`} key={b.toString()}>
                    <a className="dropdown-item">{b}</a>
                  </Link>
                ))}

                <hr className="dropdown-divider" />
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
                <Link href="/">
                  <a className="nav-link"><i className="fe fe-home"></i> Tổng quan</a>
                </Link>
                <Link href="/products">
                  <a className="nav-link"><i className="fe fe-file"></i> Sản phẩm</a>
                </Link>
                <Link href="#">
                  <a className="nav-link"><i className="fe fe-user"></i> Nhân sự</a>
                </Link>  
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
                      {data && data.avatar
                      ? <img src={data.avatar[0].url} className="avatar-img rounded-circle" alt="..."/>
                      : <img src="../assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
                      }
                    </div>
                </a>
                {/* Menu */}
                <div className="dropdown-menu" aria-labelledby="sidebarIconCopy">
                  {data && data.brandName && data.brandName.map((b,index) => (
                    <Link href="/brands/{ID}" as={`/brands/${data.brandID[index]}`} key={b.toString()}>
                      <a className="dropdown-item">{b}</a>
                    </Link>
                  ))}

                  <hr className="dropdown-divider" />
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