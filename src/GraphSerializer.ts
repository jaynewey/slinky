import { Graph } from "./reducers/graphReducer";

export default interface GraphSerializer {
  readonly description: string | undefined;
  serialize: (graph: Graph) => string;
  deserialize: (serialized: string) => Graph;
}
