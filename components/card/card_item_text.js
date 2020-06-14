import React from 'react';

export default class CardItemText extends React.Component {
    render () {
        return (
            // card Item Text Component
            <div className="card">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col">
                            <h6 className="text-uppercase text-muted mb-2">{this.props.title}</h6>
                            <span className="h2 mb-0">{this.props.value}</span>
                            {
                                ! this.props.value_up_down == ''
                                ? <span className="badge badge-soft-success mt-n1"> {this.props.value_up_down}</span>  
                                : ''
                            }
                        </div>

                        <div className="col-auto">
                            <span className="h2 fe fe-dollar-sign text-muted mb-0"></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// data icon
// thêm class vào mục <span className="h2 fe text-muted ... ">
// .fe-dollar-sign
// .fe-briefcase
// .fe-clock
