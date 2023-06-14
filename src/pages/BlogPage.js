import React from 'react'
import { useGetBlogsQuery } from '../features/blogApi'
import Layout from '../components/Layout'
import './Blog.css'
import { Link } from 'react-router-dom'

function BlogPage() {

    const data = useGetBlogsQuery()
    console.log(data);

    return (
        <Layout>
            <div className="blog-container container">

                <div className="blog-item">
                    <h1>Title</h1>
                    <img src="./1.png" alt="" />
                    <div className="author-avatar">
                        <img src="./user.png" alt="" />
                        <div>
                            <h3>Ruckshan</h3>
                            <span>2 days ago</span>
                        </div>
                    </div>
                    <p className='blog-desc' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt totam in, dolor eius voluptate nemo consequatur, laboriosam cupiditate libero impedit labore necessitatibus dolorem harum voluptas vero natus nulla optio provident?
                    </p>
                    <Link to={'/blog/title'} >See more...</Link>
                </div>

                <div className="blog-item">
                    <h1>Title</h1>
                    <img src="./1.png" alt="" />
                    <div className="author-avatar">
                        <img src="./user.png" alt="" />
                        <div>
                            <h3>Ruckshan</h3>
                            <span>2 days ago</span>
                        </div>
                    </div>
                    <p className='blog-desc' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt totam in, dolor eius voluptate nemo consequatur, laboriosam cupiditate libero impedit labore necessitatibus dolorem harum voluptas vero natus nulla optio provident?
                    </p>
                    <Link to={'/blog/title'} >See more...</Link>
                </div>

                <div className="blog-item">
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
                </div>

            </div>
        </Layout>
    )
}

export default BlogPage
