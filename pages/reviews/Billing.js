import React from 'react';
import Head from 'next/head'

import NavChildGroup from '../../components/nav/nav_child_group'
// import DropUpWithImage from '../../components/nav/drop_up_with_image'
import HeaderArrow from '../../components/header/header_arrow'
import TableRich from '../../components/table/table_rich'
import ModalProductEdit from '../../components/modal/modal_product_edit'

export default class Billing extends React.Component {
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
                        <a className="navbar-brand" href="../Dashboard"> 
                            <img src="/assets/img/logo.svg" className="navbar-brand-img mx-auto" />
                            
                        </a>

                        <div className="collapse navbar-collapse" id="sidebarCollapse">
                            
                            {/* menu group block */}
                            <ul className="navbar-nav">
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

                                {/* <DropUpWithImage /> */}

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
                Account
              </h1>

            </div>
          </div>
          <div class="row align-items-center">
            <div class="col">

         
            <ul class="nav nav-tabs nav-overflow header-tabs">
                <li class="nav-item">
                  <a href="../Account" class="nav-link active">
                  Thông tin
                  </a>
                </li>
                <li class="nav-item">
                  <a href="../Brand" class="nav-link">
                Nhãn hiệu
                  </a>
                </li>
                <li class="nav-item">
                  <a href="../Billing" class="nav-link">
                    Hóa đơn
                  </a>
                </li>

              </ul>


            </div>
          </div>
        </div>
      </div>

      <div class="alert alert-danger">
        <i class="fe fe-info mr-1"></i> You are near your API limits.
      </div>

      <div class="row">
        <div class="col-12 col-md-6">

          <div class="card">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col">

                  <h6 class="text-uppercase text-muted mb-2">
                    Current plan
                  </h6>

                
                  <span class="h2 mb-0">
                    $29/mo
                  </span>

                </div>
                <div class="col-auto">

                  <a class="btn btn-sm btn-primary" href="pricing.html">Upgrade</a>

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
                    API usage <i class="fe fe-info" data-toggle="tooltip" data-title="Your limits renew on May 1, 2020" data-original-title="" title=""></i>
                  </h6>

                 
                  <span class="h2 mb-0">
                    7,500 of 10,000
                  </span>

                </div>
                <div class="col-auto">

                 
                  <div class="chart chart-sparkline"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                    <canvas class="chart-canvas chartjs-render-monitor" id="sparklineChart" ></canvas>
                  </div>

                </div>
              </div> 

            </div>
          </div>

        </div>
      </div>

    
      <div class="card">
              <div class="card-header">
                <div class="row align-items-center">
                  <div class="col">

                    <h4 class="card-header-title">
                      Payment methods
                    </h4>

                  </div>
                  <div class="col-auto">

                    <a class="btn btn-sm btn-primary" href="#!">
                      Add method
                    </a>

                  </div>
                </div>
              </div>
              <div class="card-body">

                <div class="list-group list-group-flush my-n3">
                  <div class="list-group-item">
                    <div class="row align-items-center">
                      <div class="col-auto">

                        <img class="img-fluid" src="assets/img/payment-methods/visa.svg" alt="..."  style={{maxWidth: "38px"}}/>

                      </div>
                      <div class="col ml-n2">

                        <h4 class="mb-1">
                          Visa ending in 1234
                        </h4>

                        <small class="text-muted">
                          Expires 3/2024
                        </small>

                      </div>
                      <div class="col-auto mr-n3">

                        <span class="badge badge-light">
                          Default
                        </span>

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

                        <img class="img-fluid" src="assets/img/payment-methods/mastercard.svg" alt="..." style={{maxWidth: "38px"}} />

                      </div>
                      <div class="col ml-n2">

                        <h4 class="mb-1">
                          Mastercard ending in 1234
                        </h4>

                        <small class="text-muted">
                          Expires 3/2024
                        </small>

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
            </div>
      <div class="card">
        <div class="card-header">

        
          <h4 class="card-header-title">
            Invoices
          </h4>

        </div>
        <div class="table-responsive">
          <table class="table table-sm table-nowrap card-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody class="font-size-base">
              <tr>
                <td>
                  <a href="invoice.html">Invoice #10395</a>
                </td>
                <td>
                  <time datetime="2020-04-24">Apr. 24, 2020</time>
                </td>
                <td>
                  $29.00
                </td>
                <td>
                  <span class="badge badge-secondary">Outstanding</span>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="invoice.html">Invoice #10244</a>
                </td>
                <td>
                  <time datetime="2020-03-24">Mar. 24, 2020</time>
                </td>
                <td>
                  $29.00
                </td>
                <td>
                  <span class="badge badge-success">Paid</span>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="invoice.html">Invoice #10119</a>
                </td>
                <td>
                  <time datetime="2020-02-24">Feb. 24, 2020</time>
                </td>
                <td>
                  $29.00
                </td>
                <td>
                  <span class="badge badge-success">Paid</span>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="invoice.html">Invoice #10062</a>
                </td>
                <td>
                  <time datetime="2020-01-24">Jan. 24, 2020</time>
                </td>
                <td>
                  $29.00
                </td>
                <td>
                  <span class="badge badge-success">Paid</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    
      <p class="text-center">
        <small class="text-muted">Don’t need Dashkit anymore? <a href="#!">Cancel your account</a></small>
      </p>

      <br/>

    </div>
  </div> 
</div>

</div>
  </div>


        )
    }
}