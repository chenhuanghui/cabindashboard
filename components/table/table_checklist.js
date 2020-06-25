import React from 'react';

export default class TableChecklist extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    
    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        if (this.props.tableSetup !== prevProps.tableSetup) {
            console.log('props update');
            this.setState({data:this.props.tableSetup})
        }        
    }
    
    render () {
        const {data} = this.state;
        return (
            <div className="card">
                <div className="card-header">
                    {/* title */}
                    <h4 className="card-header-title">{data.title}</h4>
                    {/* button */}
                    <a href="#!" className="btn btn-sm btn-white btn-modal" id='modal_product_edit'>Export</a> 
                </div>
                {/* end card header */}

                <div className="table-responsive mb-0">
                    <table className="table table-sm table-nowrap card-table table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                {data && data.col && data.col.map((c) => (
                                    <th>
                                        <a href="#" className="text-muted list-sort">{c}</a>
                                    </th>
                                ))
                                }
                                <th></th>
                            </tr>
                        </thead>

                        <tbody className="list">
                            {/* table item */}
                            {data && data.content && data.content.map((item) => (
                                <tr>
                                   
                                    
                                   <td className="project-project">
                                   <h4 className="font-weight-normal mb-1">{item.data1}</h4>
                                        <small className="text-muted">{item.data2}</small>
                                      
                                    </td>

                                 
                                    <td className="project-status">
                                        <span className="badge badge-soft-warning">{item.data3}</span>
                                    </td>

                                    <td className="project-electric">
                                        <time dateTime="2018-10-24">{item.data4}</time>
                                    </td>
                                    <td className="project-water">
                                        <time dateTime="2018-10-24">{item.data5}</time>
                                    </td>
                                    <td className="text-right">
                                        <div className="avatar-group">
                                            <a href="profile-posts.html" className="avatar avatar-xs">
                                                <img src="/assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
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
                            ))}
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

