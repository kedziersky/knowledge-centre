import { Button, FormControl, Input, Select } from "@chakra-ui/react";
import { addDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  firestore,
  getVideoDoc,
  storage,
  videoCollection,
} from "../../utils/firebaseConfig";
import { FormModal } from "../formModal";

export function VideoForm({ onClose, isOpen }: any) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
      videoId: "",
      authors: "",
      category: "dev-talks",
      thumbnail: null,
    },
  });
  const handleVideoForm = async ({ thumbnail, ...data }: any) => {
    setLoading(true);
    await setDoc(getVideoDoc(data.videoId), {
      ...data,
      createdAt: serverTimestamp(),
    });
    await uploadBytes(
      ref(storage, `/videoThumbnails/${data.videoId}/thumbnail.jpeg`),
      thumbnail[0]
    );
    setLoading(false);
    onClose();
  };
  if (!isOpen) return null;
  return (
    <FormModal onClose={onClose} isOpen={isOpen} title="Add new news!">
      <FormControl>
        <form onSubmit={handleSubmit(handleVideoForm)}>
          <label>Title</label>
          <Input {...register("title")} mb={2} />
          <label>Description</label>
          <Input {...register("description")} mb={2} />
          <label>Video ID</label>
          <Input {...register("videoId", { required: true })} mb={2} />
          <label>Author(s)</label>
          <Input {...register("authors")} mb={2} />
          <label>Category</label>
          <Select defaultValue="dev-talks" {...register("category")} mb={2}>
            <option value="dev-talks">Dev Talks</option>
            <option value="knowledge-shots">Knowledge Shots</option>
            <option value="coffee-breaks">Coffee Breaks</option>
          </Select>
          <label>Thumbnail</label>
          <input
            style={{ display: "block" }}
            type="file"
            {...register("thumbnail")}
          />
          <Button
            colorScheme="blue"
            type="submit"
            mt={5}
            disabled={loading}
            isLoading={loading}>
            Add
          </Button>
        </form>
      </FormControl>
    </FormModal>
  );
}
