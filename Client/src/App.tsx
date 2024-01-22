import { AllRoutes } from "./Components/AllRoutes";
import "./App.css";
import SideNavbar from "./Components/SideNavbar";

function App() {
  return (
    <>
      <div className="flex">
        <SideNavbar />
        <AllRoutes />
      </div>
    </>
  );
}

export default App;
