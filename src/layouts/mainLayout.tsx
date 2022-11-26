// Chakra imports
import {
  Box,
  ChakraProvider,
  Portal,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";

// Layout components

import React, { useState } from "react";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { MainPanel } from "./mainPanel";
import { PanelContent } from "./panelContent";
import { PanelContainer } from "./panelContainer";
import { Sidebar } from "../components/sidebar/sidebar.component";
import { ROUTES } from "../navigation";
import { MainNavbar } from "../components/navbars/mainNavbar";
// Custom components

export function MainLayout({ children }: any) {
  // states and functions
  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const [fixed, setFixed] = useState(false);
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  document.documentElement.dir = "ltr";
  // Chakra Color Mode
  return (
    <>
      <Box
        display={{ sm: "flex", xl: "block" }}
        alignItems={{ sm: "center" }}
        pt={3}>
        <Sidebar />
        <MainNavbar />
      </Box>

      <MainPanel
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}>
        {children}
      </MainPanel>
    </>
  );
}
