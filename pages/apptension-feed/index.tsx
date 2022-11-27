import { MainLayout } from "../../src/layouts";
import { Flex, Img, Spinner, Text } from "@chakra-ui/react";

import { fetch } from "fetch-opengraph";
import { useQuery } from "react-query";
import { fetchApptensionFeed } from "../../src/services/api/fetchApptensionFeed";
import { NewsList } from "../../src/components/apptensionNews/newsList";
import { withProtected } from "../../src/utils/route";
import { FeedFilter } from "../../src/components/apptensionFeedFilter";
import { useState } from "react";

function ApptensionFeed() {
  const [type, setType] = useState("frontend");
  const { data, status } = useQuery(["apptensionFeed", [type]], () =>
    fetchApptensionFeed(0, type, "asd")
  );

  return (
    <MainLayout>
      <Text fontSize="3xl" fontWeight="bold">
        Apptension Feed
      </Text>
      <Text fontSize="xl" mb={10} display="flex" alignItems="center">
        Share interesting URLs with others in Apptension!
        <Img src="/apptension_logo.svg" ml={2} width={5} height={5} />
      </Text>
      <FeedFilter setType={setType} />
      <NewsList items={data} status={status} />
    </MainLayout>
  );
}

export default withProtected(ApptensionFeed);
