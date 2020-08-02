import React from 'react';
import Head from 'next/head'

import NavChildGroup from '../../components/nav/nav_child_group'
// import DropUpWithImage from '../../components/nav/drop_up_with_image'
import HeaderArrow from '../../components/header/header_arrow'
import TableRich from '../../components/table/table_rich'
import ModalProductEdit from '../../components/modal/modal_product_edit'

export default class LayoutProduct extends React.Component {
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

                <div className="main-content">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">
                            <HeaderArrow />
                            <TableRich tableSetup={productData}/>
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
            </div>
        )
    }
}