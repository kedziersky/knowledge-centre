import { Box, Flex, Img, Text } from "@chakra-ui/react";

export const Message = ({ item, userId }: any) => {
  const date = item.createdAt?.toDate();
  const formattedDate =
    date &&
    new Intl.DateTimeFormat("en-GB", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(date));
  /* const fireBaseTime = new Date(
    item.createdAt.nt.seconds * 1000 + item.createdAt.nt.nanoseconds / 1000000
  ); */
  return (
    <Box
      ml={userId === item.userId ? "auto" : 0}
      bgColor={userId === item.userId ? "blue.500" : "gray.600"}
      borderRadius="3xl"
      maxW="85%"
      py={3}
      px={4}
      mb={4}>
      <Flex alignItems="center">
        <Img
          src={item.avatar}
          borderRadius="full"
          width={5}
          height={5}
          mr={1}
        />
        <Text fontWeight="bold" fontSize="xs">
          {item.author}
        </Text>
      </Flex>
      <Text fontWeight="semibold" fontSize="sm" mt={3} mb={2}>
        {item.comment}
      </Text>
      <Text textAlign="right" fontSize="11px" fontWeight="semibold">
        {formattedDate}
      </Text>
    </Box>
  );
};
