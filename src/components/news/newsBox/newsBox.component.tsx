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
import { readingTime } from "../../../utils/readingTime";
import { AiFillClockCircle } from "react-icons/ai";
import {
  BsBookmark,
  BsFillBookmarkFill,
  BsFillRssFill,
  BsYoutube,
} from "react-icons/bs";
import { FaClipboard } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteDoc, setDoc } from "firebase/firestore";
import { title } from "process";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getUsersNewsBookmarkDoc } from "../../../utils/firebaseConfig";
import { useDocumentData } from "react-firebase-hooks/firestore";

export const NewsBox = ({ item }: any) => {
  const [user] = useAuthState(auth);
  const date = new Intl.DateTimeFormat("en-GB").format(new Date(item.pubDate));
  const i = item.link.replace(/\//g, "");
  const usersVideoBookmarkDoc = getUsersNewsBookmarkDoc(user?.uid || "", i);
  const [bookmarkData] = useDocumentData(usersVideoBookmarkDoc);

  const thumbnailImg =
    item?.enclosure &&
    item?.enclosure.type.split("/")[0] === "image" &&
    item.enclosure.url;
  const thumbnailVideo =
    item?.enclosure &&
    item?.enclosure.type.split("/")[0] === "video" &&
    item.enclosure.url;
  const handleCopyURL = () => {
    navigator.clipboard.writeText(item.link);
    toast.success("URL copied to clipboard!", { position: "bottom-center" });
  };
  const getYtEmbededUrl = () => {
    let ytVideo = item.link.split("watch?v=");
    ytVideo.splice(1, 0, "embed/");
    ytVideo = ytVideo.join("");
    return ytVideo;
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
          contentSnippet: item.contentSnippet || null,
          sourceAvatar: item.sourceAvatar || null,
          source: item.source || null,
          article: item.article || null,
          enclosure: item.enclosure || null,
          pubDate: item.pubDate || null,
        });
      }
    }
  };

  const ytVideoUrl = item.feedType === "video" && getYtEmbededUrl();
  return (
    <GridItem bg="gray.700" borderRadius="lg" height={"fit-content"} mb="45px">
      <Link
        href={item.link}
        rel="norefferer"
        target="_blank"
        display="block"
        px={5}
        pt={5}
        _hover={{ textDecoration: "underline" }}>
        <Text fontSize="20px" fontWeight="bold" mb="3">
          {item.title}
        </Text>
      </Link>
      {thumbnailImg && <Img src={thumbnailImg} w="100%" />}
      {!item?.video && thumbnailVideo && (
        <Box as="iframe" width="100%" height="315px" src={thumbnailVideo} />
      )}

      {ytVideoUrl && (
        <Box as="iframe" width="100%" height="315px" src={ytVideoUrl} />
      )}
      {item.contentSnippet && (
        <Box
          fontSize="14px"
          maxWidth={500}
          px={5}
          mt={5}
          dangerouslySetInnerHTML={{ __html: item.contentSnippet }}
          noOfLines={4}
        />
      )}

      <Flex mt={3} pb={5} px={5} justifyContent="space-between">
        <Flex alignItems="center">
          <Link href={item.sourceUrl}>
            <Flex alignItems="center">
              {!item.sourceAvatar && !ytVideoUrl ? (
                <Icon as={BsFillRssFill} width={3} height={3} mr={1} />
              ) : ytVideoUrl ? (
                <Icon
                  as={BsYoutube}
                  width={4}
                  height={4}
                  mr={1}
                  fill="red.500"
                />
              ) : (
                <Img src={item.sourceAvatar} width={4} height={4} mr={1} />
              )}

              <Text
                fontWeight="bold"
                fontSize="12px"
                noOfLines={1}
                overflow="hidden"
                textOverflow="ellipsis"
                maxWidth="116px">
                {item.source}
              </Text>
            </Flex>
          </Link>
          <Text fontWeight="semibold" mx="2" fontSize="12px">
            |
          </Text>

          <Text fontWeight="semibold" fontSize="12px">
            {date}
          </Text>
        </Flex>

        {item.article && (
          <Flex alignItems="center">
            <Icon
              as={AiFillClockCircle}
              fill="gray.200"
              mr={1}
              fontSize="13px"
            />

            <Text fontSize="13px" fontWeight="semibold">
              {`${readingTime(item.article)} min`}
            </Text>
          </Flex>
        )}

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
