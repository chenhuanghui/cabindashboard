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
        // client.getEntries({
        //     content_type: 'document'
        // })
        // .then((response) => {
        //     console.log(response.items)
        //     currentComponent.setState({documentsList:response.items})
        // })
        // .catch(console.error) 

        retrieveData({}, 'Document')
        .then(result => {
            console.log('document list:', result)
            currentComponent.setState({documentsList:result})
        })
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
                                        <h1 className="header-title display-4">Tại sao nên kinh doanh cùng CabinFood?</h1>
                                    </div>
                                </div>
                                <p>Chúng tôi tạo ra nền tảng giúp cho việc <code>bắt đầu - vận hành - tăng trưởng</code> trong lĩnh vực kinh doanh đồ ăn thức uống <code>delivery</code> của các doanh nghiệp Việt Nam trở nên dễ dàng, và chuyên nghiệp hơn.</p>
                                <p>CabinFood mang đến nền tảng với các sản phẩm, dịch vụ, giải pháp cho mô hình delivery chuyên nghiệp mà doanh nghiệp cần có để bắt đầu, vận hành tinh gọn và phát triển bền vững.</p>

                                
                                <ol>
                                    { documentsList.length > 0 && documentsList.map((item,index) => (
                                        <li key={index}>
                                            <Link href='/documents/[id]' as={`/documents/${item.id}`}>
                                                <a>{item.fields.title}</a>
                                            </Link>
                                        </li>                                                                                
                                    ))}
                                </ol>
                                <p>Với những tài liệu trên, hi vọng rằng sẽ giúp cho nhãn hàng dễ dàng hệ thống và nắm bắt thông tin trong quá trình hội nhập cùng chúng tôi.</p>
                                
                                {/* .row group */}{/* .row */}
                                <div className="header mt-md-5">
                                    <div className="header-body">
                                        <h1 className="header-title">Hệ sinh thái kết nối nguồn lực</h1>
                                    </div>
                                </div>
                                <p>Chúng tôi mong muốn giúp đỡ nhiều doanh nghiệp trong ngành kinh doanh món ăn thức uống có được sự phát triển bền vững. Nhờ vào khai thác mô hình kinh tế chia sẻ, tư duy vận hành tinh gọn và ứng dụng công nghệ hiện đại chúng tôi biến mọi thứ phức tạp trở nên dễ dàng hơn giúp doanh nghiệp nâng cao hiệu quả kinh doanh và có được phát triển bền vững.</p>
                                
                                

                                

                                
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