import React from 'react';
// import DropUpWithImage from '../../components/nav/drop_up_with_image'
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
            // console.log('data table', this.props.tableSetup);
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
                                {data && data.col && data.col.map((c, index) => (
                                    <th key={index}>
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
                                               { <small className="text-muted">{item.data2}</small> }
                                    </td>
                                    <td className="project-project">
                                        <h4 className="font-weight-normal mb-1 ">{item.data3}</h4>
                                    </td>
                                    <td className="project-status">
                                    <h4 className="badge badge-soft-warning">{item.data4}</h4>
                                    
                                    </td>
                                  

                                    <td className="project-project">
                                    <h4 className="font-weight-normal mb-1">{item.data5}</h4>
                                    </td>

                                    <td className="text-right">
                                    <h4 className="font-weight-normal mb-1">{item.data6}</h4>
                                        </td>

                                        <td className="text-right">
                                        <div id='dropdown-containter' className="dropdown ">
                                                <a id='dropdown-a 'href="#" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fe fe-more-vertical"></i>
                                                </a>
                                                <div id='dropdown-menu' className="dropdown-menu dropdown-menu-right  ">
                                                  <a href="#!" className="dropdown-item btn-modal" id='modal_product_edit'>Chỉnh sửa</a>
                                                    <a href="#!" className="dropdown-item">Xóa</a>
                                                   
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

