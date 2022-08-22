import { Pencil } from "charm-icons";
import { GraphEvents, IdType, Network } from "react-vis-graph-wrapper";

import Mode from "../Mode";
import { Theme } from "../contexts/ThemeContext";
import { GRAPH_ACTION, Graph } from "../reducers/graphReducer";
import { newId } from "../utils/node";

export type Position = { x: number; y: number };

export default class EditMode implements Mode {
  private dragging: boolean = false;
  private dragPos: Position | undefined;
  private dragFrom: IdType | undefined;
  private dragTo: IdType | undefined;

  modeName = "Edit";
  icon = Pencil;

  constructor() {
    this.reset();
  }

  private reset() {
    this.dragging = false;
    this.dragPos = undefined;
    this.dragFrom = undefined;
    this.dragTo = undefined;
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
      doubleClick: ({
        nodes,
        pointer: { canvas },
      }: {
        nodes: IdType[];
        pointer: { canvas: { x: number; y: number } };
      }) => {
        const id = newId(graph.nodes);
        if (nodes.length) {
          nodes.forEach((nodeId) => {
            dispatch({
              type: "update",
              nodes: { id: id, x: canvas.x, y: canvas.y },
              edges: { id: `${nodeId}->${id}`, from: nodeId, to: id },
            });
          });
        } else {
          dispatch({
            type: "update",
            nodes: { id: id, x: canvas.x, y: canvas.y },
          });
        }
      },

      dragStart: () => {
        this.dragging = true;
      },

      hoverNode: ({ node }: { node: IdType }) => {
        if (!this.dragging) {
          this.dragFrom = node;
        } else {
          this.dragTo = node;
        }
      },

      blurNode: () => {
        if (!this.dragging) {
          this.dragFrom = undefined;
        }
        this.dragTo = undefined;
      },

      dragEnd: ({ pointer: { canvas } }) => {
        const id = this.dragFrom ?? newId(graph.nodes);
        if (this.dragTo !== undefined) {
          dispatch({
            type: "update",
            nodes:
              this.dragFrom === undefined
                ? { id: id, x: canvas.x, y: canvas.y }
                : [],
            edges: {
              id: `${id}->${this.dragTo}`,
              from: id,
              to: this.dragTo,
            },
          });
        } else if (this.dragFrom !== undefined) {
          const id = newId(graph.nodes);
          dispatch({
            type: "update",
            nodes: { id: id, x: canvas.x, y: canvas.y },
            edges: {
              id: `${this.dragFrom}->${id}`,
              from: this.dragFrom,
              to: id,
            },
          });
        }
        this.reset();
      },

      beforeDrawing: (context) => {
        if (this.dragPos !== undefined && this.dragFrom !== undefined) {
          context.beginPath();
          context.strokeStyle = theme === "light" ? "black" : "white";

          const fromPos = network.getPosition(this.dragFrom);
          const toPos =
            this.dragTo !== undefined
              ? network.getPosition(this.dragTo)
              : this.dragPos;

          context.moveTo(fromPos.x, fromPos.y);
          context.lineTo(toPos.x, toPos.y);
          context.stroke();
        }
      },
    };
  }
}
