import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";

import { useAuthState } from "react-firebase-hooks/auth";

import { SettingsDrawer } from "../../settingsDrawer";
import { VideoForm } from "../../videoForm";

import { auth } from "../../../utils/firebaseConfig";

import { NewsForm } from "../../newsForm";

export const MainNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    isOpen: isVideoModalOpen,
    onOpen: onVideoModalOpen,
    onClose: onVideoModalClose,
  } = useDisclosure();
  const [user] = useAuthState(auth);

  return (
    <Flex
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems="center"
      display="flex"
      minH="75px"
      lineHeight="25.6px"
      pb="8px"
      justifyContent="flex-end"
      p={4}
      w="100%"
      zIndex="overlay">
      <Button
        colorScheme="telegram"
        mr="5"
        onClick={onVideoModalOpen}
        fontSize="sm">
        Add talk
      </Button>
      <Button colorScheme="green" mr="5" onClick={onModalOpen} fontSize="sm">
        Add news
      </Button>
      <Button variant="ghost" onClick={onOpen}>
        <Flex alignItems="center">
          {user?.photoURL && (
            <Image
              src={user?.photoURL}
              alt="avatar"
              width={25}
              height={25}
              style={{ borderRadius: 100, marginRight: 10 }}
            />
          )}
          <Text noOfLines={1} maxWidth={250} fontWeight="bold">
            Hi, {user?.displayName?.split(" ")[0]}!
          </Text>
        </Flex>
      </Button>
      <NewsForm isOpen={isModalOpen} onClose={onModalClose} />
      <VideoForm onClose={onVideoModalClose} isOpen={isVideoModalOpen} />
      <SettingsDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
