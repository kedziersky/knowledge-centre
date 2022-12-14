/*eslint-disable*/
// chakra imports
import {
  Box,
  Button,
  Flex,
  Link,
  Stack,
  Text,
  Link as ChakraLink,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";

import NavLink from "next/link";

import { Separator } from "../../separator";

import React from "react";
import { useRouter } from "next/router";
import { ROUTES } from "../../../navigation";
import { GiBrain } from "react-icons/gi";

// this function creates the links and collapses that appear in the sidebar (left menu)

export const SidebarContent = ({ logoText }: any) => {
  // to check for active links and opened collapses

  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  const router = useRouter();
  // verifies if routeName is the one active (in browser input)

  const activeRoute = (routeName: any) => {
    const pathName = `${routeName.split(/[?#]/)[0]}`;

    return router.pathname === pathName ? "active" : "";
  };

  const createLinks = (routes: any) => {
    // Chakra Color Mode
    const activeBg = useColorModeValue("white", "gray.700");
    const inactiveBg = useColorModeValue("white", "gray.700");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");

    return routes.map((prop: any, key: any) => {
      return (
        <NavLink href={prop.path} key={prop.name}>
          {activeRoute(prop.path) === "active" ? (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg={activeBg}
              mb={{
                xl: "12px",
              }}
              mx={{
                xl: "auto",
              }}
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
              borderRadius="15px"
              _hover={{}}
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}>
              <Text
                color={activeColor}
                my="auto"
                fontSize="sm"
                display="flex"
                alignItems="center">
                <Icon as={prop.icon} color={activeColor} mr={2} />
                {prop.name}
              </Text>
            </Button>
          ) : (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg="transparent"
              mb={{
                xl: "12px",
              }}
              mx={{
                xl: "auto",
              }}
              py="12px"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              borderRadius="15px"
              _hover={{}}
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}>
              <Text
                color={inactiveColor}
                my="auto"
                fontSize="sm"
                display="flex"
                alignItems="center">
                <Icon as={prop.icon} color={inactiveColor} mr={2} />
                {prop.name}
              </Text>
            </Button>
          )}
        </NavLink>
      );
    });
  };

  const links = <>{createLinks(ROUTES)}</>;
  const titleColor = useColorModeValue("teal.300", "teal.200");

  return (
    <>
      <Box pt={"25px"} mb="12px">
        <ChakraLink
          display="flex"
          lineHeight="100%"
          mb="30px"
          fontWeight="bold"
          justifyContent="center"
          alignItems="center"
          fontSize="11px"
          href="/"
          as={NavLink}>
          <Text
            fontSize="xl"
            mt="3px"
            color={titleColor}
            display="flex"
            alignItems="center">
            <Icon as={GiBrain} mr={2} />
            Knowledge Centre
          </Text>
        </ChakraLink>
        <Separator></Separator>
      </Box>
      <Stack direction="column" mb="40px">
        <Box>{links}</Box>
      </Stack>
    </>
  );
};
