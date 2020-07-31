import React from 'react';
import Head from 'next/head'

import NavChildGroup from '../../components/nav/nav_child_group'
import DropUpWithImage from '../../components/nav/drop_up_with_image'
import HeaderArrow from '../../components/header/header_arrow'
import CardUser from '../../components/card/card_user'
import CardChart from '../../components/card/card_chart'
import CardItemText from '../../components/card/card_item_text'
import CardItemTextChart from '../../components/card/card_item_text_chart'
import CardItemTextDelivery from '../../components/card/card_item_text_delivery'
import CardItemTextGrid from '../../components/card/card_item_text_grid'
import TableRich from '../../components/table/table_rich'
import TableChecklist from '../../components/table/table_checklist';
import TableStaff from '../../components/table/table_staff';

export default class WizardStep1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cabinData: [],
      onBoardingChecklist: [],
      license: [],
    }
  }
  componentDidMount() {
    var table1Data = [];
    table1Data.title = `Cabin list`;

    table1Data.col = [];

    table1Data.col.push(`Trạng thái`);
    table1Data.col.push(`Điện`);
    table1Data.col.push(`Nước`);
    table1Data.col.push(`Nhân sự`);

    table1Data.content = [];
    table1Data.content.push({ data1: `Cabin3`, data2: `31 Phan Ngữ `, data3: `Available`, data4: `10kw`,data5:'3m3' })
    table1Data.content.push({ data1: `Cabin3`, data2: `31 Phan Ngữ `, data3: `Available`, data4: `10kw`,data5:'3m3' })
    table1Data.content.push({ data1: `Cabin3`, data2: `31 Phan Ngữ `, data3: `Available`, data4: `10kw`,data5:'3m3' })
    table1Data.content.push({ data1: `Cabin3`, data2: `31 Phan Ngữ `, data3: `Available`, data4: `10kw`,data5:'3m3' })

    var table2Data = [];
    table2Data.title = `On-boarding checklist`;

    table2Data.col = [];


    table2Data.content = [];
    table2Data.content.push({ data1: `Hướng dẫn sử dụng quy tắc ứng xử` })
    table2Data.content.push({ data1: `Hướng dẫn sử dụng quy tắc ứng xử` })
    table2Data.content.push({ data1: `Hướng dẫn sử dụng quy tắc ứng xử` })
    table2Data.content.push({ data1: `Hướng dẫn sử dụng quy tắc ứng xử` })
    table2Data.content.push({ data1: `Hướng dẫn sử dụng quy tắc ứng xử` })
    table2Data.content.push({ data1: `Hướng dẫn sử dụng quy tắc ứng xử` })

    var table3Data = [];
    table3Data.title = `Các loại giấy phép`;
    table3Data.col = [];

    table3Data.content = [];
    table3Data.content.push({ data1: `Giấy phép kinh doanh`, data5: 'Chưa có' })
    table3Data.content.push({ data1: `Giấy phép kinh doanh`, data5: 'Chưa có' })
    table3Data.content.push({ data1: `Giấy phép kinh doanh`, data5: 'Chưa có' })
    this.setState({ onBoardingChecklist: table2Data, cabinData: table1Data, license: table3Data })
  }




  render() {
    const { cabinData, onBoardingChecklist, license } = this.state;
    return (
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="description" content="A fully featured admin theme which can be used to build CRM, CMS, etc." />
          <title>Cabin Food Admin</title>

        </Head>
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

              <hr className="navbar-divider my-3" />

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

        <div className="main-content">

          <div className="row justify-content-center">

            <div className="col-12 col-lg-10 col-xl-8">
              <HeaderArrow />
              <form class="tab-content py-6" id="wizardSteps">
              <div class="tab-pane fade show active" id="wizardStepOne" role="tabpanel" aria-labelledby="wizardTabOne">

              
                <div class="row justify-content-center">
                  <div class="col-12 col-md-10 col-lg-8 col-xl-6 text-center">

                
                    <h6 class="mb-4 text-uppercase text-muted">
                      Step 2 of 3
                    </h6>

                  
                    <h1 class="mb-3">
                    Thông tin mỗi điểm kinh doanh
                    </h1>

                 
                    <p class="mb-5 text-muted">
                      Điền thông tin từ thương hiệu của bạn để đăng ký với các kênh FnB Delivery
                    </p>

                  </div>
                </div>

              
                <div class="form-group">

               
                  <label>
                   Tên nhãn hiệu
                  </label>
                  <p class="mb-5 text-muted">
                      Điền thông tin từ thương hiệu của bạn để đăng ký với các kênh FnB Delivery
                    </p>

                
                  <div class="card">
              <div class="card-body">

               
                <div class="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" data-options="{&quot;url&quot;: &quot;https://&quot;}">

                  
                  <ul class="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>

                <div class="dz-default dz-message"><button class="dz-button" type="button">Drop files here to upload</button></div></div>

               
            

              </div>
            </div>

                </div>

               
                <div class="form-group">

             
                  <label class="mb-1">
                  Mô tả
                  </label>

                  <small class="form-text text-muted">
                    This is how others will learn about the project, so make it good!
                  </small>

                  <div class="card">
              <div class="card-body">

            
                <div class="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" data-options="{&quot;url&quot;: &quot;https://&quot;}">

                 
                  

              
                  <ul class="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>

                <div class="dz-default dz-message"><button class="dz-button" type="button">Drop files here to upload</button></div></div>

              
                <div class="list-group list-group-flush pt-4 my-n3">
                  <div class="list-group-item">
                    <div class="row align-items-center">
                      <div class="col-auto">

                       
                        <a href="#!" class="avatar">
                          <img src="assets/img/files/file-1.jpg" alt="..." class="avatar-img rounded"/>
                        </a>

                      </div>
                      <div class="col ml-n2">

                      
                        <h4 class="font-weight-normal mb-1">
                          <a href="#!">Launchday Logo</a>
                        </h4>

                     
                        <small class="text-muted">
                          2.5kb SVG
                        </small>

                      </div>
                      <div class="col-auto">

                       
                        <div class="dropdown">
                          <a href="#" class="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fe fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a href="#!" class="dropdown-item">
                              Action
                            </a>
                            <a href="#!" class="dropdown-item">
                              Another action
                            </a>
                            <a href="#!" class="dropdown-item">
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

                      
                        <a href="#!" class="avatar">
                          <img src="assets/img/files/file-2.jpg" alt="..." class="avatar-img rounded" />
                        </a>

                      </div>
                      <div class="col ml-n2">

                        <h4 class="font-weight-normal mb-1">
                          <a href="#!">Example Grid</a>
                        </h4>

                      
                        <small class="text-muted">
                          1.5mb PNG
                        </small>

                      </div>
                      <div class="col-auto">

                      
                        <div class="dropdown">
                          <a href="#" class="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fe fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a href="#!" class="dropdown-item">
                              Action
                            </a>
                            <a href="#!" class="dropdown-item">
                              Another action
                            </a>
                            <a href="#!" class="dropdown-item">
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

                      
                        <a href="#!" class="avatar">
                          <div class="avatar-title rounded bg-white text-secondary">
                            <span class="fe fe-folder"></span>
                          </div>
                        </a>

                      </div>
                      <div class="col ml-n2">

                      
                        <h4 class="font-weight-normal mb-1">
                          <a href="#!">Screenshot Collection</a>
                        </h4>

                    
                        <small class="text-muted">
                          6.9mb directory
                        </small>

                      </div>
                      <div class="col-auto">

                    
                        <div class="dropdown">
                          <a href="#" class="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fe fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a href="#!" class="dropdown-item">
                              Action
                            </a>
                            <a href="#!" class="dropdown-item">
                              Another action
                            </a>
                            <a href="#!" class="dropdown-item">
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

                     
                        <a href="#!" class="avatar">
                          <img src="assets/img/files/file-3.jpg" alt="..." class="avatar-img rounded" />
                        </a>

                      </div>
                      <div class="col ml-n2">

                      
                        <h4 class="font-weight-normal mb-1">
                          <a href="#!">Launchday Cover</a>
                        </h4>

                    
                        <small class="text-muted">
                          750kb JPG
                        </small>

                      </div>
                      <div class="col-auto">

                    
                        <div class="dropdown">
                          <a href="#" class="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fe fe-more-vertical"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a href="#!" class="dropdown-item">
                              Action
                            </a>
                            <a href="#!" class="dropdown-item">
                              Another action
                            </a>
                            <a href="#!" class="dropdown-item">
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

              
               

           
                <hr class="my-5"/>

              
                <div class="row align-items-center">
                  <div class="col-auto">

                
                    <button class="btn btn-lg btn-white" type="reset">Cancel</button>

                  </div>
                  <div class="col text-center">

                
                    <h6 class="text-uppercase text-muted mb-0">Step 1 of 3</h6>

                  </div>
                  <div class="col-auto">

                
                    <a class="btn btn-lg btn-primary" data-toggle="wizard" href="#wizardStepTwo">Continue</a>

                  </div>
                </div>

              </div>
              <div class="tab-pane fade" id="wizardStepTwo" role="tabpanel" aria-labelledby="wizardTabTwo">

                <div class="row justify-content-center">
                  <div class="col-12 col-md-10 col-lg-8 col-xl-6 text-center">

                 
                    <h6 class="mb-4 text-uppercase text-muted">
                      Step 2 of 3
                    </h6>

                
                    <h1 class="mb-3">
                      Next, let’s upload some files.
                    </h1>

                 
                    <p class="mb-5 text-muted">
                      We need to style your team page and make sure you have all your starting files.
                    </p>

                  </div>
                </div> 
                <div class="form-group">

              
                  <label class="mb-1">
                    Project cover
                  </label>

                 
                  <small class="form-text text-muted">
                    Please use an image no larger than 1200px * 600px.
                  </small>

                 
                  <div class="dropzone dropzone-single mb-3 dz-clickable" data-toggle="dropzone" data-options="{&quot;url&quot;: &quot;https://&quot;, &quot;maxFiles&quot;: 1, &quot;acceptedFiles&quot;: &quot;image/*&quot;}">

                  
                    <div class="dz-preview dz-preview-single"></div>

                  <div class="dz-default dz-message"><button class="dz-button" type="button">Drop files here to upload</button></div></div>
                </div>

               
                <hr class="mt-5 mb-5" />

              
                <div class="form-group">

              
                  <label class="mb-1">
                    Starting files
                  </label>

                 
                  <small class="form-text text-muted">
                    Upload any files you want to start the projust with.
                  </small>

                  
                  <div class="card">
                    <div class="card-body">
                      <div class="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" data-options="{&quot;url&quot;: &quot;https://&quot;}">

                      
                        <ul class="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>

                      <div class="dz-default dz-message"><button class="dz-button" type="button">Drop files here to upload</button></div></div>
                    </div>
                  </div>
                </div>

               
                <hr class="my-5"/>

               
                <div class="row align-items-center">
                  <div class="col-auto">

                  
                    <a class="btn btn-lg btn-white" data-toggle="wizard" href="#wizardStepOne">Back</a>

                  </div>
                  <div class="col text-center">

                   
                    <h6 class="text-uppercase text-muted mb-0">Step 2 of 3</h6>

                  </div>
                  <div class="col-auto">

                   
                    <a class="btn btn-lg btn-primary" data-toggle="wizard" href="#wizardStepThree">Continue</a>

                  </div>
                </div>

              </div>
              <div class="tab-pane fade" id="wizardStepThree" role="tabpanel" aria-labelledby="wizardTabThree">

              
                <div class="row justify-content-center">
                  <div class="col-12 col-md-10 col-lg-8 col-xl-6 text-center">

                   
                    <h6 class="mb-4 text-uppercase text-muted">
                      Step 3 of 3
                    </h6>

                    
                    <h1 class="mb-3">
                      Let’s get some last details.
                    </h1>

                    
                    <p class="mb-5 text-muted">
                      Setting up tags, dates, and permissions makes sure to keep your team organized and safe.
                    </p>

                  </div>
                </div> 
               
                <div class="form-group">

                 
                  <label>
                    Project tags
                  </label>

                 
                  <select class="form-control select2-hidden-accessible" data-toggle="select" multiple="" data-select2-id="3" tabindex="-1" aria-hidden="true">
                    <option>CSS</option>
                    <option>HTML</option>
                    <option>JavaScript</option>
                    <option>Bootstrap</option>
                  </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="4" ><span class="selection">
                      <span class="select2-selection select2-selection--multiple form-control" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-disabled="false"><ul class="select2-selection__rendered"><li class="select2-search select2-search--inline">
                          <input class="select2-search__field" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="none" spellCheck="false" role="searchbox" aria-autocomplete="list" placeholder="" /></li></ul></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>

                </div>

                <div class="row">
                  <div class="col-12 col-md-6">

                   
                    <div class="form-group">

                     
                      <label>
                        Start date
                      </label>

                     
                      <input type="text" class="form-control flatpickr-input" data-toggle="flatpickr" readonly="readonly" />

                    </div>

                  </div>
                  <div class="col-12 col-md-6">

                   
                    <div class="form-group">

                     
                      <label>
                        End date
                      </label>

                     
                      <input type="text" class="form-control flatpickr-input" data-toggle="flatpickr" readonly="readonly" />

                    </div>

                  </div>
                </div> 

                
                <hr class="mt-5 mb-5" />

                <div class="row">
                  <div class="col-12 col-md-6">

                    
                    <div class="form-group">

                    
                      <label class="mb-1">
                        Private project
                      </label>

                      
                      <small class="form-text text-muted">
                        If you are available for hire outside of the current situation, you can encourage others to hire you.
                      </small>

                     
                      <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="switchOne" />
                        <label class="custom-control-label" for="switchOne"></label>
                      </div>

                    </div>

                  </div>
                  <div class="col-12 col-md-6">

                   
                    <div class="card bg-light border">
                      <div class="card-body">

                      
                        <h4 class="mb-2">
                          <i class="fe fe-alert-triangle"></i> Warning
                        </h4>

                       
                        <p class="small text-muted mb-0">
                          Once a project is made private, you cannot revert it to a public project.
                        </p>

                      </div>
                    </div>

                  </div>
                </div>

                
                <hr class="my-5"/>

               
                <div class="row align-items-center">
                  <div class="col-auto">

                   
                    <a class="btn btn-lg btn-white" data-toggle="wizard" href="#wizardStepTwo">Back</a>

                  </div>
                  <div class="col text-center">

                   
                    <h6 class="text-uppercase text-muted mb-0">Step 3 of 3</h6>

                  </div>
                  <div class="col-auto">

                 
                    <button class="btn btn-lg btn-primary" type="submit">Create</button>

                  </div>
                </div>

              </div>
              </div>
            </form>
         
             </div>
           
             </div>
             </div>
             </div>
             










    )
  }
}