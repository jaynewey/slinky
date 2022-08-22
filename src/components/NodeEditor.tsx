import { Share, Tag } from "charm-icons";
import { Edge, IdType, Node } from "vis-network";

import Input from "../components/Input";
import "../index.css";
import { GRAPH_ACTION, Graph } from "../reducers/graphReducer";

export default ({
  selectedNode,
  setSelectedNode,
  graph,
  dispatch,
}: {
  selectedNode: IdType | undefined;
  setSelectedNode: (node: IdType | undefined) => void;
  graph: Graph;
  dispatch: (action: GRAPH_ACTION) => void;
}) => {
  return (
    <>
      <div className="flex flex-col w-full gap-4">
        <Input
          label="Label"
          icon={Tag}
          id="label"
          value={selectedNode ? graph.nodes.get(selectedNode)?.label ?? "" : ""}
          onChange={(event) => {
            dispatch({
              type: "update",
              nodes: {
                ...graph.nodes.get(selectedNode ?? []),
                label: (event.target as HTMLInputElement).value,
              },
            });
          }}
          placeholder="Give the node a label"
        />
        <Input
          label="Group"
          icon={Share}
          id="group"
          list="groups"
          value={selectedNode ? graph.nodes.get(selectedNode)?.group ?? "" : ""}
          onChange={(event) => {
            dispatch({
              type: "update",
              nodes: {
                ...graph.nodes.get(selectedNode ?? []),
                group: (event.target as HTMLInputElement).value,
              },
            });
          }}
          placeholder="Add the node to a group"
        />
        <datalist id="groups">
          {[...new Set(graph.nodes.map((node) => node.group ?? ""))]
            .filter(
              (group) =>
                (group.length &&
                  selectedNode !== undefined &&
                  group != graph.nodes.get(selectedNode)?.group) ??
                ""
            )
            .map((group, i) => {
              return <option value={group} key={i} />;
            })}
        </datalist>
      </div>
    </>
  );
};
