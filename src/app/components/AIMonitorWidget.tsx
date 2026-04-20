import { Activity, ShieldAlert, ShieldCheck, AlertTriangle, Lightbulb, ShieldBan } from "lucide-react";

type AILevel = 'safe' | 'medium' | 'danger';

interface AIMonitorWidgetProps {
  level: AILevel;
  title?: string;
  recommendations: string[];
  warnings?: string[];
}

export default function AIMonitorWidget({ level, title = "AI Giám sát Hệ thống", recommendations, warnings = [] }: AIMonitorWidgetProps) {
  const getLevelConfig = () => {
    switch (level) {
      case 'safe': return {
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        pulseColor: 'bg-green-500',
        icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
        label: 'An toàn'
      };
      case 'medium': return {
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        pulseColor: 'bg-yellow-500',
        icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
        label: 'Trung bình'
      };
      case 'danger': return {
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        pulseColor: 'bg-red-500',
        icon: <ShieldAlert className="w-6 h-6 text-red-600" />,
        label: 'Nguy hiểm'
      };
    }
  };

  const config = getLevelConfig();

  return (
    <div className={`rounded-xl shadow-sm border p-6 flex flex-col transition-all ${config.borderColor} ${config.bgColor}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`absolute -inset-1 rounded-full ${config.pulseColor} opacity-30 animate-ping`}></div>
            <div className={`relative p-2 rounded-lg bg-white border ${config.borderColor}`}>
              <Activity className={`w-5 h-5 ${config.color}`} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              {title}
            </h3>
            <p className={`text-sm font-semibold mt-0.5 flex items-center gap-1 ${config.color}`}>
              Mức độ: {config.label}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {warnings.length > 0 && (
          <div className="bg-white/60 p-3 rounded-lg border border-red-100">
            <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2 flex items-center gap-1">
              <ShieldBan className="w-3 h-3" /> Cảnh báo xâm nhập
            </h4>
            <ul className="space-y-1">
              {warnings.map((w, i) => (
                <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span> {w}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-white/60 p-3 rounded-lg border border-slate-200/50">
          <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Lightbulb className="w-3 h-3" /> AI Đề xuất giải pháp
          </h4>
          <ul className="space-y-1.5">
            {recommendations.map((r, i) => (
              <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                <span className="text-indigo-500 mt-0.5">•</span> {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
