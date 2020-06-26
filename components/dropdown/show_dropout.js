import React from 'react';
import $ from 'jquery';

export default class ShowDropDown extends React.Component {
    componentDidMount() {
        $(document).on('click', '#dropdown-a' , function() {
       console.log("-=========ASDSAD")        
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
<table>
            <tbody>

       <tr>
            <td className="text-right">
            <div id='dropdown-containter' className="dropdown ">
                    <a id='dropdown-a 'href="#" className="dropdown-ellipses dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fe fe-more-vertical">dsadsads</i>
                    </a>
                    <div id='dropdown-menu' className="dropdown-menu dropdown-menu-right  ">
                        <a href="#!" className="dropdown-item">Action</a>
                        <a href="#!" className="dropdown-item">Another action</a>
                        <a href="#!" className="dropdown-item">Something else here</a>
                    </div>
                </div>
            </td>
            </tr>
      </tbody>
      </table>
        )
}
}
