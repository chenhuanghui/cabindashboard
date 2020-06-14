import React from 'react';
import Head from 'next/head'

import NavChildGroup from '../components/nav/nav_child_group'
import DropUpWithImage from '../components/nav/drop_up_with_image'
import CardItemText from '../components/card/card_item_text'
import CardItemTextChart from '../components/card/card_item_text_chart'

export default class LayoutBundleDeliveryRight extends React.Component {
    render () {
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
                    {/* header */}
                    <div className="header">
                        <div className="container-fluid">
                            <div className="header-body">
                                <div className="row align-items-end">
                                    <div className="col">
                                        <h6 className="header-pretitle">Overview</h6>
                                        <h1 className="header-title">Dashboard</h1>
                                    </div>
                                    <div className="col-auto">
                                        <a href="#!" className="btn btn-primary lift">Create Report</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end header */}

                    <div className="container-fluid">
                        <div className="row">
                            
                            <CardItemText title={'Value'} value={'$24,500'} value_up_down={'+3,5%'} icon_class={'.fe-dollar-sign'}/>
                            <CardItemText title={'TOTAL HOURS'} value={'763.5'} value_up_down={''} icon_class={'.fe-dollar-sign'}/>
                            <CardItemTextChart title={'EXIT %'} value={'35.5%'}/>
                            <CardItemText title={'AVG. TIME'} value={'2:37'} value_up_down={''} icon_class={'.fe-dollar-sign'}/>
                            
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}