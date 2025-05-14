import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Flex, IconButton } from "@radix-ui/themes";
import { MdOutlineDeleteOutline } from "react-icons/md";

import Layout from "../components/Layout";
import { useGetSigleBlogsQuery, useDeleteBlogMutation } from "../features/blogApi";

function SingleBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.local);

  const { data } = useGetSigleBlogsQuery(id);
  const [deleteBlog] = useDeleteBlogMutation();

  const blog = data?.data;

  const handleDelete = async () => {
    try {
      const response = await deleteBlog({ id: blog._id }).unwrap();
      if (response.message === "Success") {
        toast.success("Successfully deleted");
        navigate("/blogs");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete the blog");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 text-gray-200">
        <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>

        <img
          src={blog?.image || "/1.png"}
          alt={blog?.title}
          className="w-full max-h-[500px] object-cover rounded-lg mb-6 border border-zinc-700"
        />

        <div className="flex items-center gap-4 mb-4">
          <img
            src={blog?.author?.profile_image || "/user.png"}
            alt={blog?.author?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{blog?.author?.name}</h3>
            <p className="text-sm text-zinc-400">
              {blog?.createdAt?.slice(0, 10)}
            </p>
          </div>
        </div>

        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        />

        {/* Delete Button (only for owner) */}
        {user?.profileId === blog?.author._id && (
          <div className="fixed bottom-6 right-6 z-10">
            <Flex direction="column" gap="2">
              <IconButton
                color="crimson"
                size="3"
                onClick={handleDelete}
                title="Delete blog"
              >
                <MdOutlineDeleteOutline size={24} />
              </IconButton>
            </Flex>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default SingleBlog;
