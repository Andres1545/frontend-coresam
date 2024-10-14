import "../../globals.css";

async function loadDetalleLiqudacion(id) {
  const res = await fetch(
    `http://192.168.1.230:3000/api/liquidacion/buscarrut/${id}`
  );
  const data = await res.json();
  //console.log(data);
  return Array.isArray(data.recordset) ? data.recordset : [];
}

export default async function detalleLiquidacionPage() {
  const personas = await loadDetalleLiqudacion();
  return (
    <div>
      {/* <ListaPersonas personas={personas} /> Pasar el array completo */}
    </div>
  );
}
