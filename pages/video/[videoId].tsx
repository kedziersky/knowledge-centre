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
          <Input placeholder="Comment..." />
          <Box mt={4}>
            <Box>
              <Text>LOREM XD</Text>
            </Box>
          </Box>
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
          <Box height={250} width="100%" p={4} position="relative">
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Text>Notes</Text>
              <Button colorScheme="teal">Save</Button>
            </Flex>
            <Textarea placeholder="Add notes..." />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default withProtected(Video);
