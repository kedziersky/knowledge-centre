import { Grid, Text } from "@chakra-ui/react";
import { orderBy, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Splash } from "../src/components/splash";
import { VideoThumbnail } from "../src/components/videoThumbnail";
import { MainLayout } from "../src/layouts";
import { videoCollection } from "../src/utils/firebaseConfig";
import { withProtected } from "../src/utils/route";

function DevTalks() {
  const [data, loading] = useCollectionData(
    query(
      videoCollection,
      where("category", "==", "dev-talks"),
      orderBy("createdAt", "desc")
    )
  );
  return (
    <MainLayout>
      <Text fontSize="30px" fontWeight="bold" mb="10">
        Dev Talks
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

export default withProtected(DevTalks);
