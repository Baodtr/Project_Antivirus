import { Shield, ShieldAlert, CheckCircle, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AIMonitorWidget from "../components/AIMonitorWidget.js";

const data = [
  { name: "Mon", threats: 1, scans: 2 },
  { name: "Tue", threats: 0, scans: 1 },
  { name: "Wed", threats: 3, scans: 4 },
  { name: "Thu", threats: 1, scans: 2 },
  { name: "Fri", threats: 5, scans: 7 },
  { name: "Sat", threats: 2, scans: 3 },
  { name: "Sun", threats: 0, scans: 1 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">Tổng quan hệ thống & AI</h2>
      
      {/* AI Monitor */}
      <AIMonitorWidget 
        level="safe"
        title="AI Giám sát thời gian thực"
        recommendations={[
          "Mọi thứ đang hoạt động bình thường, không có dấu hiệu bất thường.",
          "Hệ thống đã cập nhật cơ sở dữ liệu mẫu virus mới nhất hôm nay."
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Status Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden">
          <div className="absolute top-0 w-full h-1 bg-green-500"></div>
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Được bảo vệ</h3>
            <p className="text-sm text-slate-500">Không tìm thấy mối đe dọa nào</p>
          </div>
        </div>

        {/* Quarantine Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-500">Tệp trong vùng cách ly</p>
            <p className="text-3xl font-bold text-slate-900">12</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>

        {/* Last Scan Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-500">Lần quét cuối</p>
            <p className="text-3xl font-bold text-slate-900">4 giờ trước</p>
            <p className="text-xs text-slate-400">Quét nhanh</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Biểu đồ phát hiện</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Area type="monotone" dataKey="threats" stroke="#ef4444" fillOpacity={1} fill="url(#colorThreats)" name="Mối đe dọa" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Hành động gần đây</h3>
          <ul className="space-y-4">
            {[
              { id: 1, type: "scan_full", text: "Hoàn tất quét toàn diện", time: "Hôm qua", status: "success" },
              { id: 2, type: "quarantine", text: "Cách ly 'trojan_downloader.exe'", time: "3 ngày trước", status: "alert" },
              { id: 3, type: "update", text: "Cập nhật dữ liệu virus", time: "4 ngày trước", status: "success" },
            ].map(item => (
              <li key={item.id} className="flex items-start gap-3 border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                <div className={`mt-0.5 w-2 h-2 rounded-full ${item.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                  <p className="text-sm font-medium text-slate-800">{item.text}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
