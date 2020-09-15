import React from 'react';
import Head from 'next/head'
import Link from 'next/link';
import $, { data } from 'jquery'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

import NavBar from "../../../../components_v2/nav"
import PostInput from "../../../../components_v2/post/post-input"

const BrandEntity = require("../../../../entity/BrandEntity")
const brandObject = new BrandEntity()

const UserEntity = require("../../../../entity/UserEntity")
const userObject = new UserEntity()

const cookies = parseCookies()
export default class LayoutInfo extends React.Component {
    
    static async getInitialProps({query}) {        
        console.log("query id:", query.id)
        const res = await brandObject.getBrandByID(query.id)
        return {brand: res}        
    }

    constructor(props) {
        super(props);

        this.state = {
            user : []
        }
    }

    async componentDidMount() {        
        let currentComponent = this

        const user = await userObject.getUserByID(cookies.userID)
        currentComponent.setState({user: user})
    }

    render() {
        const {user} = this.state
        return (
            <>
                <Head>
                    <title>  {this.props.brand.name} | Dashboard</title>
                </Head>

                <NavBar 
                    active_nav_item = "#home"
                    brand_id={this.props.brand.ID}
                    brand_name={this.props.brand.name}
                    // user_id={cookies.userID}
                    // avatar = {user && user.avatar ? user.avatar[0].url : "../assets/img/avatars/profiles/avatar-1.jpg"}
                />

                <div className="main-content">
                    <div className="container-fluid">
                        <div className="row mt-4 mt-md-5 justify-content-center">
                            <div className="col-12 col-lg-10 col-xl-8">                                
                                <PostInput 
                                    brand = {this.props.brand}
                                    user = {user}
                                />
                                
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}