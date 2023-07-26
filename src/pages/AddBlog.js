import React, { useRef, useState } from 'react'
import Layout from '../components/Layout'
import 'draft-js/dist/Draft.css';
import DraftEditor from '../components/Editor/DraftEditor';
import { stateToHTML } from 'draft-js-export-html';
import { useCreateBlogMutation } from '../features/blogApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader'



function AddBlog() {

    const navigate = useNavigate()
    const htmlRef = useRef()
    const [file, setFile] = useState()
    const [editor, setEditor] = useState()
    const [html, setHtml] = useState()
    const [createBlog, createBlogApi] = useCreateBlogMutation()

    console.log(createBlogApi.data?.data._id);

    if (createBlogApi.isError) {
        toast.error(createBlogApi.error?.data.message || "Something went wrong")


    } else if (createBlogApi.isSuccess) {
        toast.success("Blog successfully posted!")
        navigate(`/blog/${createBlogApi.data?.data._id}`)
    }

    const setEditorData = (val) => {
        setEditor(val)
        if (editor) {
            let html = stateToHTML(editor);
            setHtml(html)
        }
    }


    const blogFormHandler = async (e) => {
        e.preventDefault()

        try {

            if (e.target.image.files && e.target.image.files[0]) {
                const data = new FormData()
                data.append('file', e.target.image.files[0])
                data.append('upload_preset', 'blog_images')
                try {
                    const responce = await fetch('https://api.cloudinary.com/v1_1/dts5uxlug/image/upload', {
                        method: "POST",
                        body: data
                    })
                    const result = await responce.json()
                    if (result) {
                        createBlog({
                            title: e.target.title.value,
                            content: html,
                            image: result.secure_url
                        })
                    }

                } catch (error) {
                    console.log(error);
                }
            } else {
                createBlog({
                    title: e.target.title.value,
                    content: html,
                })
            }


        } catch (error) {
            toast.error("Something went wrong, Please try again")
        }

    }

    return (
        <Layout >
            <div className='container addBlog-container' >

                <h1 className="title-big-color">
                    Community Post
                </h1>

                <form onSubmit={blogFormHandler}>
                    <input type="text" name='title' placeholder='Title for the Blog..' />
                    <input type="file" name='image' value={file} accept="image/png, image/gif, image/jpeg, image/jpg" />
                    <div className="editors-container">

                        <DraftEditor setEditorData={setEditorData} />
                    </div>
                    <button disabled={createBlogApi.isLoading} type='submit' style={{ display: "inline-block", margin: "0 auto" }} >{createBlogApi.isLoading ? <> Loading < Loader /></> : "Share Blog"}</button>
                </form>

                {/* Editor */}
                {/* 
                <div ref={htmlRef} dangerouslySetInnerHTML={{ __html: html }} >
                </div> */}

            </div>
        </Layout>
    )
}

export default AddBlog
