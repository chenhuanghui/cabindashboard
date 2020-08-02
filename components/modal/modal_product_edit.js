import React from 'react';
import $ from 'jquery';

export default class ModalProductEdit extends React.Component {
    componentDidMount() {
        $(document).on('click', `.btn-modal` , function() {
            if (!$('body').hasClass('modal-open')) {
                $('#modalProductEdit').addClass('show');
                $('body').addClass('modal-open').append('<div class="modal-backdrop fade show"></div>');
            }
            console.log('modal opened');
        });

        
        $(document).on('click', function() {
            if ( 
                $('.modal-body').has(event.target).length == 0 //checks if descendants of modal was clicked
                &&
                $('.modal-body').is(event.target) //checks if the modal itself was clicked
              ){
                console.log('clicked inside');
              } else {
                if ($(event.target).hasClass('modal')) {
                    $('#modalProductEdit').removeClass('show');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    console.log('modal close finished');
                }
              }
            
        });
    }

    render () {
        return (
            // Modal Product Edit
            <div className="modal fade fixed-right" id="modalProductEdit" tabIndex="-1">
                <div className="modal-dialog modal-dialog-vertical">
                    <div className="modal-content">
                        <div className="modal-body">

                            <div className="header">
                                <div className="header-body">
                                    <h1 className="header-title">Thêm sản phẩm</h1>
                                    <p className='text-muted'>Set preferences that will be cookied for your live preview desmonstration.</p>                                    
                                </div>
                            </div>

                            <div className="my-n3">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Tên sản phẩm</label>
                                    <input className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Mô tả</label>
                                    <input className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Giá bán</label>
                                    <input className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label for="addSaleOff">Giá khuyến mãi</label>
                                    <input className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label for="addCategory">Danh mục</label>
                                    <input className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label for="addSize">Size</label>
                                    <input className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label for="addOption">Option</label>
                                    <input className="form-control"/>
                                </div>
                            </div>
                                  
                            <div class="card">
                                <div class="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" data-options="{&quot;url&quot;: &quot;https://&quot;}">
                                    <ul class="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>
                                    <div class="dz-default dz-message">
                                        <button class="dz-button" type="button">Drop files here to upload</button>
                                    </div>
                                </div>
                            </div>
                            
                            <button className="btn btn-lg btn-block btn-primary mb-3">Lưu</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
