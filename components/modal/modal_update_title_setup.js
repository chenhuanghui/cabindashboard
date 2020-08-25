import React from 'react';
import $ from 'jquery';
import { Router } from 'next/router';
const AirtablePlus = require('airtable-plus');  

// ====================================
// INIT GLOBAL VARIABLES
const airtable = new AirtablePlus({
  baseID: 'appmREe03n1MQ6ydq',
  apiKey: 'keyLNupG6zOmmokND',
  tableName: 'Brand',
});

async function updateData(rowID, data,tbName) {
    try {
      const res = await airtable.update(rowID, data,{tableName:tbName});
      return res
    } catch(e) {
      console.error(e);
    }
}

export default class ModalUpdateTitleSetup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            setupID: null
        }
    }

    componentDidMount() {
        let currentComponent = this

        $(document).on('click', `.btn-control-edit-setup-title` , function() {
            if (!$('body').hasClass('modal-open')) {
                $('#modalUpdateTitleSetup').addClass('show');
                $('.modal-backdrop').show();
            }
            console.log('setup id:  ', $(this).attr("setup-id"));
            console.log('setup id:  ', $(this).attr("value"));
            
            currentComponent.setState({data: $(this).attr("value")})
            currentComponent.setState({setupID: $(this).attr("setup-id")})
            $("#setup_name").text($(this).attr("value"))
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
                    $('#modalUpdateTitleSetup').removeClass('show');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').hide();
                    $('.spinner-grow').remove()
                    console.log('modal close finished');
                }
              }            
        });

        $(document).on('click', '.btn-action', function(){
            let setupRec = currentComponent.state.setupID;
            $(this).append(`<div class="spinner-grow spinner-grow-sm" role="status"><span class="sr-only">Loading...</span></div>`)
            updateData(setupRec,{
                name: $("#setup_name").val()
            },"Setup")
            .then(res => {
                console.log("response update :", res)
                $('#modalUpdateTitleSetup').removeClass('show');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').hide();
                $('.spinner-grow').remove()
                console.log('modal close finished');
                location.reload()
            })
        })
        
    }

    render () {
        const {data} = this.state
        return (
            // Modal Product Edit
            <div className="modal fade fixed-right" id="modalUpdateTitleSetup" tabIndex="-1">
                <div className="modal-dialog modal-dialog-vertical">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="my-n3">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Nội dung điều chỉnh</label>
                                    <textarea className="form-control" id="setup_name" data-toggle="autosize" rows="5">
                                    </textarea>
                                </div>
                            </div>

                            <button className="btn btn-lg btn-block btn-primary mb-3 btn-action">Lưu</button>
                            
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
