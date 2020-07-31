import React from 'react';
import Head from 'next/head'

import NavChildGroup from '../../components/nav/nav_child_group'
import DropUpWithImage from '../../components/nav/drop_up_with_image'
import CardItemText from '../../components/card/card_item_text'
import CardItemTextChart from '../../components/card/card_item_text_chart'
import TableRich from '../../components/table/table_rich'

export default class Register extends React.Component {
    render() {
        return (
            <div class="container">
            <div class="row justify-content-center">
              <div class="col-12 col-md-5 col-xl-4 my-5">
                
              
                <h1 class="display-4 text-center mb-3">
                 Đăng ký
                </h1>
                
               
                <p class="text-muted text-center mb-5">
                Gia nhập mô hình quản lý FnB Delivery
                </p>
      
              
                <form>
      
                 
                  <div class="form-group">
      
                  
                    <label>
                     Tên nhãn hiệu
                    </label>
      
                  
                    <input type="email" class="form-control" placeholder="vd: Cơm tấm việt" />
      
                  </div>
                  
                  <div class="form-group">
      
                  
                    <label>
                      Email Address
                    </label>
      
                  
                    <input type="email" class="form-control  form-control-appended" placeholder="name@address.com" />
      
                  </div>
             
                  <div class="form-group">
      
                  
                    <label>
                     Mật khẩu
                    </label>
      
                   
                    <div class="input-group input-group-merge">
      
                    
                      <input type="password" class="form-control form-control-appended" placeholder="Enter your password" />
      
                     
                      <div class="input-group-append">
                        <span class="input-group-text">
                          <i class="fe fe-eye"></i>
                        </span>
                      </div>
      
                    </div>
                  </div>
      
                 
                  <button class="btn btn-lg btn-block btn-primary mb-3">
                    Sign up
                  </button>
      
                
                  <div class="text-center">
                    <small class="text-muted text-center">
                      Bạn đã có tài khoản? <a href="sign-in.html">Đăng nhập ngay</a>.
                    </small>
                  </div>
      
                </form>
      
              </div>
            </div> 
          </div>


        )
    }
}