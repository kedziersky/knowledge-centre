import Sidebar from "../sidebar/sidebar.component";

const routes = [
  {
    path: "/dev-talks",
    name: "Dev Talks",
    component: () => null,
    layout: "/",
  },
  {
    path: "/knowledge-shots",
    name: "Knowledge Shots",
    component: () => null,
    layout: "/",
  },
  {
    path: "/coffee-breaks",
    name: "Coffee Breaks",
    component: () => null,
    layout: "/",
  },
  {
    path: "/tech-news",
    name: "Tech News",
    component: () => null,
    layout: "/",
  },
];

export function Layout({ children }: any) {
  return (
    <>
      <Sidebar
        routes={routes}
        logoText={"PURITY UI DASHBOARD"}
        // display="tru"
        sidebarVariant={"opaque"}
      />
      {children}
    </>
  );
}
