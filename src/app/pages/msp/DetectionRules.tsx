import { useState } from "react";
import { ListChecks, GitBranchPlus, BookOpen, Send, Fingerprint, Bug, Filter, Activity } from "lucide-react";

export default function DetectionRules() {
  const [activeTab, setActiveTab] = useState<'behavior' | 'signature'>('behavior');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Luật Phát hiện & Signatures</h2>
          <p className="text-slate-500 mt-1">Phát triển, kiểm thử và triển khai các luật nhận diện hành vi (Behavior) hoặc mẫu chữ ký (Signature).</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Import YARA Rules
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <GitBranchPlus className="w-4 h-4" /> Tạo luật mới
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('behavior')}
          className={`pb-3 px-6 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'behavior' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <Activity className="w-4 h-4" />
          Behavior-Based Detection
        </button>
        <button 
          onClick={() => setActiveTab('signature')}
          className={`pb-3 px-6 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'signature' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <Fingerprint className="w-4 h-4" />
          Signature Development
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-96">
            <input 
              type="text" 
              placeholder={`Tìm kiếm ${activeTab === 'behavior' ? 'luật hành vi' : 'chữ ký (Hash/Yara)'}...`} 
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            <Filter className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer">
              <option>Trạng thái: Tất cả</option>
              <option>Đang hoạt động (Active)</option>
              <option>Chế độ Test (Audit only)</option>
              <option>Vô hiệu hóa</option>
            </select>
          </div>
        </div>

        {/* Table Behavior */}
        {activeTab === 'behavior' && (
          <div className="overflow-x-auto animate-in slide-in-from-right-4 duration-300">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Tên quy tắc (Rule Name)</th>
                  <th className="px-6 py-4">Hành động chặn</th>
                  <th className="px-6 py-4">Mức độ đe dọa</th>
                  <th className="px-6 py-4">Nhóm khách hàng áp dụng</th>
                  <th className="px-6 py-4 text-center">Trạng thái</th>
                  <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: "Phát hiện mã hóa hàng loạt (Ransomware)", action: "Block & Isolate", severity: "Critical", targets: "Global (Tất cả)", status: "Active" },
                  { name: "Quyền Admin lạ từ PowerShell", action: "Alert Only", severity: "High", targets: "Enterprise Tier", status: "Audit" },
                  { name: "Macro Excel chạy shellcode", action: "Block", severity: "High", targets: "Công ty ABC, XYZ", status: "Active" },
                  { name: "Sửa đổi Registry Start-up", action: "Alert Only", severity: "Medium", targets: "Global (Tất cả)", status: "Disabled" },
                ].map((rule, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Activity className="w-4 h-4 text-indigo-500" />
                        <span className="font-medium text-slate-900">{rule.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">{rule.action}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                        rule.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                        rule.severity === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {rule.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{rule.targets}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        rule.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                        rule.status === 'Audit' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${rule.status === 'Active' ? 'bg-green-500' : rule.status === 'Audit' ? 'bg-blue-500' : 'bg-slate-400'}`}></span>
                        {rule.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors flex items-center gap-1 ml-auto">
                        <Send className="w-3.5 h-3.5" /> Triển khai
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Signature */}
        {activeTab === 'signature' && (
          <div className="overflow-x-auto animate-in slide-in-from-left-4 duration-300">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Tên mẫu / Hash / YARA</th>
                  <th className="px-6 py-4">Loại</th>
                  <th className="px-6 py-4">Ngày tạo</th>
                  <th className="px-6 py-4">Đã phân tích từ mẫu</th>
                  <th className="px-6 py-4 text-center">False Positives (Tuần)</th>
                  <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: "Win32.Trojan.Emotet.v4", type: "YARA", date: "24/03/2024", source: "Sample_8x9A.exe", fps: "0" },
                  { name: "e3b0c44298fc1c149afbf4c8996fb924", type: "MD5 Hash", date: "20/03/2024", source: "invoice_doc.pdf.exe", fps: "2" },
                  { name: "Behavior.Downloader.PowerShell", type: "Heuristics", date: "15/03/2024", source: "SOC Team Analysis", fps: "12 (Cảnh báo)" },
                ].map((sig, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Bug className="w-4 h-4 text-red-500" />
                        <span className="font-medium text-slate-900 font-mono text-xs bg-slate-100 px-2 py-1 rounded">{sig.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">{sig.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{sig.date}</td>
                    <td className="px-6 py-4 text-sm text-indigo-600 underline cursor-pointer decoration-indigo-200 hover:decoration-indigo-500">{sig.source}</td>
                    <td className="px-6 py-4 text-center text-sm font-medium">
                      <span className={`${sig.fps !== "0" ? 'text-orange-600' : 'text-green-600'}`}>{sig.fps}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors flex items-center gap-1 ml-auto">
                        <ListChecks className="w-4 h-4" /> So sánh/Kiểm thử
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
