import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
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
    <Flex mt={8}>
      {loading || !data ? (
        <Splash />
      ) : (
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {data?.map((video) => (
            <VideoThumbnail {...video} />
          ))}
        </Grid>
      )}
    </Flex>
  );
}

function NewsBookmarks() {
  const [user] = useAuthState(auth);
  const [data, loading] = useCollectionData(
    getusersNewsBookmarkCollection(user?.uid || "")
  );
  return (
    <Flex mt={8}>
      {loading || !data ? (
        <Splash />
      ) : (
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {data?.map((video) => (
            <NewsBox item={video} />
          ))}
        </Grid>
      )}
    </Flex>
  );
}

function MemesBookmarks() {
  const [user] = useAuthState(auth);
  const [data, loading] = useCollectionData(
    getUsersMemeBookmarkCollection(user?.uid || "")
  );
  return (
    <Flex mt={8}>
      {loading || !data ? (
        <Splash />
      ) : (
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {data?.map((video) => (
            <MemeNewsBox item={video} />
          ))}
        </Grid>
      )}
    </Flex>
  );
}

function ApptensionBookmarks() {
  const [user] = useAuthState(auth);
  const [data, loading] = useCollectionData(
    getUsersApptensionBookmarkCollection(user?.uid || "")
  );
  return (
    <Flex mt={8}>
      {loading || !data ? (
        <Splash />
      ) : (
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {data?.map((video) => (
            <ApptensionBox item={video} />
          ))}
        </Grid>
      )}
    </Flex>
  );
}

function Bookmarks() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      router.back();
    } else {
      router.push("/");
    }
  };
  return (
    <Box p={5}>
      <Button
        mb={4}
        onClick={handleBack}
        variant="raw"
        ml={0}
        pl={0}
        display="flex"
        alignItems="center">
        <Text>
          <ArrowBackIcon mr={2} />
          Back
        </Text>
      </Button>
      <Text fontSize="3xl" fontWeight="bold">
        Bookmarks
      </Text>
      <Text fontSize="xl" mb={10}>
        Check your saved items!
      </Text>
      <Tabs variant="soft-rounded" colorScheme="messenger">
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
