import React from 'react';
import Head from 'next/head'
import Link from 'next/link';
import $, { data } from 'jquery'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

import NavBar from "../../../../components_v2/nav"
import PostInput from "../../../../components_v2/post/post-input"
import PostShow from "../../../../components_v2/post/post-show"

const BrandEntity = require("../../../../entity/BrandEntity")
const brandObject = new BrandEntity()

const UserEntity = require("../../../../entity/UserEntity")
const userObject = new UserEntity()

const FeedEntity = require("../../../../entity/FeedEntity")
const feedObject = new FeedEntity()

const cookies = parseCookies()
export default class LayoutInfo extends React.Component {
    
    static async getInitialProps({query}) {        
        console.log("query id:", query.id)
        const res = await brandObject.getBrandByID(query.id)
        const feed = await feedObject.getFeedByID(query.id)
        return {brand: res, feed: feed}        
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
                    active_nav_item = "#feed"
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

                                {this.props.feed && this.props.feed.map((item, index)=> (
                                    <PostShow key={index}
                                        post_id = {item.ID}
                                        content = {item.content}
                                        attachments = {item.attachments}
                                        created_at = {item.createdAt}
                                        author_name = {item.userName}
                                        author_avatar = {item.userAvatar}
                                        author_id = {item.userID}
                                        like = {item.like}
                                        dislike = {item.dislike}
                                        user = {user}
                                        post_rec_id = {item.recID}
                                    />
                                ))}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}