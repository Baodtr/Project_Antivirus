import { Shield, RefreshCcw, Activity, Bell, FileText, DownloadCloud } from "lucide-react";

export default function Services() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Dịch vụ Bảo mật Quản lý (MSS) & Cập nhật</h2>
          <p className="text-slate-500 mt-1">Cấp quyền hỗ trợ từ xa, theo dõi logs hoạt động SOC và trạng thái cập nhật Database trên toàn bộ Tenants.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Managed Security Services */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-500" />
              <h3 className="text-lg font-semibold text-slate-800">Dịch vụ SOC / Giám sát 24/7</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700 animate-pulse">Online</span>
          </div>
          
          <div className="p-6 space-y-6 flex-1">
            <p className="text-sm text-slate-600 border-l-2 border-indigo-500 pl-3">
              Cho phép đội ngũ SOC (Security Operations Center) của MSP can thiệp, giám sát và cô lập thiết bị của khách hàng khi phát hiện sự cố.
            </p>
            
            <div className="space-y-4">
              {[
                { name: "Ghi log truy cập đầy đủ (Audit Log)", icon: FileText, desc: "Mọi hành động của chuyên viên SOC đều được ghi lại.", enabled: true },
                { name: "Quyền điều khiển từ xa (Remote Isolate)", icon: Activity, desc: "Cho phép SOC tự động ngắt mạng thiết bị nhiễm độc.", enabled: true },
                { name: "Cảnh báo ưu tiên (Follow/Notify)", icon: Bell, desc: "Cảnh báo khẩn cấp qua SMS/Cuộc gọi cho Admin khi có sự cố Critical.", enabled: false },
              ].map((setting, i) => (
                <div key={i} className="flex justify-between items-start gap-4 p-4 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <setting.icon className="w-5 h-5 text-slate-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900">{setting.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{setting.desc}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" className="sr-only peer" defaultChecked={setting.enabled} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-2 py-2 text-sm font-medium border border-indigo-200 text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" /> Cấp quyền hỗ trợ tạm thời (Grant Temporary Access)
            </button>
          </div>
        </div>

        {/* Centralized Updates */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCcw className="w-5 h-5 text-indigo-500" />
              <h3 className="text-lg font-semibold text-slate-800">Cập nhật Tập trung (Centralized Updates)</h3>
            </div>
            <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1">
              <DownloadCloud className="w-3.5 h-3.5" /> Force Update All
            </button>
          </div>
          
          <div className="p-6 space-y-6 flex-1">
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <span className="font-bold font-mono text-sm">v24.3</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">Database Signatures & Engines</p>
                <p className="text-xs text-slate-500 mb-2">Bản phát hành mới nhất: 24/03/2024</p>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 text-right">85% Clients đã cập nhật</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wider">Báo cáo tình trạng cập nhật theo Tenant</h4>
              <div className="space-y-3">
                {[
                  { name: "Công ty TNHH Bình Minh", progress: 100, pending: 0, status: "Hoàn tất" },
                  { name: "Tập đoàn ABC", progress: 98, pending: 10, status: "Đang cập nhật..." },
                  { name: "Tech Solutions", progress: 45, pending: 26, status: "Lỗi mạng kết nối" },
                  { name: "Global Logistics", progress: 10, pending: 279, status: "Tạm dừng (Lịch trình)" },
                ].map((tenant, i) => (
                  <div key={i} className="text-sm flex flex-col gap-1.5 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-700">{tenant.name}</span>
                      <span className={`text-xs font-bold ${tenant.progress === 100 ? 'text-green-600' : tenant.progress < 50 ? 'text-red-500' : 'text-blue-600'}`}>
                        {tenant.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className={`h-1.5 rounded-full ${tenant.progress === 100 ? 'bg-green-500' : tenant.progress < 50 ? 'bg-red-400' : 'bg-blue-400'}`} style={{ width: `${tenant.progress}%` }}></div>
                      </div>
                      <span className="text-[10px] text-slate-400 w-16 text-right whitespace-nowrap">{tenant.pending} máy chờ</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
