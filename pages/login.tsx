import React from "react";

import {
  Box,
  Flex,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { withPublic } from "../src/utils/route";
import { auth } from "../src/utils/firebaseConfig";

function Login() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    hd: "apptension.com",
  });
  const [_, loading] = useAuthState(auth);
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  const handleGoogleSignIn = async () => {
    await signInWithPopup(auth, provider).then(() => {
      const audio = new Audio("/login_sound.mp3");
      audio.play();
    });
  };
  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}>
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}>
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}>
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Knowledge Centre
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px">
              Enter your email and password to sign in
            </Text>
            <Button
              onClick={handleGoogleSignIn}
              isLoading={loading}
              disabled={loading}
              fontSize="10px"
              type="submit"
              bg="teal.300"
              w="100%"
              h="45"
              mb="20px"
              color="white"
              mt="20px"
              _hover={{
                bg: "teal.200",
              }}
              _active={{
                bg: "teal.400",
              }}>
              SIGN IN WITH GOOGLE
            </Button>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px">
          <Box
            bgImage={`url(/signInImage.png)`}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default withPublic(Login);
