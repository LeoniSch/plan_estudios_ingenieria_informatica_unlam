import { createContext, useContext, useState } from 'react';
import materias from '../data/materias.json'

// Crear el contexto
const DataContext = createContext();

// Proveedor del contexto
export const DataProvider = ({ children }) => {
  // JSON de ejemplo
  const [data, setData] = useState(materias);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

// Hook para consumir el contexto
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData debe ser usado dentro de un DataProvider");
  }
  return context;
};
