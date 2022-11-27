import { useQuery } from "react-query";

import { NewsList } from "../src/components/news/newsList";
import { Box, Icon, Spinner, Text } from "@chakra-ui/react";

import { MainLayout } from "../src/layouts";
import { fetchFeed } from "../src/services/api/fetchFeed";
import { withProtected } from "../src/utils/route";
import { FeedFilter } from "../src/components/feedFilter";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { FeedTypeFilter } from "../src/components/feedTypeFilter";

const useNewsFeed = () => {
  // const [news, setNews] = useState<any[]>([]);
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
  const { data, status } = useQuery(["feed", [page, type, feedType]], () =>
    fetchFeed(page, type, feedType)
  );

  useEffect(() => {
    if (data?.data?.length && status !== "loading") {
      console.log("TRIGGER");
      const half = Math.ceil(data.data.length / 2);
      const f = data.data.slice(0, half);
      const s = data.data.slice(half);
      setFirstHalf((old: any) => [...old, ...f]);
      setSecondHalf((old: any) => [...old, ...s]);
    }
  }, [data]);
  return [firstHalf, secondHalf, status, setPage] as any;
};

function NewsFeed() {
  const [firstChunk, secondChunk, status, setPage] = useNewsFeed();

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
      return <Spinner />;

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
      {/* {console.log(page)} */}
      <Text fontSize="30px" fontWeight="bold" mb="10">
        News Feed
      </Text>
      <FeedFilter />
      <FeedTypeFilter />

      {renderNewsList()}
      {status !== "loading" && <Box ref={lastBookElementRef}></Box>}
      <Box w="100%" justifyContent="center" alignItems="center">
        <Spinner />
      </Box>
    </MainLayout>
  );
}

export default withProtected(NewsFeed);
