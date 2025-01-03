import { Routes, Route, BrowserRouter } from "react-router-dom";

import Banner from "@layouts/Banner.tsx";
import Footer from "@layouts/Footer.tsx";
import Header from "@layouts/Header.tsx";

import HomePage from "./pages/HomePage.tsx";
import SearchPage from "./pages/SearchPage.tsx";

const App = () => {
  return (
    <div className="container flow">
      <BrowserRouter>
        <Header />
        <Banner />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
