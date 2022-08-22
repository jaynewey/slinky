import { DataSet } from "vis-data";
import { Edge, IdType, Node } from "vis-network";

import GraphSerializer from "../GraphSerializer";
import { Graph } from "../reducers/graphReducer";

export default class CsvSerializer implements GraphSerializer {
  description =
    "Delimiter separated values in format <id>|<label>|<group>|<child>.";

  serialize(graph: Graph) {
    const nodes = new Map<IdType, Set<IdType>>();

    graph.nodes.forEach((node: Node) => {
      if (node.id !== undefined) nodes.set(node.id, new Set());
    });

    graph.edges.forEach((edge: Edge) => {
      const [fromId, toId] = String(edge?.id).split("->").map(Number);
      const edges = nodes.get(fromId) ?? new Set();
      edges.add(toId);
      nodes.set(fromId, edges);
    });
    return Array.from(nodes, ([fromId, toIds]) => {
      return [...(toIds.size ? toIds : [""])]
        .map((toId) => {
          const fromNode = graph.nodes.get(fromId);
          return `${fromId}|${fromNode?.label ?? ""}|${
            fromNode?.group ?? ""
          }|${toId}`;
        })
        .join("\n");
    }).join("\n");
  }

  deserialize(serialized: string) {
    const nodes = new DataSet<Node>();
    const edges = new DataSet<Edge>();

    serialized.split("\n").forEach((line) => {
      const cols = line.split("|");
      if (cols.length == 4 && !isNaN(parseInt(cols[0]))) {
        nodes.update({ id: Number(cols[0]), label: cols[1], group: cols[2] });
        if (!isNaN(parseInt(cols[3]))) {
          edges.update({
            id: `${cols[0]}->${cols[3]}`,
            from: Number(cols[0]),
            to: Number(cols[3]),
          });
        }
      }
    });

    return { nodes: nodes, edges: edges };
  }
}
