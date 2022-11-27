import { Box, Flex, Grid } from "@chakra-ui/react";
import { NewsBox } from "./newsBox";

export const NewsList = ({ items }: any) => {
  const half = Math.ceil(items.data.length / 2);
  const firstHalf = items.data.slice(0, half);
  const secondHalf = items.data.slice(half);
  return (
    <Flex gap="45px" flexWrap="wrap">
      <Flex flexDirection="column" flex={1}>
        {firstHalf.map((item: any) => (
          <NewsBox item={item} />
        ))}
      </Flex>
      <Flex flexDirection="column" flex={1}>
        {secondHalf.map((item: any) => (
          <NewsBox item={item} />
        ))}
      </Flex>
    </Flex>
  );
};
