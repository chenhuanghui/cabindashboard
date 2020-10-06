import $ from 'jquery';
import React from 'react';
import FilterResults from 'react-filter-search';

export default class ModalCreateProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalHeight: 0,
            categories: [],
            selectCat: ''
        }
    }

    componentDidMount() {
        let currentComponent = this
        
        let clientHeight = (window.innerHeight) * 0.85
        console.log("clientHeight: ", clientHeight)
        currentComponent.setState({modalHeight: clientHeight})        

        // $(document).on("click", ".close", function(){
        //     var modalID = $(this).attr("modal-id")
        //     console.log("modal-id: ", modalID)
        //     $(".modal-backdrop").hide()
        //     $("body").removeClass("modal-open")
        //     $(modalID).hide().removeClass("show")
        // })

        // this.getCategory().then(res=> {
        //     currentComponent.setState({categories: res})
        // })
    }

    componentDidUpdate (prevProps, prevState) {
        
    }

    handleChange = event => {
        const { value } = event.target;
        this.setState({selectCat: value});
    }

    onClose = () => {
        // var modalID = $(this).attr("modal-id")
        // console.log("modal-id: ", modalID)
        $(".modal-backdrop").hide()
        $("body").removeClass("modal-open")
        // $(modalID).hide().removeClass("show")
        
        this.props.onClosed()
    }

    render() {
        const {categories, modalHeight, selectCat} = this.state
        
        return(
            <div className="modal fade show" id="createProduct" tabIndex="-1" role="dialog" aria-modal="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-card card">
                            <div className="card-header">

                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <button type="button" className="close" modal-id="#createProduct" data-dismiss="modal" aria-label="Close" onClick={this.onClose}> 
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="col ml-n2 text-center">
                                        <h4 className="card-header-title">Thêm sản phẩm mới</h4>
                                    </div>
                                    <div className="col-auto">
                                        <button type="button" className="save btn btn-primary btn-sm pl-4 pr-4"> Lưu</button>
                                    </div>
                                </div>

                            </div>
                            
                            <div className="card-body" style={{maxHeight: modalHeight, overflowY: "auto"}}>
                                <h6 className="header-pretitle">Thông tin</h6>
                                
                                <div className="form-group">
                                    <label className="mb-1">Hình ảnh sản phẩm</label>
                                    <small className="form-text text-muted">Chọn hình ảnh không quá 1200px * 600px</small>
                                    <div className="card">
                                        <div className="dropzone dropzone-single mb-3 dz-clickable" data-toggle="dropzone">
                                            <div className="dz-preview dz-preview-single"></div>
                                            <div className="dz-default dz-message">
                                                <button className="dz-button" type="button">Drop files here to upload</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>   

                                <div className="form-group">
                                    <label>Tên sản phẩm</label>
                                    <input type="text" className="form-control"/>
                                </div>  

                                <div className="form-group">
                                    <label>Mô tả</label>
                                    <input type="text" className="form-control"/>
                                </div>

                                <div className="form-group">
                                    <label>Giá bán</label>
                                    <input type="text" className="form-control"/>
                                </div>

                                <div className="form-group">
                                    <label>Danh mục sản phẩm</label>
                                    <div className="input-group input-group-merge" style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
                                        <input 
                                            type="search" 
                                            className="form-control form-control-prepended list-search" 
                                            placeholder="Chọn danh mục cho sản phẩm" 
                                            value={selectCat} 
                                            onChange={this.handleChange}
                                        />
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"> <span className="fe fe-search"></span></div>
                                        </div>
                                    </div>
                                    <div className="card pb-0 mb-4" style={{borderRadius: 0}}>
                                        <ul className="list-group category-list pb-3">
                                        <FilterResults
                                            value={selectCat}
                                            data={categories}
                                            renderResults={results => {
                                                console.log("search ", results)
                                                return results.length > 0
                                                ? results.map((item, index) => {
                                                        return index === 0
                                                        ? 
                                                            <li className="list-group-item pt-3 pb-2" style={{border:"none"}} key={index}> 
                                                                <p className="small text-primary mb-0 category-item">{item.name}</p>
                                                            </li>
                                                        : 
                                                            <li className="list-group-item pt-3 pb-2" style={{border:"none"}} key={index}> 
                                                                <p className="small text-primary mb-0 category-item">{item.name}</p>
                                                            </li>
                                                    })
                                                :   <li className="list-group-item pt-3 pb-2" style={{border:"none"}} key="extra"> 
                                                        <p className="small text-primary mb-0 category-item">
                                                            {selectCat}
                                                            <span className="text-focus text-primary"> (Tạo mới danh mục)</span>
                                                        </p>
                                                    </li>
                                            }}
                                        />
                                        </ul>
                                    </div>
                                </div>

                                <h6 className="header-pretitle">Tùy chọn</h6>
                                <div className="card card-option">
                                    <div className="card-body pt-0 pb-0">
                                        <div className="row align-items-center border-bottom border-bottom-1 pb-3 pt-3">
                                            <div className="col-1 col-md-auto pt-1">
                                                <i className="fe fe-menu"></i>
                                            </div>
                                            <div className="col-3 col-md-auto">
                                                <span className="small text-focus">Chọn cỡ</span>
                                            </div>
                                            <div className="col-5 col-md text-center">
                                                <span className="mb-md-0 text-muted small">Cỡ M, Cỡ L</span>
                                            </div>
                                            <div className="col-2 col-md-auto text-right">
                                                <span className="mb-md-0 small text-focus text-primary">Chỉnh sửa</span>
                                            </div>
                                        </div>

                                        <div className="row align-items-center border-bottom border-bottom-1 pb-3 pt-3">
                                            <div className="col-1 col-md-auto pt-1">
                                                <i className="fe fe-menu"></i>
                                            </div>
                                            <div className="col-3 col-md-auto">
                                                <span className="small text-focus">Chọn cỡ</span>
                                            </div>
                                            <div className="col-5 col-md text-center">
                                                <span className="mb-md-0 text-muted small">Cỡ M, Cỡ L</span>
                                            </div>
                                            <div className="col-2 col-md-auto text-right">
                                                <span className="mb-md-0 small text-focus text-primary">Chỉnh sửa</span>
                                            </div>
                                        </div>
                                        
                                        <div className="row align-items-center pb-3 pt-3">
                                            <div className="col-1 col-md-auto pt-1">
                                                <i className="fe fe-menu"></i>
                                            </div>
                                            <div className="col-3 col-md-auto">
                                                <span className="small text-focus">Chọn cỡ</span>
                                            </div>
                                            <div className="col-5 col-md text-center">
                                                <span className="mb-md-0 text-muted small">Cỡ M, Cỡ L</span>
                                            </div>
                                            <div className="col-2 col-md-auto text-right">
                                                <span className="mb-md-0 small text-focus text-primary">Chỉnh sửa</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                .category-item:hover {
                    cursor: pointer;
                    text-decoration: underline;
                }
                .card-option .row:hover {
                    cursor: pointer
                } 
                #createProduct {opacity: 1}
                `}</style>
            </div>
        )
    }
}