import React from 'react';
import Head from 'next/head'
import Link from 'next/link';
import $, { data } from 'jquery'
import NavBar from "../../../../components_v2/nav"

const BrandEntity = require("../../../../entity/BrandEntity")
const brandObject = new BrandEntity()

const WorkingHoursEntity = require("../../../../entity/WorkinghoursEntity")
const workingHoursObject = new WorkingHoursEntity()

const OwnerEntity = require("../../../../entity/OwnerEntity")
const ownerObject = new OwnerEntity()

export default class LayoutInfo extends React.Component {
    
    static async getInitialProps({query}) {        
        console.log("query id:", query.id)
        const res = await brandObject.getBrandByID(query.id)
        return {brand: res}        
    }

    constructor(props) {
        super(props);

        this.state = {
            promotion : null,
            incubator : null,
            milestone : null,
            workingHours : null,
            owner : []
        }
    }

    async componentDidMount() {        
        let currentComponent = this        

        const workingHours = await workingHoursObject.getWorkingHoursByBrandID(this.props.brand.ID)
        currentComponent.setState({workingHours: workingHours})

        const owner = await ownerObject.getOwnerByBrandID(this.props.brand.ID)
        currentComponent.setState({owner: owner})
    }

    render() {
        return (
            <>
                <Head>
                    <title>  {this.props.brand.name} | Dashboard</title>
                </Head>

                <NavBar 
                    active_nav_item = "#products"
                    brand_id={this.props.brand.ID}
                    brand_name={this.props.brand.name}
                    // user_id={cookies.userID}
                    // avatar = {user && user.avatar ? user.avatar[0].url : "../assets/img/avatars/profiles/avatar-1.jpg"}
                />

                <div className="main-content">
                    <div className="container-fluid">
                        <div className="row mt-4 mt-md-5 justify-content-center">
                            <div className="col-12 col-lg-10 col-xl-8">                                
                            
                                

                                
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}