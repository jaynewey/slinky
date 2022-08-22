import { Icon } from "charm-icons";
import { GraphEvents, Options } from "react-vis-graph-wrapper";
import { Network } from "vis-network";

import { Theme } from "./contexts/ThemeContext";
import { GRAPH_ACTION, Graph } from "./reducers/graphReducer";

export default interface Mode {
  readonly modeName: string;
  readonly icon: Icon;

  options(
    network: Network,
    graph: Graph,
    dispatch: (action: GRAPH_ACTION) => void,
    theme: Theme
  ): Options;

  events(
    network: Network,
    graph: Graph,
    dispatch: (action: GRAPH_ACTION) => void,
    theme: Theme
  ): GraphEvents;
}
