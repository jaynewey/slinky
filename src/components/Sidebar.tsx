import { ChevronRight } from "charm-icons";
import { ReactNode } from "react";

import CharmIcon from "../components/CharmIcon";
import "../index.css";

export default ({
  show = false,
  setShow,
  children,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
  children: ReactNode;
}) => {
  return (
    <div
      className={`fixed right-0 py-4 pr-4 flex h-full z-50 bg-inherit
        backdrop-blur-sm border-l border-stone-200 dark:border-stone-800
	duration-200 sm:w-96 w-screen
	${show ? "opacity-90 translate-x-0" : "opacity-0 translate-x-full"}
      `}
    >
      <button onClick={() => setShow(false)} className="h-full px-1">
        <CharmIcon icon={ChevronRight} />
      </button>
      {children}
    </div>
  );
};
