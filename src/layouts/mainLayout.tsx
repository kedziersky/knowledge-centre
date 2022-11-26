import { Box } from "@chakra-ui/react";

import React from "react";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { MainPanel } from "./mainPanel";
import { Sidebar } from "../components/sidebar/sidebar.component";
import { MainNavbar } from "../components/navbars/mainNavbar";
// Custom components

export function MainLayout({ children }: any) {
  return (
    <>
      <Box display={{ sm: "flex", xl: "block" }} alignItems={{ sm: "center" }}>
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
