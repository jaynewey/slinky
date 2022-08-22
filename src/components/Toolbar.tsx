import { Github, Moon, ScreenMaximise, Sun } from "charm-icons";
import { useContext } from "react";
import { ReactNode } from "react";
import { Network } from "vis-network";

import Mode from "../Mode";
import ThemeContext from "../contexts/ThemeContext";
import "../index.css";
import Button from "./Button";
import CharmIcon from "./CharmIcon";

const REPO_URL = "https://www.github.com/jaynewey/slinky";

export const ToolbarButton = ({
  onClick = () => {},
  tooltip,
  children,
  className,
}: {
  onClick?: () => void;
  tooltip: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className="group relative">
      <Button onClick={onClick} className={className}>
        {children}
      </Button>
      <div
        className="absolute flex whitespace-nowrap left-full inset-y-0 items-center content-center ml-4 px-2
	    invisible group-hover:visible
	    opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out
	    bg-stone-100 dark:bg-stone-800 rounded-md 
	    "
      >
        {tooltip}
      </div>
    </div>
  );
};

export default ({
  mode,
  setMode,
  allModes,
  network,
  children,
}: {
  mode: Mode;
  setMode: (mode: Mode) => void;
  allModes: Mode[];
  network: Network | undefined;
  children?: ReactNode;
}) => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div
      className="fixed left-0 p-2 flex flex-col gap-2 h-full z-50 bg-inherit
        backdrop-blur-sm opacity-90 border-r border-stone-200 dark:border-stone-800
      "
    >
      {allModes.map((m: Mode, i) => (
        <ToolbarButton
          onClick={() => setMode(m)}
          tooltip={m.modeName}
          className={
            m.modeName === mode.modeName ? "bg-stone-200 dark:bg-stone-700" : ""
          }
          key={i}
        >
          <CharmIcon icon={m.icon} />
        </ToolbarButton>
      ))}

      <div className="mt-auto flex flex-col gap-2">
        {children}
        <ToolbarButton
          onClick={() =>
            network?.fit({
              animation: { duration: 250, easingFunction: "linear" },
            })
          }
          tooltip="Reset camera"
        >
          <CharmIcon icon={ScreenMaximise} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => setTheme(theme == "light" ? "dark" : "light")}
          tooltip="Theme"
        >
          <CharmIcon icon={theme == "light" ? Moon : Sun} />
        </ToolbarButton>
        <a href={REPO_URL} target="_blank">
          <ToolbarButton tooltip="GitHub repo">
            <CharmIcon icon={Github} />
          </ToolbarButton>
        </a>
      </div>
    </div>
  );
};
