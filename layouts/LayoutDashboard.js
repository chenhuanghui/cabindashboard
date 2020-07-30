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
import Link from 'next/link'
import NavBar from '../components/nav/nav_bar';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      brand:[],
      
      cabinData: [],
      onBoardingChecklist: [],
      license: [],
    }
  }
  componentDidMount() {
    let currentComponent = this;
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: 'keyLNupG6zOmmokND'}).base('appmREe03n1MQ6ydq');

    base('Brand').find('rec3WpeNWz5IW9E3e', function(err, record) {
        if (err) { console.error(err); return; }
        console.log('Retrieved', record);
        currentComponent.setState({brand:record.fields})
        
    });


    var table1Data = [];
    table1Data.title = `Cabin list`;

    table1Data.col = [];

    table1Data.col.push(`Trạng thái`);
    table1Data.col.push(`Điện`);
    table1Data.col.push(`Nước`);
    table1Data.col.push(`Nhân sự`);

    table1Data.content = [];
    table1Data.content.push({ data1: `Cabin3`, data2: `31 Phan Ngữ `, data3: `Available`, data4: `10kw`, data5: '3m3' })
    table1Data.content.push({ data1: `Cabin3`, data2: `31 Phan Ngữ `, data3: `Available`, data4: `10kw`, data5: '3m3' })
    table1Data.content.push({ data1: `Cabin3`, data2: `31 Phan Ngữ `, data3: `Available`, data4: `10kw`, data5: '3m3' })
    table1Data.content.push({ data1: `Cabin3`, data2: `31 Phan Ngữ `, data3: `Available`, data4: `10kw`, data5: '3m3' })

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
    const { brand, cabinData, onBoardingChecklist, license } = this.state;
    return (
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="description" content="A fully featured admin theme which can be used to build CRM, CMS, etc." />
          <title>{brand ? brand.brandName :''} | CabinFood Admin</title>
        </Head>

        <NavBar />

        <div className="main-content">
          <div className="row justify-content-center">

            <div className="col-12 col-lg-10 col-xl-8">
              {/* <HeaderArrow cabinAddr={brand && brand.address ? brand.address[0] : ''} cabinName={brand && brand.cabinName ? brand.cabinName[0] : ''}/> */}
              <div className="header">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-end">
                          <div className="col">
                                <h6 className="header-pretitle">NHÃN HIỆU</h6>
                                <h1 className="header-title">{brand.brandName}</h1>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

              <div className="row">

                <div className="col-12 col-lg-6">
                  <div className="card card-fill-lg">
                    <div className="card-body text-center">
                      <span className="card-avatar avatar avatar-lg mx-auto">
                        <img src={brand && brand.logo ? brand.logo[0].url : ''} alt="" className="avatar-img rounded" />
                      </span>
                      <h2 className="mb-3">{brand.brandName}</h2>
                      <p className="card-text text-muted">{brand.brandIntro}</p>
                    </div>

                    <div className="card-footer card-footer-boxed">
                      <div className="row align-items-center">
                        <div className="col"><small className="text-muted"><i className="fe fe-clock"></i> Updated 2hr ago</small></div>

                      </div>
                    </div>
                  </div>

                </div>
                <div className="col-12 col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <img src="../assets/img/start.png" className="avatar-img rounded" />
                        </div>
                        <div className="col ml-n2">
                          <h4 className="mb-1">Bắt đầu tại đây !</h4>
                          <small className="text-muted">Từng bước giúp bạn thành công</small>
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
                                <span className="fe fe-briefcase fe-modify"></span>
                            </div>
                            <div className="col ml-n2">
                              <h4 className="mb-1">Kênh food delivery</h4>
                              <small className="text-muted"> Đã kết nối</small>
                            </div>                            
                          </div>
                        </div>

                        <div className="list-group-item">
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <span className="fe fe-briefcase fe-modify"></span>
                            </div>
                            <div className="col ml-n2">
                              <h4 className="mb-1">On boarding</h4>
                              <span className="text-success">● <small className="text-muted">Hoàn thành</small></span>
                              {/* <span className="text-warning">● <small className="text-muted">Hoàn thành</small></span>
                              <span className="text-danger">● <small className="text-muted">Hoàn thành</small></span> */}
                            </div>                          
                          </div>
                        </div>
                        
                        <div className="list-group-item">
                          <div className="row align-items-center">
                            <div className="col-auto">
                              <span className="fe fe-briefcase fe-modify"></span>
                            </div>
                            <div className="col ml-n2">
                              <h4 className="mb-1">Giấy phép</h4>
                              <span className="text-success">● <small className="text-muted">Đang cập nhật</small></span>
                            </div>                          
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <TableChecklist tableSetup={cabinData} /> */}
              <div className="card">
                <div className="card-header"><h4 className="card-header-title">CABIN</h4></div>
                <div className="table-responsive mb-0">
                    <table className="table table-sm table-nowrap card-table table-hover">
                        <thead>
                            <tr>
                                <th>CABIN</th>
                                <th>STATUS</th>
                                <th>ĐIỆN</th>
                                <th>NƯỚC</th>
                                <th>NHÂN SỰ</th>
                            </tr>
                        </thead>

                        <tbody className="list">
                          {brand && brand.cabinList && brand.cabinList.map((item,index) => (
                            <tr key={item.toString()}> 
                              <td className="project-project">
                                <h4 className="font-weight-normal mb-1">
                                  <Link href='#'>
                                    <a>{brand.cabinName[index]}</a>
                                  </Link>
                                  
                                </h4>
                                <small className="text-muted">{brand.cabinAddress[index]}</small>
                              </td>
                              <td className="project-status"><span className="badge badge-success">Hoạt động</span></td>
                              <td className="project-electric"><h4 className="font-weight-normal mb-1">10Kwh</h4></td>
                              <td className="project-water"><h4 className="font-weight-normal mb-1">25m3</h4></td>
                              <td className="text-right">
                                  <div className="avatar-group">
                                      {brand && brand.staff
                                        ? brand.staff.map((s,index) => (
                                          <Link href="/staffs/{staffID}" as={`/staffs/${brand.staffID[index]}`} key={s.toString()}>
                                            <a className="avatar avatar-xs">
                                              <img src= {brand.staffAvatar[index].url} className="avatar-img rounded-circle" alt={brand.staffName[index]} />
                                            </a>
                                          </Link>    
                                        ))
                                        :''
                                      }
                                  </div>
                              </td>
                              <td className="text-right">
                                <div className="dropdown">
                                  <a href="#" className="dropdown-ellipses dropdown-toggle"><i className="fe fe-more-vertical"></i></a>
                                  <div className="dropdown-menu dropdown-menu-right">
                                      <a href="#!" className="dropdown-item">Action</a>
                                      <a href="#!" className="dropdown-item">Another action</a>
                                      <a href="#!" className="dropdown-item">Something else here</a>
                                  </div>
                                </div>
                              </td>
                          </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
              </div>
              
              <hr className="navbar-divider my-3"/>                                      
              
              <div className="row">
                <h6 className="header-pretitle col-12 head-block">KÊNH FOOD DELIVERY</h6>
                
                <div className="col-12 col-lg-6">  
                  <div className="card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span href="#" className="avatar"><img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." className="avatar-img rounded" /></span>
                        </div>
                        
                        <div className="col ml-n2">
                          <h4 className="mb-1">Grab</h4>
                          <small className="text-muted"><i className="fe fe-clock"></i> Đã kết nối</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                        <span href="#" className="avatar"><img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." className="avatar-img rounded" /></span>
                        </div>
                        <div className="col ml-n2">
                          <h4 className="mb-1">Now</h4>
                          <small className="text-muted"><i className="fe fe-clock"></i> Đã kết nối</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span href="#" className="avatar"><img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." className="avatar-img rounded" /></span>
                        </div>
                        <div className="col ml-n2">
                          <h4 className="mb-1">Loship</h4>
                          <small className="text-muted"><i className="fe fe-clock"></i> Đã kết nối</small>
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
                          <span href="#" className="avatar"><img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." className="avatar-img rounded" /></span>
                        </div>
                        
                        <div className="col ml-n2">
                          <h4 className="mb-1">Baemin</h4>
                          <small className="text-muted"><i className="fe fe-clock"></i> Đã kết nối</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                        <span href="#" className="avatar"><img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." className="avatar-img rounded" /></span>
                        </div>
                        <div className="col ml-n2">
                          <h4 className="mb-1">GoJek</h4>
                          <small className="text-muted"><i className="fe fe-clock"></i> Đã kết nối</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span href="#" className="avatar"><img src="../assets/img/avatars/teams/team-logo-1.jpg" alt="..." className="avatar-img rounded" /></span>
                        </div>
                        <div className="col ml-n2">
                          <h4 className="mb-1">Hotline</h4>
                          <small className="text-muted"><i className="fe fe-clock"></i> Đã kết nối</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="navbar-divider my-3"/>                                      

              <div className="row">
                <h6 className="header-pretitle col-12 head-block">KÊNH FOOD DELIVERY</h6>
                <div className="col-12 col-lg-12 col-xl-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-header-title">On-Boarding Checklist</h4>
                      <span className="badge badge-soft-secondary">23 hạng mục hoàn thành</span>
                    </div>

                    <div className="card-body">
                      <div className="checklist" tabIndex="0">
                        <div className="custom-control custom-checkbox checklist-control" tabIndex="0">
                          <input className="custom-control-input" id="checklistTwo" type="checkbox" checked />
                          <label className="custom-control-label" ></label>
                          <span className="custom-control-caption">Delete the old mess in functions files.</span>
                        </div>
                        <div className="custom-control custom-checkbox checklist-control" tabIndex="0">
                          <input className="custom-control-input" id="checklistThree" type="checkbox" />
                          <label className="custom-control-label" htmlFor="checklistThree"></label>
                          <span className="custom-control-caption">Create the release notes for the new pages so customers get psyched.</span>
                        </div>
                        <div className="custom-control custom-checkbox checklist-control" tabIndex="0">
                          <input className="custom-control-input" id="checklistFour" type="checkbox" />
                          <label className="custom-control-label" htmlFor="checklistFour"></label>
                          <span className="custom-control-caption">Send Dianna those meeting notes</span>
                        </div>
                        <div className="custom-control custom-checkbox checklist-control" tabIndex="0">
                          <input className="custom-control-input" id="checklistFive" type="checkbox" />
                          <label className="custom-control-label" htmlFor="checklistFive"></label>
                          <span className="custom-control-caption">Share the documentation for the new unified API</span>
                        </div>
                        <div className="custom-control custom-checkbox checklist-control" tabIndex="0">
                          <input className="custom-control-input" id="checklistSix" type="checkbox" />
                          <label className="custom-control-label" htmlFor="checklistSix"></label>
                          <span className="custom-control-caption">Clean up the Figma file with all of the avatars, buttons, and other components.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <hr className="navbar-divider my-3"/>                                      

              <div className="row">
                <div className="col-12 col-lg-12 col-xl-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-header-title">GIẤY PHÉP</h4>
                    </div>
                    <div className="card-body">
                      <div className="kanban-category" tabIndex="0">
                        <div className="kanban-item" tabIndex="0">
                          <div className="card card-sm mb-3" data-toggle="modal" data-target="#modalKanbanTask">
                            <div className="card-body">
                              <div className="row">
                                <div className="col"><p className="mb-0">Giấy phép kinh doanh</p></div>
                                <div className="col-auto"><div className="small text-warning" >Đang thực hiện</div></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="kanban-item" tabIndex="0">
                          <div className="card card-sm mb-3" data-toggle="modal" data-target="#modalKanbanTask">
                            <div className="card-body">
                              <div className="row">
                                <div className="col"><p className="mb-0">Chứng chỉ vệ sinh an toàn thực phẩm</p></div>
                                <div className="col-auto"><div className="small text-warning" >Đang thực hiện</div></div>
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
          <script src="./assets/libs/jquery/dist/jquery.min.js"></script>
          <script src="./assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
          <script src="./assets/libs/@shopify/draggable/lib/es5/draggable.bundle.legacy.js"></script>
          <script src="./assets/libs/autosize/dist/autosize.min.js"></script>
          <script src="./assets/libs/chart.js/dist/Chart.min.js"></script>
          <script src="./assets/libs/dropzone/dist/min/dropzone.min.js"></script>
          <script src="./assets/libs/flatpickr/dist/flatpickr.min.js"></script>
          <script src="./assets/libs/highlightjs/highlight.pack.min.js"></script>
          <script src="./assets/libs/jquery-mask-plugin/dist/jquery.mask.min.js"></script>
          <script src="./assets/libs/list.js/dist/list.min.js"></script>
          <script src="./assets/libs/quill/dist/quill.min.js"></script>
          <script src="./assets/libs/select2/dist/js/select2.full.min.js"></script>
          <script src="./assets/libs/chart.js/Chart.extension.js"></script>


          <script src='https://api.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js'></script>


          <script src="./assets/js/theme.min.js"></script>
          <script src="./assets/js/dashkit.min.js"></script>
        </div>
        <style jsx>{`
          .fe-modify {font-size: 1.5em;}
          .head-block {margin-top: 1.5rem;}
        `}</style>
      </div>






    )
  }
}