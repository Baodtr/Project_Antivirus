import { useState } from "react";
import { Trash2, RotateCcw, ShieldAlert, AlertTriangle } from "lucide-react";

type QuarantinedItem = {
  id: string;
  name: string;
  path: string;
  date: string;
  threatType: string;
};

const initialItems: QuarantinedItem[] = [
  { id: "1", name: "keygen.exe", path: "C:\\Users\\HaiNam\\Downloads\\Crack\\", date: "2024-03-24 14:30", threatType: "Trojan.Win32.Generic" },
  { id: "2", name: "setup_patch.bat", path: "D:\\Games\\Mod\\", date: "2024-03-23 09:15", threatType: "HackTool:Win32/AutoKMS" },
  { id: "3", name: "suspicious_script.ps1", path: "C:\\Windows\\Temp\\", date: "2024-03-21 22:10", threatType: "Behavior.Powershell.Suspicious" },
];

export default function Quarantine() {
  const [items, setItems] = useState<QuarantinedItem[]>(initialItems);

  const handleRestore = (id: string) => {
    // In a real app, this would call the C# backend to restore the file
    // fetch(`/api/quarantine/${id}/restore`, { method: 'POST' })
    if (confirm("CẢNH BÁO: Khôi phục tệp này có thể gây nguy hiểm cho hệ thống. Bạn có chắc chắn không?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleDelete = (id: string) => {
    // fetch(`/api/quarantine/${id}`, { method: 'DELETE' })
    if (confirm("Xóa vĩnh viễn tệp này khỏi hệ thống?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleDeleteAll = () => {
    if (confirm("Xóa vĩnh viễn tất cả tệp trong vùng cách ly?")) {
      setItems([]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Vùng cách ly</h2>
          <p className="text-slate-500 mt-1">Quản lý các tệp tin độc hại đã được cách ly an toàn khỏi hệ thống.</p>
        </div>
        <button 
          onClick={handleDeleteAll}
          disabled={items.length === 0}
          className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Xóa tất cả
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4 w-1/4">Tên tệp</th>
                <th className="px-6 py-4 w-1/4">Loại đe dọa</th>
                <th className="px-6 py-4 w-1/4">Đường dẫn gốc</th>
                <th className="px-6 py-4 w-1/4">Ngày cách ly</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <ShieldAlert className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                    <p>Vùng cách ly trống. Máy tính của bạn đang an toàn.</p>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0" />
                        <span className="font-medium text-slate-900 truncate max-w-[150px]" title={item.name}>
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {item.threatType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 truncate max-w-[200px]" title={item.path}>
                      {item.path}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleRestore(item.id)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Khôi phục"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa vĩnh viễn"
                        >
                          <Trash2 className="w-4 h-4" />
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
