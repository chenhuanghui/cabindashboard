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

              <div className="row">

                <div className="col-12 col-lg-6">


                  <div className="card card-fill-lg">
                    <div className="card-body text-center">

                      <div className="dropdown card-dropdown">
                        <a href="#!" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fe fe-more-vertical"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" id="dropdown">
                          <a href="#!" className="dropdown-item">
                            Action
                        </a>
                          <a href="#!" className="dropdown-item">
                            Another action
                        </a>
                          <a href="#!" className="dropdown-item">
                            Something else here
                        </a>
                        </div>
                      </div>


                      <a href="team-overview.html" className="card-avatar avatar avatar-lg mx-auto">
                        <img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="" className="avatar-img rounded" />
                      </a>


                      <h2 className="mb-3">
                        <a href="team-overview.html">Brand 01</a>
                      </h2>


                      <p className="card-text text-muted">
                        Launchday is a SaaS website builder with a focus on quality, easy to build product sites.
                    </p>

                    </div>
                    <div className="card-footer card-footer-boxed">
                      <div className="row align-items-center">
                        <div className="col">


                          <small className="text-muted">
                            <i className="fe fe-clock"></i> Updated 2hr ago
                        </small>

                        </div>
                        <div className="col-auto">


                          <div className="avatar-group">
                            <a href="profile-posts.html" className="avatar avatar-xs">
                              <img src="../assets/img/avatars/profiles/avatar-2.jpg" className="avatar-img rounded-circle" alt="..." />
                            </a>
                            <a href="profile-posts.html" className="avatar avatar-xs">
                              <img src="../assets/img/avatars/profiles/avatar-3.jpg" className="avatar-img rounded-circle" alt="..." />
                            </a>
                            <a href="profile-posts.html" className="avatar avatar-xs">
                              <img src="../assets/img/avatars/profiles/avatar-4.jpg" className="avatar-img rounded-circle" alt="..." />
                            </a>
                            <a href="profile-posts.html" className="avatar avatar-xs">
                              <img src="../assets/img/avatars/profiles/avatar-5.jpg" className="avatar-img rounded-circle" alt="..." />
                            </a>
                            <div className="avatar avatar-xs">
                              <div className="avatar-title rounded-circle">+7</div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="col-12 col-lg-6">


                  <div className="card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">


                          <a href="project-team-overview.html" className="avatar">
                            <img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." className="avatar-img rounded" />
                          </a>

                        </div>
                        <div className="col ml-n2">


                          <h4 className="mb-1">
                            <a href="team-overview.html">Bắt đầu tại đây</a>
                          </h4>


                          <small className="text-muted">
                            <i className="fe fe-clock"></i> Updated 2hr ago
        </small>

                        </div>
                        <div className="col-auto">


                          <div className="dropdown">
                            <a href="#!" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i className="fe fe-more-vertical"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a href="#!" className="dropdown-item">
                                Action
            </a>
                              <a href="#!" className="dropdown-item">
                                Another action
            </a>
                              <a href="#!" className="dropdown-item">
                                Something else here
            </a>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="card">
                    <div className="card-body">


                      <div className="list-group list-group-flush my-n3">
                        <div className="list-group-item">
                          <div className="row align-items-center">
                            <div className="col-auto">


                              <a href="project-team-overview.html" className="avatar">
                                <img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." className="avatar-img rounded" />
                              </a>

                            </div>
                            <div className="col ml-n2">


                              <h4 className="mb-1">
                                <a href="team-overview.html">Kênh food delivery</a>
                              </h4>


                              <small className="text-muted">
                                <i className="fe fe-clock"></i> Updated 2hr ago
            </small>

                            </div>
                            <div className="col-auto">


                              <div className="dropdown">
                                <a href="#!" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i className="fe fe-more-vertical"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a href="#!" className="dropdown-item">
                                    Action
                </a>
                                  <a href="#!" className="dropdown-item">
                                    Another action
                </a>
                                  <a href="#!" className="dropdown-item">
                                    Something else here
                </a>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                        <div className="list-group-item">
                          <div className="row align-items-center">
                            <div className="col-auto">


                              <a href="project-team-overview.html" className="avatar">
                                <img src="../assets/img/avatars/teams/team-logo-2.jpg" alt="..." className="avatar-img rounded" />
                              </a>

                            </div>
                            <div className="col ml-n2">


                              <h4 className="mb-1">
                                <a href="team-overview.html">On boarding</a>
                              </h4>


                              <small className="text-muted">
                                <i className="fe fe-clock"></i> Updated 2hr ago
            </small>

                            </div>
                            <div className="col-auto">


                              <div className="dropdown">
                                <a href="#!" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i className="fe fe-more-vertical"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a href="#!" className="dropdown-item">
                                    Action
                </a>
                                  <a href="#!" className="dropdown-item">
                                    Another action
                </a>
                                  <a href="#!" className="dropdown-item">
                                    Something else here
                </a>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                        <div className="list-group-item">
                          <div className="row align-items-center">
                            <div className="col-auto">


                              <a href="project-team-overview.html" className="avatar">
                                <img src="../assets/img/avatars/teams/team-logo-3.jpg" alt="..." className="avatar-img rounded" />
                              </a>

                            </div>
                            <div className="col ml-n2">


                              <h4 className="mb-1">
                                <a href="team-overview.html">Giấy phép  </a>
                              </h4>


                              <small className="text-muted">
                                <i className="fe fe-clock"></i> Updated 4hr ago
            </small>

                            </div>
                            <div className="col-auto">


                              <div className="dropdown">
                                <a href="#!" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i className="fe fe-more-vertical"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a href="#!" className="dropdown-item">
                                    Action
                </a>
                                  <a href="#!" className="dropdown-item">
                                    Another action
                </a>
                                  <a href="#!" className="dropdown-item">
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
              <div className="row">
             

