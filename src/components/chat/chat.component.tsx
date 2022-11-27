import { Box, Input } from "@chakra-ui/react";
import { addDoc, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, getVideoChatCollection } from "../../utils/firebaseConfig";
import { Message } from "./message";

function ChatForm({ videoId }: any) {
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addDoc(getVideoChatCollection(videoId), {
      comment,
      author: user?.displayName,
      avatar: user?.photoURL,
      userId: user?.uid,
      createdAt: serverTimestamp(),
    });
    setComment("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        borderRadius="3xl"
        variant="filled"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        name="comment"
      />
    </form>
  );
}

export function Chat({ videoId }: any) {
  const [data] = useCollectionData(
    query(getVideoChatCollection(videoId), orderBy("createdAt", "desc"))
  );
  const [user] = useAuthState(auth);

  return (
    <Box>
      <ChatForm videoId={videoId} />
      <Box mt={4} overflowY="auto" h="100%" maxH="calc(100vh - 132px)" pr={2}>
        {data?.map((e) => (
          <Message item={e} userId={user?.uid} />
        ))}
      </Box>
    </Box>
  );
}
