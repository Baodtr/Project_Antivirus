import { useState } from "react";
import { Server, Mail, Smartphone, Activity, Save, RefreshCw } from "lucide-react";

export default function Settings() {
  const [siemEnabled, setSiemEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Cài đặt Tích hợp & Cảnh báo</h2>
          <p className="text-slate-500 mt-1">Cấu hình kết nối SIEM, Firewall và thông báo sự cố qua Email/SMS.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
          <Save className="w-4 h-4" /> Lưu thay đổi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Integrations */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-500" />
              Tích hợp hệ thống (SIEM/Firewall)
            </h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={siemEnabled} onChange={() => setSiemEnabled(!siemEnabled)} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label htmlFor="log-format" className="block text-sm font-medium text-slate-700 mb-1">Định dạng log</label>
              <select id="log-format" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" disabled={!siemEnabled}>
                <option>CEF (Common Event Format)</option>
                <option>Syslog</option>
                <option>JSON</option>
              </select>
            </div>
            <div>
              <label htmlFor="siem-server" className="block text-sm font-medium text-slate-700 mb-1">Máy chủ SIEM (IP/Hostname)</label>
              <input id="siem-server" type="text" defaultValue="siem.company.local:514" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" disabled={!siemEnabled} />
            </div>
            <div>
              <label htmlFor="firewall-endpoint" className="block text-sm font-medium text-slate-700 mb-1">Firewall API Endpoint</label>
              <input id="firewall-endpoint" type="text" defaultValue="https://firewall.company.local/api/v1/blocklist" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" disabled={!siemEnabled} />
              <p className="text-xs text-slate-500 mt-1">Sử dụng để tự động chặn IP độc hại trên Firewall.</p>
            </div>
            <button className="w-full mt-2 py-2 text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 flex items-center justify-center gap-2" disabled={!siemEnabled}>
              <RefreshCw className="w-4 h-4" /> Kiểm tra kết nối (Test/Show)
            </button>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" />
              Cấu hình Cảnh báo (Alerts)
            </h3>
          </div>
          <div className="p-6 space-y-6">
            {/* Email */}
            <div className="space-y-3 border-b border-slate-100 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className={`w-5 h-5 ${emailAlerts ? 'text-blue-500' : 'text-slate-400'}`} />
                  <div>
                    <p className="font-medium text-slate-900">Email Alerts</p>
                    <p className="text-xs text-slate-500">Gửi cảnh báo sự cố nghiêm trọng (Critical/High).</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={emailAlerts} onChange={() => setEmailAlerts(!emailAlerts)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <input id="email-input" type="text" defaultValue="security@company.com, admin@company.com" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" disabled={!emailAlerts} placeholder="Các email cách nhau bởi dấu phẩy" />
            </div>

            {/* SMS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className={`w-5 h-5 ${smsAlerts ? 'text-green-500' : 'text-slate-400'}`} />
                  <div>
                    <p className="font-medium text-slate-900">SMS Alerts</p>
                    <p className="text-xs text-slate-500">Gửi SMS ngay lập tức khi phát hiện Ransomware.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={smsAlerts} onChange={() => setSmsAlerts(!smsAlerts)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <input id="sms-input" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" disabled={!smsAlerts} placeholder="+84 9xx xxx xxx" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
