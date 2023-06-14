import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import DraftEditor from '../components/Editor/DraftEditor';


function AddBlog() {


    return (
        <Layout >
            <div className='container' >

                <h1 className="title-big-color">
                    Post a Blog
                </h1>

                {/* Editor */}
                <div className="editors-container">

                    <DraftEditor />
                </div>

            </div>
        </Layout>
    )
}

export default AddBlog
