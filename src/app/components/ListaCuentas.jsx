"use client";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar"; // Importa el buscador
import formatoFecha from "./DateFormat";

// Función para traer todas las cuentas del backend
async function fetchAllCuentas() {
  let cuentas = [];
  let offset = 0;
  const limit = 10;
  let moreData = true;

  while (moreData) {
    const res = await fetch(
      `http://192.168.1.241:4000/api/contabilidad/movimientos/2023`
    );
    const data = await res.json();
    cuentas = [...cuentas, ...data];
    offset += limit;
    moreData = data.length === limit;
  }

  return cuentas;
}

// Página de cuentas
export default async function cuentasPage() {
  const cuentas = await fetchAllCuentas();
  return (
    <div>
      <ListaCuentas cuentas={cuentas} />
    </div>
  );
}

// Componente ListaCuentas para mostrar las cuentas
function ListaCuentas({ cuentas }) {
  const [cuentasFiltradas, setCuentasFiltradas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const cuentasPorPagina = 20;
  const paginasVisibles = 5;

  useEffect(() => {
    setCuentasFiltradas(cuentas); // Inicializa con todas las cuentas
  }, [cuentas]);

  // Función para manejar la búsqueda por año o nombre de funcionario
  const handleSearch = (searchTerm) => {
    const resultados = cuentas.filter((cuenta) => {
      const ano = `${cuenta.AnoNumero}`; // Convertir año a string para búsqueda
      const esBusquedaAno = /^\d{4}$/.test(searchTerm); // Verifica si es un año (4 dígitos)

      if (esBusquedaAno) {
        return ano === searchTerm; // Filtrar por año exacto
      } else {
        return cuenta.FuncionarioId.toLowerCase().includes(
          searchTerm.toLowerCase()
        ); // Filtrar por nombre
      }
    });
    setCuentasFiltradas(resultados);
    setPaginaActual(1); // Reseteamos a la primera página cuando se filtra
  };

  const totalCuentas = cuentasFiltradas.length;
  const totalPaginas = Math.ceil(totalCuentas / cuentasPorPagina);

  const indiceUltimaCuenta = paginaActual * cuentasPorPagina;
  const indicePrimeraCuenta = indiceUltimaCuenta - cuentasPorPagina;
  const cuentasActuales = cuentasFiltradas.slice(
    indicePrimeraCuenta,
    indiceUltimaCuenta
  );

  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  const inicioPagina = Math.max(
    1,
    paginaActual - Math.floor(paginasVisibles / 2)
  );
  const finPagina = Math.min(totalPaginas, inicioPagina + paginasVisibles - 1);

  return (
    <div>
      {/* Añadir el componente de búsqueda */}
      <SearchBar onSearch={handleSearch} />{" "}
      {/* Recibe el término de búsqueda */}
      {/* Resto del código permanece igual */}
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {/* Tabla de cuentas */}
              <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-4">
                      AÑO
                    </th>
                    <th scope="col" className="px-6 py-4">
                      DEPARTAMENTO
                    </th>
                    <th scope="col" className="px-6 py-4">
                      UNIDAD
                    </th>
                    <th scope="col" className="px-6 py-4">
                      FUNCIONARIO
                    </th>
                    <th scope="col" className="px-6 py-4">
                      FECHA
                    </th>
                    <th scope="col" className="px-6 py-4">
                      NUMERO
                    </th>
                    {/* <th scope="col" className="px-6 py-4">
                      DEBE
                    </th>
                    <th scope="col" className="px-6 py-4">
                      HABER
                    </th>
                    <th scope="col" className="px-6 py-4">
                      GLOSA
                    </th>
                    <th scope="col" className="px-6 py-4">
                      TIPO DE COMPROBANTE
                    </th>
                    <th scope="col" className="px-6 py-4">
                      ESTADO DE COMPROBANTE
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {cuentasActuales.map((cuenta, index) => (
                    <tr
                      key={index}
                      className="border-b border-neutral-200 dark:border-white/10"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {cuenta.Id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {cuenta.AnoNumero}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {cuenta.DepartamentoId}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {cuenta.UnidadId}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {cuenta.FuncionarioId}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {formatoFecha(cuenta.Fecha)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {cuenta.Numero}
                      </td>
                      {/* <td className="whitespace-nowrap px-6 py-4">
                        {cuenta.TotalDebe}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {cuenta.TotalHaber}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {cuenta.GlosaGlobal}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {cuenta.ComprobanteTipoCodigo}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {cuenta.EstadoComprobanteCodigo}
                      </td> */}
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
