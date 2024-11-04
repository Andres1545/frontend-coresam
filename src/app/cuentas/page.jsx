import ListaCuentas from "../components/ListaCuentas";

async function fetchAllCuentas() {
  let cuentas = [];
  let offset = 0;
  const limit = 100;
  let moreData = true;

  while (moreData) {
    const res = await fetch(
      `http://192.168.1.241:4000/api/contabilidad/movimientos/2023?offset=${offset}&limit=${limit}`
    );
    const data = await res.json();
    cuentas = [...cuentas, ...data];
    offset += limit;
    moreData = data.length === limit;
  }

  return cuentas;
}

export default async function cuentasPage() {
  const cuentas = await fetchAllCuentas(); // Cambié 'personas' a 'cuentas'
  return (
    <div>
      <ListaCuentas cuentas={cuentas} /> {/* Usar 'cuentas' aquí */}
    </div>
  );
}
