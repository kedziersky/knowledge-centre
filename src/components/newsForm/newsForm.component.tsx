import { FormControl, Input, Button, Text, Select } from "@chakra-ui/react";
import { addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { auth, getApptensionNews } from "../../utils/firebaseConfig";
import { FormModal } from "../formModal";

export function NewsForm({ onClose, isOpen }: any) {
  const [user] = useAuthState(auth);
  const { register, handleSubmit } = useForm();
  const apptensionFeedDoc = getApptensionNews();
  const handleAddNews = async (data: any) => {
    if (user) {
      try {
        await addDoc(apptensionFeedDoc, {
          userId: user.uid,
          userName: user.displayName,
          url: data.url,
          category: data.category,
        });
        toast.success("News added!", { position: "bottom-center" });
        onClose();
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <FormModal onClose={onClose} isOpen={isOpen} title="Add a news!">
      <FormControl>
        <form onSubmit={handleSubmit(handleAddNews)}>
          <Text as="label" fontWeight="bold">
            News URL
          </Text>
          <Input {...register("url")} mb={2} type="url" />
          <Text as="label" fontWeight="bold">
            Category
          </Text>
          <Select defaultValue="frontend" {...register("category")} mb={2}>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="dev-mix">Dev mix</option>
            <option value="qa">QA</option>
            <option value="hr">HR</option>
          </Select>
          <Button
            colorScheme="blue"
            type="submit"
            mt={5}
            ml="auto"
            display="flex">
            Add
          </Button>
        </form>
      </FormControl>
    </FormModal>
  );
}
