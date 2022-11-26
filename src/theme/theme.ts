import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { globalStyles } from "./styles";
import { breakpoints } from "./foundations/breakpoints";
import { buttonStyles } from "./components/button";
import { badgeStyles } from "./components/badge";
import { linkStyles } from "./components/link";
import { drawerStyles } from "./components/drawer";
import { CardComponent } from "./additions/card/card";
import { CardBodyComponent } from "./additions/card/cardBody";
import { CardHeaderComponent } from "./additions/card/cardHeader";
import { MainPanelComponent } from "./additions/layout/mainPanel";
import { PanelContentComponent } from "./additions/layout/panelContent";
import { PanelContainerComponent } from "./additions/layout/panelContainer";
// import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export default extendTheme(
  { breakpoints, config }, // Breakpoints
  globalStyles,
  buttonStyles, // Button styles
  badgeStyles, // Badge styles
  linkStyles, // Link styles
  drawerStyles, // Sidebar variant for Chakra's drawer
  CardComponent, // Card component
  CardBodyComponent, // Card Body component
  CardHeaderComponent, // Card Header component
  MainPanelComponent, // Main Panel component
  PanelContentComponent, // Panel Content component
  PanelContainerComponent // Panel Container component
);
