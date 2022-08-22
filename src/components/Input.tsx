import { Icon } from "charm-icons";
import { HTMLProps } from "react";

import CharmIcon from "../components/CharmIcon";
import "../index.css";

export default ({
  label,
  icon,
  ...props
}: {
  label: string;
  icon: Icon;
} & HTMLProps<HTMLInputElement>) => {
  return (
    <div>
      <label
        htmlFor={props.id ?? ""}
        className="block text-sm font-medium pb-1"
      >
        {label}
      </label>
      <div
        className="flex flex-row justify-center bg-inherit p-2 rounded-md w-full
	      	       border border-stone-200 dark:border-stone-800
	    items-center content-center
	"
      >
        <CharmIcon icon={icon} />
        <input
          {...props}
          className="flex ml-2 pl-2 border-l border-stone-200 dark:border-stone-800 w-full bg-inherit"
        />
        {props.children ?? <></>}
      </div>
    </div>
  );
};
