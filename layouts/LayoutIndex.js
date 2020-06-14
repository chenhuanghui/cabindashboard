import React from 'react';
import Head from 'next/head'

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
                                {/* menu child group */}
                                <li className="nav-item">
                                    <a className="nav-link" href="#sidebarDashboards" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="sidebarDashboards">
                                        <i className="fe fe-home"></i> Dashboards
                                    </a>
                                    <div className="collapse show" id="sidebarDashboards">
                                        <ul className="nav nav-sm flex-column">
                                            <li className="nav-item">
                                                <a href="./index.html" className="nav-link active">Default</a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="./dashboard-project-management.html" className="nav-link ">Project Management</a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="./dashboard-ecommerce.html" className="nav-link ">E-Commerce</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>

                            <hr className="navbar-divider my-3"/>
                            {/* menu group header */}
                            <h6 className="navbar-heading">Documentation</h6>
                            {/* menu group block */}
                            <ul className="navbar-nav">
                                {/* menu child group */}
                                <li className="nav-item">
                                    <a className="nav-link" href="#sidebarBasics" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarBasics">
                                        <i className="fe fe-clipboard"></i> Basics
                                    </a>
                                    <div className="collapse show" id="sidebarBasics">
                                        <ul className="nav nav-sm flex-column">
                                            <li className="nav-item ">
                                                <a href="./docs/getting-started.html" className="nav-link">Getting Started</a>
                                            </li>
                                            <li className="nav-item ">
                                                <a href="./docs/design-file.html" className="nav-link">Design File</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>   

                            {/* Push content down */}
                            <div className="mt-auto"></div>

                            <div className="navbar-user d-none d-md-flex" id="sidebarUser">

                                <a href="#sidebarModalActivity" className="navbar-user-link" data-toggle="modal">
                                    <span className="icon"><i className="fe fe-bell"></i></span>
                                </a>

                                <div className="dropup">

                                <a href="#" id="sidebarIconCopy" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <div className="avatar avatar-sm avatar-online">
                                        <img src="./assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
                                    </div>
                                </a>

                                {/* Menu */}
                                <div className="dropdown-menu" aria-labelledby="sidebarIconCopy">
                                    <a href="./profile-posts.html" className="dropdown-item">Profile</a>
                                    <a href="./account-general.html" className="dropdown-item">Settings</a>
                                    <hr className="dropdown-divider"/>
                                    <a href="./sign-in.html" className="dropdown-item">Logout</a>
                                </div>

                                </div>

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
            </div>
        )
    }
}