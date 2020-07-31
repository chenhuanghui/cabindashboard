import React from 'react';
import Router from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies'

export default class LayoutIndex extends React.Component {
    componentDidMount() {
        const cookies = parseCookies()
        if (!cookies.isLoggedIn) Router.push('/signin')
        
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
            <div> WELCOME TO CABIN FOOD SPACE</div>
        )
    }
}