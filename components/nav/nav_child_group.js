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
                            <a href="../Dashboard" className="nav-link active">Tổng quan</a>
                        </li>
                        <li className="nav-item">
                            <a href="../product" className="nav-link ">Sản phẩm</a>
                        </li>
                      
                        <li className="nav-item">
                            <a href="../Staff" className="nav-link ">Nhân sư</a>
                        </li>
                    </ul>
                </div>
            </li>
        )
    }
}