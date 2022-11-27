import { Text, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { NewsList } from "../src/components/memesList";
import { MainLayout } from "../src/layouts";
import { fetchMemes } from "../src/services/api/fetchMemes";

export default function ApptensionFeed() {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["memes", [page]], () => fetchMemes(page));
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
        Memes
      </Text>
      {renderNewsList()}
    </MainLayout>
  );
}
