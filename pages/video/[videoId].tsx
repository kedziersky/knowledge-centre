import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  calc,
  Flex,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Chat } from "../../src/components/chat/chat.component";
import { Notes } from "../../src/components/notes";
import { withProtected } from "../../src/utils/route";

function Video() {
  const router = useRouter();
  const { videoId } = router.query;

  const handleBack = () => {
    router.push("/");
  };

  return (
    <Box width="100vw" height="100vh">
      <Flex height="100%">
        <Box width={350} height={"100%"} p={4}>
          <Button mb={4} onClick={handleBack}>
            <ArrowBackIcon />
            <Text ml={2}>Back</Text>
          </Button>
          <Chat videoId={videoId} />
        </Box>
        <Box width="100%">
          <Box position="relative" width="100%" height="calc(100% - 250px)">
            <iframe
              src={`https://drive.google.com/file/d/${videoId}/preview`}
              width="100%"
              id="test"
              height="100%"
              allow="autoplay"
            />
          </Box>
          <Notes videoId={videoId} />
        </Box>
      </Flex>
    </Box>
  );
}

export default withProtected(Video);
