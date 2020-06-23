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

export default class Dashboard extends React.Component {
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

              <div class="row">

                <div class="col-12 col-lg-6">


                  <div class="card card-fill-lg">
                    <div class="card-body text-center">

                      <div class="dropdown card-dropdown">
                        <a href="#!" class="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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


                      <a href="team-overview.html" class="card-avatar avatar avatar-lg mx-auto">
                        <img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="" class="avatar-img rounded" />
                      </a>


                      <h2 class="mb-3">
                        <a href="team-overview.html">Brand 01</a>
                      </h2>


                      <p class="card-text text-muted">
                        Launchday is a SaaS website builder with a focus on quality, easy to build product sites.
                    </p>

                    </div>
                    <div class="card-footer card-footer-boxed">
                      <div class="row align-items-center">
                        <div class="col">


                          <small class="text-muted">
                            <i class="fe fe-clock"></i> Updated 2hr ago
                        </small>

                        </div>
                        <div class="col-auto">


                          <div class="avatar-group">
                            <a href="profile-posts.html" class="avatar avatar-xs">
                              <img src="../assets/img/avatars/profiles/avatar-2.jpg" class="avatar-img rounded-circle" alt="..." />
                            </a>
                            <a href="profile-posts.html" class="avatar avatar-xs">
                              <img src="../assets/img/avatars/profiles/avatar-3.jpg" class="avatar-img rounded-circle" alt="..." />
                            </a>
                            <a href="profile-posts.html" class="avatar avatar-xs">
                              <img src="../assets/img/avatars/profiles/avatar-4.jpg" class="avatar-img rounded-circle" alt="..." />
                            </a>
                            <a href="profile-posts.html" class="avatar avatar-xs">
                              <img src="../assets/img/avatars/profiles/avatar-5.jpg" class="avatar-img rounded-circle" alt="..." />
                            </a>
                            <div class="avatar avatar-xs">
                              <div class="avatar-title rounded-circle">+7</div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="col-12 col-lg-6">


                  <div class="card">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-auto">


                          <a href="project-team-overview.html" class="avatar">
                            <img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." class="avatar-img rounded" />
                          </a>

                        </div>
                        <div class="col ml-n2">


                          <h4 class="mb-1">
                            <a href="team-overview.html">Bắt đầu tại đây</a>
                          </h4>


                          <small class="text-muted">
                            <i class="fe fe-clock"></i> Updated 2hr ago
        </small>

                        </div>
                        <div class="col-auto">


                          <div class="dropdown">
                            <a href="#!" class="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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


                  <div class="card">
                    <div class="card-body">


                      <div class="list-group list-group-flush my-n3">
                        <div class="list-group-item">
                          <div class="row align-items-center">
                            <div class="col-auto">


                              <a href="project-team-overview.html" class="avatar">
                                <img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." class="avatar-img rounded" />
                              </a>

                            </div>
                            <div class="col ml-n2">


                              <h4 class="mb-1">
                                <a href="team-overview.html">Kênh food delivery</a>
                              </h4>


                              <small class="text-muted">
                                <i class="fe fe-clock"></i> Updated 2hr ago
            </small>

                            </div>
                            <div class="col-auto">


                              <div class="dropdown">
                                <a href="#!" class="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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


                              <a href="project-team-overview.html" class="avatar">
                                <img src="../assets/img/avatars/teams/team-logo-2.jpg" alt="..." class="avatar-img rounded" />
                              </a>

                            </div>
                            <div class="col ml-n2">


                              <h4 class="mb-1">
                                <a href="team-overview.html">On boarding</a>
                              </h4>


                              <small class="text-muted">
                                <i class="fe fe-clock"></i> Updated 2hr ago
            </small>

                            </div>
                            <div class="col-auto">


                              <div class="dropdown">
                                <a href="#!" class="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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


                              <a href="project-team-overview.html" class="avatar">
                                <img src="../assets/img/avatars/teams/team-logo-3.jpg" alt="..." class="avatar-img rounded" />
                              </a>

                            </div>
                            <div class="col ml-n2">


