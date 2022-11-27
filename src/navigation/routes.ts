import { HiHome } from "react-icons/hi";
import { FiCoffee } from "react-icons/fi";
import { BiAtom } from "react-icons/bi";
import { HiDesktopComputer } from "react-icons/hi";
import { FaRegNewspaper } from "react-icons/fa";
import { FaLaughSquint } from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";
export const ROUTES = [
  {
    path: "/",
    name: "Home",
    layout: "/",
    icon: HiHome,
  },
  {
    path: "/dev-talks",
    name: "Dev Talks",
    layout: "/",
    icon: HiDesktopComputer,
  },
  {
    path: "/knowledge-shots",
    name: "Knowledge Shots",
    layout: "/",
    icon: BiAtom,
  },
  {
    path: "/coffee-breaks",
    name: "Coffee Breaks",
    layout: "/",
    icon: FiCoffee,
  },
  {
    path: "/news-feed?filter=frontend&feedType=article",
    name: "News Feed",
    layout: "/",
    icon: FaRegNewspaper,
  },
  {
    path: "/apptension-feed?filter=frontend",
    name: "Apptension Feed",
    component: () => null,
    icon: GiFamilyHouse,
    layout: "/",
  },
  {
    path: "/tech-memes",
    name: "Tech Memes",
    component: () => null,
    layout: "/",
    icon: FaLaughSquint,
  },
];
