import React from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import { useGetSigleBlogsQuery } from '../features/blogApi';

function SingleBlog() {

    const { id } = useParams()

    const { data } = useGetSigleBlogsQuery(id)
    console.log(data);

    return (
        <Layout>
            <div className="singleBlog-container container">

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
            </div>
        </Layout>
    )
}

export default SingleBlog
