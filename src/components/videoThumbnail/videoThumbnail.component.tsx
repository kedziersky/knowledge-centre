import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import Image from "next/image";
import { useDownloadURL } from "react-firebase-hooks/storage";
import {
  auth,
  getThumbnailRef,
  getUsersLikesDoc,
  getUsersVideoBookmarksDoc,
  videoLikesDoc,
} from "../../utils/firebaseConfig";
import Link from "next/link";
import { deleteDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

export function VideoThumbnail({ videoId, authors, title, ...props }: any) {
  const [user] = useAuthState(auth);
  const likesDoc = videoLikesDoc(videoId);
  const usersLikesDoc = getUsersLikesDoc(user?.uid || "", videoId);
  const usersVideoBookmarkDoc = getUsersVideoBookmarksDoc(
    user?.uid || "",
    videoId
  );
  const [likesData] = useDocumentData(likesDoc);
  const [likeData] = useDocumentData(usersLikesDoc);
  const [bookmarkData] = useDocumentData(usersVideoBookmarkDoc);
  const [url] = useDownloadURL(getThumbnailRef(videoId));
  const activeBg = useColorModeValue("white", "gray.700");

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
          authors,
          title,
        });
      }
    }
  };

  if (!url) return null;
  return (
    <Box
      width={500}
      minW={500}
      bg={activeBg}
      borderRadius={16}
      overflow="hidden"
      position="relative"
      {...props}
      shadow="md">
      <Link href={`/video/${videoId}`}>
        <Image src={url} alt="video thumbnail" width={500} height={500} />
      </Link>
      <Box
        position="absolute"
        top={211}
        pl={4}
        width="100%"
        height={70}
        justifyContent="flex-end"
        alignItems="flex-end"
        bgGradient={"linear(transparent 0%, gray.700 75%)"}>
        <Text fontWeight="bold" fontSize="lg" mt={12}>
          {title}
        </Text>
      </Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex ml={4}>
          <Text fontWeight="bold" fontSize="sm">
            {authors}
          </Text>
        </Flex>
        <Flex justifyContent="flex-end" alignItems="center" m="4">
          <Flex alignItems="center">
            <Button
              aria-label="Like"
              variant="ghost"
              mr="2"
              onClick={handleLike}>
              <Text fontWeight="bold" fontSize="small" mr="2">
                {likesData?.likes || 0}
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
    </Box>
  );
}
