// ==========================================
// REACT LINK
import React from 'react';
import Head from 'next/head'

// ==========================================
// COMPONENTS LINK
import NavBar from '../components/nav/nav_bar';

// ==========================================
// OTHERS LIBS LINK
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import $, { data } from 'jquery'
import loadable from '@loadable/component';
import Router from 'next/router';
import Select from "react-dropdown-select"; 
// document react-dropdown-select: https://www.npmjs.com/package/react-dropdown-select
import Flatpickr from "react-flatpickr";

// ==========================================
// INIT VARIABLES OF LIBS
const ReactFilestack = loadable(() => import('filestack-react'), { ssr: false });
const AirtablePlus = require('airtable-plus');  
const airtable = new AirtablePlus({
  baseID: 'appmREe03n1MQ6ydq',
  apiKey: 'keyLNupG6zOmmokND',
  tableName: 'Brand',
});

// ==========================================
// MASTER FUNCTIONS USING THROW OF COMPONENT
async function retrieveData(formular,tbName) {
    try {
      const res = await airtable.read(formular,{tableName:tbName});
      return res
    } catch(e) {
      console.error(e);
    }
}

async function createData(formular,tbName) {
    try {
      const res = await airtable.create(formular,{tableName:tbName});
      return res
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

function checkValidPane(paneID) {
    console.log('check valid pane')
    var isValid = true
    $(paneID + ' .required').each(function(index){
        if ($(this).hasClass('required') && ($(this).attr('data') === '' | $(this).attr('data') === undefined)) {
            $(this).removeClass('is-valid')
            $(this).addClass('is-invalid')            
            console.log(index + ": invalid" )
            isValid = false
            return;
        } else {
            console.log(index + ": valid " + $(this).attr('data'))
            $(this).removeClass('is-invalid')
            $(this).addClass('is-valid')   
        }
    })

    return isValid;
}

// ==========================================
// MAIN COMPONENT ACTION
export default class LayoutBrandCreateStep1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cabinOptionsData: [],
            bankData: []
        }
    }

    componentDidMount() {
        // INIT VARIABLE
        const cookies = parseCookies();
        let currentComponent = this
        let brandInfo = []
        let ownerInfo = []
        let deliveryPartnerData = []
        let licenseData = []
        let onboardingData = []
        let notificationData = []
        let roleAcc = []
        
        
        // ===============================================
        // CHECKING AUTHENTICATE
        if (!cookies.isLoggedIn | !cookies.userID || !cookies.brandID) Router.push('/signin');
        console.log('current brandID:', cookies.brandID);

        // ===============================================
        // RETRIEVE DATA FROM AIRTABLE
        
        // get all license 
        retrieveData({},'License')
        .then(licenseRes => {
            licenseData = licenseRes
            // console.log('license data:', licenseData)
        })

        // get all list on-boarding
        retrieveData({},'OnBoarding')
        .then(onboardingRes => {        
            onboardingData= onboardingRes
            // console.log('OnBoarding data:', onboardingData)
        })

        // get all notification for new brand
        retrieveData({filterByFormula: `type = "1"`},'Notification')
        .then(notifyRes => {
            notificationData= notifyRes
            // console.log('notification data:', notificationData)
        })

        // get all delivery partner
        retrieveData({},'DeliveryPartner')
        .then(deliveryPartnerRes => {
            deliveryPartnerData = deliveryPartnerRes
            // console.log('DeliveryPartner:', deliveryPartnerData)
        })

        // get all delivery partner
        retrieveData({},'Role')
        .then(roleRes => {
            roleAcc = roleRes
            // console.log('Role Acc:', roleAcc)
        })

        // get all delivery partner
        retrieveData({},'Bank')
        .then(bankRes => {
            var tempBank = []
            for (var i=0; i<bankRes.length; i++) {
                tempBank.push(bankRes[i].fields)
            }
            currentComponent.setState({bankData: tempBank})
            // console.log('Bank:', currentComponent.state.bankData)
        })

        // get all cabin available
        retrieveData({filterByFormula: `brand_cabin = ""`},'Cabin')
        .then(cabinRes => {
            var tempTitle = []
            for (var i=0; i<cabinRes.length; i++) {
                tempTitle.push(cabinRes[i].fields)
            }
            currentComponent.setState({cabinOptionsData:tempTitle})
            // console.log('cabin title:', currentComponent.state.cabinOptionsData)
        })
        

        // ===============================================
        // FRONT-END ENGAGEMENT
        
        // prev pane action
        $('.back-btn').click(function(){
            var current_pane_id = '#wizardStep'+$(this).attr('pane-id');
            var prev_pane_id = '#wizardStep'+ (parseInt($(this).attr('pane-id'))-1);

            $(current_pane_id).removeClass('active')
            $(prev_pane_id).addClass('active')
        })
        
        // cancel create brand action
        $('.cancle-btn').click(function(){
            Router.push('/account/brand')
        })

        $('input, textarea').keyup(function(event) {
            // skip for arrow keys
            if(event.which >= 37 && event.which <= 40) return;
            
            $(this).attr('data',$(this).val())
        });

        // btn step 1 clicked
        $('#step1').click(function(){
            console.log('check valid step1: ',checkValidPane('#wizardStep1'))
            if(!checkValidPane('#wizardStep1')) return false;

            brandInfo.push({brandName:$('#brandName').val()})
            brandInfo.push({brandIntro:$('#brandIntro').val()})
            brandInfo.push({logo:[{url:$('#logo').attr('image-url')}]})
            brandInfo.push({brandName:$('#businessLicense').val()})
            brandInfo.push({logo:[{url:$('#businessLicensePhoto').attr('image-url')}]})

            // console.log('biz overview:', brandInfo);

            // go to next pane
            var current_pane_id = '#wizardStep'+$(this).attr('pane-id');
            var next_pane_id = '#wizardStep'+ (parseInt($(this).attr('pane-id'))+1);

            $(current_pane_id).removeClass('active')
            $(next_pane_id).addClass('active')
            console.log('go to pane 2:');            
        })

        $('#step2').click(function(){
            console.log('check valid step2: ',checkValidPane('#wizardStep2'))
            if(!checkValidPane('#wizardStep2')) return false;
            
            ownerInfo = [] // reset ownerInfor
            ownerInfo.push({name:$('#name').val()})
            ownerInfo.push({email:$('#email').val()})
            ownerInfo.push({tel:$('#tel').val()})
            ownerInfo.push({DOB:$('#DOB').val()})
            ownerInfo.push({ownerPersonalID:$('#ownerPersonalID').val()})
            ownerInfo.push({bankName:$('#bankName').attr('data')})
            ownerInfo.push({bankAccNo:$('#bankAccNo').attr('data')})
            ownerInfo.push({bankAccName:$('#bankAccName').attr('data')})

            // console.log('owner overview:', ownerInfo);            

            // go to next pane
            var current_pane_id = '#wizardStep'+$(this).attr('pane-id');
            var next_pane_id = '#wizardStep'+ (parseInt($(this).attr('pane-id'))+1);

            $(current_pane_id).removeClass('active')
            $(next_pane_id).addClass('active')
            console.log('go to pane 3');            
        })

        $('#complete-btn').click(function(){
            console.log('check valid step3: ',checkValidPane('#wizardStep3'))
            if(!checkValidPane('#wizardStep3')) return false;

            // generate brand - account and all relation information
            // STEP_1. CREATE BRAND
            createData({
                brandName:$('#brandName').val(),
                brandIntro:$('#brandIntro').val(),
                logo:[{url:$('#logo').attr('image-url')}],
                businessLicense:$('#businessLicense').val(),
                businessLicensePhoto:[{url:$('#businessLicensePhoto').attr('image-url')}],
                status: true
            },'Brand')
            .then(brandRes => {
                console.log('branRes:', brandRes)
                brandInfo = brandRes
                console.log('brandInfo:', brandInfo)

                // STEP_2. CREATE OWNER OWN THIS BRAND
                createData({
                    name: ownerInfo.name,
                    email: ownerInfo.email,
                    tel: ownerInfo.tel,
                    DOB: ownerInfo.BOD,
                    ownerPersonalID: ownerInfo.ownerPersonalID,
                    bankName: [`${ownerInfo.bankName}`],
                    bankAccNo: ownerInfo.bankAccNo,
                    bankAccName: ownerInfo.bankAccName,
                    Brand: [`${brandRes.id}`]
                },'Owner')
                
                // STEP_3. ADD BRAND TO ACCOUNT
                retrieveData({
                    view: 'Grid view',
                    filterByFormula:`ID="${cookies.userID}"`
                },'Account')
                .then(accountRes => {
                    accountRes[0].fields.Brand.push(brandRes.id)
                    updateData(cookies.userID, {Brand:accountRes[0].fields.Brand},'Account')
                    .then(accUpdateRes => console.log('update account success...'))
                })

                // STEP_4. LINK BRAND_CABIN
                createData({
                    BrandID: [`${brandRes.id}`],
                    CabinID: [`${$('#cabin-assigned').attr('data-selected')}`],
                    status: true
                },'Brand_Cabin')
                .then(bcRes => {
                    for (var i=0; i<deliveryPartnerData.length; i++) {
                        // STEP_5.1. LINK CHANEL WITH BRAND_CABIN
                        createData({
                            Brand_Cabin: [`${bcRes.id}`],
                            DeliveryPartner: [`${deliveryPartnerData[i].id}`],
                            status: true
                        },'DeliveryPartner_Brand_Cabin')
                    }
                })
                
                // STEP_5.2. LINK LICENSE WITH BRAND_LICENSE
                for (var i=0; i<licenseData.length; i++) {
                    createData({
                        Brand: [`${brandRes.id}`],
                        License: [`${licenseData[i].id}`]
                    },'Brand_License')
                }
                
                // STEP_5.3. LINK LICENSE WITH BRAND_ONBOARDING
                for (var i=0; i<onboardingData.length; i++) {
                    createData({
                        Brand: [`${brandRes.id}`],
                        Onboarding: [`${onboardingData[i].id}`],
                        status: false
                    },'Brand_OnBoarding')
                }
                
                // STEP_5.4. LINK LICENSE WITH BRAND_NOTIFICATION
                for (var i=0; i<notifyData.length; i++) {
                    createData({
                        Brand: [`${brandRes.id}`],
                        Notification: [`${notifyData[i].id}`],
                    },'Brand_Notification')
                }

                // STEP_6. CREATE ACCOUNT AND LINK TO BRAND

                // CREATE ACCOUNT FOR BRAND'S OWNER
                createData({
                    Brand: [`${brandRes.id}`],
                    name: ownerInfo.name,
                    email: ownerInfo.email,
                    tel: ownerInfo.tel,
                    password:`123456`,
                    Role:[`${roleAcc[3].id}`]
                },'Account')

                // CREATE ACCOUNT FOR BRAND'S MANAGER
                createData({
                    Brand: [`${brandRes.id}`],
                    name: $('accountName').attr('data'),
                    email: $('accountEmail').attr('data'),
                    tel: $('accountTel').attr('data'),
                    password:`123456`,
                    Role:[`${roleAcc[4].id}`]
                },'Account')
            })
        })

    }

    render() {
        const {cabinOptionsData, bankData} = this.state;
        return (
            <div>
                <Head>
                    {/* <script src="../assets/js/theme.min.js"></script> */}
                    <title> Brand Creating Step 1 | CabinFood For Business</title>
                </Head>

                <NavBar />
                {/* <ModalProductEdit /> */}

                <div className="main-content">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">
                            
                            <div className="tab-content py-6" id="wizardSteps">

                                <div className="tab-pane fade show active" id="wizardStep1" role="tabpanel">
                                    
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                                            <h6 className="mb-4 text-uppercase text-muted">Bước 1 / 3</h6>
                                            <h1 className="mb-3">Bắt đầu với thông tin cơ bản</h1>
                                            <p className="mb-5 text-muted">Cung cấp các thông tin về thương hiệu của bạn để đăng ký với các đối tác bán hàng.</p>
                                        </div>
                                    </div> 
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className="form-group">
                                                <div className="form-row">
                                                    <div className='col-12 col-md-6 mb-3'>
                                                        <label>Tên nhãn hiệu</label>
                                                        <input type="text" className="form-control required" id="brandName" data=''/>   
                                                    </div>{/* .form-col BRAND*/}
                                                    <div className='col-12 col-md-6 mb-3'>
                                                        <label>Mã số doanh nghiệp</label>
                                                        <input type="text" className="form-control required" id='businessLicense' data=''/>
                                                    </div> {/* .form-col CABIN*/}
                                                </div> {/* .form-row */}                                                
                                            </div> {/* .form-group BRAND_CABIN */}

                                            <div className="form-group">
                                                <label className="mb-1">Mô tả</label>
                                                <textarea className="form-control required " data='' id='brandIntro' data-toggle="autosize" rows="5" placeholder="Không quá 80 từ..." required></textarea>
                                            </div>
                                        
                                            <div className="form-group">
                                                <div className='form-row'>
                                                    <div className='col-12 col-md-6 mb-3'>
                                                        <label>Logo</label>
                                                        <ReactFilestack
                                                            apikey={'A88NrCjOoTtq2X3RiYyvSz'}
                                                            customRender={({ onPick }) => (
                                                                <div className="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" id='logo' image-url='' required>
                                                                    <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush logo-file-name"></ul>
                                                                    <div className="dz-default dz-message">
                                                                        <button className="dz-button" type="button" onClick={onPick}>Chọn file</button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            onSuccess={(res) => {
                                                                console.log('filestack:',res)
                                                                if (res.filesUploaded.length > 0) {
                                                                    $('#logo').attr('image-url',res.filesUploaded[0].url);
                                                                    $('.logo-file-name').text(res.filesUploaded[0].filename);
                                                                    console.log('add file url to element:', $('#logo').attr('image-url'))
                                                                }
                                                                
                                                            }}
                                                        />
                                                    </div>
                                                    <div className='col-12 col-md-6 mb-3'>
                                                        <label>Hình ảnh GPDKKD</label>
                                                        <ReactFilestack
                                                            apikey={'A88NrCjOoTtq2X3RiYyvSz'}
                                                            customRender={({ onPick }) => (
                                                                <div className="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" id='businessLicensePhoto' image-url=''>
                                                                    <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush business-license-file-name"></ul>
                                                                    <div className="dz-default dz-message">
                                                                        <button className="dz-button" type="button" onClick={onPick}>Chọn file</button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            onSuccess={(res) => {
                                                                console.log('filestack:',res)
                                                                if (res.filesUploaded.length > 0) {
                                                                    $('#businessLicensePhoto').attr('image-url',res.filesUploaded[0].url);
                                                                    $('.business-license-file-name').text(res.filesUploaded[0].filename);
                                                                    console.log('add file url to element:', $('#businessLicensePhoto').attr('image-url'))
                                                                }                                                                
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>                                                                            

                                            <div className="form-group">
                                                <label>Cabin (*)</label>
                                                <span className='hide required' id='cabin-assigned' data=''></span>
                                                <Select 
                                                    className='form-control' 
                                                    options={cabinOptionsData} 
                                                    labelField= 'name'
                                                    valueField='recID'
                                                    dropdownHandle='false'
                                                    searchable='false'
                                                    placeholder="Chọn cabin theo hợp đồng" 
                                                    onChange={(valSelected) => {
                                                        console.log('cabin seleted: ',valSelected)
                                                        $('#cabin-assigned').attr('data',valSelected[0].recID)
                                                    }} 
                                                />
                                                
                                                {/* <div class="invalid-feedback">Thông tin bắt buộc</div>      */}
                                            </div>
                                            
                                            <hr className="my-5" />    

                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <button className="btn btn-lg btn-white cancle-btn" type="reset">Cancel</button>
                                                </div>
                                                <div className="col text-center">
                                                    <h6 className="text-uppercase text-muted mb-0">Bước 1 / 3</h6>
                                                </div>
                                                <div className="col-auto">
                                                    <span className="btn btn-lg btn-primary next-btn" pane-id='1' data-toggle="wizard" id='step1'>Continue</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div> {/* .wizard step  #wizardStep1*/}

                                <div className="tab-pane fade show" id="wizardStep2" role="tabpanel">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                                            <h6 className="mb-4 text-uppercase text-muted">Bước 2 / 3</h6>
                                            <h1 className="mb-3">Thông tin Chủ sở hữu</h1>
                                            <p className="mb-5 text-muted">Cung cấp các thông tin về chủ sở hữu để hoàn thiện đăng ký với các đối tác bán hàng.</p>
                                        </div>
                                    </div>    
                                    <div className='card'>
                                        <div className='card-body'>
                                            {/* group owner general informatoin */}
                                            <div className="form-group">
                                                <div className='form-row'>
                                                    <div className='col-12 col-md-6 mb-3'>
                                                        <label>Họ và tên (*)</label>
                                                        <input type="text" className="form-control required" id='name' data=''/>
                                                    </div>
                                                    <div className='col-12 col-md-6 mb-3'>
                                                        <label>Số CMND/CCCD/Hộ chiếu (*)</label>
                                                        <input type="text" className="form-control required" id='ownerPersonalID' data=''/>
                                                    </div>
                                                </div>                                                
                                            </div>

                                            <div className="form-group">
                                                <div className='form-row'>
                                                    <div className='col-12 col-md-6 mb-3'>
                                                        <label>Số điện thoại (*)</label>
                                                        <input type="text" className="form-control required" id='tel' data=''/>
                                                    </div>
                                                    <div className='col-12 col-md-6 mb-3'>
                                                        <label>Email (*)</label>
                                                        <input type="email" className="form-control required" id='email' data=''/>
                                                    </div>
                                                </div>
                                                
                                            </div>

                                            <div className="form-group">
                                                <div className='form-row'>
                                                    <div className='col-12 col-md-6 mb-3'>
                                                        <label>Ngày sinh (*)</label>
                                                        <span className='hide required' data='' id='DOB-data'></span>
                                                        <Flatpickr className="form-control" id='DOB' data=''
                                                            onChange={date => {
                                                                console.log('new date:', date)
                                                                $('#DOB-data').attr('data',date)
                                                            }}
                                                        />
                                                    </div>
                                                    <div className='col-12 col-md-6 mb-3'>
                                                        <label>Hình ảnh CMND/CCCD/Hộ chiếu (*)</label>
                                                        <ReactFilestack
                                                            apikey={'A88NrCjOoTtq2X3RiYyvSz'}
                                                            customRender={({ onPick }) => (
                                                                <div className="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" id='personalIDPhoto-image' image-url=''>
                                                                    <ul className="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush personal-ID-file-name"></ul>
                                                                    <div className="dz-default dz-message">
                                                                        <button className="dz-button" type="button" onClick={onPick}>Chọn file</button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            onSuccess={(res) => {
                                                                console.log('filestack:',res)
                                                                if (res.filesUploaded.length > 0) {
                                                                    $('#personalIDPhoto-image').attr('image-url',res.filesUploaded[0].url);
                                                                    $('.personal-ID-file-name').text(res.filesUploaded[0].filename);
                                                                    console.log('add file url to element:', $('#personalIDPhoto-image').attr('image-url'))
                                                                }
                                                                
                                                            }}
                                                        />
                                                    </div>
                                                </div>                                                
                                            </div>


                                            {/* group brank information */}
                                            <hr className="my-5" />    
                                            <div className='form-group'>
                                                <h2>Thông tin tài khoản ngân hàng</h2>
                                                <small className='text-muted'> Thông tin này được sử dụng cho việc nhận thanh toán từ các đối tác bán hàng</small>
                                            </div>                                                

                                            <div className="form-group">
                                                <label>Tên ngân hàng (*)</label>
                                                <span className="hide required" id='bankName' data=''></span>
                                                <Select 
                                                    className='form-control' 
                                                    options={bankData} 
                                                    labelField= 'name'
                                                    valueField='ID'
                                                    dropdownHandle='false'
                                                    searchable='false'
                                                    placeholder="Chọn ngân hàng" 
                                                    onChange={(valSelected) => {
                                                        console.log('bank seleted: ',valSelected)
                                                        $('#bankName').attr('data',valSelected[0].ID)
                                                    }} 
                                                />
                                            </div>
                                            <div className="form-group">
                                                <div className='form-row'>
                                                    <div className='col-12 col-md-6 mb-3'>
                                                        <label>Số tài khoản (*)</label>
                                                        <input type="text" className="form-control required" id='bankAccNo' data=''/>
                                                    </div>
                                                    <div className='col-12 col-md-6 mb-3'>
                                                        <label>Tên chủ tài khoản (*)</label>
                                                        <input type="text" className="form-control required" id='bankAccName' data=''/>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* group brank information */}
                                            <hr className="my-5" />    
                                            <div className='form-group'>
                                                <h2>Thông tin hợp đồng cùng CabinFood</h2>
                                            </div>                                                

                                            <div className="form-group">
                                                <label>Mã hợp đồng (*)</label>
                                                <input type="text" className="form-control required" data=''/>
                                            </div>

                                            {/* group navigate button */}
                                            <hr className="my-5" />    

                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <button className="btn btn-lg btn-white back-btn" pane-id='2' type="back">Quay lại</button>
                                                </div>
                                                <div className="col text-center">
                                                    <h6 className="text-uppercase text-muted mb-0">Bước 2 / 3</h6>
                                                </div>
                                                <div className="col-auto">
                                                    <button className="btn btn-lg btn-primary next-btn" pane-id='2' data-toggle="wizard" id='step2'>Tiếp theo</button>
                                                </div>
                                            </div> {/* .row */}
                                        </div> {/* .card-body */}
                                    </div> {/* .card */}                                                                            
                                </div> {/* .wizard step  #wizardStep2*/}

                                <div className="tab-pane fade show" id="wizardStep3" role="tabpanel">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
                                            <h6 className="mb-4 text-uppercase text-muted">Bước 3 / 3</h6>
                                            <h1 className="mb-3">Kích hoạt </h1>
                                            <p className="mb-5 text-muted">Cung cấp các thông tin về chủ sở hữu để hoàn thiện đăng ký với các đối tác bán hàng.</p>
                                        </div>
                                    </div>    
                                    <div className='card col-12'>
                                        <div className='card-body'>
                                            {/* group owner general informatoin */}
                                            <div className="form-group">
                                                {/* group account information */}
                                                <div className='form-group'>
                                                    <h2>Thông tin tài khoản của nhãn hàng truy cập vào hệ thống quản lý</h2>
                                                </div>                                                

                                                <div className="form-group">
                                                    <label>Tên tài khoản: (*)</label>
                                                    <input type="text" className="form-control required" data='' id='accountName'/>
                                                </div>

                                                <div className="form-group">
                                                    <div className='form-row'>
                                                        <div className='col-12 col-md-6 mb-3'>
                                                            <label>Email: (*)</label>
                                                            <input type="text" className="form-control required" data='' id='accountEmail'/>
                                                        </div>
                                                        <div className='col-12 col-md-6 mb-3'>
                                                            <label>Số điện thoại: (*)</label>
                                                            <input type="text" className="form-control required" data='' id='accountTel'/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* group navigate button */}
                                            <hr className="my-5" />    

                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <button className="btn btn-lg btn-white back-btn" pane-id='3' type="back">Quay lại</button>
                                                </div>
                                                <div className="col text-center">
                                                    <h6 className="text-uppercase text-muted mb-0">Bước 3 / 3</h6>
                                                </div>
                                                <div className="col-auto">
                                                    <button className="btn btn-lg btn-primary next-btn" pane-id='3' data-toggle="wizard" id='complete-btn'>Continue</button>
                                                </div>
                                            </div> {/* .row */}
                                        </div> {/* .card-body */}
                                    </div> {/* .card */}                                                                            
                                </div> {/* .wizard step */}

                            </div> {/* .tab-content */}                                                                                      
                        </div> {/* .col */}
                    </div> {/* .row */}
                </div>
                
                <style jsx>{`
                    .dropdown-toggle {cursor: pointer}
                `}</style>
            </div>
        )
    }
}
