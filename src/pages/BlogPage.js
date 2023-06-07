import React from 'react'
import { useGetBlogsQuery } from '../features/blogApi'

function BlogPage() {

    const data = useGetBlogsQuery()
    console.log(data);

    return (
        <div>
            <h1>Blog Page</h1>
        </div>
    )
}

export default BlogPage
