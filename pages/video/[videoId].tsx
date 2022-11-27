import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Chat } from "../../src/components/chat/chat.component";
import { Notes } from "../../src/components/notes";
import { VideoInfo } from "../../src/components/videoInfo";
import { withProtected } from "../../src/utils/route";

function Video() {
  const router = useRouter();
  const { videoId } = router.query;

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <Flex h="100vh" flexWrap="wrap">
      <Box flex={1} height={"100%"} p={4} py={3}>
        <Button mb={4} onClick={handleBack} variant="raw" pl={0} mt={2}>
          <ArrowBackIcon />
          <Text ml={2}>Back</Text>
        </Button>

        <Chat videoId={videoId} />
      </Box>
      <Box flex={3}>
        <Box
          position="relative"
          width="100%"
          overflow="hidden"
          paddingTop="56.25%">
          <Box
            as="iframe"
            src={`https://drive.google.com/file/d/${videoId}/preview`}
            id="test"
            top={0}
            left={0}
            bottom={0}
            overflow="hidden"
            right={0}
            position="absolute"
            width="100%"
            height="100%"
            allow="autoplay"
          />
        </Box>
        <VideoInfo videoId={videoId} />
        <Flex p={4} mb={5} pt={2}>
          <Button colorScheme="blue" marginRight={3}>
            Edit
          </Button>
          <Button colorScheme="red">Delete</Button>
        </Flex>
        <Notes videoId={videoId} />
      </Box>
    </Flex>
  );
}

export default withProtected(Video);
