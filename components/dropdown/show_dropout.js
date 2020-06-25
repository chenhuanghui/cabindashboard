import React from 'react';
import $ from 'jquery';

export default class ShowDropDown extends React.Component {
    componentDidMount() {
        $(document).on('click', `.dropdown-a` , function() {
            if (!$('body').hasClass('dropdown-open')) {
                $('#dropdown-container').addClass('show');
                $('dropdown-a').attr("aria-expanded","true");
                $('#dropdown-container').addClass('show');
                $('#dropdown-menu').addClass('show');
            }
           
        });

        
        // $(document).on('click', function() {
        //     if ( 
        //         $('.modal-body').has(event.target).length == 0 //checks if descendants of modal was clicked
        //         &&
        //         $('.modal-body').is(event.target) //checks if the modal itself was clicked
        //       ){
        //         console.log('clicked inside');
        //       } else {
        //         if ($(event.target).hasClass('modal')) {
        //             $('#modalProductEdit').removeClass('show');
        //             $('body').removeClass('modal-open');
        //             $('.modal-backdrop').remove();
        //             console.log('modal close finished');
        //         }
        //       }
            
        // });


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
                                        <label for="addName">Tên sản phẩm</label>
                                        <input className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label for="addDescription">Mô tả</label>
                                        <input className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label for="addPrice">Giá bán</label>
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
                                    </form>
                                    </div>
                                  
                                    <div class="card">
         
          
                <div class="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" data-options="{&quot;url&quot;: &quot;https://&quot;}">
                
                  <ul class="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush"></ul>

                <div class="dz-default dz-message">
                    <button class="dz-button" type="button">Drop files here to upload</button></div></div>
   
                </div>
              
                <button className="btn btn-lg btn-block btn-primary mb-3">
                                   Lưu
            </button>
               
            </div>
</div>
</div></div>
        )
    }
}
