import { Box, Button, Card, Checkbox, Dialog, Flex, Heading, Kbd, Progress, RadioCards, Strong, Text, TextArea, TextField, Theme } from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Layout from "../components/Layout";
import { useLazyGetPresignedUrlQuery, useUploadMediaMutation, useCreateMediaContentMutation, uploadFileWithProgress } from "../features/mediaApi";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

class Episodes {
  constructor(index, src) {
    this.id = null;
    this.mediaType = null;
    this.coverImage = null;
    this.media = null;
    this.episodes = [];
  }

  set mediaTypeSet(type) {
    this.mediaType = mediaType;
  }

  set idSet(id) {
    this.id = id;
  }

  set coverImageSet(coverImage) {
    this.coverImage = coverImage;
  }
}

function ContentUploadPage() {
  // Query
  const [getUrlFn, getUrlData] = useLazyGetPresignedUrlQuery();
  const [uploadMediaFn, uploadMediaData] = useUploadMediaMutation();
  const [createMeidaFn, createMediaData] = useCreateMediaContentMutation();
  const { user } = useSelector((state) => state.local);
  const dispatch = useDispatch();
  const [progressState, setProgressState] = useState({ progress: 0, message: "", isSuccess: false, isError: false, isLoading: false });

  // State
  const [coverImage, setCoverImage] = useState(null);
  const [contentFile, setContentFile] = useState(null);
  const [contentType, setContentType] = useState("video");
  const [episodes, setEpisodes] = useState([]);
  const titleRef = useRef();
  const coverImg = useRef();
  const artistRef = useRef();
  const genreRef = useRef();
  const typeRef = useRef();
  const descriptionRef = useRef();
  const navigate = useNavigate();

  console.log(createMediaData);
  // URL Params
  const bucketName = "appropriate-bucket";
  const region = "eu-north-1";
  const folderName = "media-upload";
  const fileName = "example.jpg";

  // Episode Handlers
  const handleAddEpisode = (_, init = false) => {
    setEpisodes((prev) => [...prev, { id: Date.now(), image: null, file: null, progress: 0, uploadedUrl: null, init }]);
  };

  // Remove episode
  const handleRemoveEpisode = (id) => {
    setEpisodes((prev) => prev.filter((ep) => ep.id !== id));
  };

  const handleFileChange = (id, type, file) => {
    setEpisodes((prev) => prev.map((ep) => (ep.id === id ? { ...ep, [type]: file } : ep)));
  };
  const handleInitFile = (id, type, file) => {
    setEpisodes((prev) => prev.map((ep) => (ep.init ? { ...ep, [type]: file } : ep)));
  };

  useEffect(() => {
    handleAddEpisode(null, true);
  }, []);

  const uploadEpisodes = async (urls, episodes) => {
    const uploadedEpisodes = await Promise.all(
      urls.map(async (epi, index) => {
        const episode = episodes.find((j) => j.id === epi.id);
        if (!episode) return null;

        let uploadedFileUrl = null;
        let uploadedImageUrl = null;

        // Upload video file
        if (episode.file) {
          await uploadFileWithProgress({
            presignedUrl: epi.fileUrl,
            file: episode.file,
            onProgress: (progress) => {
              console.log(`Uploading Video (${epi.id}): ${progress}%`);
              setProgressState((prev) => ({ ...prev, progress, message: "Uploading Video..." }));
            },
          });
          uploadedFileUrl = epi.fileUrl.split("?")[0]; // Remove query params
        }

        // Upload image if exists
        if (episode.image) {
          await uploadFileWithProgress({
            presignedUrl: epi.imageUrl,
            file: episode.image,
            onProgress: (progress) => {
              console.log(`Uploading Image (${epi.id}): ${progress}%`);
              setProgressState((prev) => ({ ...prev, progress, message: "Uploading Image..." }));
            },
          });
          uploadedImageUrl = epi.imageUrl.split("?")[0]; // Remove query params
        }

        return {
          name: index,
          src: uploadedFileUrl,
          img: uploadedImageUrl,
        };
      })
    );

    setProgressState((prev) => ({ ...prev, progress: 100, message: "Upload Complete!" }));

    return uploadedEpisodes.filter((ep) => ep !== null); // Remove null values
  };

  // Handlers
  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();

      setProgressState((prevState) => ({ ...prevState, progress: 0, message: "Preparing Secure Connection", isLoading: true }));

      // // Upload Cover Image URL
      const urls = await getUrlFn({
        episodes: episodes.map(({ id, file, image }) => ({
          id,
          file: { name: file.name, fileType: file.type },
          image: image ? { name: image.name, fileType: image.type } : null,
        })),
        type: contentType,
      }).unwrap();
      console.log(urls);

      // Uploading Cover Image
      const uploadedRes = await uploadEpisodes(urls.urls, episodes);
      console.log(uploadedRes);

      // const coverResponse = await uploadFileWithProgress({
      //   presignedUrl: coverImageUrl,
      //   file: coverImage,
      //   onProgress: (progress) => {
      //     console.log(progress);
      //     setProgressState((prevState) => ({ ...prevState, progress, message: "Uploading Cover Image" }));
      //   },
      // });
      // console.log("coverResponse", coverResponse);

      // // Uploading Media File
      // const mediaResponse = await uploadFileWithProgress({
      //   presignedUrl: contentFileUrl,
      //   file: contentFile,
      //   onProgress: (progress) => {
      //     console.log(progress);
      //     setProgressState((prevState) => ({ ...prevState, progress, message: "Uploading Media File" }));
      //   },
      // });
      // console.log("mediaResponse", mediaResponse);

      // // Genarating the cover and content URL
      // const coverImageUri = `https://${bucketName}.s3.${region}.amazonaws.com/cover/${coverImage.name}`;
      // const contentUri = `https://${bucketName}.s3.${region}.amazonaws.com/${contentType}/${contentFile.name}`;

      // // Saving to database
      setProgressState((prevState) => ({ ...prevState, progress: 100, message: "Almost Done, Please wait!" }));
      const res = await createMeidaFn({
        title: titleRef.current.value,
        artist: artistRef.current.value,
        genre: genreRef.current.value,
        description: descriptionRef.current.value,
        type: contentType,
        coverImage: uploadedRes[0].img,
        episodes: uploadedRes,
        author: user.profileId,
      }).unwrap();

      console.log(res);
      if (res.id) {
        setProgressState((prevState) => ({ ...prevState, isSuccess: true, message: "Success" }));
        setTimeout(() => {
          setProgressState((prevState) => ({ ...prevState, message: "Redirecting to the Media Page" }));
          navigate(`/${res.type}/outsource/${res.id}`);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(progressState);
  // Effects
  useEffect(() => {
    console.log(coverImage);
    if (coverImage) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        console.log(e);
        coverImg.current.src = e.target.result;
      };
      fileReader.readAsDataURL(coverImage);
    }
  }, [coverImage]);

  console.log(episodes);

  return (
    <Layout>
      <div className="container py-20">
        <Theme hasBackground={false} className="min-h-min">
          <Card className="m-5 max-w-[800px] mx-auto relative" variant="classic" size={"4"}>
            {/* Loader */}
            {progressState.isLoading && (
              <div className="absolute top-0 left-0 w-full h-full bg-blue-800/10 backdrop-blur-sm z-10 flex flex-col justify-center items-center">
                {!progressState.isSuccess ? (
                  <div className="w-[100%] max-w-[250px] mb-3">
                    <Progress value={progressState.progress} variant="soft" />
                  </div>
                ) : (
                  <img src="/success.gif" className="w-32" />
                )}
                <Text>
                  <Strong>{progressState.message}</Strong>
                </Text>
              </div>
            )}

            <Heading>Content Upload</Heading>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Title */}
              <div className="mt-5">
                <label htmlFor="title" className="block font-medium mb-1">
                  Title
                </label>
                <Box>
                  <TextField.Root size="3" placeholder="Title" required ref={titleRef} />
                </Box>
              </div>

              <Box maxWidth="600px" className="pt-5 -ml-[10px]">
                <RadioCards.Root defaultValue="video" onValueChange={(e) => setContentType(e)}>
                  <RadioCards.Item value="video">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">Video Content</Text>
                      <Text>MP4, MOV</Text>
                    </Flex>
                  </RadioCards.Item>
                  <RadioCards.Item value="audio">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">Audio Content</Text>
                      <Text>MP3, WAV</Text>
                    </Flex>
                  </RadioCards.Item>
                </RadioCards.Root>
              </Box>

              <div className="flex  justify-between md:flex-row flex-col">
                <div>
                  {/* Cover Image */}
                  <h3 className="block font-medium mb-1">Cover Image</h3>

                  <div className="relative w-min">
                    <label htmlFor="coverImage" className="relative block font-medium mb-1 w-[300px] h-[300px] bg-[#5E58EC]/20 border-dashed border-[#5E58EC] border-2 flex justify-center items-center overflow-hidden">
                      {!coverImage ? (
                        <span className="text-center">
                          Cover Image <br /> <Kbd>500px x 500px</Kbd>
                        </span>
                      ) : (
                        <img ref={coverImg} className="w-full " />
                      )}
                    </label>
                    {coverImage && <IoIosClose className="absolute top-0 right-0 z-10 text-red-600 text-4xl cursor-pointer user-select-none" onClick={() => setCoverImage(null)} />}
                    <input type="file" id="coverImage" accept="image/*" onChange={(e) => handleInitFile(null, "image", e.target.files[0])} className=" hidden w-full p-2 border rounded" required />
                  </div>
                </div>
                <div>
                  {/* Content File */}
                  <h3 className="block font-medium mb-1">Media File</h3>

                  <div className="relative w-min">
                    <label htmlFor="contentFile" className="relative block font-medium mb-1 w-[300px] h-[300px] bg-[#5E58EC]/20 border-dashed border-[#5E58EC] border-2 flex justify-center items-center overflow-hidden">
                      <span className="text-center">
                        Media File <br />
                        <Kbd>Upto 2 GB</Kbd>
                      </span>
                    </label>
                    {coverImage && <IoIosClose className="absolute top-0 right-0 z-10 text-red-600 text-4xl cursor-pointer user-select-none" onClick={() => setContentFile(null)} />}
                    <input type="file" id="contentFile" accept={contentType === "video" ? "video/*" : "audio/*"} onChange={(e) => handleInitFile(null, "file", e.target.files[0])} className=" w-full p-2 border rounded" required />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="block text-xl font-medium mb-1">Episodes</h3>
                <Button variant="soft" type="button" onClick={handleAddEpisode} className="!m-0 cursor-pointer w-full">
                  Add Episode
                </Button>
              </div>

              {episodes.map((episode, index) => {
                if (!index) return;
                return (
                  <div key={episode.id} className="border p-4 rounded-lg relative flex">
                    <IoIosClose className="absolute top-2 right-2 text-red-600 text-2xl cursor-pointer" onClick={() => handleRemoveEpisode(episode.id)} />

                    {contentType === "video" && (
                      <div className="flex flex-col">
                        <label className="block font-medium mb-1">Episode Image</label>
                        <input type="file" accept="image/*" onChange={(e) => handleFileChange(episode.id, "image", e.target.files[0])} className="w-full border rounded" required />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <label className="block font-medium mb-1">Media File</label>
                      <input type="file" accept={contentType === "video" ? "video/*" : "audio/*"} onChange={(e) => handleFileChange(episode.id, "file", e.target.files[0])} className="w-full border rounded" required />
                    </div>
                  </div>
                );
              })}

              <div className="space-y-2 py-10">
                <h3 className="block font-medium mb-1">About the Content</h3>
                <Box>
                  <TextField.Root size="3" placeholder="Artist" required ref={artistRef} />
                </Box>
                <Box>
                  <TextField.Root size="3" placeholder="Genre" required ref={genreRef} />
                </Box>
                <TextArea placeholder="Description" required ref={descriptionRef} />
              </div>

              <Text as="label" size="2" className="flex items-center">
                <Flex gap="2" className="items-center">
                  <Checkbox required className="-translate-y-2" />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Agree to Terms and Conditions</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center">JustCreate.tv Content Upload Terms and Agreement</DialogTitle>
                      </DialogHeader>
                      <CardContent>
                        <ScrollArea className="h-[400px] p-4 border rounded-md">
                          <p className="font-semibold">1. Acceptance of Terms</p>
                          <p>By uploading content to JustCreate.tv, you agree to comply with and be bound by these terms.</p>

                          <p className="mt-4 font-semibold">2. Content Ownership and Rights</p>
                          <p>You retain all ownership rights but grant JustCreate.tv a non-exclusive, worldwide, royalty-free license to use and promote the content.</p>

                          <p className="mt-4 font-semibold">3. Content Guidelines</p>
                          <ul className="list-disc ml-6">
                            <li>No infringement on third-party intellectual property rights.</li>
                            <li>No hate speech, violence, or illegal activities.</li>
                            <li>No malware or harmful software.</li>
                          </ul>

                          <p className="mt-4 font-semibold">4. Liability Disclaimer</p>
                          <p>JustCreate.tv is not responsible for uploaded content.</p>

                          <p className="mt-4 font-semibold">5. Indemnification</p>
                          <p>You agree to indemnify JustCreate.tv against any claims related to your content.</p>

                          <p className="mt-4 font-semibold">6. Content Removal and Termination</p>
                          <p>We reserve the right to remove content or suspend accounts violating the terms.</p>

                          <p className="mt-4 font-semibold">7. Modification of Terms</p>
                          <p>Terms may be updated, and continued use constitutes acceptance.</p>

                          <p className="mt-4 font-semibold">8. Governing Law</p>
                          <p>Disputes are subject to the exclusive jurisdiction of the courts in New York City.</p>

                          <p className="mt-4 font-semibold">9. Contact Information</p>
                          <p>
                            For questions, contact us at{" "}
                            <a href="mailto:info@justcreate.tv" className="text-blue-600">
                              info@justcreate.tv
                            </a>
                            .
                          </p>
                        </ScrollArea>
                        <div className="mt-6 flex justify-center">
                          <Button>Accept and Continue</Button>
                        </div>
                      </CardContent>
                    </DialogContent>
                  </Dialog>
                </Flex>
              </Text>

              {/* Submit Button */}
              <Button disabled={getUrlData.isLoading || uploadMediaData.isLoading || createMediaData.isLoading} className="cursor-pointer w-full mt-2" size={"3"}>
                Submit
              </Button>
            </form>
          </Card>
        </Theme>
      </div>
    </Layout>
  );
}

export default ContentUploadPage;
