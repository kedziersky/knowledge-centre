import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Text,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
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
            Settings
          </Text>
          <Separator />
        </DrawerHeader>
        <DrawerBody w="340px" ps="24px" pe="40px">
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
            pb={10}>
            <Button variant="link" onClick={() => router.push("/bookmarks")}>
              Bookmarks
            </Button>
            <Button colorScheme="red" onClick={handleLogout}>
              Log out
            </Button>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
