import React from 'react';

export default class TableRich extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            count: 0
        }
    }
    
    componentDidMount() {
        // this.setState({data:this.props.tableSetup})
        console.log(1);
    }

    componentDidUpdate(prevProps) {
        console.log(2);
        if (this.props.tableSetup !== prevProps.tableSetup) {
            console.log('form update');
            this.setState({data:this.props.tableSetup})
            
        }
        
    }
    
    render () {
        const{data} = this.state;
        // if (data.title == null) console.log('null')
        
        return (
            <div className="card">
                <div className="card-header">
                    {/* title */}
                    <h4 className="card-header-title">{data.title}</h4>
                    {/* button */}
                    <a href="#!" className="btn btn-sm btn-white">Export</a> 
                </div>
                {/* end card header */}

                <div className="table-responsive mb-0">
                    <table className="table table-sm table-nowrap card-table table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                {data.title != null
                                ?
                                    data.col.map((c) => (
                                        <th><a href="#" className="text-muted list-sort" data-sort="project-status">{c}</a></th>
                                    ))
                                : ''
                                }
                                
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="list">
                            {/* table item */}
                            {data.title != null 
                            ?
                                data.content.map((item) => (
                                    <tr>
                                        <td className="text-right">
                                            <div className="avatar-group">
                                                <a href="profile-posts.html" className="avatar avatar-xs" data-toggle="tooltip" title="Dianna Smiley">
                                                    <img src="/assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
                                                </a>
                                            </div>
                                        </td>
                                        
                                        <td className="project-project">
                                            <h4 className="font-weight-normal mb-1">{item.name}</h4>
                                            <small className="text-muted">{item.email}</small>
                                        </td>

                                        <td className="project-status">
                                            <span className="badge badge-soft-warning">{item.status}</span>
                                        </td>

                                        <td className="project-date">
                                            <time dateTime="2018-10-24">{item.date}</time>
                                        </td>

                                        <td className="project-date">
                                            <span> {item.cer}</span>
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
                                ))       
                            : ''
                            }
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

