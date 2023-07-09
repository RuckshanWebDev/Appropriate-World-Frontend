import React from 'react'
import { useGetBlogsQuery } from '../features/blogApi'
import Layout from '../components/Layout'
import './Blog.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import AddMenu from '../components/AddMenu'
import { useSelector } from 'react-redux'

function BlogPage() {

    const { data } = useGetBlogsQuery()
    const { user } = useSelector(state => state.local)
    console.log(data);

    useEffect(() => {

    }, [data?.data])


    return (
        <Layout>
            {user && <AddMenu title={'Share'} link={'/blog/add'} />}
            <div className="blog-container container">
                {
                    data?.data.length &&
                    data.data.map((blogItem, index) => {
                        console.log(blogItem);
                        return <div className="blog-item" key={index}>
                            <h1>{blogItem.title} </h1>
                            <img src={blogItem.image || "./1.png"} alt="" />
                            <Link to={`/profile/${blogItem?.author._id}`} style={{ textDecoration: 'none' }} >
                                <div className="author-avatar">
                                    <img src={blogItem.author?.profile_image || "./user.png"} alt="" />
                                    <div>
                                        <h3>{blogItem.author.name}</h3>
                                        <span>{blogItem.createdAt?.slice(0, 10)}</span>
                                    </div>
                                </div>
                            </Link>
                            {/* <p className='blog-desc' >{blogItem.content.slice(0, 250)} </p> */}
                            <div className='blog-desc' dangerouslySetInnerHTML={{ __html: blogItem.content.slice(0, 250).trim() }} >
                            </div>
                            <Link to={`/blog/${blogItem._id}`} >See more...</Link>
                        </div>

                    })
                }

                {/* <div className="blog-item">
                    <h1>Title</h1>
                    <img src="./1.png" alt="" />
                    <div className="author-avatar">
                        <img src="./user.png" alt="" />
                        <div>
                            <h3>Ruckshan</h3>
                            <span>2 days ago</span>
                        </div>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt totam in, dolor eius voluptate nemo consequatur, laboriosam cupiditate libero impedit labore necessitatibus dolorem harum voluptas vero natus nulla optio provident?</p>
                    <button>See more...</button>
                </div> */}

            </div>
        </Layout>
    )
}

export default BlogPage
