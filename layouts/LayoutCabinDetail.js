import React from 'react';
import Head from 'next/head'

import NavChildGroup from '../components/nav/nav_child_group'
import DropUpWithImage from '../components/nav/drop_up_with_image'
import HeaderArrow from '../components/header/header_arrow'
import CardBody from '../components/card/card_body'
import CardChart from '../components/card/card_chart'

import CardItemText from '../components/card/card_item_text'
import CardItemTextChart from '../components/card/card_item_text_chart'
import TableRich from '../components/table/table_rich'

export default class LayoutCabinDetail extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            table1: []
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
        table1Data.content.push({name:`Cashey Fei1`,email:`casheyfei@gmail.com`, status:`Available`,date:`07/24/18`, cer:`2/5`})
        table1Data.content.push({name:`Cashey Fei2`,email:`casheyfei@gmail.com`, status:`Available`,date:`07/24/18`, cer:`2/5`})
        table1Data.content.push({name:`Cashey Fei3`,email:`casheyfei@gmail.com`, status:`Available`,date:`07/24/18`, cer:`2/5`})
        table1Data.content.push({name:`Cashey Fei4`,email:`casheyfei@gmail.com`, status:`Available`,date:`07/24/18`, cer:`2/5`})
        table1Data.content.push({name:`Cashey Fei5`,email:`casheyfei@gmail.com`, status:`Available`,date:`07/24/18`, cer:`2/5`})
        
        this.setState({table1:table1Data})
        console.log(`table1`,table1Data);
    }

    
    

    render () {
        const {table1} = this.state;
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
                                <CardBody />
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
                                <TableRich tableSetup={table1}/>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}