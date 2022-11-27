import { useQuery } from "react-query";

import { NewsList } from "../src/components/news/newsList";
import { Spinner, Text } from "@chakra-ui/react";

import { MainLayout } from "../src/layouts";
import { fetchFeed } from "../src/services/api/fetchFeed";
import { withProtected } from "../src/utils/route";
import { FeedFilter } from "../src/components/feedFilter";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FeedTypeFilter } from "../src/components/feedTypeFilter";

function NewsFeed() {
  const [type, setType] = useState("frontend");
  const [feedType, setFeedType] = useState("article");
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { filter, feedType: feedTypeQuery } = router.query;

  useEffect(() => {
    setType(filter as string);
    setFeedType(feedTypeQuery as string);
  }, [filter, feedType]);

  const { data, status } = useQuery(["feed", [page, type, feedType]], () =>
    fetchFeed(page, type, feedType)
  );

  const renderNewsList = () => {
    if (status === "loading") return <Spinner />;

    if (!data?.data.length)
      return (
        <Text fontSize="20px" fontWeight="bold">
          No data so far 🥺
        </Text>
      );
    return <NewsList items={data} />;
  };
  return (
    <MainLayout>
      <Text fontSize="30px" fontWeight="bold" mb="10">
        News Feed
      </Text>
      <FeedFilter />
      <FeedTypeFilter />
      {renderNewsList()}
    </MainLayout>
  );
}

export default withProtected(NewsFeed);
