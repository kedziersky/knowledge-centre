import {
  Box,
  Button,
  Flex,
  GridItem,
  Icon,
  IconButton,
  Img,
  Link,
  Text,
} from "@chakra-ui/react";
import { deleteDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { AiFillClockCircle } from "react-icons/ai";
import {
  BsBookmark,
  BsFillBookmarkFill,
  BsFillRssFill,
  BsReddit,
} from "react-icons/bs";
import { FaClipboard } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  auth,
  getUsersMemeBookmarkDoc,
  getUsersNewsBookmarkDoc,
} from "../../../utils/firebaseConfig";
import { readingTime } from "../../../utils/readingTime";

export const NewsBox = ({ item }: any) => {
  const [user] = useAuthState(auth);
  const i = item.link.replace(/\//g, "");
  const usersVideoBookmarkDoc = getUsersMemeBookmarkDoc(user?.uid || "", i);
  const [bookmarkData] = useDocumentData(usersVideoBookmarkDoc);
  const handleSaveForLater = () => {
    toast.success("Saved for later!", { position: "bottom-center" });
  };
  console.log(item);
  const thumbnail = item.thumbnail.url;

  const handleCopyURL = () => {
    navigator.clipboard.writeText(item.link);
    toast.success("URL copied to clipboard!", { position: "bottom-center" });
  };

  const handleBookmark = () => {
    if (user) {
      if (bookmarkData) {
        deleteDoc(usersVideoBookmarkDoc);
      } else {
        console.log(item);
        setDoc(usersVideoBookmarkDoc, {
          link: item.link || null,
          title: item.title || null,
          creator: item.creator || null,
          thumbnail: item.thumbnail || null,
          url: item.url || null,
        });
      }
    }
  };

  return (
    <GridItem bg="gray.700" borderRadius="lg" height={"fit-content"} mb="45px">
      <Link
        href={item.link}
        rel="norefferer"
        target="_blank"
        _hover={{ textDecoration: "underline" }}
        display="block"
        pt={5}
        px={5}>
        <Text fontSize="20px" fontWeight="bold" mb="3">
          {item.title}
        </Text>
      </Link>
      {thumbnail && <Img src={thumbnail} w="100%" />}

      <Flex mt={3} pb={5} px={5} justifyContent="space-between">
        <Flex alignItems="center">
          <Link href={item.url}>
            <Flex>
              <Link href={item.sourceUrl}>
                <Icon as={BsReddit} mr={1} />
              </Link>

              <Link
                href={item.creator.uri}
                fontWeight="bold"
                fontSize="12px"
                noOfLines={1}
                overflow="hidden"
                _hover={{ textDecoration: "underline" }}
                textOverflow="ellipsis">
                {item.creator.name}
              </Link>
            </Flex>
          </Link>
        </Flex>

        <Button
          variant="raw"
          fontSize="13px"
          fontWeight="semibold"
          alignItems="center"
          display="flex"
          onClick={handleCopyURL}>
          <Icon as={FaClipboard} mr={1} /> <Text as="span">Copy URL</Text>
        </Button>
        <IconButton
          aria-label="Bookmark"
          variant="ghost"
          onClick={handleBookmark}
          icon={bookmarkData ? <BsFillBookmarkFill /> : <BsBookmark />}
        />
      </Flex>
    </GridItem>
  );
};
