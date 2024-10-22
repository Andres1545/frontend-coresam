"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar"; // Importa el buscador

export default function ListaPersonas({ personas }) {
  // Estado para manejar la búsqueda
  const [personasFiltradas, setPersonasFiltradas] = useState(personas);
  const [paginaActual, setPaginaActual] = useState(1);
  const personasPorPagina = 20;
  const paginasVisibles = 5;

  useEffect(() => {
    setPersonasFiltradas(personas); // Inicializa con todas las personas
  }, [personas]);

  // Función para manejar la búsqueda
  const handleSearch = (searchTerm) => {
    const resultados = personas.filter((persona) => {
      // Concatenar RunCuerpo y RunDigito
      const runCompleto = `${persona.RunCuerpo}-${persona.RunDigito}`;
      return runCompleto.includes(searchTerm); // Buscar por RUN completo
    });
    setPersonasFiltradas(resultados);
    setPaginaActual(1); // Reseteamos a la primera página cuando se filtra
  };

  const totalPersonas = personasFiltradas.length;
  const totalPaginas = Math.ceil(totalPersonas / personasPorPagina);

  const indiceUltimaPersona = paginaActual * personasPorPagina;
  const indicePrimeraPersona = indiceUltimaPersona - personasPorPagina;
  const personasActuales = personasFiltradas.slice(
    indicePrimeraPersona,
    indiceUltimaPersona
  );

  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  const inicioPagina = Math.max(
    1,
    paginaActual - Math.floor(paginasVisibles / 2)
  );
  const finPagina = Math.min(totalPaginas, inicioPagina + paginasVisibles - 1);

  return (
    <div>
      {/* Aquí añadimos el componente de búsqueda */}
      <SearchBar onSearch={handleSearch} />

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {/* Tabla de personas */}
              <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      RUN
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Nombres
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Apellidos
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {personasActuales.map((persona, index) => (
                    <tr
                      key={index}
                      className="border-b border-neutral-200 dark:border-white/10"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {persona.RunCuerpo} - {persona.RunDigito}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {persona.Nombres}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {persona.ApellidoPaterno} {persona.ApellidoMaterno}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {persona.Email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Link href={`/personas/${persona.RunCuerpo}`}>VER</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Botones de paginación */}
              <div className="flex justify-center mt-4">
                <button
                  className="px-4 py-2 mx-1 bg-gray-200 rounded-md"
                  onClick={() => cambiarPagina(paginaActual - 1)}
                  disabled={paginaActual === 1}
                >
                  Anterior
                </button>

                {Array.from(
                  { length: finPagina - inicioPagina + 1 },
                  (_, index) => (
                    <button
                      key={inicioPagina + index}
                      className={`px-4 py-2 mx-1 ${
                        paginaActual === inicioPagina + index
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => cambiarPagina(inicioPagina + index)}
                    >
                      {inicioPagina + index}
                    </button>
                  )
                )}

                <button
                  className="px-4 py-2 mx-1 bg-gray-200 rounded-md"
                  onClick={() => cambiarPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
