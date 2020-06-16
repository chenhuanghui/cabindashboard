import React from 'react';

export default class TableRich extends React.Component {
    render () {
        return (
            <div className="card">
                <div className="card-header">
                    {/* title */}
                    <h4 className="card-header-title">{this.props.tableSetup.title}</h4>
                    {/* button */}
                    <a href="#!" className="btn btn-sm btn-white">Export</a> 
                </div>
                {/* end card header */}

                <div className="table-responsive mb-0" data-list='{"valueNames": ["project-project", "project-status", "project-progress", "project-date"]}'>
                    <table className="table table-sm table-nowrap card-table table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                {this.props.tableSetup.col.map((c) => (
                                    <th><a href="#" className="text-muted list-sort" data-sort="project-status">{c}</a></th>
                                ))}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="list">
                            {/* table item */}
                            <tr>
                                <td className="text-right">
                                    <div className="avatar-group">
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Dianna Smiley">
                                            <img src="/assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                    </div>
                                </td>
                                
                                <td className="project-project">
                                    <h4 className="font-weight-normal mb-1">Cashey Fei</h4>
                                    <small className="text-muted">casheyfei@gmail.com</small>
                                </td>

                                <td className="project-status">
                                    <span className="badge badge-soft-warning">Available</span>
                                </td>

                                <td className="project-date">
                                    <time datetime="2018-10-24">07/24/18</time>
                                </td>

                                <td className="project-date">
                                    <span> 2/5</span>
                                </td>
                               
                                <td className="text-right">
                                    <div className="dropdown">
                                        <a href="#" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fe fe-more-vertical"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a href="#!" className="dropdown-item">Action</a>
                                            <a href="#!" className="dropdown-item">Another action</a>
                                            <a href="#!" className="dropdown-item">Something else here</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                           {/* table item */}
                           <tr>
                                <td className="text-right">
                                    <div className="avatar-group">
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Dianna Smiley">
                                            <img src="/assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                    </div>
                                </td>
                                
                                <td className="project-project">
                                    <h4 className="font-weight-normal mb-1">Cashey Fei</h4>
                                    <small className="text-muted">casheyfei@gmail.com</small>
                                </td>

                                <td className="project-status">
                                    <span className="badge badge-soft-warning">Available</span>
                                </td>

                                <td className="project-date">
                                    <time datetime="2018-10-24">07/24/18</time>
                                </td>

                                <td className="project-date">
                                    <span> 2/5</span>
                                </td>
                               
                                <td className="text-right">
                                    <div className="dropdown">
                                        <a href="#" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fe fe-more-vertical"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a href="#!" className="dropdown-item">Action</a>
                                            <a href="#!" className="dropdown-item">Another action</a>
                                            <a href="#!" className="dropdown-item">Something else here</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                           {/* table item */}
                           <tr>
                                <td className="text-right">
                                    <div className="avatar-group">
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Dianna Smiley">
                                            <img src="/assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                    </div>
                                </td>
                                
                                <td className="project-project">
                                    <h4 className="font-weight-normal mb-1">Cashey Fei</h4>
                                    <small className="text-muted">casheyfei@gmail.com</small>
                                </td>

                                <td className="project-status">
                                    <span className="badge badge-soft-warning">Available</span>
                                </td>

                                <td className="project-date">
                                    <time datetime="2018-10-24">07/24/18</time>
                                </td>

                                <td className="project-date">
                                    <span> 2/5</span>
                                </td>
                               
                                <td className="text-right">
                                    <div className="dropdown">
                                        <a href="#" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fe fe-more-vertical"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a href="#!" className="dropdown-item">Action</a>
                                            <a href="#!" className="dropdown-item">Another action</a>
                                            <a href="#!" className="dropdown-item">Something else here</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                           {/* table item */}
                           <tr>
                                <td className="text-right">
                                    <div className="avatar-group">
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Dianna Smiley">
                                            <img src="/assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                    </div>
                                </td>
                                
                                <td className="project-project">
                                    <h4 className="font-weight-normal mb-1">Cashey Fei</h4>
                                    <small className="text-muted">casheyfei@gmail.com</small>
                                </td>

                                <td className="project-status">
                                    <span className="badge badge-soft-warning">Available</span>
                                </td>

                                <td className="project-date">
                                    <time datetime="2018-10-24">07/24/18</time>
                                </td>

                                <td className="project-date">
                                    <span> 2/5</span>
                                </td>
                               
                                <td className="text-right">
                                    <div className="dropdown">
                                        <a href="#" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fe fe-more-vertical"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a href="#!" className="dropdown-item">Action</a>
                                            <a href="#!" className="dropdown-item">Another action</a>
                                            <a href="#!" className="dropdown-item">Something else here</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            
                        </tbody>
                    </table>
                </div>
        <style jsx>{`
            .progress.progress-sm{
                min-width: 40px
            }
            .progress-bar{
                width: 55%
            }
        `}</style>
            </div>
            
        )
    }
}

