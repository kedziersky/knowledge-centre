import {
  Box,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill, BsFillBookmarkFill } from "react-icons/bs";
import Image from "next/image";
import { useDownloadURL } from "react-firebase-hooks/storage";
import {
  auth,
  getThumbnailRef,
  getUsersLikesDoc,
  getUsersVideoBookmarksDoc,
} from "../../utils/firebaseConfig";
import Link from "next/link";
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

export function VideoThumbnail({ videoId, author, title }: any) {
  const [user] = useAuthState(auth);
  const usersLikesDoc = getUsersLikesDoc(user?.uid || "", videoId);
  const usersVideoBookmarkDoc = getUsersVideoBookmarksDoc(
    user?.uid || "",
    videoId
  );
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
      setDoc(usersVideoBookmarkDoc, {
        bookmark: bookmarkData?.bookmark ? false : true,
      });
    }
  };

  if (!url) return null;
  return (
    <Box
      width={500}
      bg={activeBg}
      borderRadius={16}
      overflow="hidden"
      position="relative"
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
            {author}
          </Text>
        </Flex>
        <Flex justifyContent="flex-end" alignItems="center" m="4">
          <IconButton
            aria-label="Like"
            variant="ghost"
            icon={likeData?.like ? <AiFillHeart /> : <AiOutlineHeart />}
            mr="2"
            onClick={handleLike}
          />
          <IconButton
            aria-label="Bookmark"
            variant="ghost"
            onClick={handleBookmark}
            icon={
              bookmarkData?.bookmark ? <BsFillBookmarkFill /> : <BsBookmark />
            }
          />
        </Flex>
      </Flex>
    </Box>
  );
}
