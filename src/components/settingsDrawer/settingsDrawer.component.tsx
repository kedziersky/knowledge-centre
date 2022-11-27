import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Icon,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsBookmarkFill } from "react-icons/bs";
import { auth } from "../../utils/firebaseConfig";
import { Separator } from "../separator";

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsDrawer = ({ isOpen, onClose }: SettingsDrawerProps) => {
  const router = useRouter();
  const handleLogout = () => {
    signOut(auth);
  };
  if (!isOpen) return null;
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      blockScrollOnMount={true}>
      <DrawerContent>
        <DrawerHeader pt="24px" px="24px">
          <DrawerCloseButton />
          <Text fontSize="xl" fontWeight="bold" my="16px">
            My Profile
          </Text>
          <Separator />
        </DrawerHeader>
        <DrawerBody w="340px" ps="24px" pe="40px">
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
            pb={10}>
            <ChakraLink
              href="/bookmarks"
              as={Link}
              display="flex"
              alignItems="center"
              fontSize="sm"
              fontWeight="bold">
              <Icon as={BsBookmarkFill} mr={2} />
              Bookmarks
            </ChakraLink>
            <Button onClick={handleLogout}>Log out</Button>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
