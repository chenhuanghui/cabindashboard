import $ from 'jquery';
import React from 'react';
import Router from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const UserEntity = require("../../entity/UserEntity")
const userObject = new UserEntity()


export default class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount() {    
        // ===============================================
        // CHECKING AUTHENTICATE
        const cookies = parseCookies()
        if (!cookies.isLoggedIn | !cookies.userID | !cookies.brandID | !cookies.role) Router.push('/v2/signin');

        // reset all cookies
        destroyCookie(null,'isLoggedIn',{path:'/'})
        destroyCookie(null,'userID',{path:'/'})
        destroyCookie(null,'userFeedID',{path:'/'})
        destroyCookie(null,'brandID',{path:'/'})
        destroyCookie(null,'role',{path:'/'})
        // ========================

        let currentComponent = this;        
        $('#tryToLoggin').click(async function (){
            $(this).append(`<div class="spinner-grow spinner-grow-sm" role="status"><span class="sr-only">Loading...</span></div>`)        

            const user = await userObject.getUserByEmail($('#username').val())

            if (user) {
                if ($('#password').val() === user.password) {
                    $('#notice').removeClass('show').addClass('hide')
                    
                    setCookie(null, 'isLoggedIn', true, {maxAge: 30 * 24 * 60 * 60,path: '/',})
                    setCookie(null, 'userID',user.ID , {maxAge: 30 * 24 * 60 * 60,path: '/',})
                    // setCookie(null, 'avatar',user.avatar ? result[0].fields.avatar[0].url : "../assets/img/avatars/profiles/avatar-1.jpg" , {maxAge: 30 * 24 * 60 * 60,path: '/',})
                    setCookie(null,'brandID', 'biz100001', {maxAge: 30 * 24 * 60 * 60,path:'/'})

                    // Router.push(`/overview/${result[0].fields.brandID[0]}`)
                    
                    console.log('.... success');
                    Router.push(`/v2/brands/${`biz10001`}/dashboard`)
                } else {
                    $('#notice').removeClass('hide').addClass('show')   
                    $('.spinner-grow').remove()
                }    
            }

        })
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-5 col-xl-4 my-5">
                        <h1 className="display-4 text-center mb-3">Đăng nhập v2</h1>
                        <p className="text-muted text-center mb-5">Kinh doanh món ăn thức uống dễ dàng và chuyên nghiệp hơn với nền tảng Delivery được phát triển bởi CabinFood.</p>
                        
                        <div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" id="username"/>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <div className="col"><label>Mật khẩu</label></div>
                                    <div className="col-auto"> 
                                        <a href="#" className="form-text small text-muted">Forgot password?</a>
                                    </div>
                                </div>

                                <div className="input-group input-group-merge">
                                    <input type="password" className="form-control form-control-appended" placeholder="Enter your password" id='password'/>
                                    <div className="input-group-append"> 
                                        <span className="input-group-text"><i className="fe fe-eye"></i></span>
                                    </div>
                                </div>
                            </div>

                            <button className="btn btn-lg btn-block btn-primary mb-3" id='tryToLoggin' >Sign in</button>
                            
                            <div className="alert alert-danger alert-dismissible hide" id='notice'>
                                Thông tin không chính xác, xin nhập lại !
                            </div>

                            <div className="text-center"> 
                                <small className="text-muted text-center">Chưa có tài khoản? <a href="sign-up.html"> Đăng ký ngay</a>.</small>
                            </div>
                        </div>
                        
                    </div>
                </div>
        <style jsx>{`
            .show {display: block}
            .hide {display: none}
        `}</style>
            </div>
            )
        }
}