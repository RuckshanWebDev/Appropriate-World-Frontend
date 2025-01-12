import { Box, Button, Card, Flex, Heading, Kbd, RadioCards, Text, TextArea, TextField, Theme } from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Layout from "../components/Layout";
// import "./styles.css";

function ContentUploadPage() {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [episodes, setEpisodes] = useState("");
  const [contentFile, setContentFile] = useState(null);
  const coverImg = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic
    console.log({ title, coverImage, episodes, contentFile });
  };

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
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded bg-[#222424] placeholder-gray-100" placeholder="Enter title" required />
              </div>

              <Box maxWidth="600px" className="pt-5 -ml-[10px]">
                <RadioCards.Root defaultValue="1">
                  <RadioCards.Item value="1">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">Video Content</Text>
                      <Text>MP4, MOV</Text>
                    </Flex>
                  </RadioCards.Item>
                  <RadioCards.Item value="2">
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
                  {/* Cover Image */}
                  <h3 className="block font-medium mb-1">Media File</h3>

                  <div className="relative w-min">
                    <label htmlFor="contentFile" className="relative block font-medium mb-1 w-[300px] h-[300px] bg-[#5E58EC]/20 border-dashed border-[#5E58EC] border-2 flex justify-center items-center overflow-hidden">
                      <span className="text-center">
                        Media File <br />
                        <Kbd>Upto 2 GB</Kbd>
                      </span>
                    </label>
                    {coverImage && <IoIosClose className="absolute top-0 right-0 z-10 text-red-600 text-4xl cursor-pointer user-select-none" onClick={() => setCoverImage(null)} />}
                    <input type="file" id="contentFile" accept="image/*"  className=" hidden w-full p-2 border rounded" required />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pb-10" >
                <h3 className="block font-medium mb-1">About the Content</h3>
                <Box>
                  <TextField.Root size="3" placeholder="Artist" />
                </Box>
                <Box>
                  <TextField.Root size="3" placeholder="Genre" />
                </Box>
                <TextArea placeholder="Description" />
              </div>

              {/* Submit Button */}
              <Button className="cursor-pointer" size={"3"}>
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
