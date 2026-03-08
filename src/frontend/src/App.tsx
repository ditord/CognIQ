import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Test from "./pages/Test";
import Results from "./pages/Results";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/test/:sessionId" element={<Test />} />
        <Route path="/results/:sessionId" element={<Results />} />
      </Routes>
    </div>
  );
}
