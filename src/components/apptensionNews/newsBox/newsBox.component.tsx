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
import { BsBookmark, BsFillBookmarkFill, BsFillRssFill } from "react-icons/bs";
import { FaClipboard } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  auth,
  getUsersApptensionBookmarkDoc,
} from "../../../utils/firebaseConfig";
import { readingTime } from "../../../utils/readingTime";

export const NewsBox = ({ item }: any) => {
  const [user] = useAuthState(auth);
  const i = item.url.replace(/\//g, "");
  const usersVideoBookmarkDoc = getUsersApptensionBookmarkDoc(
    user?.uid || "",
    i
  );
  const [bookmarkData] = useDocumentData(usersVideoBookmarkDoc);

  const handleSaveForLater = () => {
    toast.success("Saved for later!", { position: "bottom-center" });
  };

  const thumbnail = item.thumbnail && item.thumbnail[0]["$"].url;

  const handleCopyURL = () => {
    navigator.clipboard.writeText(item.url);
    toast.success("URL copied to clipboard!", { position: "bottom-center" });
  };

  const handleBookmark = () => {
    if (user) {
      if (bookmarkData) {
        deleteDoc(usersVideoBookmarkDoc);
      } else {
        console.log(item);
        setDoc(usersVideoBookmarkDoc, {
          url: item.url || null,
          link: item.link || null,
          title: item.title || null,
          thumbnail: item.thumbnail || null,
          image: item.image || null,
          desc: item.desc || null,
          userName: item.userName || null,
          video: item.video || null,
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
        pt={5}
        px={5}
        display="flex"
        _hover={{ textDecoration: "underline" }}>
        <Text fontSize="20px" fontWeight="bold" mb="3">
          {item.title}
        </Text>
      </Link>

      {thumbnail && <Img src={thumbnail} w="100%" />}

      {!item?.video && item.image && <Img src={item.image} width="100%" />}
      {item?.video && (
        <Box as="iframe" width="100%" height="315px" src={item.video} />
      )}
      <Box
        fontSize="14px"
        dangerouslySetInnerHTML={{ __html: item.desc }}
        noOfLines={4}
        px={5}
        mt={5}
      />
      <Flex mt={3} pb={5} px={5} justifyContent="space-between">
        <Flex alignItems="center">
          <Link href={item.url}>
            <Flex alignItems="center">
              <Img src="/apptension_logo.svg" width={4} height={4} mr={1} />

              <Text
                fontWeight="bold"
                fontSize="12px"
                noOfLines={1}
                overflow="hidden"
                textOverflow="ellipsis">
                Added by {item.userName}
              </Text>
            </Flex>
          </Link>

          {/* <Text fontWeight="semibold" fontSize="12px">
            {date}
          </Text> */}
        </Flex>

        <Button
          variant="raw"
          fontSize="13px"
          fontWeight="semibold"
          alignItems="center"
          display="flex"
          onClick={handleCopyURL}>
          <Icon as={FaClipboard} mr={1} />{" "}
          <Text fontSize="12px" as="span">
            Copy URL
          </Text>
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
