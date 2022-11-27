import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Grid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Splash } from "../src/components/splash";
import { VideoThumbnail } from "../src/components/videoThumbnail";
import {
  auth,
  getUsersVideoBookmarksCollection,
  videoCollection,
} from "../src/utils/firebaseConfig";
import { withProtected } from "../src/utils/route";

function VideoBookmarks() {
  const [user] = useAuthState(auth);
  const [data, loading] = useCollectionData(
    getUsersVideoBookmarksCollection(user?.uid || "")
  );
  return (
    <Box>
      {loading || !data ? (
        <Splash />
      ) : (
        <Grid p={20} templateColumns="repeat(2, 1fr)" gap={6}>
          {data?.map((video) => (
            <VideoThumbnail {...video} />
          ))}
        </Grid>
      )}
    </Box>
  );
}

function Bookmarks() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };
  return (
    <Box p={4}>
      <Button mb={4} onClick={handleBack}>
        <ArrowBackIcon />
        <Text ml={2}>Back</Text>
      </Button>
      <Tabs>
        <TabList>
          <Tab>Videos</Tab>
          <Tab>News</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VideoBookmarks />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default withProtected(Bookmarks);
