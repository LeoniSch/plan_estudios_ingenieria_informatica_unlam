import React, { useState, useEffect, useRef } from "react";
import { useData } from "../context/DataContext"; // Usamos el contexto
import { Materia } from "./Materia"; // Componente para cada materia

// Función para agrupar los elementos por año
const groupByYear = (data) => {
  return data.reduce((acc, curr) => {
    if (!acc[curr.year]) {
      acc[curr.year] = [];
    }
    acc[curr.year].push(curr);
    return acc;
  }, {});
};

export function Materias() {
  const { data } = useData(); // Usamos el hook del contexto para acceder al JSON
  const [selectedMateria, setSelectedMateria] = useState(null); // Estado para manejar la materia seleccionada
  const [showDependientes, setShowDependientes] = useState(null);
  const [isClickedOutside, setIsClickedOutside] = useState(false); // Detectamos si el clic fue fuera
  const containerRef = useRef(null); // Referencia al contenedor de materias

  // Agrupamos las materias por año
  const groupedData = groupByYear(data);

  // Función para manejar la selección de una materia
  const handleMateriaSelect = (codigo) => {
    setSelectedMateria(codigo); // Actualizamos la materia seleccionada
    setShowDependientes(null); // 🔥 se apaga automáticamente al cambiar de materia
  };

  const handleShowDependientes = (codigo) => {
    setShowDependientes((prev) => (prev === codigo ? null : codigo));
  };


  // Detectamos el clic fuera del contenedor
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        // Si el clic es fuera, reiniciamos la selección
        setSelectedMateria(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center mr-12">
      <div ref={containerRef}>
        {Object.keys(groupedData).map((year) => (
          <div key={year} className="flex flex-col lg:flex-row items-center my-2 gap-2">
            <h2 className="col-start-1 w-full lg:w-24 h-10 flex items-center justify-center font-bold text-base text-white rounded-lg shadow-lg
            bg-gradient-to-br from-blue-400 to-cyan-400">AÑO {year}</h2>
            <div className="
            grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 xl:grid-cols-12 gap-x-2
            ">
              {groupedData[year].map((materia) => {
                // Correlativas: Obtenerlas de la materia seleccionada
                const correlativas = selectedMateria
                  ? data.find((m) => m.codigo === selectedMateria).correlativas
                  : [];

                // Dependientes hacia adelante
                const dependientes =
                  selectedMateria && showDependientes
                    ? data
                      .filter((m) => m.correlativas.includes(selectedMateria))
                      .map((m) => m.codigo)
                    : [];

                return (
                  <Materia
                    key={materia.codigo}
                    materia={materia}
                    correlativas={correlativas}
                    dependientes={dependientes}
                    onSelect={handleMateriaSelect}
                    selectedMateria={selectedMateria}
                    onShowDependientes={handleShowDependientes}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
