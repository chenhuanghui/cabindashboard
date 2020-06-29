import React from 'react';
import Link from 'next/link'
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
                            <Link href="../Dashboard" >
                            <a className="nav-link active">Tổng quan</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                        <Link href="../product" >
                            <a className="nav-link active">Sản phẩm</a>
                            </Link>
                        </li>
                        <Link href="../Staff" >
                            <a className="nav-link active">Nhân sự</a>
                            </Link>
                      
                    </ul>
                </div>
            </li>
        )
    }
}