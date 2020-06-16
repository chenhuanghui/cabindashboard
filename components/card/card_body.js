import React from 'react';

export default class CardBody extends React.Component {
    

    render () {
        return (
            // card body
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <a href="profile-posts.html" className="avatar avatar-lg">
                        <img src="/assets/img/avatars/profiles/avatar-1.jpg" alt="..." className="avatar-img rounded-circle"/>
                        </a>
                    </div>
                    
                    <div className="col ml-n2">
                        <h4 className="mb-1"><a href="profile-posts.html">Cabin 05 - BRAND 01</a></h4>
                        
                        <p className="small text-muted mb-1">Ngày bắt đầu kinh doanh: 16/06/2020</p>
                        
                        <p className="small mb-0">
                            <span className="text-success">●</span> Đang hoạt động
                        </p>
                    </div>

                    <div className="col-auto">
                        <a href="#!" className="btn btn-sm btn-primary d-none d-md-inline-block">Thay đổi</a>
                    </div>
                    
                    <div className="col-auto">
                        <div className="dropdown">
                            <a href="#" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" data-expanded="false">
                                <i className="fe fe-more-vertical"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a href="#!" className="dropdown-item">Action</a>
                                <a href="#!" className="dropdown-item">Another action</a>
                                <a href="#!" className="dropdown-item">Something else here</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}