<div className="col-12 col-lg-6">

<div className="card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">


                          <a href="project-team-overview.html" className="avatar">
                            <img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." className="avatar-img rounded" />
                          </a>

                        </div>
                        <div className="col ml-n2">


                          <h4 className="mb-1">
                            <a href="team-overview.html">Bắt đầu tại đây</a>
                          </h4>


                          <small className="text-muted">
                            <i className="fe fe-clock"></i> Updated 2hr ago
        </small>

                        </div>
                        <div className="col-auto">


                          <div className="dropdown">
                            <a href="#!" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i className="fe fe-more-vertical"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a href="#!" className="dropdown-item">
                                Action
            </a>
                              <a href="#!" className="dropdown-item">
                                Another action
            </a>
                              <a href="#!" className="dropdown-item">
                                Something else here
            </a>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
  <div className="card">
    <div className="card-body">
      <div className="row align-items-center">
        <div className="col-auto">


          <a href="project-team-overview.html" className="avatar">
            <img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." className="avatar-img rounded" />
          </a>

        </div>
        <div className="col ml-n2">


          <h4 className="mb-1">
            <a href="team-overview.html">Bắt đầu tại đây</a>
          </h4>


          <small className="text-muted">
            <i className="fe fe-clock"></i> Updated 2hr ago
</small>

        </div>
        <div className="col-auto">


          <div className="dropdown">
            <a href="#!" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fe fe-more-vertical"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a href="#!" className="dropdown-item">
                Action
</a>
              <a href="#!" className="dropdown-item">
                Another action
</a>
              <a href="#!" className="dropdown-item">
                Something else here
</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  <div className="card">
    <div className="card-body">
      <div className="row align-items-center">
        <div className="col-auto">


          <a href="project-team-overview.html" className="avatar">
            <img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." className="avatar-img rounded" />
          </a>

        </div>
        <div className="col ml-n2">


          <h4 className="mb-1">
            <a href="team-overview.html">Bắt đầu tại đây</a>
          </h4>


          <small className="text-muted">
            <i className="fe fe-clock"></i> Updated 2hr ago
</small>

        </div>
        <div className="col-auto">


          <div className="dropdown">
            <a href="#!" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fe fe-more-vertical"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a href="#!" className="dropdown-item">
                Action
</a>
              <a href="#!" className="dropdown-item">
                Another action
</a>
              <a href="#!" className="dropdown-item">
                Something else here
</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

</div>
<div className="col-12 col-lg-6">


<div className="card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">


                          <a href="project-team-overview.html" className="avatar">
                            <img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." className="avatar-img rounded" />
                          </a>

                        </div>
                        <div className="col ml-n2">


                          <h4 className="mb-1">
                            <a href="team-overview.html">Bắt đầu tại đây</a>
                          </h4>


                          <small className="text-muted">
                            <i className="fe fe-clock"></i> Updated 2hr ago
        </small>

                        </div>
                        <div className="col-auto">


                          <div className="dropdown">
                            <a href="#!" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i className="fe fe-more-vertical"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a href="#!" className="dropdown-item">
                                Action
            </a>
                              <a href="#!" className="dropdown-item">
                                Another action
            </a>
                              <a href="#!" className="dropdown-item">
                                Something else here
            </a>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">


                          <a href="project-team-overview.html" className="avatar">
                            <img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." className="avatar-img rounded" />
                          </a>

                        </div>
                        <div className="col ml-n2">


                          <h4 className="mb-1">
                            <a href="team-overview.html">Bắt đầu tại đây</a>
                          </h4>


                          <small className="text-muted">
                            <i className="fe fe-clock"></i> Updated 2hr ago
        </small>

                        </div>
                        <div className="col-auto">


                          <div className="dropdown">
                            <a href="#!" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i className="fe fe-more-vertical"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a href="#!" className="dropdown-item">
                                Action
            </a>
                              <a href="#!" className="dropdown-item">
                                Another action
            </a>
                              <a href="#!" className="dropdown-item">
                                Something else here
            </a>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">


                          <a href="project-team-overview.html" className="avatar">
                            <img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." className="avatar-img rounded" />
                          </a>

                        </div>
                        <div className="col ml-n2">


                          <h4 className="mb-1">
                            <a href="team-overview.html">Bắt đầu tại đây</a>
                          </h4>


                          <small className="text-muted">
                            <i className="fe fe-clock"></i> Updated 2hr ago
        </small>

                        </div>
                        <div className="col-auto">


                          <div className="dropdown">
                            <a href="#!" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i className="fe fe-more-vertical"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a href="#!" className="dropdown-item">
                                Action
            </a>
                              <a href="#!" className="dropdown-item">
                                Another action
            </a>
                              <a href="#!" className="dropdown-item">
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
<div className="row">
  <div className="col-12 col-lg-12 col-xl-12">
