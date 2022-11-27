import { Grid, Text } from "@chakra-ui/react";
import { query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Splash } from "../src/components/splash";
import { VideoThumbnail } from "../src/components/videoThumbnail";
import { MainLayout } from "../src/layouts";
import { videoCollection } from "../src/utils/firebaseConfig";

export default function CoffeeBreaks() {
  const [data, loading] = useCollectionData(
    query(videoCollection, where("category", "==", "coffee-breaks"))
  );
  return (
    <MainLayout>
      <Text fontSize="30px" fontWeight="bold" mb="10">
        Coffee Breaks
      </Text>
      {loading || !data ? (
        <Splash />
      ) : (
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {data?.map((video) => (
            <VideoThumbnail {...video} />
          ))}
        </Grid>
      )}
    </MainLayout>
  );
}
