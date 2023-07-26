import React from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import { useGetSigleBlogsQuery } from '../features/blogApi';
import { WhatsappShareButton } from "react-share";
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs'

function SingleBlog() {

    const { id } = useParams()

    const { data } = useGetSigleBlogsQuery(id)

    return (
        <Layout>
            <div className="singleBlog-container container">

                <WhatsappShareButton title={data?.data.title} image={data?.data.image || "/user.png"} style={{ backgroundColor: 'red', height: '50px', width: '50px' }} />

                <h1 className='title-big-color' >{data?.data.title}</h1>

                <img src={data?.data.image || "/1.png"} alt="" />

                <div className="author-avatar">
                    <img src={data?.data.author.profile_image || "/user.png"} alt="" />
                    <div>
                        <h3>{data?.data.author.name}</h3>
                        <span>{data?.data.createdAt?.slice(0, 10)}</span>
                    </div>
                </div>


                {/* <p className='blog-desc' >{data?.data.content}</p> */}
                <div dangerouslySetInnerHTML={{ __html: data?.data.content }} >
                </div>


                <div className="blog-share-container">

                </div>

            </div>
        </Layout>
    )
}

export default SingleBlog
