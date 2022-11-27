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
import { NewsBox } from "../src/components/news";
import { NewsBox as MemeNewsBox } from "../src/components/memesList/newsBox";
import { NewsBox as ApptensionBox } from "../src/components/apptensionNews/newsBox";
import { Splash } from "../src/components/splash";
import { VideoThumbnail } from "../src/components/videoThumbnail";
import {
  auth,
  getUsersApptensionBookmarkCollection,
  getUsersMemeBookmarkCollection,
  getusersNewsBookmarkCollection,
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

function NewsBookmarks() {
  const [user] = useAuthState(auth);
  const [data, loading] = useCollectionData(
    getusersNewsBookmarkCollection(user?.uid || "")
  );
  return (
    <Box>
      {loading || !data ? (
        <Splash />
      ) : (
        <Grid p={20} templateColumns="repeat(2, 1fr)" gap={6}>
          {data?.map((video) => (
            <NewsBox item={video} />
          ))}
        </Grid>
      )}
    </Box>
  );
}

function MemesBookmarks() {
  const [user] = useAuthState(auth);
  const [data, loading] = useCollectionData(
    getUsersMemeBookmarkCollection(user?.uid || "")
  );
  return (
    <Box>
      {loading || !data ? (
        <Splash />
      ) : (
        <Grid p={20} templateColumns="repeat(2, 1fr)" gap={6}>
          {data?.map((video) => (
            <MemeNewsBox item={video} />
          ))}
        </Grid>
      )}
    </Box>
  );
}

function ApptensionBookmarks() {
  const [user] = useAuthState(auth);
  const [data, loading] = useCollectionData(
    getUsersApptensionBookmarkCollection(user?.uid || "")
  );
  return (
    <Box>
      {loading || !data ? (
        <Splash />
      ) : (
        <Grid p={20} templateColumns="repeat(2, 1fr)" gap={6}>
          {data?.map((video) => (
            <ApptensionBox item={video} />
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
          <Tab>Memes</Tab>
          <Tab>Apptension</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VideoBookmarks />
          </TabPanel>
          <TabPanel>
            <NewsBookmarks />
          </TabPanel>
          <TabPanel>
            <MemesBookmarks />
          </TabPanel>
          <TabPanel>
            <ApptensionBookmarks />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default withProtected(Bookmarks);
