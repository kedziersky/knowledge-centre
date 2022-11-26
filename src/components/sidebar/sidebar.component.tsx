import { Box } from "@chakra-ui/react";

import { SidebarContent } from "./sidebarContent";
import { SidebarResponsive } from "./sidebarResponsive";

export const Sidebar = () => {
  return (
    <>
      <Box zIndex="overlay">
        <Box display={{ sm: "none", xl: "block" }} position="fixed">
          <Box
            bg="none"
            transition="0.2s linear"
            w="260px"
            maxW="260px"
            ms={{
              sm: "16px",
            }}
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
