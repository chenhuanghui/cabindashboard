import React from 'react';
import Router from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies'

export default class LayoutIndex extends React.Component {
    componentDidMount() {
        const cookies = parseCookies()
        if (cookies.isLoggedIn) 
            Router.push(`/brands/${cookies.isLoggedIn}`)
        else Router.push('/signin')
        
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

    render () {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-5 col-xl-4 my-5">
                        <h1> WELCOME TO CABINFOOD ECO-SYSTEM </h1>
                    </div>                    
                </div>
                <style jsx>{`
                    h1 {text-align: center}
                `}</style>
            </div>
        )
    }
}