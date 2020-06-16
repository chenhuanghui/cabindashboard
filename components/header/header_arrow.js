import React from 'react';

export default class HeaderArrow extends React.Component {
    

    render () {
        return (
            // header 
            <div className="header">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-end">
                            <div className="col-auto">
                                <button class="btn btn-lg btn-rounded-circle btn-white"> + </button>    
                            </div>
                            
                            <div className="col">
                                <h6 className="header-pretitle">BRAND 01 - 31 PHAN NGỮ, ĐAKAO, QUẬN 1, HCM</h6>
                                <h1 className="header-title">CABIN 05</h1>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}