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
                                    <h6 className="header-pretitle">Thêm / Sửa</h6>
                                    <h1 className="header-title">Sản phẩm</h1>
                                </div>
                            </div>

                            <div className="my-n3">
                                <form>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Tên sản phẩm</label>
                                        <input className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Mô tả</label>
                                        <input className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Giá bán</label>
                                        <input className="form-control"/>
                                    </div>


                                    


                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
