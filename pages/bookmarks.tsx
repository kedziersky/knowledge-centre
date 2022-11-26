import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { withProtected } from "../src/utils/route";

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
            <p>one!</p>
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
