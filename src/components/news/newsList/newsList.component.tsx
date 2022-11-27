import { Flex, Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import { NewsBox } from "../newsBox";

export const NewsList = ({ firstChunk, secondChunk }: any) => {
  useEffect(() => {
    console.log({ firstChunk, secondChunk }, "TEST");
  }, [firstChunk, secondChunk]);
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
