import { Eraser } from "charm-icons";
import { GraphEvents, IdType, Network } from "react-vis-graph-wrapper";

import Mode from "../Mode";
import { Theme } from "../contexts/ThemeContext";
import { GRAPH_ACTION, Graph } from "../reducers/graphReducer";
import { Position } from "./EditMode";

export default class DeleteMode implements Mode {
  private dragging: boolean = false;
  private dragPos: Position | undefined;

  modeName = "Delete";
  icon = Eraser;

  constructor() {
    this.reset();
  }

  private reset() {
    this.dragging = false;
  }

  options() {
    return {
      interaction: { dragNodes: false, dragView: false, hover: true },
    };
  }

  events(
    network: Network,
    graph: Graph,
    dispatch: (action: GRAPH_ACTION) => void,
    theme: Theme
  ): GraphEvents {
    document.onmousemove = ({ pageX, pageY }) => {
      if (this.dragging) {
        this.dragPos = network?.DOMtoCanvas({ x: pageX, y: pageY });
        network.redraw();
      }
    };

    return {
      dragStart: () => {
        this.dragging = true;
      },

      hoverNode: ({ node }: { node: IdType }) => {
        if (this.dragging) {
          dispatch({
            type: "delete",
            nodes: node,
            edges: network.getConnectedEdges(node),
          });
        }
      },

      hoverEdge: ({ edge }: { edge: IdType }) => {
        if (this.dragging) {
          dispatch({
            type: "delete",
            edges: edge,
          });
        }
      },

      blurNode: () => {},

      dragEnd: () => {
        this.reset();
      },
    };
  }
}
