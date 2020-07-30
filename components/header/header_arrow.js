import React from 'react';
import { data } from 'jquery';

export default class HeaderArrow extends React.Component {
    

    render () {
        return (
            // header 
            <div className="header">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-end">
                            <div className="col-auto">
                                <button className="btn btn-lg btn-rounded-circle btn-white"> + </button>    
                            </div>
                            
                            <div className="col">
                                <h6 className="header-pretitle">{this.props.cabinAddr}</h6>
                                <h1 className="header-title">{this.props.cabinName}</h1>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}