import Head from 'next/head'

import Router from 'next/router';

// ====================================
// REACT
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';

// ====================================
// COMPONENTS
import NavBar from '../components/nav/nav_bar';

// ====================================
// OTHERS LIBS
import $ from 'jquery'
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

async function updateData(rowID, data,tbName) {
    try {
      const res = await airtable.update(rowID, data,{tableName:tbName});
      return res
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
            retrieveData({
                filterByFormula: `ID = "${docID}"`,
                maxRecords: 1
            }, 'Document')
            .then(result => {
                var temp = []                
                temp['title'] = result[0].fields.title;
                temp['document_onboarding'] = result[0].fields.Document_Onboarding[0];

                // get document by Document_ID
                client.getEntries({
                    content_type: 'document',
                    'sys.id': result[0].fields.contentfulID
                })
                .then((response) => {
                    temp['content'] = response.items[0].fields.desc
                    
                    retrieveData({
                        filterByFormula : `ID = "${result[0].fields.onboardingID[0]}"`,
                        maxRecords : 1    
                    },`OnBoarding`)
                    .then(onboardingRes => {
                        console.log('onboardingRes: ', onboardingRes[0].fields.type)
                        temp['onboarding'] = onboardingRes[0].fields.type
                        temp['valueAction'] = onboardingRes[0].fields.valueAction
                        setData(temp)
                    })
                    .finally(res=>{
                        
                        console.log('data: ', data)
                    })    
                })
                .catch(console.error) 
            })
            
            $(document).on('click','#confirmed', function(){
                $(this).html(`<div class="spinner-grow spinner-grow-sm" role="status"><span class="sr-only">Loading...</span></div>`)
                retrieveData({
                    filterByFormula : `ID = "${$(this).attr('data')}"`,
                    maxRecords : 1
                },'Document_Onboarding')
                .then(docOnRes => {
                    console.log(docOnRes[0].fields.Onboarding);
                    console.log('brandid',cookies.brandID)
                    retrieveData({
                        filterByFormula : `AND(Brand = "${cookies.brandID}", Onboarding="${docOnRes[0].fields.Onboarding}")`,
                        maxRecords: 1
                    },'Brand_Onboarding')
                    .then(brandOnboardingRes => {
                        console.log('brandonboarding: ',brandOnboardingRes)
                        let temp = []
                        
                        if (brandOnboardingRes[0].fields.updatedBy) {
                            temp = brandOnboardingRes[0].fields.updatedBy;
                            var isDuplicate = false;
                            for (var i=0; i < temp.length; i++) {
                                if (temp[i] === cookies.userID) Router.push('/documents')
                            }
                            
                            if (!isDuplicate) temp.push(cookies.userID)
                            
                            console.log('temp1', temp)
                        } else {
                            temp.push(cookies.userID)
                            console.log('temp2', temp)
                        }
                        console.log('temp final', temp)
                        
                        updateData(brandOnboardingRes[0].id,{status : true,updatedBy : temp},'Brand_Onboarding')
                        .then(res => {
                            Router.push('/documents')
                        })    
                    })
                })
            })



        }             

    },[docID])

    function markUnderstand() {
        console.log('asdf')
    }

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
                                    <h1 className="header-title display-4">{data && data.title}</h1>
                                </div>
                            </div>

                            <div className='' dangerouslySetInnerHTML={{__html: data ? documentToHtmlString(data.content, contentfulOptions) : ''}} />
                            
                            <hr className="my-5" />
                            <div className="row align-items-center">
                                <div className="col-auto"></div>
                                <div className="col text-center"></div>
                                <div className="col-auto">
                                    { data && parseInt(data.onboarding) === 2
                                    ? <span className="btn btn-lg btn-primary" id='confirmed' data={data.document_onboarding}>Tôi đã hiểu</span>
                                    : 
                                    <Link href={`${data ? data.valueAction : ''}`} >
                                        <a className="btn btn-lg btn-primary">Thực hiện ngay</a>
                                    </Link>
                                    }
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

// ====================================