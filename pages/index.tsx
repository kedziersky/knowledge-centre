import { MainLayout } from "../src/layouts";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { withProtected } from "../src/utils/route";
import { videoCollection } from "../src/utils/firebaseConfig";
import { VideoThumbnail } from "../src/components/videoThumbnail";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { limit, orderBy, query, where } from "firebase/firestore";

function Home() {
  const [devTalks, devLoading] = useCollectionData(
    query(
      videoCollection,
      where("category", "==", "dev-talks"),
      orderBy("createdAt", "desc"),
      limit(3)
    )
  );
  const [knowledgeData, knowledgeLoading] = useCollectionData(
    query(
      videoCollection,
      where("category", "==", "knowledge-shots"),
      orderBy("createdAt", "desc"),
      limit(3)
    )
  );
  const [coffeeData, coffeeLoading] = useCollectionData(
    query(
      videoCollection,
      where("category", "==", "coffee-breaks"),
      orderBy("createdAt", "desc"),
      limit(3)
    )
  );

  return (
    <MainLayout>
      <Box>
        {devLoading || !devTalks ? (
          <Spinner />
        ) : (
          <Box>
            <Text fontSize="26" fontWeight="bold" mb="3">
              Dev Talks
            </Text>
            <Flex className="scrollbarWrapper">
              {devTalks.map((d) => (
                <VideoThumbnail {...d} mr={10} />
              ))}
            </Flex>
          </Box>
        )}
      </Box>
      <Box>
        {knowledgeLoading || !knowledgeData ? (
          <Spinner />
        ) : (
          <Box mt={10}>
            <Text fontSize="26" fontWeight="bold" mb="3">
              Knowledge Shots
            </Text>
            <Flex className="scrollbarWrapper">
              {knowledgeData.map((d) => (
                <VideoThumbnail {...d} mr={10} />
              ))}
            </Flex>
          </Box>
        )}
      </Box>
      <Box>
        {coffeeLoading || !coffeeData ? (
          <Spinner />
        ) : (
          <Box mt={10}>
            <Text fontSize="26" fontWeight="bold" mb="3">
              Coffee Breaks
            </Text>
            <Flex className="scrollbarWrapper">
              {coffeeData.map((d) => (
                <VideoThumbnail {...d} mr={10} />
              ))}
            </Flex>
          </Box>
        )}
      </Box>
    </MainLayout>
  );
}

export default withProtected(Home);
