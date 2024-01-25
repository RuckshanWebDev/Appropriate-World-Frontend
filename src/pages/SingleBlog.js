import React from 'react'
import Layout from '../components/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteBlogMutation, useGetSigleBlogsQuery } from '../features/blogApi';
import { Flex, IconButton, Theme } from '@radix-ui/themes';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineDeleteOutline, MdEdit } from "react-icons/md";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';



function SingleBlog() {

    const { id } = useParams()
    const { user } = useSelector(state => state.local)
    const navigate = useNavigate()

    const { data } = useGetSigleBlogsQuery(id)
    const [deleteBlog, deleteData] = useDeleteBlogMutation()

    console.log(deleteData);

    const deleteHandler = async () => {

        try {
            const responce = await deleteBlog({ id: data.data._id }).unwrap()
            console.log(responce);
            if (responce.message === 'Success') {
                toast.success('Successfully deleted')
                navigate('/blogs')
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Layout>
            <div className="singleBlog-container container">


                <h1 className='title-big-color' style={{ margin: '30px 0 10px' }} >{data?.data.title}</h1>

                <img src={data?.data.image || "/1.png"} alt="" />

                <div className="author-avatar">
                    <img src={data?.data.author.profile_image || "/user.png"} alt="" />
                    <div>
                        <h3>{data?.data.author.name}</h3>
                        <span>{data?.data.createdAt?.slice(0, 10)}</span>
                    </div>
                </div>


                {/* <p className='blog-desc' >{data?.data.content}</p> */}
                <div dangerouslySetInnerHTML={{ __html: data?.data.content }} style={{ paddingBottom: '30px', paddingTop: '10px' }} >
                </div>


                <div className="blog-share-container">

                </div>


            </div>
            {user.profileId === data?.data?.author._id && <div style={{ position: 'fixed', right: '10px', bottom: '50px' }} >
                <Theme>
                    <Flex direction={'column'} >
                        {/* <IconButton onClick={() => { navigate(`/blog/edit/${data?.data._id}`) }} ><MdEdit /></IconButton> */}
                        <IconButton color="crimson" onClick={deleteHandler}  ><MdOutlineDeleteOutline /></IconButton>
                    </Flex>
                </Theme>
            </div>}
        </Layout>
    )
}

export default SingleBlog