                              <h4 class="mb-1">
                                <a href="team-overview.html">Giấy phép  </a>
                              </h4>


                              <small class="text-muted">
                                <i class="fe fe-clock"></i> Updated 4hr ago
            </small>

                            </div>
                            <div class="col-auto">


                              <div class="dropdown">
                                <a href="#!" class="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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

                </div>
              </div>
              <TableChecklist tableSetup={cabinData}/>
              <div class="row">
             

<div class="col-12 col-lg-6">

<div class="card">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-auto">


                          <a href="project-team-overview.html" class="avatar">
                            <img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." class="avatar-img rounded" />
                          </a>

                        </div>
                        <div class="col ml-n2">


                          <h4 class="mb-1">
                            <a href="team-overview.html">Bắt đầu tại đây</a>
                          </h4>


                          <small class="text-muted">
                            <i class="fe fe-clock"></i> Updated 2hr ago
        </small>

                        </div>
                        <div class="col-auto">


                          <div class="dropdown">
                            <a href="#!" class="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
  <div class="card">
    <div class="card-body">
      <div class="row align-items-center">
        <div class="col-auto">


          <a href="project-team-overview.html" class="avatar">
            <img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." class="avatar-img rounded" />
          </a>

        </div>
        <div class="col ml-n2">


          <h4 class="mb-1">
            <a href="team-overview.html">Bắt đầu tại đây</a>
          </h4>


          <small class="text-muted">
            <i class="fe fe-clock"></i> Updated 2hr ago
</small>

        </div>
        <div class="col-auto">


          <div class="dropdown">
            <a href="#!" class="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
  <div class="card">
    <div class="card-body">
      <div class="row align-items-center">
        <div class="col-auto">


          <a href="project-team-overview.html" class="avatar">
            <img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." class="avatar-img rounded" />
          </a>

        </div>
        <div class="col ml-n2">


          <h4 class="mb-1">
            <a href="team-overview.html">Bắt đầu tại đây</a>
          </h4>


          <small class="text-muted">
            <i class="fe fe-clock"></i> Updated 2hr ago
</small>

        </div>
        <div class="col-auto">


          <div class="dropdown">
            <a href="#!" class="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
<div class="col-12 col-lg-6">


<div class="card">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-auto">


                          <a href="project-team-overview.html" class="avatar">
                            <img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." class="avatar-img rounded" />
                          </a>

                        </div>
                        <div class="col ml-n2">


                          <h4 class="mb-1">
                            <a href="team-overview.html">Bắt đầu tại đây</a>
                          </h4>


                          <small class="text-muted">
                            <i class="fe fe-clock"></i> Updated 2hr ago
        </small>

                        </div>
                        <div class="col-auto">


                          <div class="dropdown">
                            <a href="#!" class="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                  <div class="card">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-auto">


                          <a href="project-team-overview.html" class="avatar">
                            <img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." class="avatar-img rounded" />
                          </a>

                        </div>
                        <div class="col ml-n2">


                          <h4 class="mb-1">
                            <a href="team-overview.html">Bắt đầu tại đây</a>
                          </h4>


                          <small class="text-muted">
                            <i class="fe fe-clock"></i> Updated 2hr ago
        </small>

                        </div>
                        <div class="col-auto">


                          <div class="dropdown">
                            <a href="#!" class="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                  <div class="card">
                    <div class="card-body">
                      <div class="row align-items-center">
                        <div class="col-auto">


                          <a href="project-team-overview.html" class="avatar">
                            <img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." class="avatar-img rounded" />
                          </a>

                        </div>
                        <div class="col ml-n2">


                          <h4 class="mb-1">
                            <a href="team-overview.html">Bắt đầu tại đây</a>
                          </h4>


                          <small class="text-muted">
                            <i class="fe fe-clock"></i> Updated 2hr ago
        </small>

                        </div>
                        <div class="col-auto">


                          <div class="dropdown">
                            <a href="#!" class="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
<div class="row">
  <div class="col-12 col-lg-12 col-xl-12">
<div class="card">
              <div class="card-header">
               
