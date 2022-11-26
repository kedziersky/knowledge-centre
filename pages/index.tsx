import { MainLayout } from "../src/layouts";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { withProtected } from "../src/utils/route";
import { videoCollection } from "../src/utils/firebaseConfig";
import { VideoThumbnail } from "../src/components/videoThumbnail";
import { Grid } from "@chakra-ui/react";

function Home() {
  const [data, loading] = useCollectionData(videoCollection);

  return (
    <MainLayout>
      <Grid p={20} templateColumns="repeat(2, 1fr)" gap={6}>
        {data?.map((video) => (
          <VideoThumbnail {...video} />
        ))}
      </Grid>
    </MainLayout>
  );
}

export default withProtected(Home);
