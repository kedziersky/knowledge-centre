import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { deleteDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import {
  auth,
  getUsersLikesDoc,
  getUsersVideoBookmarksDoc,
  getUsersVideoDoc,
  getVideoDoc,
  videoLikesDoc,
} from "../../utils/firebaseConfig";

export const VideoInfo = ({ videoId }: any) => {
  const [user] = useAuthState(auth);

  const likesDoc = videoLikesDoc(videoId);
  const usersLikesDoc = getUsersLikesDoc(user?.uid || "", videoId);
  const usersVideoBookmarkDoc = getUsersVideoBookmarksDoc(
    user?.uid || "",
    videoId
  );
  const usersVideoDoc = getUsersVideoDoc(user?.uid || "", videoId);
  const videoDoc = getVideoDoc(videoId);
  const [videoData] = useDocumentData(videoDoc);
  const [likesData] = useDocumentData(likesDoc);
  const [likeData] = useDocumentData(usersLikesDoc);
  const [bookmarkData] = useDocumentData(usersVideoBookmarkDoc);

  const handleLike = () => {
    if (user) {
      setDoc(usersLikesDoc, {
        like: likeData?.like ? false : true,
      });
    }
  };

  const handleBookmark = () => {
    if (user) {
      if (bookmarkData) {
        deleteDoc(usersVideoBookmarkDoc);
      } else {
        setDoc(usersVideoBookmarkDoc, {
          videoId,
          authors: videoData?.authors,
          title: videoData?.title,
        });
      }
    }
  };
  return (
    <Flex justifyContent="space-between" alignItems="center" m="4">
      <Flex flexDirection="column">
        <Text fontWeight="bold" fontSize="2xl">
          {videoData?.title}
        </Text>
        <Text fontSize="sm">{videoData?.authors}</Text>
      </Flex>

      <Flex>
        <Flex alignItems="center">
          <Button aria-label="Like" variant="ghost" mr="2" onClick={handleLike}>
            <Text fontWeight="bold" fontSize="small" mr="2">
              {likesData?.likes}
            </Text>
            {likeData?.like ? <AiFillHeart /> : <AiOutlineHeart />}
          </Button>
        </Flex>
        <IconButton
          aria-label="Bookmark"
          variant="ghost"
          onClick={handleBookmark}
          icon={bookmarkData ? <BsFillBookmarkFill /> : <BsBookmark />}
        />
      </Flex>
    </Flex>
  );
};
