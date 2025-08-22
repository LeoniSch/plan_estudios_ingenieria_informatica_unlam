import { trayectoColors } from "../colors";

export function Trayectos() {
  return (
    <div className="flex justify-center gap-4 flex-wrap mb-5">
      {Object.entries(trayectoColors).map(([trayecto, colorClass]) => (
        <div
          key={trayecto}
          className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm"
        >
          <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
          <span className="text-sm font-medium">{trayecto}</span>
        </div>
      ))}
    </div>
  );
}
