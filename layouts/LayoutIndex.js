import React from 'react';
import Router from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const AirtablePlus = require('airtable-plus');  
const airtable = new AirtablePlus({
  baseID: 'appmREe03n1MQ6ydq',
  apiKey: 'keyLNupG6zOmmokND',
  tableName: 'Brand',
});

async function retrieveData(formular,tbName) {
    try {
        const readRes = await airtable.read(formular,{tableName:tbName});
        return readRes
    } catch(e) {
        console.error(e);
    }
}

export default class LayoutIndex extends React.Component {
    componentDidMount() {
        const cookies = parseCookies()
        if(cookies.userID && cookies.isLoggedIn && cookies.brandID) {
            Router.push(`/feed/${cookies.brandID}`)
        } else Router.push('/signin')                
    }

    render () {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-5 col-xl-4 my-5">
                        <h1> WELCOME TO CABINFOOD FOR BUSINESS </h1>
                    </div>                    
                </div>
                <style jsx>{`
                    h1 {text-align: center}
                `}</style>
            </div>
        )
    }
}