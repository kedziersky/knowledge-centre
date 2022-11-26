import { Flex, Spinner } from "@chakra-ui/react";

export function Splash() {
  return (
    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <Spinner size="xl" thickness="4px" />
    </Flex>
  );
}
