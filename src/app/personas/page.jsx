import ListaPersonas from "../components/ListaPersonas";

async function loadPersonas() {
  const res = await fetch("http://192.168.1.230:3000/api/liquidacion/usuarios");
  const data = await res.json();
  //console.log(data);
  return Array.isArray(data.recordset) ? data.recordset : [];
}

export default async function personasPage() {
  const personas = await loadPersonas();
  return (
    <div>
      <ListaPersonas personas={personas} /> {/* Pasar el array completo */}
    </div>
  );
}
