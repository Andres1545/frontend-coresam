"use client";
import { useState } from "react";
import Link from "next/link";

export default function ListaPersonas({ personas }) {
  // Estado para manejar la paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const personasPorPagina = 20; // Número de personas por página
  const paginasVisibles = 5; // Número de botones de página visibles
  const totalPersonas = personas.length; // Total de registros traídos
  const totalPaginas = Math.ceil(totalPersonas / personasPorPagina); // Total de páginas

  // Calcular el índice de la primera y última persona a mostrar
  const indiceUltimaPersona = paginaActual * personasPorPagina;
  const indicePrimeraPersona = indiceUltimaPersona - personasPorPagina;
  const personasActuales = personas.slice(
    indicePrimeraPersona,
    indiceUltimaPersona
  );

  // Función para cambiar de página
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  // Calcular el rango de páginas visibles (para mostrar solo un número limitado de botones)
  const inicioPagina = Math.max(
    1,
    paginaActual - Math.floor(paginasVisibles / 2)
  );
  const finPagina = Math.min(totalPaginas, Math.max() + paginasVisibles - 1);

  return (
    <div>
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
                {/* Botón de Página Anterior */}
                <button
                  className="px-4 py-2 mx-1 bg-gray-200 rounded-md"
                  onClick={() => cambiarPagina(paginaActual - 1)}
                  disabled={paginaActual === 1} // Desactivar si es la primera página
                >
                  Anterior
                </button>

                {/* Botones de número de página (solo mostrar un número limitado) */}
                {Array.from(
                  { length: finPagina - Math.max() + 1 },
                  (_, index) => (
                    <button
                      key={Math.max() + index}
                      className={`px-4 py-2 mx-1 ${
                        paginaActual === Math.max() + index
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => cambiarPagina(Math.max() + index)}
                    >
                      {Math.max() + index}
                    </button>
                  )
                )}

                {/* Botón de Página Siguiente */}
                <button
                  className="px-4 py-2 mx-1 bg-gray-200 rounded-md"
                  onClick={() => cambiarPagina(paginaActual + 1)}
                  disabled={paginaActual === totalPaginas} // Desactivar si es la última página
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
