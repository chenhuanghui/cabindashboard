import React from 'react';
import Head from 'next/head'

import NavChildGroup from '../components/nav/nav_child_group'
import DropUpWithImage from '../components/nav/drop_up_with_image'
import HeaderArrow from '../components/header/header_arrow'
import TableRich from '../components/table/table_rich'
import ModalLeft from '../components/modal/modal_left'

export default class LayoutProduct extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            productData: []
        }
    }
    componentDidMount() {
        var table3Data = [];
        table3Data.title = `Danh mục sản phẩm`;
        
        table3Data.col = [];
        table3Data.col.push(`Tên`);
        table3Data.col.push(`Trạng thái`);
        table3Data.col.push(`Danh Mục`);
        table3Data.col.push(`Giá bán`);
        
        table3Data.content = [];
        table3Data.content.push({data1:`Bún`,data2:`Khô với bò`, data3:`available`, data4:`Món nước`, data5:`35.000`})
        table3Data.content.push({data1:`Mì`,data2:`Khô với bò`, data3:`available`, data4:`Món nước`, data5:`35.000`})
        table3Data.content.push({data1:`Phở`,data2:`Khô với bò`, data3:`available`, data4:`Món nước`, data5:`35.000`})
        table3Data.content.push({data1:`Miến`,data2:`Khô với bò`, data3:`available`, data4:`Món nước`, data5:`35.000`})
        table3Data.content.push({data1:`Hủ tiếu`,data2:`Khô với bò`, data3:`available`, data4:`Món nước`, data5:`35.000`})

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

                <div className="main-content">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">
                            <ModalLeft />
                            <HeaderArrow />
                            <TableRich tableSetup={productData}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}