import React from 'react';
import Head from 'next/head'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Link from 'next/link';
import $, { data } from 'jquery'
import NavBar from "../../../components_v2/nav"
// ====================================
// GLOBAL FUNCTIONS

const AirtablePlus = require('airtable-plus');  
const airtableFEED = new AirtablePlus({
    baseID: process.env.AIR_TABLE_BASE_ID_FEED,
    apiKey: process.env.AIR_TABLE_API_KEY,
});
const airtableUSER = new AirtablePlus({
    baseID: process.env.AIR_TABLE_BASE_ID_USER,
    apiKey: process.env.AIR_TABLE_API_KEY,
});
const airtableSOPERATION = new AirtablePlus({
    baseID: process.env.AIR_TABLE_BASE_ID_SOPERATION,
    apiKey: process.env.AIR_TABLE_API_KEY,
});

const airtableBRAND = new AirtablePlus({
    baseID: process.env.AIR_TABLE_BASE_ID_BRAND,
    apiKey: process.env.AIR_TABLE_API_KEY,
});

export default class LayoutDashboard extends React.Component {
    static async getInitialProps({query}) {
        console.log("______ initialprops:", query.id)    
        
        const brandData = await airtableBRAND.read({
            filterByFormula: `ID = "${query.id}"`,
            maxRecords: 1
        },{tableName:"Brand"});
        console.log("brand information: ", brandData)    
        
        return { brand: brandData[0]}
    }

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        

    }

    render() {
        return (
            <>
                <Head>
                    <title>  {this.props.brand.fields.name} | Dashboard</title>
                </Head>

                <NavBar 
                    brand_id={this.props.brand.fields.ID}
                    brand_name={this.props.brand.fields.name}
                    // user_id={cookies.userID}
                    // avatar = {user && user.avatar ? user.avatar[0].url : "../assets/img/avatars/profiles/avatar-1.jpg"}
                />

                <div className="main-content">
                    <div className="container-fluid">
                        <div className="row mt-4 mt-md-5 justify-content-center">
                            <div className="col-12 col-lg-10 col-xl-8">
                                
                                <div className="card">
                                    <div className="card-body text-center">
                                        <div className="row justify-content-center">
                                            <div className="col-12 col-md-10 col-xl-8">
                                                <img src="/assets/img/illustrations/happiness.svg" alt="..." className="img-fluid mt-n5 mb-4" style={{maxWidth: "272px"}}/>
                                                <h2>We released 2008 new versions of our theme to make the world a better place.</h2>
                                                <p className="text-muted">This is a true story and totally not made up. This is going to be better in the long run but for now this is the way it is.</p>
                                                <a href="#!" className="btn btn-primary lift">Try it for free</a>
                                            </div>
                                        </div> 
                                    </div>
                                </div>

                                <div className="card bg-light border">
                                    <div className="card-body">
                                        <h4 className="mb-2">Hoàn thành cung cấp thông tin</h4>
                                        <p className="small text-muted mb-2"> Với một hồ sơ hoàn chỉnh, sẽ giúp rút ngắn thời gian hoàn thành đăng ký các kênh bán hàng delivery và hiển thị tốt hơn trên hệ thống tìm kiếm của Google</p>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-body text-center">                                        
                                        <div className="card-avatar avatar avatar-lg mx-auto">
                                            <img src="/assets/img/avatars/teams/team-logo-1.jpg" alt="" className="avatar-img rounded"/>
                                        </div>

                                        <h2 className="mb-3">Launchday</h2>

                                        <p className="card-text text-muted">Launchday is a SaaS website builder with a focus on quality, easy to build product sites.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}