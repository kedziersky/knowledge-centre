import {
  Button,
  Flex,
  FormControl,
  Icon,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ROUTES_PATHS } from "../../../navigation/routesPaths";
import { auth } from "../../../utils/firebaseConfig";
import { FormModal } from "../../formModal";
import { SettingsDrawer } from "../../settingsDrawer";
import { useForm } from "react-hook-form";

export const MainNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const [user] = useAuthState(auth);
  const { register, handleSubmit } = useForm();
  const handleAddNews = (data: any) => {
    console.log(data);
  };
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
      <Button
        colorScheme="teal"
        mr="5"
        as={Link}
        variant="raw"
        href={ROUTES_PATHS.apptensionFeed.add}>
        Add talk - display only for admin
      </Button>
      <Button colorScheme="teal" mr="5" onClick={onModalOpen} variant="raw">
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
      <FormModal
        onClose={onModalClose}
        isOpen={isModalOpen}
        title="Add new news!">
        <FormControl>
          <form onSubmit={handleSubmit(handleAddNews)}>
            <label>News URL</label>
            <Input />
            <Button colorScheme="blue" type="submit" mt={5}>
              Add
            </Button>
          </form>
        </FormControl>
      </FormModal>
      <SettingsDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
