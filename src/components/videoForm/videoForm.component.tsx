import {
  Button,
  Flex,
  FormControl,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { addDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  firestore,
  getVideoDoc,
  storage,
  videoCollection,
} from "../../utils/firebaseConfig";
import { FormModal } from "../formModal";

export function VideoForm({ onClose, isOpen, video }: any) {
  console.log(video);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: video?.title || "",
      description: video?.description || "",
      videoId: video?.videoId || "",
      authors: video?.authors || "",
      category: video?.category || "dev-talks",
    },
  });
  useEffect(() => {
    if (video) {
      setValue("title", video.title);
      setValue("description", video.description);
      setValue("videoId", video.videoId);
      setValue("authors", video.authors);
      setValue("category", video.category);
    }
  }, [video]);
  const handleVideoForm = async ({ thumbnail, ...data }: any) => {
    setLoading(true);
    await setDoc(
      getVideoDoc(data.videoId),
      {
        ...data,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
    setLoading(false);
    onClose();
  };
  if (!isOpen) return null;
  return (
    <FormModal onClose={onClose} isOpen={isOpen} title="Add a talk!">
      <FormControl>
        <form onSubmit={handleSubmit(handleVideoForm)}>
          <Text as="label" fontWeight="bold">
            Title
          </Text>
          <Input {...register("title")} mb={2} />
          <Text as="label" fontWeight="bold">
            Description
          </Text>
          <Input {...register("description")} mb={2} />
          <Text as="label" fontWeight="bold">
            Video ID
          </Text>
          <Input {...register("videoId", { required: true })} mb={2} />
          <Text as="label" fontWeight="bold">
            Author(s)
          </Text>
          <Input {...register("authors")} mb={2} />
          <Text as="label" fontWeight="bold">
            Category
          </Text>
          <Select defaultValue="dev-talks" {...register("category")} mb={2}>
            <option value="dev-talks">Dev Talks</option>
            <option value="knowledge-shots">Knowledge Shots</option>
            <option value="coffee-breaks">Coffee Breaks</option>
          </Select>
          <Button
            colorScheme="blue"
            type="submit"
            mt={5}
            disabled={loading}
            isLoading={loading}>
            {video ? "Edit" : "Add"}
          </Button>
        </form>
      </FormControl>
    </FormModal>
  );
}
