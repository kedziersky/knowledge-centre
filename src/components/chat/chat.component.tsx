import { Box, Input, Text } from "@chakra-ui/react";
import { addDoc, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, getVideoChatCollection } from "../../utils/firebaseConfig";

function ChatForm({ videoId }: any) {
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    addDoc(getVideoChatCollection(videoId), {
      comment,
      author: user?.email,
      createdAt: serverTimestamp(),
    });
    setComment("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comment..."
        name="comment"
      />
    </form>
  );
}

export function Chat({ videoId }: any) {
  const [data] = useCollectionData(
    query(getVideoChatCollection(videoId), orderBy("createdAt", "desc"))
  );
  return (
    <Box>
      <ChatForm videoId={videoId} />
      <Box mt={4}>
        {data?.map((e) => (
          <Box>
            <Text>{e.comment}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
