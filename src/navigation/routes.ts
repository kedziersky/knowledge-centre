export const ROUTES = [
  {
    path: "/",
    name: "Home",
    layout: "/",
  },
  {
    path: "/dev-talks",
    name: "Dev Talks",
    layout: "/",
  },
  {
    path: "/knowledge-shots",
    name: "Knowledge Shots",
    layout: "/",
  },
  {
    path: "/coffee-breaks",
    name: "Coffee Breaks",
    layout: "/",
  },
  {
    path: "/news-feed?filter=frontend&feedType=article",
    name: "News Feed",
    layout: "/",
  },
  {
    path: "/apptension-feed",
    name: "Apptension Feed",
    component: () => null,
    layout: "/",
  },
  {
    path: "/tech-memes",
    name: "Tech Memes",
    component: () => null,
    layout: "/",
  },
];
