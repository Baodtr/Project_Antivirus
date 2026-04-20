import { FileText, Download, Filter, BarChart2, CheckCircle2, ShieldAlert } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "W1", compliance: 85, threats: 12 },
  { name: "W2", compliance: 88, threats: 8 },
  { name: "W3", compliance: 92, threats: 5 },
  { name: "W4", compliance: 95, threats: 2 },
];

export default function Reports() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Phân tích & Báo cáo Tuân thủ (Compliance)</h2>
          <p className="text-slate-500 mt-1">Tạo báo cáo chi tiết về tình trạng bảo mật, sự cố và mức độ tuân thủ tiêu chuẩn.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> Xuất báo cáo (PDF/CSV)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-indigo-500" />
              Mức độ tuân thủ 30 ngày qua
            </h3>
            <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer">
              <option value="month">Tháng này</option>
              <option value="quarter">Quý này</option>
              <option value="year">Năm nay</option>
            </select>
          </div>
          <div className="flex-1 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="compliance" stroke="#10b981" fillOpacity={1} fill="url(#colorCompliance)" name="Điểm tuân thủ (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Các mẫu báo cáo (Templates)</h3>
          <div className="space-y-3 flex-1 overflow-y-auto pr-2">
            {[
              { id: 1, title: "Báo cáo sự cố bảo mật (Incident Report)", icon: ShieldAlert, color: "text-red-500", bg: "bg-red-50", type: "Analysis" },
              { id: 2, title: "Báo cáo tuân thủ ISO 27001", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50", type: "Compliance" },
              { id: 3, title: "Chi tiết thiết bị ngoại tuyến > 7 ngày", icon: Filter, color: "text-orange-500", bg: "bg-orange-50", type: "Inventory" },
              { id: 4, title: "Lịch sử cập nhật Database", icon: FileText, color: "text-indigo-500", bg: "bg-indigo-50", type: "System" },
            ].map(template => (
              <div key={template.id} className="p-3 border border-slate-100 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors cursor-pointer group flex items-start gap-3">
                <div className={`p-2 rounded-lg ${template.bg} ${template.color} group-hover:bg-white`}>
                  <template.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700">{template.title}</h4>
                  <span className="inline-block mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {template.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm font-medium border border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
            Tùy chỉnh báo cáo
          </button>
        </div>
      </div>
    </div>
  );
}
