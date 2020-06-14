import React from 'react';

export default class TableRich extends React.Component {
    render () {
        return (
            <div className="card">
                <div className="card-header">
                    {/* title */}
                    <h4 className="card-header-title">Active Projects</h4>
                    {/* button */}
                    <a href="#!" className="btn btn-sm btn-white">Export</a> 
                </div>
                {/* end card header */}

                <div className="table-responsive mb-0" data-list='{"valueNames": ["project-project", "project-status", "project-progress", "project-date"]}'>
                    <table className="table table-sm table-nowrap card-table table-hover">
                        <thead>
                            <tr>
                                <th><a href="#" className="text-muted list-sort" data-sort="project-project">Project</a></th>
                                <th><a href="#" className="text-muted list-sort" data-sort="project-status">Status</a></th>
                                <th><a href="#" className="text-muted list-sort" data-sort="project-progress">Progress</a></th>
                                <th><a href="#" className="text-muted list-sort" data-sort="project-date">Due date</a></th>
                                <th className="text-right">Team</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="list">
                            {/* table item */}
                            <tr>
                                <td className="project-project">
                                    <h4 className="font-weight-normal mb-1">Update the API</h4>
                                    <small className="text-muted">Oki Doki Collective</small>
                                </td>
                                <td className="project-status">
                                    <span className="badge badge-soft-warning">In progress</span>
                                </td>
                                <td className="project-progress">
                                    <div className="d-flex align-items-center">
                                        <div className="mr-3">55%</div>
                                        <div className="progress progress-sm">
                                            <div className="progress-bar bg-secondary" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="project-date">
                                    <time datetime="2018-10-24">07/24/18</time>
                                </td>

                                <td className="text-right">
                                    <div className="avatar-group">
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Dianna Smiley">
                                            <img src="assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Ab Hadley">
                                            <img src="assets/img/avatars/profiles/avatar-2.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Adolfo Hess">
                                            <img src="assets/img/avatars/profiles/avatar-3.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Daniela Dewitt">
                                            <img src="assets/img/avatars/profiles/avatar-4.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                    </div>
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
                                <td className="project-project">
                                    <h4 className="font-weight-normal mb-1">Update the API</h4>
                                    <small className="text-muted">Oki Doki Collective</small>
                                </td>
                                <td className="project-status">
                                    <span className="badge badge-soft-warning">In progress</span>
                                </td>
                                <td className="project-progress">
                                    <div className="d-flex align-items-center">
                                        <div className="mr-3">55%</div>
                                        <div className="progress progress-sm">
                                            <div className="progress-bar bg-secondary" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="project-date">
                                    <time datetime="2018-10-24">07/24/18</time>
                                </td>

                                <td className="text-right">
                                    <div className="avatar-group">
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Dianna Smiley">
                                            <img src="assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Ab Hadley">
                                            <img src="assets/img/avatars/profiles/avatar-2.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Adolfo Hess">
                                            <img src="assets/img/avatars/profiles/avatar-3.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Daniela Dewitt">
                                            <img src="assets/img/avatars/profiles/avatar-4.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                    </div>
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
                                <td className="project-project">
                                    <h4 className="font-weight-normal mb-1">Update the API</h4>
                                    <small className="text-muted">Oki Doki Collective</small>
                                </td>
                                <td className="project-status">
                                    <span className="badge badge-soft-warning">In progress</span>
                                </td>
                                <td className="project-progress">
                                    <div className="d-flex align-items-center">
                                        <div className="mr-3">55%</div>
                                        <div className="progress progress-sm">
                                            <div className="progress-bar bg-secondary" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="project-date">
                                    <time datetime="2018-10-24">07/24/18</time>
                                </td>

                                <td className="text-right">
                                    <div className="avatar-group">
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Dianna Smiley">
                                            <img src="assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Ab Hadley">
                                            <img src="assets/img/avatars/profiles/avatar-2.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Adolfo Hess">
                                            <img src="assets/img/avatars/profiles/avatar-3.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Daniela Dewitt">
                                            <img src="assets/img/avatars/profiles/avatar-4.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                    </div>
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
                                <td className="project-project">
                                    <h4 className="font-weight-normal mb-1">Update the API</h4>
                                    <small className="text-muted">Oki Doki Collective</small>
                                </td>
                                <td className="project-status">
                                    <span className="badge badge-soft-warning">In progress</span>
                                </td>
                                <td className="project-progress">
                                    <div className="d-flex align-items-center">
                                        <div className="mr-3">55%</div>
                                        <div className="progress progress-sm">
                                            <div className="progress-bar bg-secondary" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="project-date">
                                    <time datetime="2018-10-24">07/24/18</time>
                                </td>

                                <td className="text-right">
                                    <div className="avatar-group">
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Dianna Smiley">
                                            <img src="assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Ab Hadley">
                                            <img src="assets/img/avatars/profiles/avatar-2.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Adolfo Hess">
                                            <img src="assets/img/avatars/profiles/avatar-3.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                        <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Daniela Dewitt">
                                            <img src="assets/img/avatars/profiles/avatar-4.jpg" className="avatar-img rounded-circle" alt="..."/>
                                        </a>
                                    </div>
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

