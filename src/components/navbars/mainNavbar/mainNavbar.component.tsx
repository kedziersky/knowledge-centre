import { Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { IoMdSettings } from "react-icons/io";
import { SettingsDrawer } from "../../settingsDrawer";

export const MainNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      position="relative"
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
      zIndex="base">
      <Flex alignItems="center">
        <Text noOfLines={1} maxWidth={250}>{`User Name`}</Text>
      </Flex>
      <Icon
        as={IoMdSettings}
        size={16}
        cursor="pointer"
        ml="16px"
        onClick={onOpen}
      />
      <SettingsDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
