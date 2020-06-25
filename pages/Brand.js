import React from 'react';
import Head from 'next/head'

import NavChildGroup from '../components/nav/nav_child_group'
import DropUpWithImage from '../components/nav/drop_up_with_image'
import HeaderArrow from '../components/header/header_arrow'
import TableRich from '../components/table/table_rich'
import ModalProductEdit from '../components/modal/modal_product_edit'

export default class Brand extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            productData: []
        }
    }
    componentDidMount() {
        var table3Data = [];
        table3Data.title = `Hiệu suất`;
        
        table3Data.col = [];
        table3Data.col.push(`Nhân viên`);
        table3Data.col.push(`Trạng thái`);
        table3Data.col.push(`Số giờ`);
        table3Data.col.push(`Loại`);
        table3Data.col.push(`Lương`);

        table3Data.content = [];
        table3Data.content.push({data1:`Casey Fyfe`,data2:`Đang làm`, data3:`271`, data4:`Part-time`, data5:`235.000`})
        table3Data.content.push({data1:`Casey Fyfe`,data2:`Đang làm`, data3:`271`, data4:`Part-time`, data5:`235.000`})
        table3Data.content.push({data1:`Casey Fyfe`,data2:`Đang làm`, data3:`271`, data4:`Part-time`, data5:`235.000`})
        table3Data.content.push({data1:`Casey Fyfe`,data2:`Đang làm`, data3:`271`, data4:`Part-time`, data5:`235.000`})
        table3Data.content.push({data1:`Casey Fyfe`,data2:`Đang làm`, data3:`271`, data4:`Part-time`, data5:`235.000`})

        table3Data.actionBtn = 'Thêm sản phẩm'
        this.setState({productData:table3Data});
    }

    
    

    render () {
        const {productData} = this.state;
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <meta name="description" content="A fully featured admin theme which can be used to build CRM, CMS, etc." />
                    {/* <script src="../assets/js/theme.min.js"></script> */}
                    <title>Cabin Food Admin</title>

                </Head>

                <ModalProductEdit />

                <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light" id="sidebar">
                    <div className="container-fluid">

                        {/* toggle button */}
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>

                        {/* logo */}
                        <a className="navbar-brand" href="#"> 
                            <img src="/assets/img/logo.svg" className="navbar-brand-img mx-auto" />
                            
                        </a>

                        <div className="collapse navbar-collapse" id="sidebarCollapse">
                            
                            {/* menu group block */}
                            <ul className="navbar-nav">
                                <NavChildGroup />
                                <NavChildGroup />
                                <NavChildGroup />
                            </ul>

                            <hr className="navbar-divider my-3"/>
                            
                            {/* menu group header */}
                            <h6 className="navbar-heading">Documentation</h6>
                            {/* menu group block */}
                            <ul className="navbar-nav">
                                <NavChildGroup />                                
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
                <div class="main-content">

      

<div class="container-fluid">
  <div class="row justify-content-center">
    <div class="col-12 col-lg-10 col-xl-8">

      <div class="header mt-md-5">
        <div class="header-body">
          <div class="row align-items-center">
            <div class="col">

              <h6 class="header-pretitle">
                Overview
              </h6>

              <h1 class="header-title">
               Tài khoản
              </h1>

            </div>
          </div> 
          <div class="row align-items-center">
            <div class="col">

           
              <ul class="nav nav-tabs nav-overflow header-tabs">
                <li class="nav-item">
                  <a href="account-general.html" class="nav-link">
                    Thông tin
                  </a>
                </li>
            
                <li class="nav-item">
                  <a href="account-members.html" class="nav-link active">
                   Nhãn hiệu
                  </a>
                </li>
                <li class="nav-item">
                  <a href="account-security.html" class="nav-link">
                   Hóa đơn
                  </a>
                </li>
             
              </ul>

            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-6">

       
          <div class="card">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col">

                 
                  <h6 class="text-uppercase text-muted mb-2">
                   Số nhãn hiệu sở hữu  
                  </h6>

               
                  <span class="h2 mb-0">
                   2 trên 3 cửa hàng
                  </span>

                </div>
                <div class="col-auto">

                  <a class="btn btn-sm btn-outline-primary" href="#!">Upgrade</a>

                </div>
              </div> 
            </div>
          </div>

        </div>
        <div class="col-12 col-md-6">

          <div class="card">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col">

              
                  <h6 class="text-uppercase text-muted mb-2">
                  Quyền hạn
                  </h6>

              
                  <span class="h2 mb-0">
                   Chủ cửa hàng
                  </span>

                </div>
                <div class="col-auto">

                 
                  <a class="btn btn-sm btn-white" href="#!">Change</a>

                </div>
              </div> 

            </div>
          </div>

        </div>
      </div> 
     
      <div class="card">
        <div class="card-header">

          <h4 class="card-header-title">
           Nhãn hiệu
          </h4>

       
          <div class="dropdown">
            <button class="btn btn-sm btn-primary" type="button" id="inviteMember" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Thêm nhãn hiệu
            </button>
            <form class="dropdown-menu dropdown-menu-right dropdown-menu-card" aria-labelledby="inviteMember">
              <div class="card-header">

              
                <h4 class="card-header-title">
                  Invite a member
                </h4>

               
                <span class="badge badge-soft-primary">2 seats left</span>

              </div>
              <div class="card-header">
                <div class="row no-gutters align-items-center">
                  <div class="col-3">

                   
                    <label class="mb-0" for="inviteMemberName">
                      Name
                    </label>

                  </div>
                  <div class="col">

                    
                    <input class="form-control form-control-flush" id="inviteMemberName" type="text" placeholder="Full name"/>

                  </div>
                </div>
              </div>
              <div class="card-header">
                <div class="row no-gutters align-items-center">
                  <div class="col-3">

                 
                    <label class="mb-0" for="inviteMemberEmail">
                      Email
                    </label>

                  </div>
                  <div class="col">

                   
                    <input class="form-control form-control-flush" id="inviteMemberEmail" type="text" placeholder="Email address"/>

                  </div>
                </div>
              </div>
              <div class="card-footer">

               
                <button class="btn btn-block btn-primary" type="submit">
                  Invite member
                </button>

              </div>
            </form>
          </div>

        </div>
        <div class="card-body">

        
          <div class="list-group list-group-flush my-n3">
            <div class="list-group-item">
              <div class="row align-items-center">
                <div class="col-auto">

               
                  <a href="profile-posts.html" class="avatar">
                    <img src="assets/img/avatars/profiles/avatar-1.jpg" alt="..." class="avatar-img rounded-circle"/>
                  </a>

                </div>
                <div class="col-5 ml-n2">

                 
                  <h4 class="mb-1">
                    <a href="profile-posts.html">Brand 01</a>
                  </h4>

                
                  <p class="small text-muted mb-0">
                    <a class="d-block text-reset text-truncate" href="mailt:dianna.smiley@company.com">dianna.smiley@company.com</a>
                  </p>

                </div>
                <div class="col-auto ml-auto mr-n3">
                <h4 class="mb-1">
                    <a href="profile-posts.html">Đang sử dụng</a>
                  </h4>
               
                </div>
                <div class="col-auto">

                
                  <div class="dropdown">
                    <a class="dropdown-ellipses dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fe fe-more-vertical"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a class="dropdown-item" href="#!">
                        Action
                      </a>
                      <a class="dropdown-item" href="#!">
                        Another action
                      </a>
                      <a class="dropdown-item" href="#!">
                        Something else here
                      </a>
                    </div>
                  </div>

                </div>
              </div> 
            </div>
            <div class="list-group-item">
              <div class="row align-items-center">
                <div class="col-auto">

                
                  <a href="profile-posts.html" class="avatar">
                    <img src="assets/img/avatars/profiles/avatar-2.jpg" alt="..." class="avatar-img rounded-circle"/>
                  </a>

                </div>
                <div class="col-5 ml-n2">

                 
<h4 class="mb-1">
  <a href="profile-posts.html">Brand 01</a>
</h4>


<p class="small text-muted mb-0">
  <a class="d-block text-reset text-truncate" href="mailt:dianna.smiley@company.com">dianna.smiley@company.com</a>
</p>

</div>
<div class="col-auto ml-auto mr-n3">
<h4 class="mb-1">
  <a href="profile-posts.html">Đang sử dụng</a>
</h4>

</div>
                <div class="col-auto">

                 
                  <div class="dropdown">
                    <a class="dropdown-ellipses dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fe fe-more-vertical"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a class="dropdown-item" href="#!">
                        Action
                      </a>
                      <a class="dropdown-item" href="#!">
                        Another action
                      </a>
                      <a class="dropdown-item" href="#!">
                        Something else here
                      </a>
                    </div>
                  </div>

                </div>
              </div> 
            </div>
           
          
              
                

               

                
                <div class="col-auto">

                 
                  <div class="dropdown">
                    <a class="dropdown-ellipses dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fe fe-more-vertical"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a class="dropdown-item" href="#!">
                        Action
                      </a>
                      <a class="dropdown-item" href="#!">
                        Another action
                      </a>
                      <a class="dropdown-item" href="#!">
                        Something else here
                      </a>
                    </div>
                  </div>

                </div>
            </div>
          </div>

        </div>
      </div>

      <br></br>

    </div>
  </div>
  </div>
  </div>


        )
    }
}