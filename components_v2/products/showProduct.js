import React from 'react'
import $ from 'jquery'

export default class ShowProduct extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    componentDidMount() {        
        let currentComponent = this        
        
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="list-group list-group-flush my-n4">
                        <div className="list-group-item">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <a href="#" className="avatar avatar-4by3">
                                        <img src={this.props.image} alt="..." className="avatar-img rounded"/>
                                    </a>
                                </div>
                                <div className="col-2">
                                    <h5 className="mb-1 text-focus">{this.props.name}</h5>
                                </div>
                                <div className="col-4">
                                    <p className="mb-1 text-muted small text-center">{this.props.desc}</p>
                                </div>
                                <div className="col">
                                    <p className="mb-1 small text-center">
                                        <span className="fe fe-tag mr-2"></span>
                                        {this.props.price}
                                    </p>
                                </div>
                                <div className="col-auto">
                                    <div className="custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
                                        <label className="custom-control-label" for="customSwitch1"></label>
                                    </div>
                                </div>
                            </div>                                                
                        </div>                                            
                    </div>
                </div>
            </div>    
        )
    }
}