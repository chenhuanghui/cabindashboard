import React from 'react'
import $ from 'jquery'

export default class AddProduct extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    componentDidMount() {        
        let currentComponent = this        
    }

    onClose=()=>{
        $("#showAddProduct").hide()
    }

    render() {
        return (
            <div className={`card showAddProduct ${this.props.className}`} style={{display: "none"}}>
                <div className="row py-2" style={{position: "relative"}}>                                            
                    <div className="col-8">
                        <input type="text" className="form-control form-control-flush ml-4" placeholder="Thêm sản phẩm mới"/>
                    </div>
                    <div className="col-auto py-n4">
                        <p className="mb-1 small text-center text-muted">
                            <div className="input-group input-group-flush">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fe fe-tag"></i></span>
                                </div>
                                <input className="form-control list-search" placeholder="0.000 đ"/>
                            </div>
                        </p>
                    </div>
                    <div className="col-auto py-2" style={{position:"absolute", right: "10px"}}>
                        <button className="btn btn-white mr-3 btn-sm" id="btnAddProductCancel" onClick={this.onClose}> Hủy</button>
                        <button className="btn btn-primary btn-sm" id="btnAddProductCreate"> Tạo</button>
                    </div>
                    
                </div>                                        
            </div>
        )
    }
}