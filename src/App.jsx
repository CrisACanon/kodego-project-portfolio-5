import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import routes from "./routes";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={route.element}
              exact
            />
          );
        })}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
