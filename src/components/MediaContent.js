import { AspectRatio, Card, Separator, Skeleton } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { useViewALlMediaContentQuery } from "../features/mediaApi";
import { FaMusic, FaVideo } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";


function MediaContent() {
  const getMediaFn = useViewALlMediaContentQuery();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const refresh = searchParams.get("refresh");
  
  useEffect(() => {
    if (refresh === "true") {
      getMediaFn.refetch();
      console.log('refreshed');
      navigate(window.location.pathname, { replace: true }); // Remove all query params
  
    }
  }, [refresh, getMediaFn]);
  

  return (
    <div>
      <div className="container mx-auto  px-4  py-8">
        <h1 className="text-3xl font-bold mb-2 mt-16">Community Collection</h1>
        <Separator className="w-full mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {getMediaFn.isLoading ? (
            [0, 1, 2, 3].map((i) => {
              return (
                <Card key={i}>
                  <Skeleton width="full" height="250px" />
                  <div className="p-4">
                    <Skeleton>
                      <h2 className="text-lg font-semibold line-clamp-1"></h2>
                    </Skeleton>
                    <Skeleton>
                      <p className="text-sm text-gray-600 dark:text-gray-400"></p>
                    </Skeleton>
                    <Skeleton>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1"></p>
                    </Skeleton>
                  </div>
                </Card>
              );
            })
          ) : getMediaFn.isSuccess && getMediaFn.data.length ? (
            getMediaFn.data.map((album) => (
              <Link to={`/${album.type}/outsource/${album.id}`} >
                <Card key={album.id} className="overflow-hidden relative">
                  <AspectRatio ratio={1}>
                    <img src={album.coverImage || "/user.png"} alt={`${album.title} cover`} fill className="object-cover h-full" />
                  </AspectRatio>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold line-clamp-1">{album.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{album.artist}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{album.genre}</p>
                    <div className="absolute top-4 right-4">
                      { album.type === 'audio' ? <FaMusic className="text-purple-800 text-xl " /> :
                      <FaVideo className="text-purple-800 text-xl " /> }
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            getMediaFn.isError ? <p>Something went wrong, Please try again later!</p> :<p>The List is empty</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MediaContent;
