import { createBrowserRouter } from "react-router-dom";

import Home from "./Pages/Home";

import PublicationStandards from "./Pages/PublicationStandards";
import PublicationSteps from "./Pages/PublicationSteps";
import PublicationEthics from "./Pages/PublicationEthics";
import AddVolume from "./Pages/AddVolume";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import VolumePage from "./Pages/VolumePage";
import AboutTibyan from "./Pages/AboutTibyan";
import CommunicateWithUs from "./Pages/CommunicateWithUs";

import MembersOfTheProgram from "./Pages/MembersOfTheProgram";

import ResearchesPage from "./Pages/ResearchesPage";
import AboutMidad from "./Pages/AboutMidad";
import ResearchPledge from "./Pages/ResearchPledge";

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
    path: "/volume-page/:id",
    element: <VolumePage />,
  },
  {
    path: "/about-tibyan",
    element: <AboutTibyan />,
  },
  {
    path: "/research-page/:vid/:no",
    element: <ResearchesPage />,
  },
  {
    path: "/CommunicateWithUs",
    element: <CommunicateWithUs />,
  },
  {
    path: "/MembersOfTheProgram",
    element: <MembersOfTheProgram />,
  },
  {
    path: "/AboutMidad",
    element: <AboutMidad/>,
  },
  {
    path: "/ResearchPledge",
    element: <ResearchPledge/>
  }
]);
