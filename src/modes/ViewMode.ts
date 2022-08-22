import { Move } from "charm-icons";

import Mode from "../Mode";

export default class ViewMode implements Mode {
  modeName = "View";
  icon = Move;

  options() {
    return {
      interaction: { dragNodes: true, dragView: true },
    };
  }

  events() {
    return {};
  }
}
