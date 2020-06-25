import React from 'react';
import Head from 'next/head'

import NavChildGroup from '../components/nav/nav_child_group'
import DropUpWithImage from '../components/nav/drop_up_with_image'
import HeaderArrow from '../components/header/header_arrow'
import CardUser from '../components/card/card_user'
import CardChart from '../components/card/card_chart'
import CardItemText from '../components/card/card_item_text'
import CardItemTextChart from '../components/card/card_item_text_chart'
import CardItemTextDelivery from '../components/card/card_item_text_delivery'
import CardItemTextGrid from '../components/card/card_item_text_grid'
import TableRich from '../components/table/table_rich'
import TableChecklist from '../components/table/table_checklist';
import TableStaff from '../components/table/table_staff';

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
                      Step 1 of 3
                    </h6>

                  
                    <h1 class="mb-3">
                      Cùng bắt đầu với thông tin nhãn hiệu cơ bản
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

                
                  <input type="text" class="form-control" />

                </div>

               
                <div class="form-group">

             
                  <label class="mb-1">
                  Mô tả
                  </label>

                  <small class="form-text text-muted">
                    This is how others will learn about the project, so make it good!
                  </small>

                  <div class="ql-toolbar ql-snow"><span class="ql-formats">
                      <button type="button" class="ql-bold">
                          <svg viewBox="0 0 18 18"> 
                          <path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"></path> 
                          <path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"></path> 
                          </svg></button><button type="button" class="ql-italic"><svg viewBox="0 0 18 18">
                               <line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"></line> <line class="ql-stroke" x1="5" x2="11" y1="14" y2="14">
                                   </line> <line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"></line> </svg></button></span><span class="ql-formats">
                                       <button type="button" class="ql-link">
                                           <svg viewBox="0 0 18 18"> <line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"></line> 
                                           <path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"></path> 
                                           <path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"></path> </svg></button><button type="button" class="ql-blockquote">
                                               <svg viewBox="0 0 18 18"> <rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5">
                                                   </rect> <rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"></rect> 
                                                   <path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"></path>
                                                    <path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"></path> </svg>
                                                    </button><button type="button" class="ql-code"><svg viewBox="0 0 18 18"> 
                                                    <polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline> 
                                                    <polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline>
                                                     <line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"></line> 
                                                     </svg></button><button type="button" class="ql-image"><svg viewBox="0 0 18 18"> 
                                                     <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
                                                      <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
                                                       </svg></button></span><span class="ql-formats"><button type="button" class="ql-list" value="ordered">
                                                           <svg viewBox="0 0 18 18"> <line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"></line> 
                                                           <line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"></line> <line class="ql-stroke" x1="7" x2="15" y1="14" y2="14">
                                                               </line> <line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"></line> 
                                                               <path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"></path> 
                                                               <path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"></path> 
                                                               <path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"></path> </svg></button><button type="button" class="ql-list" value="bullet">
                                                                   <svg viewBox="0 0 18 18"> <line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"></line> 
                                                                   <line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"></line>
                                                                    <line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"></line>
                                                                     <line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"></line>
                                                                      <line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"></line> 
                                                                      <line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"></line>
                                                                       </svg></button></span></div><div data-toggle="quill" class="ql-container ql-snow"><
                                                                           div class="ql-editor ql-blank" data-gramm="false" contenteditable="true"><p><br/>
                                                                           </p></div><div class="ql-clipboard" contenteditable="true" tabindex="-1"></div>
                                                                           <div class="ql-tooltip ql-hidden"><a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>
                                                                           <input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL"/><a class="ql-action"></a>
                                                                           <a class="ql-remove"></a></div></div>

                </div>

              
                <div class="form-group">

                
                  <label>
                   Mã số doanh nghiệp
                  </label>
                  <small class="form-text text-muted">
                    This is how others will learn about the project, so make it good!
                  </small>
                  <span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="2" >
                      <span class="selection">
                          <span class="select2-selection select2-selection--multiple form-control" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-disabled="false">
                              <ul class="select2-selection__rendered">
                                  <li class="select2-search select2-search--inline">
                                  <input class="select2-search__field" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="none" spellCheck="false" role="searchbox" aria-autocomplete="list" placeholder=""  />
                                  </li></ul></span></span></span>
                  <label>
                  Ngày đăng ký kinh doanh
                  </label>
                  <small class="form-text text-muted">
                    This is how others will learn about the project, so make it good!
                  </small>
                <span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="2" >
                      <span class="selection">
                          <span class="select2-selection select2-selection--multiple form-control" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-disabled="false">
                              <ul class="select2-selection__rendered">
                                  <li class="select2-search select2-search--inline">
                                  <input class="select2-search__field" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="none" spellCheck="false" role="searchbox" aria-autocomplete="list" placeholder=""  />
                                  </li></ul></span></span></span>

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
            </form>
             </div>
             </div>
             </div>
             </div>
             










    )
  }
}