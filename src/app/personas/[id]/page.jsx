import DetalleLiquidacion from "@/app/components/DetalleLiquidacion";
import "../../globals.css";

async function loadDetalleLiqudacion(id) {
  const res = await fetch(
    `http://192.168.1.241:4000/api/liquidacion/usuarios/rut/${id}`
  );
  const data = await res.json();
  //console.log(data);
  return data; //Array.isArray(data.recordset) ? data.recordset : [];
}

export default async function detalleLiquidacionPage({ params }) {
  const liquidaciones = await loadDetalleLiqudacion(params.id);
  return (
    <div>
      <DetalleLiquidacion liquidaciones={liquidaciones} />
    </div>
  );
}
