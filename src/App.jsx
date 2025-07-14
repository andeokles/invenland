import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScene from "./pages/MainScene";
import EditorScene from "./pages/EditorScene";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScene />} />
        <Route path="/editor" element={<EditorScene />} />
      </Routes>
    </Router>
  );
}

export default App;