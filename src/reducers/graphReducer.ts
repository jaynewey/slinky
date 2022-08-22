import { DataSet } from "vis-data";
import { Edge, IdType, Node } from "vis-network";

export type Graph = {
  nodes: DataSet<Node>;
  edges: DataSet<Edge>;
};

export type GRAPH_ACTION =
  | {
      type: "update";
      nodes?: Node | Node[];
      edges?: Edge | Edge[];
    }
  | {
      type: "delete";
      nodes?: IdType | IdType[];
      edges?: IdType | IdType[];
    }
  | {
      type: "clear";
    }
  | {
      type: "set";
      graph: Graph;
    };

export default ({ nodes, edges }: Graph, action: GRAPH_ACTION): Graph => {
  switch (action.type) {
    case "update": {
      if (action.nodes !== undefined) {
        nodes.update(action.nodes);
      }

      if (action.edges !== undefined) {
        edges.update(action.edges);
      }

      return { nodes: nodes, edges: edges };
    }
    case "delete": {
      if (action.nodes !== undefined) {
        nodes.remove(action.nodes);
      }

      if (action.edges !== undefined) {
        edges.remove(action.edges);
      }

      return { nodes: nodes, edges: edges };
    }
    case "clear": {
      return { nodes: new DataSet(), edges: new DataSet() };
    }
    case "set": {
      return action.graph;
    }
    default:
      throw new Error();
  }
};
