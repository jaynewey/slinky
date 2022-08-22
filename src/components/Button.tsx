import { ReactNode } from "react";

import "../index.css";

export default ({
  onClick = () => {},
  children,
  className,
}: {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center p-2 rounded-md bg-inherit
	    border border-stone-200 dark:border-stone-800 hover:bg-stone-100 hover:dark:bg-stone-800 rounded
	    items-center content-center
	    ${className ?? ""}
	    `}
    >
      {children}
    </button>
  );
};
