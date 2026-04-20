import { Globe, Users, Briefcase, DollarSign, Activity, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Tháng 1", revenue: 4000, threatsBlocked: 2400 },
  { name: "Tháng 2", revenue: 3000, threatsBlocked: 1398 },
  { name: "Tháng 3", revenue: 2000, threatsBlocked: 9800 },
  { name: "Tháng 4", revenue: 2780, threatsBlocked: 3908 },
  { name: "Tháng 5", revenue: 1890, threatsBlocked: 4800 },
  { name: "Tháng 6", revenue: 2390, threatsBlocked: 3800 },
  { name: "Tháng 7", revenue: 3490, threatsBlocked: 4300 },
];

export default function MSPDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Tổng quan MSP (Managed Service Provider)</h2>
          <p className="text-slate-500 mt-1">Quản lý đa khách hàng (Multi-tenant), giấy phép và giám sát bảo mật toàn cầu.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors shadow-sm">
            Thêm Khách hàng mới
          </button>
        </div>
      </div>
      
      {/* Global Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">14</h3>
            <p className="text-sm font-medium text-slate-500">Khách hàng Doanh nghiệp</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">+340</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">1,245</h3>
            <p className="text-sm font-medium text-slate-500">Thiết bị đang quản lý (Endpoints)</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full animate-pulse">Cảnh báo</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">15.4K</h3>
            <p className="text-sm font-medium text-slate-500">Mối đe dọa đã chặn (Tháng)</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">+5.2%</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">$24,500</h3>
            <p className="text-sm font-medium text-slate-500">Doanh thu dự kiến (MRR)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Hoạt động mã độc trên toàn cầu (Global Threat Intel)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorThreatsBlocked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="threatsBlocked" stroke="#ef4444" fillOpacity={1} fill="url(#colorThreatsBlocked)" name="Số lượng chặn" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Sự cố cần chú ý (Tenants)
          </h3>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {[
              { id: 1, client: "Công ty TNHH Bình Minh", issue: "Phát hiện Ransomware lan truyền", time: "15 phút trước", severity: "critical" },
              { id: 2, client: "Tập đoàn ABC", issue: "3 thiết bị chưa cập nhật database > 7 ngày", time: "2 giờ trước", severity: "high" },
              { id: 3, client: "Tech Solutions", issue: "Giấy phép sắp hết hạn (còn 5 ngày)", time: "Hôm qua", severity: "medium" },
            ].map(incident => (
              <div key={incident.id} className="p-4 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-sm text-indigo-700">{incident.client}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${
                    incident.severity === 'critical' ? 'bg-red-100 text-red-700 border border-red-200' :
                    incident.severity === 'high' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                    'bg-yellow-100 text-yellow-700 border border-yellow-200'
                  }`}>
                    {incident.severity}
                  </span>
                </div>
                <p className="text-xs text-slate-700 mb-2 font-medium">{incident.issue}</p>
                <div className="flex justify-between items-center text-[11px] text-slate-500">
                  <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> System Alert</span>
                  <span>{incident.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors shadow-sm">
            Truy cập Trung tâm Xử lý Sự cố (SOC)
          </button>
        </div>
      </div>
    </div>
  );
}
