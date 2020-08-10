import Head from 'next/head'

import Router from 'next/router';

// ====================================
// REACT
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'


// ====================================
// COMPONENTS
import NavBar from '../components/nav/nav_bar';

// ====================================
// OTHERS LIBS
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
const AirtablePlus = require('airtable-plus');  
const contentful = require('contentful')

// ====================================
// INIT GLOBAL VARIABLES
const airtable = new AirtablePlus({
  baseID: 'appmREe03n1MQ6ydq',
  apiKey: 'keyLNupG6zOmmokND',
  tableName: 'Brand',
});

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

// ====================================
// GLOBAL FUNCTIONS
async function retrieveData(formular,tbName) {
    try {
        const readRes = await airtable.read(formular,{tableName:tbName});
        return readRes
    } catch(e) {
        console.error(e);
    }
}


export default function LayoutDocumentDetail () {
    const router = useRouter();
    const cookies = parseCookies();
    const [data, setData] = useState([]);
    const [docID, setDocID] = useState(null);

    useEffect(() => {
        // if not user --> redirect to Sign In page
        if(!cookies.userID | !cookies.isLoggedIn | !cookies.brandID) {
            destroyCookie(userID)
            destroyCookie(isLoggedIn)
            destroyCookie(brandID)
            Router.push('/signin')
        }

        setDocID(router.query.id)
        console.log('router: ',router.query.id)

        // when docID was assigned successful retrieve data from Contenful
        if(docID === router.query.id) {
            console.log('docID: ',docID)
            // get document by document_ID
            client.getEntries({
                content_type: 'document',
                'sys.id': '2fQWA3DKPzT6aO22tVPXzB'
            })
            .then((response) => {
                console.log('detail document: ',response.items)
                setData(response.items)
            })
            .catch(console.error) 
        }

    },[docID])

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
        </div>
    )

}

// ====================================