import Head from 'next/head'
import NavBar from '../components/nav/nav_bar';
import React from 'react';
import Router from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Link from 'next/link'

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


const contentful = require('contentful')
const client = contentful.createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
})


export default class LayoutIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            documentsList: []
        }
    }

    componentDidMount() {
        // const cookies = parseCookies()
        // if(cookies.userID && cookies.isLoggedIn && cookies.brandID) {
        //     Router.push(`/overview/${cookies.brandID}`)
        // } else Router.push('/signin')      
        let currentComponent = this;
        client.getEntries({
            content_type: 'document'
        })
        .then((response) => {
            console.log(response.items)
            currentComponent.setState({documentsList:response.items})
        })
        .catch(console.error) 
    }

    render () {
        const { documentsList } = this.state;
        return (
            <div>
                <Head>
                    {/* <script src="../assets/js/theme.min.js"></script> */}
                    <title> Tài liệu | CabinFood Business</title>
                </Head>

                <NavBar />

                <div className="main-content pb-6">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-10 col-xl-8">

                                <div className="header mt-md-5">
                                    <div className="header-body">
                                        <h6 className="header-pretitle">Tài liệu</h6>
                                        <h1 className="header-title display-4">Danh sách</h1>
                                    </div>
                                </div>
                                <ul>
                                    { documentsList.length > 0 && documentsList.map((item,index) => (
                                        <li key={index}>
                                            <Link href='/documents/[id]' as={`/documents/${item.sys.id}`}>
                                                <a>{item.fields.title}</a>
                                            </Link>
                                        </li>                                                                                
                                    ))}
                                </ul>
                                
                                

                                

                                
                            </div>
                        </div>
                    </div>
                </div>
                
                <style jsx>{`
                    .dropdown-toggle {cursor: pointer}
                    
                `}</style>
            </div>
        )
    }
}