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
    limit: 10,
    search : ''
  });
  const [searchParams, setSearchParams] = useSearchParams();
  
  const dispatch = useDispatch();
  // const { data, isLoading } = useGetContactQuery();
  const [fetchFn, data] = useLazyGetContactQuery();
  const { profile } = useSelector((state) => state.local.user);
  const [addFriendFn, addFriendData] = useAddFriendMutation();
  const [removeFriendFn, removeFriendData] = useRemoveFriendMutation();
  const [profileFn, profileData] = useLazyGetProfileQuery();
  // console.log(data);

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

  const formHandler = (e) => {
    e.preventDefault();
  
    const searchValue = e.target.value || e.target.form.value || "";
    const page = 1; // Reset to first page on new search
    const limit = parseInt(searchParams.get("limit")) || 10;
  
    // Update URL query params
    setSearchParams({ page, limit, search: searchValue });
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || '';
    setPagination((prev) => ({ ...prev, currentPage: page, limit, search }));
    fetchFn({page, limit, search});
  }, [searchParams]);


  useEffect(() => {
    if (data.isSuccess) {
      setList(data.data.data);
      setPagination(data.data.pagination);
      console.log(data.data.pagination,pagination);
    }
  }, [data]);

  return (
    <Layout loader={data.isLoading}>
      <form className="search-container" onSubmit={formHandler}>
        <input type="text" name="form" onChange={formHandler} placeholder="Search..." />
        <input type="submit" name="" id="" value="Search" />
      </form>
      <div className="container community-container">
        {
        !list.length ?
          <p style={{ textAlign : 'center', margin : '0 auto' }} >Data not Found | 404</p>

        : list.map((item, index) => {
          if (item._id === profile?._id) return;
          return (
            <div className="community-member" key={index}>
              <Link to={`/profile/${item._id}`}>
                <img className="avatar" src={item.profile_image || "/user.png"} alt="" />
              </Link>
              <div>
                <Link to={`/profile/${item._id}`}>
                  <h1>{item.name}</h1>
                </Link>
                <h6>{item.profession} &nbsp;</h6>
                <p>{item.bio.length > 30 ? `${item.bio.slice(0, 30)}...` : item.bio}&nbsp;</p>
                {profile?.friendList.length ? (
                  profile.friendList.map((i) => i._id).includes(item._id) ? (
                    <button onClick={() => removeFriendHandler(item._id)}>Disconnect</button>
                  ) : (
                    <button onClick={() => addFriendHandler(item._id)}> Connect</button>
                  )
                ) : (
                  <button onClick={() => addFriendHandler(item._id)}>Connect</button>
                )}
              </div>
            </div>
          );
        })}
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
