import { Trayectos } from "./Trayectos";

export function Header() {
  return (
    <>
      <header className="text-center mb-5">
        <h1 className="text-3xl md:text-[2rem] text-gray-800 font-bold mb-4">
          Plan de estudio 2023 - Ingeniería Informática
        </h1>
        <div className="inline-block px-5 py-2.5 rounded-full text-white text-sm
              bg-gradient-to-tr from-[#4facfe] to-[#00f2fe]
              shadow-lg">
          🎯 Haz clic en cualquier materia para ver sus correlativas
        </div>
      </header>

      <Trayectos />
    </>
  )
}