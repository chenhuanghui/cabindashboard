import React from 'react';

export default class NavChildGroup extends React.Component {
    render () {
        return (
            //  menu child group
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
        )
    }
}