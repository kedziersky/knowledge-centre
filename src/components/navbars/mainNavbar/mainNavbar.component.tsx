import { Button, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoMdSettings } from "react-icons/io";
import { ROUTES } from "../../../navigation";
import { ROUTES_PATHS } from "../../../navigation/routesPaths";
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
      <Button colorScheme="teal" mr="5">
        Add talk - display only for admin
      </Button>
      <Button
        colorScheme="teal"
        mr="5"
        as={Link}
        href={ROUTES_PATHS.apptensionFeed.add}>
        Add news
      </Button>
      <Flex alignItems="center" onClick={onOpen} _hover={{ cursor: "pointer" }}>
        {user?.photoURL && (
          <Image
            src={user?.photoURL}
            alt="avatar"
            width={35}
            height={35}
            style={{ borderRadius: 100, marginRight: 10 }}
          />
        )}
        <Text noOfLines={1} maxWidth={250} fontWeight="bold">
          Hi, {user?.displayName?.split(" ")[0]}!
        </Text>
      </Flex>

      <SettingsDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
