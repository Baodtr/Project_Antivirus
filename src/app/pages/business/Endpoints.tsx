import { useState } from "react";
import { MonitorSmartphone, Search, Filter, MoreVertical, ShieldAlert, ShieldCheck, Activity, ShieldBan } from "lucide-react";

type Endpoint = {
  id: string;
  hostname: string;
  ip: string;
  user: string;
  group: string;
  status: 'healthy' | 'infected' | 'offline' | 'isolated';
  lastSeen: string;
  os: string;
};

const initialEndpoints: Endpoint[] = [
  { id: "1", hostname: "DEV-PC-01", ip: "192.168.1.10", user: "hai.nam", group: "Phòng IT", status: "healthy", lastSeen: "Vừa xong", os: "Windows 11" },
  { id: "2", hostname: "DEV-MAC-02", ip: "192.168.1.11", user: "minh.tuan", group: "Phòng IT", status: "offline", lastSeen: "2 giờ trước", os: "macOS 14" },
  { id: "3", hostname: "ACC-LAP-12", ip: "192.168.1.45", user: "tran.thi.b", group: "Kế toán", status: "infected", lastSeen: "5 phút trước", os: "Windows 10" },
  { id: "4", hostname: "SALES-PC-04", ip: "192.168.1.102", user: "nguyen.van.a", group: "Kinh doanh", status: "isolated", lastSeen: "Vừa xong", os: "Windows 10" },
  { id: "5", hostname: "HR-PC-02", ip: "192.168.1.55", user: "le.van.c", group: "Nhân sự", status: "healthy", lastSeen: "10 phút trước", os: "Windows 11" },
  { id: "6", hostname: "MKT-MAC-01", ip: "192.168.1.80", user: "pham.d", group: "Marketing", status: "healthy", lastSeen: "Vừa xong", os: "macOS 13" },
];

export default function Endpoints() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>(initialEndpoints);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEndpoints = endpoints.filter(ep => 
    ep.hostname.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ep.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ep.ip.includes(searchTerm)
  );

  const toggleIsolation = (id: string) => {
    setEndpoints(endpoints.map(ep => {
      if (ep.id === id) {
        return {
          ...ep,
          status: ep.status === 'isolated' ? 'healthy' : 'isolated'
        };
      }
      return ep;
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <ShieldCheck className="w-5 h-5 text-green-500" />;
      case 'infected': return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case 'offline': return <Activity className="w-5 h-5 text-slate-400" />;
      case 'isolated': return <ShieldBan className="w-5 h-5 text-orange-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">An toàn</span>;
      case 'infected': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 animate-pulse">Có nguy cơ</span>;
      case 'offline': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">Ngoại tuyến</span>;
      case 'isolated': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">Đã cách ly</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Quản lý Thiết bị đầu cuối</h2>
          <p className="text-slate-500 mt-1">Danh sách máy tính, thiết bị di động đã cài đặt MDPS client và thực hiện cô lập (Isolation).</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <MonitorSmartphone className="w-4 h-4" /> Cài đặt thiết bị mới
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors shadow-sm">
            Quét toàn bộ
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm Hostname, IP, User..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors">
              <Filter className="w-4 h-4" /> Lọc theo nhóm
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Tên thiết bị (Hostname)</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Người dùng</th>
                <th className="px-6 py-4">Nhóm</th>
                <th className="px-6 py-4">Hệ điều hành</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEndpoints.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Không tìm thấy thiết bị nào khớp với tìm kiếm.
                  </td>
                </tr>
              ) : (
                filteredEndpoints.map((ep) => (
                  <tr key={ep.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(ep.status)}
                        <div>
                          <p className="font-semibold text-slate-900">{ep.hostname}</p>
                          <p className="text-xs text-slate-500">{ep.ip}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(ep.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                      {ep.user}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <span className="bg-slate-100 px-2 py-1 rounded text-xs font-medium border border-slate-200">{ep.group}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {ep.os}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {ep.status !== 'offline' && (
                          <button 
                            onClick={() => toggleIsolation(ep.id)}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${
                              ep.status === 'isolated' 
                                ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                                : 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
                            }`}
                          >
                            {ep.status === 'isolated' ? 'Hủy cô lập' : 'Cô lập (Isolate)'}
                          </button>
                        )}
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
