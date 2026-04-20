import { useState } from "react";
import { Clock, RefreshCcw, ShieldCheck, Mail, Smartphone } from "lucide-react";

export default function Settings() {
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [realTime, setRealTime] = useState(true);
  const [emailAlert, setEmailAlert] = useState(false);
  
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Cài đặt hệ thống</h2>
        <p className="text-slate-500 mt-1">Quản lý các lịch trình quét tự động, cập nhật và cấu hình cảnh báo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Protection Settings */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-500" />
                Bảo vệ thời gian thực
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Giám sát hệ thống</p>
                  <p className="text-sm text-slate-500">Tự động quét các tệp tải xuống và thực thi.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={realTime} onChange={() => setRealTime(!realTime)} aria-label="Giám sát hệ thống" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <RefreshCcw className="w-5 h-5 text-indigo-500" />
                Cập nhật cơ sở dữ liệu
              </h3>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-md transition-colors">
                Kiểm tra ngay
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Tự động cập nhật</p>
                  <p className="text-sm text-slate-500">Giữ dữ liệu virus luôn mới nhất mỗi 4 giờ.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={autoUpdate} onChange={() => setAutoUpdate(!autoUpdate)} aria-label="Tự động cập nhật" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                Phiên bản hiện tại: <span className="font-medium text-slate-600">DB-2024.03.25_v2</span> (Đã cập nhật lúc 08:00)
              </p>
            </div>
          </div>
        </div>

        {/* Schedule & Alerts */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-500" />
                Lịch trình quét tự động
              </h3>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label htmlFor="scan-type" className="block text-sm font-medium text-slate-700 mb-1">Loại quét</label>
                <select id="scan-type" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Quét nhanh (Hàng ngày)</option>
                  <option>Quét toàn diện (Hàng tuần)</option>
                  <option>Chỉ quét thư mục được chỉ định</option>
                  <option>Tắt</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="scan-time" className="block text-sm font-medium text-slate-700 mb-1">Thời gian (Giờ)</label>
                  <input id="scan-time" type="time" defaultValue="03:00" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label htmlFor="scan-day" className="block text-sm font-medium text-slate-700 mb-1">Ngày trong tuần</label>
                  <select id="scan-day" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Thứ 7</option>
                    <option>Chủ nhật</option>
                    <option>Hàng ngày</option>
                  </select>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors shadow-sm">
                Lưu lịch trình
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Mail className="w-5 h-5 text-indigo-500" />
                Cấu hình cảnh báo
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="font-medium text-slate-900">Email cảnh báo</p>
                    <p className="text-xs text-slate-500">Nhận thông báo khi phát hiện mã độc</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={emailAlert} onChange={() => setEmailAlert(!emailAlert)} aria-label="Email cảnh báo" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              {emailAlert && (
                <div>
                  <label htmlFor="email-alert" className="block text-sm font-medium text-slate-700 mb-1">Địa chỉ email</label>
                  <input id="email-alert" type="email" placeholder="Nhập địa chỉ email..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 animate-in fade-in" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
