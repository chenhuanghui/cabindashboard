import React from 'react';
import Head from 'next/head'

import NavChildGroup from '../components/nav/nav_child_group'
// import DropUpWithImage from '../components/nav/drop_up_with_image'
import HeaderArrow from '../components/header/header_arrow'
import CardUser from '../components/card/card_user'
import CardChart from '../components/card/card_chart'

import CardItemText from '../components/card/card_item_text'
import CardItemTextChart from '../components/card/card_item_text_chart'
import TableRich from '../components/table/table_rich'

export default class LayoutCabinDetail extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            staffData: [],
            assetData: [],
            productData: []
        }
    }
    componentDidMount() {
        var table1Data = [];
        table1Data.title = `Danh sách nhân viên`;
        
        table1Data.col = [];
        table1Data.col.push(`Tên`);
        table1Data.col.push(`Trạng thái`);
        table1Data.col.push(`Chấm công`);
        table1Data.col.push(`Chứng chỉ`);
        
        table1Data.content = [];
        table1Data.content.push({data1:`Cashey Fei1`,data2:`casheyfei@gmail.com`, data3:`Available`,data4:`07/24/18`, data5:`2/5`})
        table1Data.content.push({data1:`Cashey Fei2`,data2:`casheyfei@gmail.com`, data3:`Available`,data4:`07/24/18`, data5:`2/5`})
        table1Data.content.push({data1:`Cashey Fei3`,data2:`casheyfei@gmail.com`, data3:`Available`,data4:`07/24/18`, data5:`2/5`})
        table1Data.content.push({data1:`Cashey Fei4`,data2:`casheyfei@gmail.com`, data3:`Available`,data4:`07/24/18`, data5:`2/5`})
        table1Data.content.push({data1:`Cashey Fei5`,data2:`casheyfei@gmail.com`, data3:`Available`,data4:`07/24/18`, data5:`2/5`})
        
        this.setState({staffData:table1Data})
        

        var table2Data = [];
        table2Data.title = `Danh sách tài sản`;
        
        table2Data.col = [];
        table2Data.col.push(`Tên`);
        table2Data.col.push(`Số lượng`);
        table2Data.col.push(`Sở hữu`);
        table2Data.col.push(`Giá trị`);
        table2Data
        table2Data.content = [];
        table2Data.content.push({data1:`Bộ quầy kệ1`,data2:`Kích thước: 1m x 2m x3m`, data3:`3`, data4:`CabinFood`, data5:`15.000.000`})
        table2Data.content.push({data1:`Bộ quầy kệ2`,data2:`Kích thước: 1m x 2m x3m`, data3:`3`, data4:`CabinFood`, data5:`15.000.000`})
        table2Data.content.push({data1:`Bộ quầy kệ3`,data2:`Kích thước: 1m x 2m x3m`, data3:`3`, data4:`CabinFood`, data5:`15.000.000`})
        table2Data.content.push({data1:`Bộ quầy kệ4`,data2:`Kích thước: 1m x 2m x3m`, data3:`3`, data4:`CabinFood`, data5:`15.000.000`})
        table2Data.content.push({data1:`Bộ quầy kệ5`,data2:`Kích thước: 1m x 2m x3m`, data3:`3`, data4:`CabinFood`, data5:`15.000.000`})
        this.setState({assetData:table2Data});


        var table3Data = [];
        table3Data.title = `Danh mục sản phẩm`;
        table3Data
        table3Data.col = [];
        table3Data.col.push(`Tên`);
        table3Data.col.push(`Trạng thái`);
        table3Data.col.push(`Danh Mục`);
        table3Data.col.push(`Giá bán`);
        table3Data
        table3Data.content = [];
        table3Data.content.push({data1:`Bún`,data2:`Khô với bò`, data3:`available`, data4:`Món nước`, data5:`35.000`})
        table3Data.content.push({data1:`Mì`,data2:`Khô với bò`, data3:`available`, data4:`Món nước`, data5:`35.000`})
        table3Data.content.push({data1:`Phở`,data2:`Khô với bò`, data3:`available`, data4:`Món nước`, data5:`35.000`})
        table3Data.content.push({data1:`Miến`,data2:`Khô với bò`, data3:`available`, data4:`Món nước`, data5:`35.000`})
        table3Data.content.push({data1:`Hủ tiếu`,data2:`Khô với bò`, data3:`available`, data4:`Món nước`, data5:`35.000`})
        this.setState({productData:table3Data});
    }

    
    

    render () {
        const {staffData, assetData, productData} = this.state;
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

                <div className="main-content">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">
                                <HeaderArrow />
                                <CardUser />
                                <CardChart />
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <CardItemTextChart title={`Điện tiêu thụ`}  value={`234 Kwh`} value_up_down={`3,5%`}/>
                                        <CardItemTextChart title={`Nước tiêu thụ`}  value={`234 m3`} value_up_down={`3,5%`}/>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <CardItemTextChart title={`Nền nhiệt độ`}  value={`29 C`} value_up_down={`3,5%`}/>
                                        <CardItemTextChart title={`Ngày làm việc`}  value={`29 ngày`}/>
                                    </div>
                                </div>
                                
                                <TableRich tableSetup={staffData}/>
                                <TableRich tableSetup={assetData}/>
                                <TableRich tableSetup={productData}/>
                                
                            
                            
                        </div>
                    </div>
                </div>
                {/* <script src='../assets/js/jquery.min.js'></script>
                <script src='../assets/js/theme.min.js'></script>
                <script src='../assets/js/bootstrap.bundle.min.js'></script> */}
                
            </div>
        )
    }
}