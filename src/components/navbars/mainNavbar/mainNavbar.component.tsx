import {
  Button,
  Flex,
  FormControl,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";

import { useAuthState } from "react-firebase-hooks/auth";
import { ROUTES_PATHS } from "../../../navigation/routesPaths";

import { FormModal } from "../../formModal";
import { SettingsDrawer } from "../../settingsDrawer";
import { useForm } from "react-hook-form";
import { VideoForm } from "../../videoForm";

import { auth, getApptensionNews } from "../../../utils/firebaseConfig";

import { addDoc, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

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
  const { register, handleSubmit } = useForm();
  const apptensionFeedDoc = getApptensionNews();
  const handleAddNews = async (data: any) => {
    console.log(data, user);

    if (user) {
      try {
        await addDoc(apptensionFeedDoc, {
          userId: user.uid,
          userName: user.displayName,
          url: data.url,
        });
        toast.success("News added!", { position: "bottom-center" });
        onModalClose();
      } catch (e) {
        console.log(e);
      }
    }
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
        onClick={onVideoModalOpen}
        variant="raw">
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
            <Text as="label" fontWeight="bold">
              News URL
            </Text>
            <Input {...register("url")} />
            <Button
              colorScheme="blue"
              type="submit"
              mt={5}
              ml="auto"
              display="flex">
              Add
            </Button>
          </form>
        </FormControl>
      </FormModal>
      <VideoForm onClose={onVideoModalClose} isOpen={isVideoModalOpen} />
      <SettingsDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
