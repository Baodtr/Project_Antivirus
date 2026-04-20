import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout.js";

// Trang đăng nhập
import LoginPage from "./pages/LoginPage.js";
// Cá nhân
import Dashboard from "./pages/Dashboard.js";
import Scanner from "./pages/Scanner.js";
import Quarantine from "./pages/Quarantine.js";
import History from "./pages/History.js";
import IndividualReports from "./pages/Reports.js";
import IndividualSettings from "./pages/Settings.js"; // Đổi tên để tránh nhầm lẫn

// Doanh nghiệp
import BusinessDashboard from "./pages/business/BusinessDashboard.js";
import Endpoints from "./pages/business/Endpoints.js";
import Policies from "./pages/business/Policies.js";
import BusinessReports from "./pages/business/Reports.js";
import BusinessSettings from "./pages/business/Settings.js";

// Nhà cung cấp
import MSPDashboard from "./pages/msp/MSPDashboard.js";
import Clients from "./pages/msp/Clients.js";
import ThreatAnalysis from "./pages/msp/ThreatAnalysis.js";
import DetectionRules from "./pages/msp/DetectionRules.js";
import Services from "./pages/msp/Services.js";
import MSPReports from "./pages/msp/Reports.js";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      // Individual User
      { index: true, Component: Dashboard },
      { path: "scan", Component: Scanner },
      { path: "quarantine", Component: Quarantine },
      { path: "history", Component: History },
      { path: "reports", Component: IndividualReports },
      { path: "settings", Component: IndividualSettings },
      
      // Business Admin
      { path: "business", Component: BusinessDashboard },
      { path: "business/endpoints", Component: Endpoints },
      { path: "business/policies", Component: Policies },
      { path: "business/reports", Component: BusinessReports },
      { path: "business/settings", Component: BusinessSettings },
      
      // Service Provider (MSP)
      { path: "msp", Component: MSPDashboard },
      { path: "msp/clients", Component: Clients },
      { path: "msp/analysis", Component: ThreatAnalysis },
      { path: "msp/rules", Component: DetectionRules },
      { path: "msp/services", Component: Services },
      { path: "msp/reports", Component: MSPReports },
    ],
  },
]);
