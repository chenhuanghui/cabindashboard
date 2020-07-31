import React from 'react';
import Router from 'next/router';

export default class LayoutIndex extends React.Component {
    componentDidMount() {
        const {pathname} = Router;
        console.log('pathname:', pathname);
        Router.push('/brands/rec5gBYbW7XQylxoF')
    }

    render () {
        return (
            <div> WELCOME TO CABIN FOOD SPACE</div>
        )
    }
}