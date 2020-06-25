import React from 'react';

export default class DropUpWithImage extends React.Component {
    render () {
        return (
            <div className="dropup">
                <a href="#" id="sidebarIconCopy" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div className="avatar avatar-sm avatar-online">
                        <img src="/assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..."/>
                    </div>
                </a>

                {/* Menu */}
                <div className="dropdown-menu" aria-labelledby="sidebarIconCopy">
                    <a href="../Account" className="dropdown-item">Tài khoản</a>
                    <a href="../Billing" className="dropdown-item">Hóa đơn</a>
                    <hr className="dropdown-divider"/>
                    <a href="./sign-in.html" className="dropdown-item">Logout</a>
                </div>

            </div>
        )
    }
}