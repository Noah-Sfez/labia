import { createBrowserRouter } from "react-router-dom";
import LabIALanding from "./pages/LabIALanding";
import LabResultsPage from "./pages/LabResultsPage";
import Analysis from "./pages/Analysis";
import Upload from "./pages/Upload";
import Manual from "./pages/Manual";
import ManualValues from "./pages/ManualValues";
import Help from "./pages/Help";

export const router = createBrowserRouter([
  { path: "/", element: <LabIALanding /> },
  { path: "/analysis", element: <Analysis /> },
  { path: "/upload", element: <Upload /> },
  { path: "/manual", element: <Manual />},
  { path: "/manual/values", element: <ManualValues /> },
  { path: "/results", element: <LabResultsPage />},
  { path: "/help", element: <Help />}
]);
