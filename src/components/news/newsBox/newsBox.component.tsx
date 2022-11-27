import { Box, Flex, GridItem, Icon, Img, Link, Text } from "@chakra-ui/react";
import { readingTime } from "../../../utils/readingTime";
import { AiFillClockCircle } from "react-icons/ai";
import { BsFillBookmarkFill, BsFillRssFill } from "react-icons/bs";
import { toast } from "react-toastify";

export const NewsBox = ({ item }: any) => {
  const date = new Intl.DateTimeFormat("pl-PL").format(new Date(item.pubDate));

  const handleSaveForLater = () => {
    toast.success("Saved for later!", { position: "bottom-center" });
  };

  const thumbnail = item.thumbnail && item.thumbnail[0]["$"].url;

  return (
    <GridItem bg="gray.700" p="5" borderRadius="lg" height={"fit-content"}>
      <Link
        href={item.link}
        rel="norefferer"
        target="_blank"
        _hover={{ textDecoration: "underline" }}>
        <Text fontSize="18px" fontWeight="bold" mb="3">
          {item.title}
        </Text>
        {thumbnail && <Img src={thumbnail} w="100%" mb="3" />}
      </Link>
      <Box
        fontSize="14px"
        dangerouslySetInnerHTML={{ __html: item.contentSnippet }}
        noOfLines={4}
      />

      <Flex mt="8" justifyContent="space-between">
        <Flex alignItems="center">
          <Link href={item.sourceUrl}>
            <Flex alignItems="center">
              {!item.sourceAvatar ? (
                <Icon as={BsFillRssFill} width={3} height={3} mr={1} />
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
        <Flex
          alignItems="center"
          _hover={{ cursor: "pointer" }}
          onClick={handleSaveForLater}>
          <Icon as={BsFillBookmarkFill} fontSize="12px" />
          <Text fontWeight="semibold" ml="2" fontSize="12px">
            Save for later
          </Text>
        </Flex>
      </Flex>
    </GridItem>
  );
};
