import React from 'react';
import Head from 'next/head'

export default class PasswordReset extends React.Component {
    render() {
        return (
            <div class="container">
            <div class="row justify-content-center">
              <div class="col-12 col-md-5 col-xl-4 my-5">
                
                
                <h1 class="display-4 text-center mb-3">
                 Thay đổi mật khẩu
                </h1>
                
               
                <p class="text-muted text-center mb-5">
                 Nhập email của bạn để nhận đường link thay đổi mật khẩu qua.
                </p>
                
               
                <form>
      
                 
                  <div class="form-group">
      
                  
                    <label>Email Address</label>
      
                   
                    <input type="email" class="form-control" placeholder="name@address.com" />
      
                  </div>
      
                
                  <button class="btn btn-lg btn-block btn-primary mb-3">
                    Thay đổi mật khẩu
                  </button>
      
                 
                  <div class="text-center">
                    <small class="text-muted text-center">
                      Không thay đổi mật khẩu? <a href="sign-in.html">Đăng nhập ngay</a>.
                    </small>
                  </div>
                  
                </form>
      
              </div>
            </div> 
          </div>
        )
    }
}