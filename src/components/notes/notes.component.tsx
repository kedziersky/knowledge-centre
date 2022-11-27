import {
  Box,
  Flex,
  Button,
  Text,
  Textarea,
  FormControl,
} from "@chakra-ui/react";
import { setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import { auth, getUsersVideoDoc } from "../../utils/firebaseConfig";

export function Notes({ videoId }: any) {
  const [user] = useAuthState(auth);
  const usersVideoDoc = getUsersVideoDoc(user?.uid || "", videoId);
  const [notes] = useDocumentData(usersVideoDoc);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      notes: notes?.notes,
    },
  });

  useEffect(() => {
    if (notes?.notes) {
      setValue("notes", notes?.notes);
    }
  }, [notes]);
  const handleNotes = (data: any) => {
    if (user) {
      setDoc(
        usersVideoDoc,
        {
          notes: data.notes,
        },
        { merge: true }
      );
    }
  };
  return (
    <Box height={250} width="100%" p={4} position="relative">
      <FormControl>
        <form onSubmit={handleSubmit(handleNotes)}>
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontWeight="bold" fontSize="lg">
              My Notes
            </Text>
            <Button colorScheme="teal" type="submit">
              Save
            </Button>
          </Flex>
          <Textarea {...register("notes")} placeholder="Add notes..." />
        </form>
      </FormControl>
    </Box>
  );
}
