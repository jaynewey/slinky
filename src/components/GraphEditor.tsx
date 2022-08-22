import { Bin, Padlock, SwapVertical } from "charm-icons";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import VisGraph, {
  GraphData,
  GraphEvents,
  Options,
} from "react-vis-graph-wrapper";
import { DataSet } from "vis-data";
import { Edge, IdType, Network, Node } from "vis-network";

import Mode from "../Mode";
import CharmIcon from "../components/CharmIcon";
import Export from "../components/Export";
import NodeEditor from "../components/NodeEditor";
import ThemeContext from "../contexts/ThemeContext";
import classification from "../examples/classification";
import DeleteMode from "../modes/DeleteMode";
import EditMode from "../modes/EditMode";
import ViewMode from "../modes/ViewMode";
import graphReducer from "../reducers/graphReducer";
import Sidebar from "./Sidebar";
import Toolbar, { ToolbarButton } from "./Toolbar";

type SidebarContent = "editNode" | "export" | undefined;

export default () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const [network, setNetwork] = useState<Network | undefined>();
  const [selectedNode, setSelectedNode] = useState<IdType | undefined>();
  const [mode, setMode] = useState<Mode>(new ViewMode());
  const [graph, dispatchGraph] = useReducer(graphReducer, {
    nodes: new DataSet<Node>({}),
    edges: new DataSet<Edge>({}),
  });

  const [options, setOptions] = useState<Options>({});
  const [events, setEvents] = useState<GraphEvents>({});

  const [sidebarContent, setSidebarContent] = useState<SidebarContent>();
  const [enablePhysics, setEnablePhysics] = useState<boolean>(true);

  useEffect(() => {
    setSidebarContent(selectedNode !== undefined ? "editNode" : undefined);
  }, [selectedNode]);

  useEffect(() => {
    dispatchGraph({
      type: "update",
      ...classification,
    });
  }, []);

  useEffect(() => {
    if (network !== undefined) {
      setOptions({
        layout: {},
        autoResize: true,
        nodes: {
          shape: "dot",
          font: {
            color: theme === "light" ? "black" : "white",
          },
        },
        edges: {
          smooth: true,
          color: theme === "light" ? "black" : "white",
        },
        physics: {
          enabled: enablePhysics,
          solver: "forceAtlas2Based",
          forceAtlas2Based: {
            gravitationalConstant: -100,
            centralGravity: 0.005,
            springLength: 230,
            springConstant: 0.18,
          },
        },
        ...mode.options(network, graph, dispatchGraph, theme),
      });

      const modeEvents = mode.events(network, graph, dispatchGraph, theme);

      setEvents({
        ...modeEvents,
        // combine common event handlers
        selectNode: ({ nodes }) => {
          modeEvents.selectNode?.();
          setSelectedNode(nodes?.[0]);
        },
        deselectNode: () => {
          modeEvents.deselectNode?.();
          setSelectedNode(undefined);
        },
        dragStart: ({ nodes }) => {
          modeEvents.dragStart?.();
          setSelectedNode(nodes?.[0]);
        },
      });
    }
  }, [mode, network, graph, theme]);

  return (
    <>
      <Toolbar
        mode={mode}
        setMode={setMode}
        allModes={[new ViewMode(), new EditMode(), new DeleteMode()]}
        network={network}
      >
        <ToolbarButton
          onClick={() => dispatchGraph({ type: "clear" })}
          tooltip="Clear"
        >
          <CharmIcon icon={Bin} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => setEnablePhysics(!enablePhysics)}
          tooltip={enablePhysics ? "Lock physics" : "Unlock physics"}
          className={!enablePhysics ? "bg-stone-200 dark:bg-stone-700" : ""}
        >
          <CharmIcon icon={Padlock} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            setSidebarContent(
              sidebarContent === "export" ? undefined : "export"
            );
          }}
          tooltip="Import / Export"
          className={
            sidebarContent === "export" ? "bg-stone-200 dark:bg-stone-700" : ""
          }
        >
          <CharmIcon icon={SwapVertical} />
        </ToolbarButton>
      </Toolbar>
      <Sidebar
        show={sidebarContent !== undefined}
        setShow={(show) => {
          if (!show) {
            setSidebarContent(undefined);
          }
        }}
      >
        {sidebarContent ? (
          {
            editNode: (
              <NodeEditor
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
                graph={graph}
                dispatch={dispatchGraph}
              />
            ),
            export: <Export graph={graph} dispatch={dispatchGraph} />,
          }[sidebarContent] ?? <></>
        ) : (
          <></>
        )}
      </Sidebar>
      <div className="flex justify-center h-screen">
        <VisGraph
          graph={{
            nodes: graph.nodes.map((node) => node),
            edges: graph.edges.map((edge) => edge),
          }}
          options={options}
          events={events}
          ref={(network) => {
            setNetwork(network ?? undefined);
          }}
        />
      </div>
    </>
  );
};
