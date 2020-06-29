import React from 'react';
import Link from 'next/link'
export default class DropUpWithImage extends React.Component {
    render() {
        return (
            <div className="dropup">
                <a href="#" id="sidebarIconCopy" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div className="avatar avatar-sm avatar-online">
                        <img src="/assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..." />
                    </div>
                </a>
                {/* Menu */}
                <div className="dropdown-menu" aria-labelledby="sidebarIconCopy">
                    <Link href="../Account" >
                        <a className="dropdown-item">Tài khoản</a>
                    </Link>
                    <Link href="../Billing" >
                        <a className="dropdown-item">Hóa đơn</a>
                    </Link>
                    <hr className="dropdown-divider" />
                    <Link href="../Dashboard" >
                        <a className="dropdown-item">Logout</a>
                    </Link>


                </div>

            </div>
        )
    }
}