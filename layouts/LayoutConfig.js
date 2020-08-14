// ====================================
// REACT
import React from 'react';
import Head from 'next/head'
import Link from 'next/link';

// ====================================
// COMPONENTS
import NavBar from '../components/nav/nav_bar';

// ====================================
// OTHERS LIBS
import $, { data } from 'jquery'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import loadable from '@loadable/component';
import Router from 'next/router';

// ====================================
// INIT GLOBAL VARIABLES
const ReactFilestack = loadable(() => import('filestack-react'), { ssr: false });
const AirtablePlus = require('airtable-plus');  
const airtable = new AirtablePlus({
  baseID: 'appmREe03n1MQ6ydq',
  apiKey: 'keyLNupG6zOmmokND',
  tableName: 'Brand',
});

// ====================================
// GLOBAL FUNCTIONS
async function retrieveData(formular,tbName) {
    try {
      const readRes = await airtable.read(formular,{tableName:tbName});
      return readRes
    } catch(e) {
      console.error(e);
    }
}

async function createData(formular,tbName) {
    try {
      const readRes = await airtable.create(formular,{tableName:tbName});
      return readRes
    } catch(e) {
      console.error(e);
    }
}

async function updateData(rowID, data,tbName) {
    try {
      const res = await airtable.update(rowID, data,{tableName:tbName});
      return res
    } catch(e) {
      console.error(e);
    }
}

// ====================================
// MAIN COMPONENT LAYOUT CONFIG
export default class LayoutConfig extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            equipList: [],
            cabinOptionsData: []
        }
    }

    componentDidMount() {
        // INIT VARIABLE
        const cookies = parseCookies();
        let currentComponent = this
        var isAction = false;
        
        // ===============================================
        // CHECKING AUTHENTICATE
        if (!cookies.isLoggedIn | !cookies.userID || !cookies.brandID) Router.push('/signin');
        console.log('current brandID:', cookies.brandID);
        
        // ===============================================
        // RETRIEVE DATA FROM AIRTABLE

        retrieveData({
            filterByFormula: `Brand = "${cookies.brandID}"`,
        },'Brand_Equipment')
        .then(result => {
            console.log('brand_equip:', result);
            var temp=[];
            for(var i=0; i<result.length; i++) {
                temp.push(result[i].fields)
            }
            currentComponent.setState({equipList:temp})
            console.log('brand_equip:', currentComponent.state.equipList);
        })

        // Retrieve Cabin belong to Brand
        retrieveData({filterByFormula: `BrandID = "${cookies.brandID}"`},'Brand_Cabin')
        .then(cabinRes => {
            var tempTitle = []
            for (var i=0; i<cabinRes.length; i++) {
                tempTitle.push(cabinRes[i].fields)
            }
            currentComponent.setState({cabinOptionsData:tempTitle})
            console.log('cabin title:', currentComponent.state.cabinOptionsData)
        })

        // ===============================================
        // FRONT-END ENGAGEMENT
        $(document).on('click', `.btn-modal` , function() {
            if (!$('body').hasClass('modal-open')) {
                $('#modalEquipment').addClass('show');
                $('.modal-backdrop').show()
            }
            console.log('modal opened');
        });
        
        $(document).on('click', function() {
            if ( 
                $('.modal-body').has(event.target).length == 0 //checks if descendants of modal was clicked
                &&
                $('.modal-body').is(event.target) //checks if the modal itself was clicked
            ){ console.log('clicked inside');} 
            else {
                if ($(event.target).hasClass('modal')) {
                    $('#modalEquipment').removeClass('show')
                    $('body').removeClass('modal-open')
                    $('.modal-backdrop').hide()
                    console.log('modal close finished')
                }
            } 
        });
        
        /* action on per product item */
        $(document).on('click', '.dropdown-toggle', function(){
            // $(this).parent().find('.dropdown-menu-right').addClass('show')
        })

        $(document).on('click', '#asset-action', function() {
            if (isAction ) return;
            console.log('name:', $('#equip-name').val())
            console.log('desc:', $('#equip-desc').val())
            console.log('voltage:', $('#equip-voltage').val())
            console.log('cabin:', $('#cabin-assigned').attr('data'))

            // if ($('#staff-name').val() === '' | $('#staff-salary').val() === '' | $('#staff-image').attr('image-url') === '') return;
            if ($('#equip-name').val() === '' | $('#cabin-assigned').attr('data') === '') return;
            
            isAction = true;
            createData({
                name: $('#equip-name').val(),
                desc: $('#equip-desc').val(),
                voltage: $('#equip-voltage').val(),
                photos:[{
                    url: $('#equip-image').attr('image-url')
                }]
            },'Equipment')
            .then(equipRes => {
                console.log('equip data:', equipRes)
                if (equipRes) {
                    createData({
                        Brand: [cookies.brandID],
                        Equipment:[equipRes.id],
                        Cabin: [`${$('#cabin-assigned').attr('data')}`],
                        status: "1"
                    },'Brand_Equipment')                
                }
            })
            .finally( () => {
                $('#modalEquipment').removeClass('show')
                $('body').removeClass('modal-open')
                $('.modal-backdrop').hide()
                console.log('modal close finished')
                isAction = false;
            })
        })

    }

    render() {
        const { equipList, cabinOptionsData } = this.state;
        return (
            <div>
                <Head>
                    {/* <script src="../assets/js/theme.min.js"></script> */}
                    <title> CONFIG | CabinFood Business</title>
                </Head>

                <NavBar />

                <div className="main-content">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-10 col-xl-8">
                                
                                <div className="header mt-md-5">
                                    <div className="header-body">                                    
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h6 className="header-pretitle">THIẾT LẬP</h6>
                                                <h1 className="header-title">Thông số hệ thống</h1>
                                            </div>                                            
                                        </div> {/* row align-items-center */}
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <ul className="nav nav-tabs nav-overflow header-tabs">
                                                    <li className="nav-item"><a className="nav-link active" href="#!">Hội nhập</a></li>
                                                    <li className="nav-item"><a className="nav-link" href="#!">Tài liệu</a></li>
                                                    <li className="nav-item"><a className="nav-link" href="#!">Tài liệu - Hội nhập</a></li>
                                                </ul>            
                                            </div>
                                        </div>  {/* row align-items-center */}
                                    </div>
                                </div>
                                                                                    
                            </div>
                        </div>
                    </div>
                </div>
                
                <style jsx>{`
                    .dropdown-toggle {cursor: pointer}
                `}</style>
            </div>
        )
    }
}
