import React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Product from "../components/Product";
import MediaContent from "../components/MediaContent";
import { IconButton } from "@radix-ui/themes";
import { RiVideoUploadFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <Layout>
      <div>
        {/* <Header /> */}
        <Product />

        <MediaContent />
        <Link to={"/content-upload"}>
          <IconButton className="fixed right-3 bottom-3 cursor-pointer" size={"4"}>
            <RiVideoUploadFill className="text-xl" />
          </IconButton>
        </Link>

        {/* <div className="container" style={{ padding: '50px', background: '#16202b', borderRadius: '10px', marginTop: '50px' }} >
          <h1 className='title text-color ' style={{ textAlign: 'center' }} >Private Page</h1>
        </div> */}
      </div>
    </Layout>
  );
}

export default HomePage;
