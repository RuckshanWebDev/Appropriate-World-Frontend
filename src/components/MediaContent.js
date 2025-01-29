import { AspectRatio, Card, Skeleton } from "@radix-ui/themes";
import React from "react";
import { useViewALlMediaContentQuery } from "../features/mediaApi";
import { FaMusic, FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";

function MediaContent() {
  const getMediaFn = useViewALlMediaContentQuery();

  console.log(getMediaFn);

  const albums = [
    {
      id: "1",
      title: "The Dark Side of the Moon",
      artist: "Pink Floyd",
      genre: "Progressive Rock",
      coverUrl: "/user.png",
    },
    {
      id: "2",
      title: "Thriller",
      artist: "Michael Jackson",
      genre: "Pop",
      coverUrl: "/user.png",
    },
    {
      id: "3",
      title: "Back in Black",
      artist: "AC/DC",
      genre: "Hard Rock",
      coverUrl: "/user.png",
    },
    {
      id: "4",
      title: "The Joshua Tree",
      artist: "U2",
      genre: "Rock",
      coverUrl: "/user.png",
    },
    {
      id: "5",
      title: "21",
      artist: "Adele",
      genre: "Pop",
      coverUrl: "/user.png",
    },
    {
      id: "6",
      title: "Nevermind",
      artist: "Nirvana",
      genre: "Grunge",
      coverUrl: "/user.png",
    },
  ];
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Music Albums</h1>
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
