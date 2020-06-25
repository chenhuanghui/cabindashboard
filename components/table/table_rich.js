import React from 'react';
import DropUpWithImage from '../../components/nav/drop_up_with_image'
export default class TableRich extends React.Component {
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
                    <a href="#!" className="btn btn-sm btn-white btn-modal" id='modal_product_edit'>Thêm sản phẩm</a> 
                </div>
                {/* end card header */}

                <div className="table-responsive mb-0">
                    <table className="table table-sm table-nowrap card-table table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                {data && data.col && data.col.map((c) => {
                                    <th>
                                        <a href="#" className="text-muted list-sort">{c}</a>
                                    </th>
                                })
                                }
                                <th></th>
                            </tr>
                        </thead>

                        <tbody className="list">
                            {/* table item */}
                            {data && data.content && data.content.map((item) => (
                                    <tr>
                                        <td className="text-right">
                                            <div className="avatar-group">
                                                <a href="profile-posts.html" className="avatar avatar-xs">
                                                    <img src="/assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
                                                </a>
                                            </div>
                                        </td>
                                        
                                        <td className="project-project">
                                            <h4 className="font-weight-normal mb-1">{item.data1}</h4>
                                        
                                        </td>
                                        <td className="project-status">
                                            <span className="badge badge-soft-warning">{item.data2}</span>
                                        </td>
                                        <td className="project-project">
                                        <h4 className="font-weight-normal mb-1">{item.data3}</h4>
                                        </td>
                                    

                                        <td className="project-project">
                                        <h4 className="font-weight-normal mb-1">{item.data4}</h4>
                                        </td>

                                        <td className="project-project">
                                        <h4 className="font-weight-normal mb-1">{item.data5}</h4>
                                        </td>
                                    
                                        <td className="text-right">
                                        <DropUpWithImage />
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

