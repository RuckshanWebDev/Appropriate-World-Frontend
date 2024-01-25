import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSigleBlogsQuery } from '../features/blogApi';
import Layout from '../components/Layout';
import DraftEditor from '../components/Editor/DraftEditor';
import 'draft-js/dist/Draft.css';
import { stateToHTML } from 'draft-js-export-html';


function EditBlog() {

    const { id } = useParams()
    const { data, isLoading } = useGetSigleBlogsQuery(id)
    console.log(id);

    const [editor, setEditor] = useState()
    const [html, setHtml] = useState()

    const setEditorData = (val) => {
        setEditor(val)
        if (editor) {
            let html = stateToHTML(editor);
            setHtml(html)
        }
    }

    return (
        <Layout loader={isLoading} >
            <div className="container" style={{ marginTop: '50px' }} >
                <h5>{data?.data.title}</h5>
                <div className="editors-container">
                    <DraftEditor setEditorData={setEditorData} data={data?.data.content} />
                </div>
            </div>
        </Layout>
    )
}

export default EditBlog
