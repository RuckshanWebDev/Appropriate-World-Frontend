import React, { useState } from "react";
import Layout from "../components/Layout";
import { useGetContactQuery, useLazyGetContactQuery } from "../features/blogApi";
import "./community.css";
import { useDispatch, useSelector } from "react-redux";
import { useAddFriendMutation, useLazyGetProfileQuery, useRemoveFriendMutation } from "../features/profileApi";
import { useEffect } from "react";
import { setProfileId } from "../features/localSlice";
import { toast } from "react-toastify";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Avatar, Box, Card, Inset, Strong, Text, TextField } from "@radix-ui/themes";

function CommunityPage() {
  const [contacts, setContacts] = useState([]);
  const [pagination, setPagination] = useState({
    totalDocuments: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 15,
    search: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  // const { data, isLoading } = useGetContactQuery();
  const [fetchFn, data] = useLazyGetContactQuery();
  const { profile } = useSelector((state) => state.local.user);
  const [addFriendFn, addFriendData] = useAddFriendMutation();
  const [removeFriendFn, removeFriendData] = useRemoveFriendMutation();
  const [profileFn, profileData] = useLazyGetProfileQuery();
  const [searchInput, setSearchInput] = useState("");

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, limit: pagination.limit });
  };

  const [list, setList] = useState([]);

  // setProfileId
  const addFriendHandler = async (id) => {
    const popup = toast.loading("Please wait...");

    console.log(profile._id);
    addFriendFn({ id: profile._id, friendId: id });

    const data = await profileFn().unwrap();
    console.log(data.data[0]);
    dispatch(setProfileId(data.data[0]));

    toast.update(popup, { render: "Added to Friend List", type: "success", isLoading: false });
    toast.dismiss();
  };

  const removeFriendHandler = async (id) => {
    const popup = toast.loading("Please wait...");

    removeFriendFn({ id: profile._id, friendId: id });

    const data = await profileFn().unwrap();
    console.log(data.data[0]);
    dispatch(setProfileId(data.data[0]));

    toast.update(popup, { render: "Removed from Friend List", type: "success", isLoading: false });
    toast.dismiss();
  };

  // const formHandler = (e) => {
  //   e.preventDefault();

  //   const searchValue = e.target.value || e.target.form.value || "";
  //   const page = 1; // Reset to first page on new search
  //   const limit = parseInt(searchParams.get("limit")) || 10;

  //   // Update URL query params
  //   setSearchParams({ page, limit, search: searchValue });
  // };
  const onInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    const page = 1; // Always reset to first page when searching
    const limit = parseInt(searchParams.get("limit")) || 15;
    setSearchParams({ page, limit, search: value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const page = 1;
    const limit = parseInt(searchParams.get("limit")) || 15;
    setSearchParams({ page, limit, search: searchInput });
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 15;
    const search = searchParams.get("search") || "";
    setPagination((prev) => ({ ...prev, currentPage: page, limit, search }));
    fetchFn({ page, limit, search });
  }, [searchParams]);

  useEffect(() => {
    if (data.isSuccess) {
      setList(data.data.data);
      setPagination(data.data.pagination);
      console.log(data.data.pagination, pagination);
    }
  }, [data]);

  console.log(data);

  return (
    <Layout>
      <form className="search-container" onSubmit={onFormSubmit}>
        <input type="text" name="form" value={searchInput} onChange={onInputChange} placeholder="Search..." />
        <input type="submit" value="Search" />
      </form>

      <div className="max-w-7xl mx-auto p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {!list.length ? (
          <div className="col-span-full text-center text-gray-400 text-lg">Data not Found | 404</div>
        ) : (
          list.map((item, index) => {
            if (item._id === profile?._id) return null;
            const isFriend = profile?.friendList?.some((i) => i._id === item._id);

            return (
              <div key={index} className="flex flex-col items-center p-6 rounded-2xl border hover:bg-neutral-800 border-neutral-700 bg-neutral-900 hover:border-primary/50 hover:shadow-lg transition-all">
                <Link to={`/profile/${item._id}`}>
                  <Avatar src={item.profile_image || "/user.png"} alt={item.name}  className="w-20 h-20 object-cover rounded-full overflow-hidden border-2 border-primary mb-4">
                  </Avatar>
                </Link>

                <div className="text-center space-y-1">
                  <Link to={`/profile/${item._id}`}>
                    <h2 className="text-lg font-semibold text-white hover:text-primary">{item.name}</h2>
                  </Link>
                  <h6 className="text-sm text-gray-400">{item.profession || "No profession listed"}</h6>
                  <p className="text-sm text-gray-500 mt-1">{item.bio?.length > 30 ? `${item.bio.slice(0, 30)}...` : item.bio || "No bio available"}</p>
                </div>

                <button
                  onClick={() => (isFriend ? removeFriendHandler(item._id) : addFriendHandler(item._id))}
                  className={`w-60 mt-5 py-2 rounded-full text-sm font-semibold transition
                  ${isFriend ? "bg-transparent text-red-400 border border-red-400 hover:bg-red-400 hover:text-white" : "bg-primary text-white hover:bg-primary/90 border-sky-800 hover:bg-sky-800"}
                `}
                >
                  {isFriend ? "Disconnect" : "Connect"}
                </button>
              </div>
            );
          })
        )}
      </div>

      <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
    </Layout>
  );
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination-container">
      {pageNumbers.map((number) => (
        <button className="pagination-btn" key={number} onClick={() => onPageChange(number)} disabled={number === currentPage}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default CommunityPage;
