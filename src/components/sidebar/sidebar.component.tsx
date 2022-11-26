import { Box, useColorModeValue } from "@chakra-ui/react";

import { SidebarContent } from "./sidebarContent";
import { SidebarResponsive } from "./sidebarResponsive";

export const Sidebar = () => {
  const activeBg = useColorModeValue("white", "gray.700");
  return (
    <>
      <Box zIndex="overlay">
        <Box
          display={{ sm: "none", xl: "block" }}
          position="fixed"
          bg={activeBg}>
          <Box
            bg="none"
            transition="0.2s linear"
            w="260px"
            maxW="260px"
            my={{
              sm: "16px",
            }}
            h="calc(100vh - 32px)"
            ps="20px"
            pe="20px"
            m={0}
            borderRadius={0}>
            <SidebarContent />
          </Box>
        </Box>
      </Box>
      <SidebarResponsive />
    </>
  );
};
