import { Clipboard, ClipboardTick } from "charm-icons";
import { useEffect, useState } from "react";

import GraphSerializer from "../GraphSerializer";
import "../index.css";
import { GRAPH_ACTION, Graph } from "../reducers/graphReducer";
import CsvSerializer from "../serializers/CsvSerializer";
import Button from "./Button";
import CharmIcon from "./CharmIcon";

export default ({
  graph,
  dispatch,
}: {
  graph: Graph;
  dispatch: (action: GRAPH_ACTION) => void;
}) => {
  const [clipboardIcon, setClipboardIcon] = useState<
    typeof Clipboard | typeof ClipboardTick
  >(Clipboard);
  const [serializer, setSerializer] = useState<GraphSerializer>(
    new CsvSerializer()
  );
  const [serialized, setSerialized] = useState<string>(
    serializer.serialize(graph)
  );

  useEffect(() => {
    setSerialized(serializer.serialize(graph));
  }, [graph]);

  return (
    <div className="flex flex-col w-full">
      <label htmlFor="serialized" className="block text-sm font-medium">
        Serialised data
      </label>
      {serializer.description !== undefined ? (
        <p className="text-xs pb-2 opacity-80">{serializer.description}</p>
      ) : (
        <></>
      )}
      <div className="relative flex-1 group">
        <textarea
          name="serialized"
          value={serialized}
          placeholder="Copy some data or use the editor"
          className="bg-inherit p-2 rounded-md w-full h-full
	  border border-stone-200 dark:border-stone-800
	  resize-none box-border min-w-0"
          wrap="off"
          onChange={(event) => {
            setSerialized(event.target.value);
          }}
          onBlur={(event) => {
            dispatch({ type: "clear" });
            dispatch({
              type: "set",
              graph: serializer.deserialize(event.target.value),
            });
          }}
        />
        <Button
          className="absolute mt-2 mr-2 right-0 top-0 invisible group-hover:visible
	    opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out"
          onClick={() => {
            setClipboardIcon(ClipboardTick);
            if (navigator.clipboard) {
              navigator.clipboard.writeText(serialized).then(() => {
                setTimeout(() => {
                  setClipboardIcon(Clipboard);
                }, 3000);
              });
            }
            console.log(graph.nodes.get());
            console.log(graph.edges.get());
          }}
        >
          <CharmIcon icon={clipboardIcon} />
        </Button>
      </div>
    </div>
  );
};
