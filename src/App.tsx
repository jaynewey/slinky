import GraphEditor from "./components/GraphEditor";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <div className="text-stone-900 bg-white dark:text-white dark:bg-stone-900 transition-all">
        <GraphEditor />
      </div>
    </ThemeProvider>
  );
}

export default App;
