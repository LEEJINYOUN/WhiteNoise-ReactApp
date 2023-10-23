import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { HiOutlineMusicNote, HiMusicNote } from "react-icons/hi";

export const NAVBAR_MENU = [
  {
    href: "/",
    icon: <AiOutlineHome />,
    clickedIcon: <AiFillHome />,
  },
  {
    href: "/lists",
    icon: <HiOutlineMusicNote />,
    clickedIcon: <HiMusicNote />,
  },
];
