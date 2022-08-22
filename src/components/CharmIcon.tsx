import { Icon } from "charm-icons";

export default function CharmIcon({ icon }: { icon: Icon }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      dangerouslySetInnerHTML={{ __html: icon.paths }}
    ></svg>
  );
}
