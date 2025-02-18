import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AllRecordsPage from "./pages/AllRecordsPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <NavBar />

        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/records" element={<AllRecordsPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
