import { MainLayout } from "../../src/layouts";
import { Spinner, Text } from "@chakra-ui/react";

import { fetch } from "fetch-opengraph";
import { useQuery } from "react-query";
import { fetchApptensionFeed } from "../../src/services/api/fetchApptensionFeed";
import { NewsList } from "../../src/components/apptensionNews/newsList";

export default function ApptensionFeed() {
  const { data, status } = useQuery(["apptensionFeed"], () =>
    fetchApptensionFeed(0, "asd", "asd")
  );

  if (status === "loading") return <Spinner />;
  if (!data?.data.length) return null;
  return (
    <MainLayout>
      <Text fontSize="30px" fontWeight="bold" mb="10">
        News Feed
      </Text>
      <NewsList items={data} />
    </MainLayout>
  );
}
