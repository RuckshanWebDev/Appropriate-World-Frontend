import React, { useEffect } from "react";
import { useGetBlogsQuery } from "../features/blogApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import AddMenu from "../components/AddMenu";
import EmptyMessage from "../components/EmptyMessage";

function BlogPage() {
  const { data, isLoading } = useGetBlogsQuery();
  const { user } = useSelector((state) => state.local);

  useEffect(() => {
    // optional effect logic
  }, [data?.data]);

  const blogs = data?.data || [];

  return (
    <Layout loader={isLoading}>
      {user && <AddMenu title="Share" link="/blog/add" />}

      <div className="container mx-auto px-4 py-8">
        {blogs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-zinc-900 text-gray-200 rounded-xl overflow-hidden border border-zinc-700 shadow-md">
                <Link to={`/blog/${blog._id}`}>
                  <img src={blog.image || "/1.png"} alt={blog.title} className="w-full h-48 object-cover" />
                </Link>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h2>
                  <div className="flex items-center justify-between text-sm text-zinc-400 mb-3">
                    <Link to={`/profile/${blog.author?._id}`} className="flex items-center gap-3 hover:text-white transition">
                      <img src={blog.author?.profile_image || "/user.png"} alt={blog.author?.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <p className="font-medium">{blog.author?.name}</p>
                        <p className="text-xs">{blog.createdAt?.slice(0, 10)}</p>
                      </div>
                    </Link>

                    <Link to={`/blog/${blog._id}`} className="text-indigo-400 hover:text-indigo-300 transition">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyMessage text="You haven't posted any blogs yet. Be the first to share your thoughts!" />
        )}
      </div>
    </Layout>
  );
}

export default BlogPage;
