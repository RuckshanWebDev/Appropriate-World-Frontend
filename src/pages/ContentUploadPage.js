import { Box, Button, Card, Flex, Heading, Kbd, RadioCards, Text, TextArea, TextField, Theme } from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Layout from "../components/Layout";
import { useLazyGetPresignedUrlQuery, useUploadMediaMutation, useCreateMediaContentMutation } from "../features/mediaApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// import "./styles.css";

function ContentUploadPage() {

  // Query
  const [getUrlFn, getUrlData] = useLazyGetPresignedUrlQuery();
  const [uploadMediaFn, uploadMediaData] = useUploadMediaMutation();
  const [createMeidaFn, createMediaData] = useCreateMediaContentMutation()
  const { user } = useSelector(state => state.local)

  // State
  const [coverImage, setCoverImage] = useState(null);
  const [contentFile, setContentFile] = useState(null);
  const [contentType, setContentType] = useState('video');
  const titleRef = useRef();
  const coverImg = useRef();
  const artistRef = useRef();
  const genreRef = useRef();
  const typeRef = useRef();
  const descriptionRef = useRef();
  const navigate = useNavigate()

  console.log(createMediaData);
  // URL Params
  const bucketName = "appropriate-bucket";
  const region = "eu-north-1";
  const folderName = "media-upload";
  const fileName = "example.jpg";

  // Handlers
  const handleFormSubmit = async (e) => {

    try {
      e.preventDefault();

      // Showing Loading State
      const t = toast.loading('Preparing secured connection', {
        position: "bottom-center",
        isLoading : true,
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className : 'custom-toast-body'
        });


      // Upload Cover Image URL
      const { url: coverImageUrl } = await getUrlFn({ fileName: coverImage.name, fileType: coverImage.type, folder : 'cover' }).unwrap()

      // Upload Media File URL
      const { url: contentFileUrl } = await getUrlFn({ fileName: contentFile.name, fileType: contentFile.type, folder : contentType }).unwrap()
      toast.update(t, {
        render : 'Uploading Cover Image',
        isLoading : true,
        autoClose: false,
      })

      // Uploading Cover Image
      uploadMediaFn({ presignedUrl: coverImageUrl, file: coverImage });
      toast.update(t, {
        render : 'Uploading Media Content',
        isLoading : true,
        autoClose: false,
      })
      
      // Uploading Media File
      uploadMediaFn({ presignedUrl: contentFileUrl, file: contentFile });
      toast.update(t, {
        render : 'Almost Done, Please wait!',
        isLoading : true,
        autoClose: false,
      })

      // Genarating the cover and content URL
      const coverImageUri = `https://${bucketName}.s3.${region}.amazonaws.com/cover/${coverImage.name}`;
      const contentUri = `https://${bucketName}.s3.${region}.amazonaws.com/${contentType}/${contentFile.name}`;

      // Saving to database
      createMeidaFn({ 
          title: titleRef.current.value, 
          artist: artistRef.current.value, 
          genre: genreRef.current.value, 
          description: descriptionRef.current.value, 
          type: contentType, 
          coverImage : coverImageUri, 
          contentFile : contentUri,
          author : user.profileId
        });

        toast.update(t, {
          render : 'Your Media Content is updated',
          type : 'success',
          isLoading : false,
          autoClose: true,
        })
        if(createMediaData.isSuccess) navigate(`/${createMediaData.data.type}/outsource/${createMediaData.data.id}`)
      // redirecting to the content page


      // const { url } = await getUrlFn({ fileName: coverImage.name, fileType: coverImage.type }).unwrap()

      // uploadMediaFn({ presignedUrl: url, file: coverImage });
      
      // createMeidaFn({ 
      //   title: titleRef.current.value, 
      //   artist: artistRef.current.value, 
      //   genre: genreRef.current.value, 
      //   description: descriptionRef.current.value, 
      //   type: contentType, 
      //   coverImage : 'test', 
      //   contentFile : 'test',
      //   author : user.profileId
      //  });

    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <Layout>
      <div className="container py-20">
        <Theme hasBackground={false} className="min-h-min">
          <Card className="m-5 max-w-[800px] mx-auto " variant="classic" size={"4"}>
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
                <RadioCards.Root defaultValue="video" onChange={(e) => setContentType(e.target.value)} >
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

              <div className="flex py-10 justify-between md:flex-row flex-col">
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
                    <input type="file" id="coverImage" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} className=" hidden w-full p-2 border rounded" required />
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
                    <input type="file" id="contentFile" accept={contentType === 'video' ? "video/*" : "audio/*" }  onChange={(e) => setContentFile(e.target.files[0])}  className=" w-full p-2 border rounded" required />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pb-10" >
                <h3 className="block font-medium mb-1">About the Content</h3>
                <Box>
                  <TextField.Root size="3" placeholder="Artist" required ref={artistRef}  />
                </Box>
                <Box>
                  <TextField.Root size="3" placeholder="Genre" required ref={genreRef} />
                </Box>
                <TextArea placeholder="Description" required ref={descriptionRef} />
              </div>

              {/* Submit Button */}
              <Button disabled={getUrlData.isLoading || uploadMediaData.isLoading || createMediaData.isLoading} className="cursor-pointer" size={"3"}>
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
