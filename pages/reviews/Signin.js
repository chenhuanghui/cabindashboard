import React from 'react';
import Head from 'next/head'

import NavChildGroup from '../../components/nav/nav_child_group'
import DropUpWithImage from '../../components/nav/drop_up_with_image'
import CardItemText from '../../components/card/card_item_text'
import CardItemTextChart from '../../components/card/card_item_text_chart'
import TableRich from '../../components/table/table_rich'

export default class Signin extends React.Component {
    render() {
        return (

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-5 col-xl-4 my-5">


                        <h1 className="display-4 text-center mb-3">
                           Đăng nhập
          </h1>


                        <p className="text-muted text-center mb-5">
                            Gia nhập mô hình quản lý FnB Delivery.
          </p>


                        <form>


                            <div className="form-group">


                                <label>Email Address</label>


                                <input type="email" className="form-control" placeholder="name@address.com" />

                            </div>


                            <div className="form-group">

                                <div className="row">
                                    <div className="col">


                                        <label>Mật khẩu</label>

                                    </div>
                                    <div className="col-auto">


                                        <a href="password-reset.html" class="form-text small text-muted">
                                            Forgot password?
                  </a>

                                    </div>
                                </div>


                                <div className="input-group input-group-merge">


                                    <input type="password" className="form-control form-control-appended" placeholder="Enter your password"/>


                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <i className="fe fe-eye"></i>
                                            </span>
                                        </div>

              </div>
                                </div>


                                <button className="btn btn-lg btn-block btn-primary mb-3">
                                    Sign in
            </button>


                                <div className="text-center">
                                    <small className="text-muted text-center">
                                        Chưa có tài khoản? <a href="sign-up.html"> Đăng ký ngay</a>.
              </small>
                                </div>
            
          </form>

                            </div>
                    </div>
                </div>
         


        )

        }

    }