import { trayectoColors } from "../colors";

export function Materia({
  materia,
  correlativas,
  dependientes,
  onSelect,
  selectedMateria,
  onShowDependientes
}) {
  const isSelected = selectedMateria === materia.codigo;
  const isCorrelativa = correlativas.includes(materia.codigo);
  const isDependiente = dependientes.includes(materia.codigo);

  // Color de fondo según el trayecto
  const colorClass = trayectoColors[materia.trayecto] || "bg-gray-400";

  // Desactivamos si hay una materia seleccionada,
  // y esta no es ni correlativa ni la seleccionada misma
  const shouldDisable =
    selectedMateria &&
    !isSelected &&
    !isCorrelativa &&
    !isDependiente;

  const disableClass = shouldDisable ? "bg-gray-400 text-gray-800" : "";
  const selectedClass = isSelected
    ? "border-4 border-yellow-400 shadow-xl shadow-yellow-400/60 scale-105 z-10 animate-jiggle"
    : "";
  const correlativaClass =
    isCorrelativa && !isSelected
      ? "border-4 border-red-500 shadow-lg shadow-red-500/50 scale-105 animate-[pulsing_1s_linear_infinite] z-90"
      : "";
  const dependienteClass =
    isDependiente && !isSelected
      ? "border-4 border-green-500 shadow-lg shadow-green-500/50 scale-105"
      : "";

  const handleClick = () => {
    if (isSelected) {
      onSelect(null);
    } else {
      onSelect(materia.codigo);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        ${colorClass}
        ${disableClass}
        ${selectedClass}
        ${correlativaClass}
        ${dependienteClass}
        relative
        flex flex-col justify-center items-center font-semibold
        col-span-1 p-2 text-white text-center rounded-xl h-38 w-30  
        cursor-pointer transition-all duration-200
      `}
    >
      {/* Nombre materia */}
      <span className="mb-6">{materia.asignatura}</span>

      {/* Botones de acción */}
      <div className="absolute bottom-2 right-2 flex space-x-2">
        {isSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // evita que dispare el onClick del contenedor
              onShowDependientes?.(materia.codigo);
            }}
            className="p-1 bg-white/20 hover:bg-white/40 rounded-full"
            title="Ver materias dependientes"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-link"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 15l6 -6" /><path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" /><path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" /></svg>
          </button>
        )}

        {/* Link al programa PDF (siempre que exista) */}
        {materia.programaUrl && (
          <a
            href={materia.programaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1 bg-white/20 hover:bg-white/40 rounded-full"
            title="Ver Programa"
          >
            <svg xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-file">
              <path
                stroke="none"
                d="M0 0h24v24H0z"
                fill="none" />
              <path
                d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path
                d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

