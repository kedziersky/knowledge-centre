import React from "react";

import {
  Box,
  Flex,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { AiOutlineGoogle } from "react-icons/ai";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { withPublic } from "../src/utils/route";
import { auth } from "../src/utils/firebaseConfig";
import { GiBrain } from "react-icons/gi";
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
        justifyContent="center"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}>
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}>
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            justifyContent="center"
            mt={{ md: "150px", lg: "80px" }}>
            <Heading
              color={titleColor}
              fontSize="42px"
              mb="10px"
              display="flex"
              alignItems="center">
              <Icon as={GiBrain} mr={2} />
              Knowledge Centre
            </Heading>

            <Button
              onClick={handleGoogleSignIn}
              isLoading={loading}
              disabled={loading}
              display="flex"
              alignItems="center"
              maxW="fit-content"
              fontSize="14px"
              type="submit"
              bg="teal.300"
              w="100%"
              h="45"
              mb="20px"
              color="white"
              mt="20px"
              mx="auto"
              _hover={{
                bg: "teal.200",
              }}
              _active={{
                bg: "teal.400",
              }}>
              <Icon as={AiOutlineGoogle} mr={1} />
              Sign In With Google
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default withPublic(Login);
