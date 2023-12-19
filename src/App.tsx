import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ResultPage from "./pages/ResultPage";
import FinalizePage from "./pages/FinalizePage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Router basename="/">
      <div className="app">
        <div className="app-wrapper">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/results/:slug" element={<ResultPage />} />
            <Route path="/finalize/:slug" element={<FinalizePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
