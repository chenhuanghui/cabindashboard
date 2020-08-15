// ====================================
// REACT
import React from 'react';
import Head from 'next/head'
import Link from 'next/link';
import Router from 'next/router';
// ====================================
// COMPONENTS
import NavBar from '../components/nav/nav_bar';

// ====================================
// OTHERS LIBS
import $, { data } from 'jquery'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import loadable from '@loadable/component';
import Select from "react-dropdown-select"; 
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
// MAIN COMPONENT LAYOUT DOCUMENT
export default class LayoutOnboard2Doc extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            documentListing: [],
            documentAvailableListing: [],
            onboardingListing: [],
            onboard2docList : []
        }
    }

    componentDidMount() {
        // INIT VARIABLE
        const cookies = parseCookies();
        let currentComponent = this
        
        // ===============================================
        // CHECKING AUTHENTICATE
        if (!cookies.isLoggedIn | !cookies.userID | !cookies.brandID | cookies.role > 2) Router.push('/signin');
        console.log('current brandID:', cookies.brandID);
        
        // ===============================================
        // RETRIEVE DATA FROM AIRTABLE
        // _ GET ONBOARDING BY GROUP BY COLLECTION 1
        retrieveData({},'Document')
        .then(result => {
            console.log('Document:', result);
            var temp = []
            var tempAvailable = []
            for (var i=0; i<result.length; i++) {
                temp.push(result[i].fields)
                if (!result[i].fields.Document_Onboarding) {tempAvailable.push(result[i].fields)}
            }
            console.log('document available list:', tempAvailable)
            currentComponent.setState({documentListing:temp})
            currentComponent.setState({documentAvailableListing:tempAvailable})
        })

        retrieveData({},'Onboarding')
        .then(result => {
            var temp = []
            for (var i=0; i<result.length; i++) {
                temp.push(result[i].fields)
            }
            currentComponent.setState({onboardingListing:temp})
            console.log('onboarding:', currentComponent.state.onboardingListing);
        })

        retrieveData({},'Document_Onboarding')
        .then(result => {
            console.log('onboard2docList:', result);
            currentComponent.setState({onboard2docList:result})
        })

        // ===============================================
        // FRONT-END ENGAGEMENT

        $(document).on('click', `.btn-modal` , function() {
            if (!$('body').hasClass('modal-open')) {
                $('body').addClass('modal-open')
                $('#modalLinkOnboardingDocument').addClass('show')
                $('.modal-backdrop').show()

                console.log('open modal link onboarding documents.');

            } else console.log('modal was opened before.');
        });
       
        $(document).on('click', function() {
            if ( 
                $('.modal-body').has(event.target).length == 0 //checks if descendants of modal was clicked
                &&
                $('.modal-body').is(event.target) //checks if the modal itself was clicked
            ){ console.log('clicked inside');} 
            else {
                if ($(event.target).hasClass('modal')) {
                    $('#modalLinkOnboardingDocument').removeClass('show')
                    $('body').removeClass('modal-open')
                    $('.modal-backdrop').hide()
                    console.log('modal close finished')
                }
            } 
        });

        $(document).on('click', '#link-action', function() {
            var onboardingSelected = $('#onboarding-selected').attr(`data`);
            var documentSelected = $('#document-selected').attr(`data`);

            $(this).append(`<div class="spinner-grow spinner-grow-sm" role="status"><span class="sr-only">Loading...</span></div>`)

            if (!onboardingSelected | !documentSelected) {
                alert('Không thành công')
                $('#modalLinkOnboardingDocument').removeClass('show')
                $('body').removeClass('modal-open')
                $('.modal-backdrop').hide()
                $('.spinner-grow').remove()
                console.log('modal close finished')                    
                return;
            }
            
            console.log('document: ', documentSelected)
            console.log('onboarding: ', onboardingSelected)

            retrieveData({
                filterByFormula: `AND(Document="${documentSelected}",Onboarding="${onboardingSelected}")`,
                maxRecords: 1
            },`Document_Onboarding`)
            .then(res => {
                console.log ('check is linked berfore: ', res)
                if (res.length > 0) {
                    alert('Đã có liên kết')
                    $('.spinner-grow').remove()
                    return;
                }
                createData({
                    Document: [documentSelected],
                    Onboarding: [onboardingSelected],
                    status: true
                },`Document_Onboarding`)
                .then(res => {
                    console.log('create linking: ', res)
                    var temp = currentComponent.state.onboard2docList
                    temp.push(res)
                    currentComponent.setState({onboard2docList:temp})
                })
                .finally(()=>{
                    $('#modalLinkOnboardingDocument').removeClass('show')
                    $('body').removeClass('modal-open')
                    $('.modal-backdrop').hide()
                    $('.spinner-grow').remove()
                    console.log('modal close finished')                    
                })
            })
        })


    }

    render() {
        const { documentListing, documentAvailableListing, onboardingListing, onboard2docList} = this.state;
        return (
            <div>
                <Head>
                    {/* <script src="../assets/js/theme.min.js"></script> */}
                    <title> LINK ONBOARDING AND DOCUMENT | CabinFood Business</title>
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
                                                <h1 className="header-title">Liên kết tài liệu hội nhập</h1>
                                            </div>                                            
                                        </div> {/* row align-items-center */}
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <ul className="nav nav-tabs nav-overflow header-tabs">
                                                    <li className="nav-item">
                                                        <Link href='/config'><a className="nav-link">Hội nhập</a></Link>                                                        
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href='/config/document'><a className="nav-link">Tài liệu</a></Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link href='/config/onboard2doc'><a className="nav-link active">Tài liệu - Hội nhập</a></Link>
                                                    </li>
                                                    <li className="nav-item"><Link href='/config/onboard2brand'><a className="nav-link">Hội nhập - Nhãn hiệu</a></Link></li>
                                                </ul>            
                                            </div>
                                        </div>  {/* row align-items-center */}
                                    </div>
                                </div>
                                
                                {/* COLLECTION 1 */}
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-header-title">LIÊN KẾT TÀI LIỆU VÀ HỘI NHẬP</h4>
                                        <button className="btn btn-sm btn-white btn-modal" id='add-link'>Tạo liên kết</button> 
                                    </div>{/* end card header */}
                                    <div className="table-responsive mb-0">
                                        <table className='table table-sm table-nowrap card-table table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>Tài liệu</th>
                                                    <th>Hội nhập</th>
                                                    <th>Trạng thái</th>
                                                </tr>
                                            </thead>
                                            <tbody className="list">
                                                { onboard2docList && onboard2docList.map((item, index) => (
                                                    <tr key={index} data={item.id}>
                                                        <td className='col-auto'><h4 className="font-weight-normal mb-1" data={item.Document}>{item.fields.documentTitle}</h4></td>
                                                        <td data={item.Onboarding}>{item.fields.onboardingTitle}</td>
                                                        <td className='col-auto' data={item.fields.status ? 'true' : 'false'}>{item.fields.status ? 'Đang kết nối' : 'Ngưng kết nối'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>     

                                {/* MODAL LINKING */}
                                <div className="modal fade fixed-right" id="modalLinkOnboardingDocument" tabIndex="-1">
                                    <div className="modal-dialog modal-dialog-vertical">
                                        <div className="modal-content">
                                            <div className="modal-body">

                                                <div className="header">
                                                    <div className="header-body">
                                                        <h1 className="header-title">Liên kết</h1>
                                                        {/* <p className='text-muted'>Cung cấp các thông tin về nhân sự, để giúp việc quản lý được thực hiện tốt hơn</p> */}
                                                    </div>
                                                </div>

                                                <div className="my-n3">
                                                    <div className="form-group">
                                                        <label>Tài liệu</label>
                                                        <span className='hide required' id='document-selected' data=''></span>
                                                        <Select
                                                            className='form-control' 
                                                            options={documentAvailableListing} 
                                                            labelField= 'title'
                                                            valueField='ID'
                                                            dropdownHandle='false'
                                                            searchable='false'
                                                            onChange={(valSelected) => {
                                                                console.log('seleted: ',valSelected)
                                                                $('#document-selected').attr('data',valSelected[0].ID)
                                                            }}
                                                            onDropdownOpen={()=>{
                                                                console.log('open dropdown')
                                                                $('.react-dropdown-select-dropdown').css({'width': '100%'})
                                                            }}
                                                            />                                           
                                                    </div>   

                                                    <div className="form-group">
                                                        <label>Hội nhập</label>
                                                        <span className='hide required' id='onboarding-selected' data=''></span>
                                                        <Select
                                                            className='form-control' 
                                                            options={onboardingListing} 
                                                            labelField= 'title'
                                                            valueField='ID'
                                                            dropdownHandle='false'
                                                            // searchable='false'
                                                            onChange={(valSelected) => {
                                                                console.log('seleted: ',valSelected)
                                                                $('#onboarding-selected').attr('data',valSelected[0].ID)
                                                            }}
                                                            onDropdownOpen={()=>{
                                                                console.log('open dropdown')
                                                                $('.react-dropdown-select-dropdown').css({'width': '100%'})
                                                            }}
                                                            />                                           
                                                    </div>                                            

                                                    
                                                    
                                                </div>
                                                <hr className="my-5" />   
                                                <button className="btn btn-lg btn-block btn-primary mb-3" id="link-action">Lưu</button>                                            
                                            </div>
                                        </div>
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
