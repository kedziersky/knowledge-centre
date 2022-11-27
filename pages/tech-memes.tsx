import { Text, Spinner, Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { NewsList } from "../src/components/memesList";
import { MainLayout } from "../src/layouts";
import { fetchFeed } from "../src/services/api/fetchFeed";
import { fetchMemes } from "../src/services/api/fetchMemes";
import { withProtected } from "../src/utils/route";

const useMemes = () => {
  const [firstHalf, setFirstHalf] = useState<any>([]);
  const [secondHalf, setSecondHalf] = useState<any>([]);
  const router = useRouter();
  const { filter, feedType: feedTypeQuery } = router.query;
  const [type, setType] = useState("frontend");
  const [feedType, setFeedType] = useState("article");
  const [page, setPage] = useState(1);
  useEffect(() => {
    setType(filter as string);
    setFeedType(feedTypeQuery as string);
  }, [filter, feedType]);
  const { data, status } = useQuery(["memes", [page]], () => fetchMemes(page));

  useEffect(() => {
    if (data?.data?.length && status !== "loading") {
      const half = Math.ceil(data.data.length / 2);
      const f = data.data.slice(0, half);
      const s = data.data.slice(half);
      setFirstHalf((old: any) => [...old, ...f]);
      setSecondHalf((old: any) => [...old, ...s]);
    }
  }, [data]);
  return [firstHalf, secondHalf, status, setPage] as any;
};

function ApptensionFeed() {
  const [firstChunk, secondChunk, status, setPage] = useMemes();

  const observer = useRef() as any;
  const lastBookElementRef = useCallback(
    (node: any) => {
      if (status === "loading") return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && true) {
          setPage((prevPageNumber: any) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [status]
  );

  const renderNewsList = () => {
    if (status === "loading" && !firstChunk.length && !secondChunk.length)
      return (
        <Flex width="100%" justifyContent="center">
          <Spinner size="xl" />
        </Flex>
      );

    if (!firstChunk.length && !secondChunk.length)
      return (
        <Text fontSize="20px" fontWeight="bold">
          No data so far 🥺
        </Text>
      );
    return <NewsList firstChunk={firstChunk} secondChunk={secondChunk} />;
  };
  return (
    <MainLayout>
      <Text fontSize="3xl" fontWeight="bold">
        Memes
      </Text>
      <Text fontSize="xl" mb={10}>
        Take a break and look at some memes! 😂
      </Text>
      {renderNewsList()}
      {status !== "loading" && <Box ref={lastBookElementRef}></Box>}
      {!!firstChunk.length && !!secondChunk.length && (
        <Flex w="100%" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )}
    </MainLayout>
  );
}

export default withProtected(ApptensionFeed);
