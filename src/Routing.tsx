import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar/Navbar";
import PublicationStandards from "./Pages/PublicationStandards";
import PublicationSteps from "./Pages/PublicationSteps";
import PublicationEthics from "./Pages/PublicationEthics";
import AddVolume from "./Pages/AddVolume";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import AllVolumes from "./Pages/AllVolumes";
import VolumePage from "./Pages/VolumePage";
import AboutTibyan from "./Pages/AboutTibyan";
import CommunicateWithUs from "./Pages/CommunicateWithUs"
<<<<<<< HEAD
import MembersOfTheProgram from "./Pages/MembersOfTheProgram"
=======
import ResearchesPage from "./Pages/ResearchesPage";

>>>>>>> 863f74be1d698de79976d7f09c17de362ace2254

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/publication-standards",
    element: <PublicationStandards />,
  },
  {
    path: "/publication-steps",
    element: <PublicationSteps />,
  },
  {
    path: "/publication-ethics",
    element: <PublicationEthics />,
  },
  {
    path: "/add-volume",
    element: (
      <ProtectedRoute>
        <AddVolume />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/all-volumes",
    element: <AllVolumes/>
  },
  {
    path: "/volume-page/:id",
    element: <VolumePage/>
  },{
    path: "/about-tibyan",
    element: <AboutTibyan/>
  },{
    path: "/research-page/:vid/:id",
    element: <ResearchesPage/>
  },{
    path: "/CommunicateWithUs",
    element: <CommunicateWithUs/>
  },{
    path: "/MembersOfTheProgram",
    element: <MembersOfTheProgram/>
  }
]);
