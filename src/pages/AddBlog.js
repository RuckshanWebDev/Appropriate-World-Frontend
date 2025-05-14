import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { stateToHTML } from "draft-js-export-html";

import Layout from "../components/Layout";
import DraftEditor from "../components/Editor/DraftEditor";
import Loader from "../components/Loader";
import { useCreateBlogMutation } from "../features/blogApi";

function AddBlog() {
  const navigate = useNavigate();
  const htmlRef = useRef();
  const [file, setFile] = useState();
  const [editor, setEditor] = useState(null);
  const [html, setHtml] = useState("");
  const [createBlog, createBlogApi] = useCreateBlogMutation();

  // Handle API response states
  if (createBlogApi.isError) {
    toast.error(createBlogApi.error?.data?.message || "Something went wrong");
  } else if (createBlogApi.isSuccess) {
    toast.success("Blog successfully posted!");
    navigate(`/blog/${createBlogApi.data?.data._id}`);
  }

  const setEditorData = (value) => {
    setEditor(value);
    if (value) {
      const htmlContent = stateToHTML(value);
      setHtml(htmlContent);
    }
  };

  const blogFormHandler = async (e) => {
    e.preventDefault();
    const { title, image } = e.target;

    try {
      if (!title.value) throw new Error("Please provide a blog title");

      let imageUrl = null;

      if (image.files[0]) {
        const formData = new FormData();
        formData.append("file", image.files[0]);
        formData.append("upload_preset", "blog_images");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dts5uxlug/image/upload",
          { method: "POST", body: formData }
        );
        const result = await response.json();
        imageUrl = result.secure_url;
      }

      await createBlog({
        title: title.value,
        content: html,
        ...(imageUrl && { image: imageUrl }),
      });
    } catch (error) {
      toast.error(error?.message || "Something went wrong, please try again later");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10 text-gray-200">
        <h1 className="text-3xl font-bold text-center mb-8">Create a Community Post</h1>

        <form
          onSubmit={blogFormHandler}
          className="max-w-3xl mx-auto bg-zinc-900 p-6 rounded-xl shadow-lg space-y-6"
        >
          <input
            type="text"
            name="title"
            placeholder="Title for the blog..."
            className="w-full p-3 rounded-md bg-zinc-800 text-white placeholder-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="file"
            name="image"
            accept="image/png, image/gif, image/jpeg, image/jpg"
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />

          <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
            <DraftEditor setEditorData={setEditorData} />
          </div>

          <button
            type="submit"
            disabled={createBlogApi.isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200 disabled:opacity-50"
          >
            {createBlogApi.isLoading ? (
              <>
                Posting...
                <Loader custom={{ height: "20px", width: "20px" }} />
              </>
            ) : (
              "Share Blog"
            )}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default AddBlog;
