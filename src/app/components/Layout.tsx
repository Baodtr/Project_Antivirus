import { Outlet, NavLink, useLocation, useNavigate } from "react-router";
import { 
  ShieldCheck, 
  Search, 
  Archive, 
  Clock, 
  Settings, 
  Bell,
  Building2,
  MonitorSmartphone,
  ShieldEllipsis,
  FileText,
  Globe,
  Briefcase,
  Activity,
  Bug,
  Fingerprint,
  RefreshCcw,
  BarChart2
} from "lucide-react";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current mode based on URL path
  const isMSP = location.pathname.startsWith('/msp');
  const isBusiness = location.pathname.startsWith('/business');
  const currentMode = isMSP ? 'msp' : isBusiness ? 'business' : 'individual';

  // Navigation Items per mode
  const individualNav = [
    { name: "Tổng quan", path: "/", icon: ShieldCheck },
    { name: "Quét hệ thống", path: "/scan", icon: Search },
    { name: "Vùng cách ly", path: "/quarantine", icon: Archive },
    { name: "Lịch sử", path: "/history", icon: Clock },
    { name: "Báo cáo", path: "/reports", icon: FileText },
    { name: "Cài đặt", path: "/settings", icon: Settings },
  ];

  const businessNav = [
    { name: "Tổng quan", path: "/business", icon: Building2 },
    { name: "Quản lý thiết bị", path: "/business/endpoints", icon: MonitorSmartphone },
    { name: "Chính sách bảo mật", path: "/business/policies", icon: ShieldEllipsis },
    { name: "Phân tích & Báo cáo", path: "/business/reports", icon: BarChart2 },
    { name: "Tích hợp & Cảnh báo", path: "/business/settings", icon: Settings },
  ];

  const mspNav = [
    { name: "Tổng quan MSP", path: "/msp", icon: Globe },
    { name: "Quản lý khách hàng", path: "/msp/clients", icon: Briefcase },
    { name: "Phân tích rủi ro sâu", path: "/msp/analysis", icon: Bug },
    { name: "Luật phát hiện & Chữ ký", path: "/msp/rules", icon: Fingerprint },
    { name: "Dịch vụ quản lý (MSS)", path: "/msp/services", icon: RefreshCcw },
    { name: "Báo cáo tự động", path: "/msp/reports", icon: FileText },
  ];

  const activeNav = isMSP ? mspNav : isBusiness ? businessNav : individualNav;

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mode = e.target.value;
    if (mode === 'individual') navigate('/');
    else if (mode === 'business') navigate('/business');
    else if (mode === 'msp') navigate('/msp');
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-700/50 text-white font-bold text-lg gap-3 shrink-0">
          {isMSP ? <Globe className="w-6 h-6 text-indigo-400" /> : isBusiness ? <Building2 className="w-6 h-6 text-indigo-400" /> : <ShieldCheck className="w-6 h-6 text-indigo-400" />}
          <span>MDPS Shield</span>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {activeNav.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/" || item.path === "/business" || item.path === "/msp"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive && item.path !== "#"
                        ? "bg-indigo-500/10 text-indigo-400 font-medium" 
                        : item.path === "#" ? "opacity-50 cursor-not-allowed hover:bg-transparent" : "hover:bg-slate-800 hover:text-white"
                    }`
                  }
                  onClick={(e) => {
                    if (item.path === "#") e.preventDefault();
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-slate-700/50 bg-slate-950/50 shrink-0">
          <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-semibold">Chuyển đổi Role</div>
          <select 
            value={currentMode}
            onChange={handleModeChange}
            className="w-full bg-slate-800 text-slate-300 border-none rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="individual">👤 Cá nhân (Individual)</option>
            <option value="business">🏢 Doanh nghiệp (Business)</option>
            <option value="msp">🌐 Nhà cung cấp (MSP)</option>
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-slate-800">
              {isMSP ? "Portal Nhà cung cấp dịch vụ" : isBusiness ? "Portal Quản trị Doanh nghiệp" : "Portal Người dùng Cá nhân"}
            </h1>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              isMSP ? "bg-indigo-100 text-indigo-700 border border-indigo-200" : isBusiness ? "bg-blue-100 text-blue-700 border border-blue-200" : "bg-green-100 text-green-700 border border-green-200"
            }`}>
              {isMSP ? "MSP Level" : isBusiness ? "Admin Level" : "User Level"}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-slate-500">
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <button className="flex items-center gap-2 p-1 hover:bg-slate-100 rounded-full pr-3 transition-colors">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                {isMSP ? "SA" : isBusiness ? "AD" : "HN"}
              </div>
              <span className="text-sm font-medium">
                {isMSP ? "Super Admin" : isBusiness ? "IT Manager" : "Hữu Bảo"}
              </span>
            </button>
          </div>
        </header>
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto pb-12">
             <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
