import { Button, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoMdSettings } from "react-icons/io";
import { auth } from "../../../utils/firebaseConfig";
import { SettingsDrawer } from "../../settingsDrawer";

export const MainNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);

  return (
    <Flex
      position="fixed"
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
      <Button onClick={onOpen}>
        <Flex alignItems="center">
          <Text noOfLines={1} maxWidth={250}>
            {user?.displayName}
          </Text>
          {user?.photoURL && (
            <Image
              src={user?.photoURL}
              alt="avatar"
              width={20}
              height={20}
              style={{ borderRadius: 10, marginLeft: 10 }}
            />
          )}
        </Flex>
      </Button>
      <SettingsDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