<div className="card">
              <div className="card-header">
               
                <h4 className="card-header-title">
                  On boarding list
                </h4>

              
                <span className="badge badge-soft-secondary">
                  23 Complete Items
                </span>
              </div>
              <div className="card-body">
               
                <div className="checklist" tabIndex="0">
                  <div className="custom-control custom-checkbox checklist-control" tabIndex="0">
                    <input className="custom-control-input" id="checklistTwo" type="checkbox" />
                    <label className="custom-control-label" htmlFor="checklistTwo"></label>
                    <span className="custom-control-caption">
                      Delete the old mess in functions files.
                    </span>
                  </div>
                  <div className="custom-control custom-checkbox checklist-control" tabIndex="0">
                    <input className="custom-control-input" id="checklistThree" type="checkbox" />
                    <label className="custom-control-label" htmlFor="checklistThree"></label>
                    <span className="custom-control-caption">
                      Create the release notes for the new pages so customers get psyched.
                    </span>
                  </div>
                  <div className="custom-control custom-checkbox checklist-control" tabIndex="0">
                    <input className="custom-control-input" id="checklistFour" type="checkbox" />
                    <label className="custom-control-label" htmlFor="checklistFour"></label>
                    <span className="custom-control-caption">
                      Send Dianna those meeting notes
                    </span>
                  </div>
                  <div className="custom-control custom-checkbox checklist-control" tabIndex="0">
                    <input className="custom-control-input" id="checklistFive" type="checkbox" />
                    <label className="custom-control-label" htmlFor="checklistFive"></label>
                    <span className="custom-control-caption">
                      Share the documentation for the new unified API
                    </span>
                  </div>
                  <div className="custom-control custom-checkbox checklist-control" tabIndex="0">
                    <input className="custom-control-input" id="checklistSix" type="checkbox"  />
                    <label className="custom-control-label" htmlFor="checklistSix"></label>
                    <span className="custom-control-caption">
                      Clean up the Figma file with all of the avatars, buttons, and other
                      components.
                    </span>
                  </div>
                </div>
              </div>
            
              <div className="card-footer">
                <div className="row align-items-center">
                  <div className="col">
                  
                    <textarea className="form-control form-control-flush form-control-auto" data-toggle="autosize" rows="1" placeholder="Create a task" ></textarea>
                  </div>
                  <div className="col-auto">
                   
                    <button className="btn btn-sm btn-primary">
                      
                    </button>
                  </div>
                </div>
              
              </div>
            
            </div>
            </div>
            </div>

<div className="row">
<div className="col-12 col-lg-12 col-xl-12">
<div className="card">
              <div className="card-header">

               
                <h4 className="card-header-title">
                 Các loại giấy phép
                </h4>

              </div>classNameclassName
              <div className="card-body">

               
                <div className="kanban-category" tabIndex="0">

               
                  <div className="kanban-item" tabIndex="0">
                    <div className="card card-sm mb-3" data-toggle="modal" data-target="#modalKanbanTask">
                      <div className="card-body">
                        <div className="row">
                          <div className="col">

                           
                            <p className="mb-0">
                             Giấy phép kinh doanh
                            </p>

                          </div>
                          <div className="col-auto">
                            
                            <div className="small text-danger" >
                              Chưa có
                           </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                 
                  <div className="kanban-item" tabIndex="0">
                    <div className="card card-sm mb-3" data-toggle="modal" data-target="#modalKanbanTask">
                      <div className="card-body">
                        <div className="row">
                          <div className="col">

                           
                            <p className="mb-0">
                              This is a todo with an attachment, comments, and a due date.
                            </p>

                          </div>
                          <div className="col-auto">

                           
                          <div className="small text-danger" >
                              Chưa có
                           </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                
                  <div className="kanban-item" tabIndex="0">
                    <div className="card card-sm mb-3" data-toggle="modal" data-target="#modalKanbanTask">
                      <div className="card-body">
                        <div className="row">
                          <div className="col">

                           
                            <p className="mb-0">
                              This is an extremely long todo to show wrapping. This is an extremely long todo to show wrapping.This is an extremely long todo to show wrapping.
                            </p>

                          </div>
                          <div className="col-auto">

                          
                          <div className="small text-danger" >
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
      </div>






    )
  }
}