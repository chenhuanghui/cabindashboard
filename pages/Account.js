import React from 'react';
import Head from 'next/head'

import NavChildGroup from '../components/nav/nav_child_group'
import DropUpWithImage from '../components/nav/drop_up_with_image'
import HeaderArrow from '../components/header/header_arrow'
import TableRich from '../components/table/table_rich'
import ModalProductEdit from '../components/modal/modal_product_edit'

export default class Account extends React.Component {
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

    
      <form>

        <div class="row justify-content-between align-items-center">
          <div class="col">
            <div class="row align-items-center">
              <div class="col-auto">

              
                <div class="avatar">
                  <img class="avatar-img rounded-circle" src="assets/img/avatars/profiles/avatar-1.jpg" alt="..."/>
                </div>

              </div>
              <div class="col ml-n2">

               
                <h4 class="mb-1">
                  Your avatar
                </h4>

               
                <small class="text-muted">
                  PNG or JPG no bigger than 1000px wide and tall.
                </small>

              </div>
            </div>
          </div>
          <div class="col-auto">

           
            <button class="btn btn-sm btn-primary">
              Upload
            </button>

          </div>
        </div> 

       
        <hr class="my-5"/>

        <div class="row">
       
       
          <div class="col-12">

           
            <div class="form-group">

             
              <label class="mb-1">
                Email address
              </label>

            
              <small class="form-text text-muted">
                This contact will be shown to others publicly, so choose it carefully.
              </small>

            
              <input type="email" class="form-control"/>

            </div>

          </div>
          <div class="col-12 col-md-6">

           
            <div class="form-group">

             
              <label>
                Phone
              </label>

             
              <input type="text" class="form-control mb-3" placeholder="(___)___-____" data-mask="(000) 000-0000" autocomplete="off" maxlength="14"/>

            </div>

          </div>
          <div class="col-12 col-md-6">

            
            <div class="form-group">

             
              <label>
                Birthday
              </label>

             
              <input type="text" class="form-control flatpickr-input" data-toggle="flatpickr" readonly="readonly"/>

            </div>

          </div>
        </div> 

       
        <button class="btn btn-primary">
          Save changes
        </button>

      
        <hr class="my-5"/>

        <div class="card">
              <div class="card-header">

                <h4 class="card-header-title">
                  Notifications
                </h4>

                <button class="btn btn-sm btn-white">
                  Disable all
                </button>

              </div>
              <div class="table-responsive">
                <table class="table table-sm table-nowrap card-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th class="text-center">Call</th>
                      <th class="text-center">Email</th>
                      <th class="text-center">SMS</th>
                    </tr>
                  </thead>
                  <tbody class="font-size-base">
                    <tr>
                      <td>
                        Thông báo từ hệ thống
                      </td>
                      <td class="text-center"></td>
                      <td class="text-center">

                        
                        <div class="custom-control custom-checkbox mr-n3">
                          <input type="checkbox" class="custom-control-input" id="emailCheckboxOne" checked=""/>
                          <label class="custom-control-label" for="emailCheckboxOne"></label>
                        </div>

                      </td>
                      <td class="text-center">

                      
                        <div class="custom-control custom-checkbox mr-n3">
                          <input type="checkbox" class="custom-control-input" id="smsCheckboxOne" checked=""/>
                          <label class="custom-control-label" for="smsCheckboxOne"></label>
                        </div>

                      </td>
                    </tr>
                    <tr>
                      <td>
                      Thông báo đơn hàng
                      </td>
                      <td class="text-center"></td>
                      <td class="text-center">

                      
                        <div class="custom-control custom-checkbox mr-n3">
                          <input type="checkbox" class="custom-control-input" id="emailCheckboxTwo" checked=""/>
                          <label class="custom-control-label" for="emailCheckboxTwo"></label>
                        </div>

                      </td>
                      <td class="text-center">

                        
                        <div class="custom-control custom-checkbox mr-n3">
                          <input type="checkbox" class="custom-control-input" id="smsCheckboxTwo" checked=""/>
                          <label class="custom-control-label" for="smsCheckboxTwo"></label>
                        </div>

                      </td>
                    </tr>
                    <tr>
                      <td>
                      Thông báo từ cửa hàng
                      </td>
                      <td class="text-center">

                        
                        <div class="custom-control custom-checkbox mr-n3">
                          <input type="checkbox" class="custom-control-input" id="callCheckboxThree"/>
                          <label class="custom-control-label" for="callCheckboxThree"></label>
                        </div>

                      </td>
                      <td class="text-center">

                        <div class="custom-control custom-checkbox mr-n3">
                          <input type="checkbox" class="custom-control-input" id="emailCheckboxThree" checked=""/>
                          <label class="custom-control-label" for="emailCheckboxThree"></label>
                        </div>

                      </td>
                      <td class="text-center">

                     
                        <div class="custom-control custom-checkbox mr-n3">
                          <input type="checkbox" class="custom-control-input" id="smsCheckboxThree" checked=""/>
                          <label class="custom-control-label" for="smsCheckboxThree"></label>
                        </div>

                      </td>
                    </tr>
                    <tr>
                      <td>
                        Tư vấn 24/7
                      </td>
                      <td class="text-center">

                      
                        <div class="custom-control custom-checkbox mr-n3">
                          <input type="checkbox" class="custom-control-input" id="callCheckboxFour"/>
                          <label class="custom-control-label" for="callCheckboxFour"></label>
                        </div>

                      </td>
                      <td class="text-center">

                        
                        <div class="custom-control custom-checkbox mr-n3">
                          <input type="checkbox" class="custom-control-input" id="emailCheckboxFour" checked=""/>
                          <label class="custom-control-label" for="emailCheckboxFour"></label>
                        </div>

                      </td>
                      <td class="text-center">

                       
                        <div class="custom-control custom-checkbox mr-n3">
                          <input type="checkbox" class="custom-control-input" id="smsCheckboxFour" checked=""/>
                          <label class="custom-control-label" for="smsCheckboxFour"></label>
                        </div>

                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

      
        <hr class="mt-4 mb-5"/>

        <div class="row justify-content-between">
          <div class="col-12 col-md-6">

           
            <h4>
              Delete your account
            </h4>

            
            <p class="small text-muted mb-md-0">
              Please note, deleting your account is a permanent action and will no be recoverable once completed.
            </p>

          </div>
          <div class="col-auto">

           
            <button class="btn btn-danger">
              Delete
            </button>

          </div>
        </div> 

      </form>

      <br></br>

    </div>
  </div>
</div>

</div>
            </div>
        )
    }
}