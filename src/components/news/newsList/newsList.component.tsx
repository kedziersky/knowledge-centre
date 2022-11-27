import { Flex, Grid } from "@chakra-ui/react";
import { NewsBox } from "../newsBox";

export const NewsList = ({ firstChunk, secondChunk }: any) => {
  return (
    <Flex gap="45px">
      <Flex flexDirection="column" flex={1}>
        {firstChunk.map((item: any) => (
          <NewsBox item={item} />
        ))}
      </Flex>
      <Flex flexDirection="column" flex={1}>
        {secondChunk.map((item: any) => (
          <NewsBox item={item} />
        ))}
      </Flex>
    </Flex>
  );
};
