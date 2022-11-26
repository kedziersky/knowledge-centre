// Chakra imports
import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react";
import Configurator from "components/Configurator/Configurator";
import Footer from "components/Footer/Footer.js";
// Layout components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar";
import React, { useState } from "react";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { MainPanel } from "./mainPanel";
import { PanelContent } from "./panelContent";
import { PanelContainer } from "./panelContainer";
// Custom components

export default function Dashboard(props) {
  const { ...rest } = props;
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
      <Sidebar
        routes={routes}
        logoText={"PURITY UI DASHBOARD"}
        display="none"
        sidebarVariant={sidebarVariant}
        {...rest}
      />
      <MainPanel
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}>
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            logoText={"PURITY UI DASHBOARD"}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            {...rest}
          />
        </Portal>
        {getRoute() ? (
          <PanelContent>
            <PanelContainer>
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/admin" to="/admin/dashboard" />
              </Switch>
            </PanelContainer>
          </PanelContent>
        ) : null}
        <Footer />
      </MainPanel>
    </>
  );
}
