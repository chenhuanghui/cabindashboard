import $ from 'jquery'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Router from 'next/router';
import { useRouter } from 'next/router'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const AirtablePlus = require('airtable-plus');  
const airtable = new AirtablePlus({
  baseID: process.env.AIR_TABLE_BASE_ID,
  apiKey: process.env.AIR_TABLE_API_KEY,
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

function NavBar () {
  const router = useRouter();
  const cookies = parseCookies();
  const [data, setData] = useState(null);
  const [brand, setBrand] = useState(null);
  const [sID, setSID] = useState(null);

  useEffect(() => {
    if(!cookies.userID || !cookies.isLoggedIn || !cookies.brandID) {
      destroyCookie(userID)
      destroyCookie(isLoggedIn)
      destroyCookie(role)
      Router.push('/signin')
    }

    setSID(router.query.id)
    console.log('router 1: ',router)

    if (router.query.id === sID) {
      retrieveData({filterByFormula:`ID="${cookies.userID}"`},'Account')
      .then (result => {
        if (result.length > 0) setData(result[0].fields)
      })
      
      retrieveData({filterByFormula:`ID="${sID}"`},'Brand')
      .then(res => {
        if (res.length > 0) setBrand(res[0].fields)
      })                
      
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
  },[sID])
  return(
    <>
      <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light" id="sidebar">
        <div className="container-fluid">
          {/* toggle button */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* logo */}
          <div className="navbar-brand">
          { brand && brand.logo
          ? <img src={brand.logo[0].url} className="navbar-brand-img mx-auto" />
          : <img src="/assets/img/logo.png" className="navbar-brand-img mx-auto" />
          }
          </div>
          
          {/* menu user xs */}
          <div className="navbar-user d-md-none">
            <div className="dropdown">
              <a href="#" id="sidebarIcon" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="avatar avatar-sm avatar-online">
                  {data && data.avatar && data.avatar.length > 0
                  ? <img src={data.avatar[0].url} className="avatar-img rounded-circle" alt="..."/>
                  : <img src="../assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
                  }
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="sidebarIcon"> 
                {data && data.brandName && data.brandName.map((b,index) => (
                  <Link href="/feed/[ID]" as={`/feed/${data.brandID[index]}`} key={b.toString()}>
                    <a className="dropdown-item">{b}</a>
                  </Link>
                ))}
                
                <hr className="dropdown-divider" />
                <Link href="/documents"><a className="dropdown-item">Tài liệu</a></Link>
                
                <hr className="dropdown-divider" />
                <Link href="/account" ><a className="dropdown-item">Tài khoản</a></Link>
                <Link href="#" ><a className="dropdown-item">Hóa đơn</a></Link>                
                
                { data && data.roleValue && parseInt(data.roleValue)<=2
                ? <Link href="/config" ><a className="dropdown-item">Thiết lập</a></Link>                
                : ''
                }

                <hr className="dropdown-divider" />
                <span className="dropdown-item logout">Logout</span>
              </div>
            </div>
          </div>

          <div className="collapse navbar-collapse" id="sidebarCollapse">
            {/* menu group block */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="/feed/[id]" as = {`/feed/${cookies.brandID}`}>
                  <a className="nav-link active"><i className="fe fe-wind"></i> New Feed</a>
                </Link>
                <Link href="/overview/[id]" as = {`/overview/${cookies.brandID}`}>
                  <a className="nav-link"><i className="fe fe-home"></i> Tổng quan</a>
                </Link>
                <Link href="/products">
                  <a className="nav-link"><i className="fe fe-file"></i> Sản phẩm</a>
                </Link>
                <Link href="/staffs">
                  <a className="nav-link"><i className="fe fe-user"></i> Nhân sự</a>
                </Link>  
                <Link href="/equipments">
                  <a className="nav-link"><i className="fe fe-shopping-bag"></i> Thiết bị</a>
                </Link>  
              </li>
            </ul>

            <hr className="navbar-divider my-3" />
            <h6 className="navbar-heading">Ứng dụng</h6>
            <ul className="navbar-nav">
              <li className="nav-item"><Link href="#"><a className="nav-link"><i className="fe fe-clipboard"></i> Transaction</a></Link></li>
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
                    <Link href="/feed/[ID]" as={`/feed/${data.brandID[index]}`} key={b.toString()}>
                      <a className="dropdown-item">{b}</a>
                    </Link>
                  ))}
                  
                  <hr className="dropdown-divider" />
                  <Link href="/documents" >
                    <a className="dropdown-item">Tài liệu</a>
                  </Link>
                  
                  <hr className="dropdown-divider" />
                  <Link href="/account" ><a className="dropdown-item">Tài khoản</a></Link>
                  <Link href="#" ><a className="dropdown-item">Hóa đơn</a></Link>
                  { data && data.roleValue && parseInt(data.roleValue) <= 2
                  ? <Link href="/config" ><a className="dropdown-item">Thiết lập</a></Link>                
                  : ''
                  }

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
    @media (min-width: 768px) {
      .navbar-vertical.navbar-expand-md .navbar-brand-img {
        max-height: 4rem;
      }
    }

    `}</style>
      </nav>
    </>
  )
}

export default NavBar


// ===================================================
// ===================================================
// ===================================================

// export default class NavBar extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       data: [],
//       brand:[]
//     }
//   }

//   componentDidMount() {
//     let currentComponent = this;
//     const cookies = parseCookies()
    
//     if(cookies.userID && cookies.isLoggedIn && cookies.brandID) {
//       retrieveData({filterByFormula:`ID="${cookies.userID}"`},'Account')
//       .then (result => {
//         if (result.length > 0) {
//           currentComponent.setState({data:result[0].fields})
//         }        
//       })
      
//       retrieveData({filterByFormula:`ID="${cookies.brandID}"`},'Brand')
//       .then(res => {
//         if (res.length > 0) currentComponent.setState({brand:res[0].fields})
//       })                
//     }
    
//     // ==========================================
//     // javascript action
//     // ==========================================

//     //toggle main menu xs
//     $('.navbar-toggler').click(function(){
//       if (!$('.navbar-collapse').hasClass('show')) {
//         $('.navbar-collapse').addClass('show')
//       } else {
//         $('.navbar-collapse').removeClass('show')
//       }
//     })
//     //toggle account menu xs
//     $('.navbar-user').click(function(){
//       if (!$('.dropdown').hasClass('show')) {
//         $('.dropdown').addClass('show')
//         $('.dropdown-menu-right').addClass('show')
//       } else {
//         $('.dropdown').removeClass('show')
//         $('.dropdown-menu-right').removeClass('show')
//       }
//     })
    
//     // logout
//     $('.logout').click(function(){
//       destroyCookie(null, 'isLoggedIn', {path:'/'})
//       destroyCookie(null, 'userID', {path:'/'})
//       destroyCookie(null, 'brandID', {path:'/'})
//       Router.push(`/signin`)
//     })


//   }

//   render () {
//     const {data, brand} = this.state;
//     const cookies = parseCookies()
//     return (
//       <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light" id="sidebar">
//         <div className="container-fluid">
//           {/* toggle button */}
//           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           {/* logo */}
//           <div className="navbar-brand">
//           { brand && brand.logo
//           ? <img src={brand.logo[0].url} className="navbar-brand-img mx-auto" />
//           : <img src="/assets/img/logo.png" className="navbar-brand-img mx-auto" />
//           }
//           </div>
          
//           {/* menu user xs */}
//           <div className="navbar-user d-md-none">
//             <div className="dropdown">
//               <a href="#" id="sidebarIcon" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                 <div className="avatar avatar-sm avatar-online">
//                   {data && data.avatar && data.avatar.length > 0
//                   ? <img src={data.avatar[0].url} className="avatar-img rounded-circle" alt="..."/>
//                   : <img src="../assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
//                   }
//                 </div>
//               </a>
//               <div className="dropdown-menu dropdown-menu-right" aria-labelledby="sidebarIcon"> 
//                 {data && data.brandName && data.brandName.map((b,index) => (
//                   <Link href="/feed/[ID]" as={`/feed/${data.brandID[index]}`} key={b.toString()}>
//                     <a className="dropdown-item">{b}</a>
//                   </Link>
//                 ))}
                
//                 <hr className="dropdown-divider" />
//                 <Link href="/documents"><a className="dropdown-item">Tài liệu</a></Link>
                
//                 <hr className="dropdown-divider" />
//                 <Link href="/account" ><a className="dropdown-item">Tài khoản</a></Link>
//                 <Link href="#" ><a className="dropdown-item">Hóa đơn</a></Link>                
                
//                 { data && data.roleValue && parseInt(data.roleValue)<=2
//                 ? <Link href="/config" ><a className="dropdown-item">Thiết lập</a></Link>                
//                 : ''
//                 }

//                 <hr className="dropdown-divider" />
//                 <span className="dropdown-item logout">Logout</span>
//               </div>
//             </div>
//           </div>

//           <div className="collapse navbar-collapse" id="sidebarCollapse">
//             {/* menu group block */}
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <Link href="/feed/[id]" as = {`/feed/${cookies.brandID}`}>
//                   <a className="nav-link active"><i className="fe fe-wind"></i> New Feed</a>
//                 </Link>
//                 <Link href="/overview/[id]" as = {`/overview/${cookies.brandID}`}>
//                   <a className="nav-link"><i className="fe fe-home"></i> Tổng quan</a>
//                 </Link>
//                 <Link href="/products">
//                   <a className="nav-link"><i className="fe fe-file"></i> Sản phẩm</a>
//                 </Link>
//                 <Link href="/staffs">
//                   <a className="nav-link"><i className="fe fe-user"></i> Nhân sự</a>
//                 </Link>  
//                 <Link href="/equipments">
//                   <a className="nav-link"><i className="fe fe-shopping-bag"></i> Thiết bị</a>
//                 </Link>  
//               </li>
//             </ul>

//             <hr className="navbar-divider my-3" />
//             <h6 className="navbar-heading">Ứng dụng</h6>
//             <ul className="navbar-nav">
//               <li className="nav-item"><Link href="#"><a className="nav-link"><i className="fe fe-clipboard"></i> Transaction</a></Link></li>
//               <li className="nav-item"><Link href="#"><a className="nav-link"><i className="fe fe-clipboard"></i> CRM</a></Link></li>
//               <li className="nav-item"><Link href="#"><a className="nav-link"><i className="fe fe-book-open"></i> Học viện</a></Link></li>
//             </ul>

//             {/* Push content down */}
//             <div className="mt-auto"></div>

//             <div className="navbar-user d-none d-md-flex" id="sidebarUser">

//               <a href="#sidebarModalActivity" className="navbar-user-link" data-toggle="modal">
//                 <span className="icon"><i className="fe fe-bell"></i></span>
//               </a>

//               {/* <DropUpWithImage /> */}
//               <div className="dropup">
//                 <a href="#" id="sidebarIconCopy" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                     <div className="avatar avatar-sm avatar-online">
//                       {data && data.avatar
//                       ? <img src={data.avatar[0].url} className="avatar-img rounded-circle" alt="..."/>
//                       : <img src="../assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
//                       }
//                     </div>
//                 </a>
//                 {/* Menu */}
//                 <div className="dropdown-menu" aria-labelledby="sidebarIconCopy">
//                   {data && data.brandName && data.brandName.map((b,index) => (
//                     <Link href="/feed/[ID]" as={`/feed/${data.brandID[index]}`} key={b.toString()}>
//                       <a className="dropdown-item">{b}</a>
//                     </Link>
//                   ))}
                  
//                   <hr className="dropdown-divider" />
//                   <Link href="/documents" >
//                     <a className="dropdown-item">Tài liệu</a>
//                   </Link>
                  
//                   <hr className="dropdown-divider" />
//                   <Link href="/account" ><a className="dropdown-item">Tài khoản</a></Link>
//                   <Link href="#" ><a className="dropdown-item">Hóa đơn</a></Link>
//                   { data && data.roleValue && parseInt(data.roleValue)<=2
//                   ? <Link href="/config" ><a className="dropdown-item">Thiết lập</a></Link>                
//                   : ''
//                   }

//                   <hr className="dropdown-divider" />
//                   <span className="dropdown-item logout">Logout</span>
//                 </div>
//             </div>

//               {/* Icon */}
//               <a href="#sidebarModalSearch" className="navbar-user-link" data-toggle="modal">
//                 <span className="icon">
//                   <i className="fe fe-search"></i>
//                 </span>
//               </a>

//             </div>
//           </div>
//           {/* end .navbar-collapse */}
//         </div>
//     <style jsx>{`
//     .logout{
//       cursor: pointer;
//     }
//     @media (min-width: 768px) {
//       .navbar-vertical.navbar-expand-md .navbar-brand-img {
//         max-height: 4rem;
//       }
//     }

//     `}</style>
//       </nav>
//       )
//     }
// }