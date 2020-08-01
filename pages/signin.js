import $ from 'jquery';
import React from 'react';
import Router from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies'

export default class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            account:[]
        }
    }

    componentDidMount() {
        const cookies = parseCookies()
        if (cookies.isLoggedIn) Router.push(`/brands/${cookies.isLoggedIn}`)

        let currentComponent = this;
        var Airtable = require('airtable');
        var base = new Airtable({apiKey: 'keyLNupG6zOmmokND'}).base('appmREe03n1MQ6ydq');

        $('#tryToLoggin').click(function(){
            base('Owner').select({
                view: 'Grid view',
                filterByFormula:`email="${$('#username').val()}"`
            })
            .eachPage(function page(records, fetchNextPage) {
                if (records.length > 0) {
                    // currentComponent.setState({account:records})
                    if ($('#password').val() == records[0].fields.password) {
                        $('#notice').removeClass('show').addClass('hide')
                        setCookie(null, 'isLoggedIn', records[0].fields.Brand, {
                            maxAge: 30 * 24 * 60 * 60,
                            path: '/',
                        })
                        Router.push(`/brands/${records[0].fields.Brand[0]}`)
                    } else {
                        $('#notice').removeClass('hide').addClass('show')   
                    }
                    
                }
                else $('#notice').removeClass('hide').addClass('show')
            }, function done(error) {

            });
        })
        

        

        // console.log('read cookie: ',cookies.loggedin)
        // destroyCookie(null, 'loggedin')

        // setCookie(null, 'loggedin', 'true', {
        //     maxAge: 30 * 24 * 60 * 60,
        //     path: '/brands/rec5gBYbW7XQylxoF',
        // })

        // const {pathname} = Router;
        // console.log('pathname:', pathname);
        // Router.push('/brands/rec5gBYbW7XQylxoF')
    }

    render() {
        const {account} = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-5 col-xl-4 my-5">
                        <h1 className="display-4 text-center mb-3">Đăng nhập</h1>
                        <p className="text-muted text-center mb-5">Kinh doanh món ăn thức uống dễ dàng và chuyên nghiệp hơn với nền tảng Delivery được phát triển bởi CabinFood.</p>
                        
                        <div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="name@address.com" id="username"/>
                            </div>

                            <div className="form-group">
                                <div className="row">
                                    <div className="col"><label>Mật khẩu</label></div>
                                    <div className="col-auto"> 
                                        <a href="password-reset.html" className="form-text small text-muted">Forgot password?</a>
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