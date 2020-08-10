import Head from 'next/head'
import NavBar from '../components/nav/nav_bar';
import React from 'react';
import Router from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useRouter } from 'next/router'

import { BLOCKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

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

const contentfulOptions = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: ({ data: { target: { fields }}}) =>
            `<img src="${fields.file.url}" alt="${fields.description}" class="img-fluid rounded-lg"/>`,
    },
};



export default class LayoutIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        // const cookies = parseCookies()
        // if(cookies.userID && cookies.isLoggedIn && cookies.brandID) {
        //     Router.push(`/overview/${cookies.brandID}`)
        // } else Router.push('/signin')      
        
        // client.getEntries({
        //     content_type: 'document'
        // })
        // .then((response) => console.log(response.items))
        // .catch(console.error) 
        // console.log('router id:', router.query.id)

        let currentComponent = this
        client.getEntries({
            content_type: 'document',
            'sys.id': '2fQWA3DKPzT6aO22tVPXzB'
        })
        .then((response) => {
            console.log('detail document: ',response.items)
            currentComponent.setState({data:response.items})
        })
        .catch(console.error) 
    }

    render () {
        const { data } = this.state;
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
                                        <h1 className="header-title display-4">{data && data[0] && data[0].fields.title}</h1>
                                    </div>
                                </div>

                                <div className='' dangerouslySetInnerHTML={{__html: data && data[0] ? documentToHtmlString(data[0].fields.desc,contentfulOptions) : ''}} />
                                
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