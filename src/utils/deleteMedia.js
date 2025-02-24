import { Button, Dialog, Flex, IconButton, Spinner, Text } from "@radix-ui/themes";
import React from "react";
import { IoTrashBinSharp } from "react-icons/io5";
import { useDeleteMediaContentMutation } from "../features/mediaApi";
import { toast } from "react-toastify";
import { use } from "react";
import { useNavigate } from "react-router-dom";

function DeleteMedia({ data }) {
  const [deleteFn, deleteData] = useDeleteMediaContentMutation();
  const navigate = useNavigate();

  const deleteHandler = async() => {
    try {
        deleteFn({ mediaId : data.id })
        toast.success("Media content deleted successfully");
        navigate("/?refresh=true");
    } catch (error) {
        toast.error("An error occurred while deleting media content");
    }
  }

  console.log(deleteData);

  return (
    <>
      <Dialog.Root className="relative z-50">
        <Dialog.Trigger>
          <IconButton color="red" className="fixed right-3 bottom-3 cursor-pointer" size={"4"}>
            <IoTrashBinSharp className="text-xl" />
          </IconButton>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Delete Media Content</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Are you sure you want to delete this media file? This action is irreversible and will permanently remove the file from your storage.
          </Dialog.Description>

          <Flex gap="1" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" disabled={deleteData.isLoading} color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button onClick={deleteHandler} className="min-w-20" color="red">
              {deleteData.isLoading ?
              <Spinner /> :
              "Delete"
              }
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}

export default DeleteMedia;
