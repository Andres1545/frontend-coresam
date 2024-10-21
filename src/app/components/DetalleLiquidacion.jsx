export default function DetalleLiquidacion({ liquidaciones }) {
  // Verificamos si 'liquidaciones' tiene datos y que el array no esté vacío
  if (!liquidaciones || liquidaciones.length === 0) {
    return <div>No hay liquidaciones disponibles.</div>;
  }

  // Tomamos los datos del trabajador del primer objeto del array
  const trabajador = liquidaciones[0];

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {/* Verificamos si 'trabajador' tiene los datos necesarios */}
              {trabajador ? (
                <h1 className="text-lg font-bold mb-4">
                  {trabajador.Nombres} {trabajador.ApellidoPaterno} -{" "}
                  {trabajador.RunCuerpo}-{trabajador.RunDigito}
                </h1>
              ) : (
                <div>No se encontraron detalles del trabajador.</div>
              )}

              {/* Tabla con los detalles de las liquidaciones */}
              <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th>Año</th>
                    <th>Mes</th>
                    <th>Total Haberes</th>
                    <th>Total Descuentos</th>
                    <th>Sueldo Líquido</th>
                  </tr>
                </thead>
                <tbody>
                  {liquidaciones.map((liquidacion, index) => (
                    <tr
                      key={index}
                      className="border-b border-neutral-200 dark:border-white/10"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        {liquidacion.AnoNumero}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {liquidacion.MesNumero}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {liquidacion.TotalHaberes}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {liquidacion.TotalDescuentos}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {liquidacion.SueldoLiquido}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