                <h4 class="card-header-title">
                  On boarding list
                </h4>

              
                <span class="badge badge-soft-secondary">
                  23 Complete Items
                </span>
              </div>
              <div class="card-body">
               
                <div class="checklist" tabindex="0">
                  <div class="custom-control custom-checkbox checklist-control" tabindex="0">
                    <input class="custom-control-input" id="checklistTwo" type="checkbox" />
                    <label class="custom-control-label" for="checklistTwo"></label>
                    <span class="custom-control-caption">
                      Delete the old mess in functions files.
                    </span>
                  </div>
                  <div class="custom-control custom-checkbox checklist-control" tabindex="0">
                    <input class="custom-control-input" id="checklistThree" type="checkbox" />
                    <label class="custom-control-label" for="checklistThree"></label>
                    <span class="custom-control-caption">
                      Create the release notes for the new pages so customers get psyched.
                    </span>
                  </div>
                  <div class="custom-control custom-checkbox checklist-control" tabindex="0">
                    <input class="custom-control-input" id="checklistFour" type="checkbox" />
                    <label class="custom-control-label" for="checklistFour"></label>
                    <span class="custom-control-caption">
                      Send Dianna those meeting notes
                    </span>
                  </div>
                  <div class="custom-control custom-checkbox checklist-control" tabindex="0">
                    <input class="custom-control-input" id="checklistFive" type="checkbox" />
                    <label class="custom-control-label" for="checklistFive"></label>
                    <span class="custom-control-caption">
                      Share the documentation for the new unified API
                    </span>
                  </div>
                  <div class="custom-control custom-checkbox checklist-control" tabindex="0">
                    <input class="custom-control-input" id="checklistSix" type="checkbox" checked="" />
                    <label class="custom-control-label" for="checklistSix"></label>
                    <span class="custom-control-caption">
                      Clean up the Figma file with all of the avatars, buttons, and other
                      components.
                    </span>
                  </div>
                </div>
              </div>
            
              <div class="card-footer">
                <div class="row align-items-center">
                  <div class="col">
                  
                    <textarea class="form-control form-control-flush form-control-auto" data-toggle="autosize" rows="1" placeholder="Create a task" ></textarea>
                  </div>
                  <div class="col-auto">
                   
                    <button class="btn btn-sm btn-primary">
                      Add
                    </button>
                  </div>
                </div>
              
              </div>
            
            </div>
            </div>
            </div>

<div class="row">
<div class="card">
              <div class="card-header">

               
                <h4 class="card-header-title">
                 Các loại giấy phép
                </h4>

              </div>
              <div class="card-body">

               
                <div class="kanban-category" tabindex="0">

               
                  <div class="kanban-item" tabindex="0">
                    <div class="card card-sm mb-3" data-toggle="modal" data-target="#modalKanbanTask">
                      <div class="card-body">
                        <div class="row">
                          <div class="col">

                           
                            <p class="mb-0">
                             Giấy phép kinh doanh
                            </p>

                          </div>
                          <div class="col-auto">
                            
                            <div class="small text-danger" >
                              Chưa có
                           </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                 
                  <div class="kanban-item" tabindex="0">
                    <div class="card card-sm mb-3" data-toggle="modal" data-target="#modalKanbanTask">
                      <div class="card-body">
                        <div class="row">
                          <div class="col">

                           
                            <p class="mb-0">
                              This is a todo with an attachment, comments, and a due date.
                            </p>

                          </div>
                          <div class="col-auto">

                           
                          <div class="small text-danger" >
                              Chưa có
                           </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                
                  <div class="kanban-item" tabindex="0">
                    <div class="card card-sm mb-3" data-toggle="modal" data-target="#modalKanbanTask">
                      <div class="card-body">
                        <div class="row">
                          <div class="col">

                           
                            <p class="mb-0">
                              This is an extremely long todo to show wrapping. This is an extremely long todo to show wrapping.This is an extremely long todo to show wrapping.
                            </p>

                          </div>
                          <div class="col-auto">

                          
                          <div class="small text-danger" >
                              Chưa có
                           </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

          

              </div>
            </div>
</div>


          </div>
        </div>
      </div>
      </div>






    )
  }
}