import ListaPersonas from "../components/ListaPersonas";
async function fetchAllPersonas() {
  let personas = [];
  let offset = 0; // Empezamos desde el primer registro
  const limit = 100; // Establece cuántos registros quieres traer en cada solicitud
  let moreData = true;

  while (moreData) {
    // Hacer una petición al backend con un offset (si el backend lo soporta)
    const res = await fetch(
      `http://192.168.1.241:4000/api/liquidacion/usuarios?offset=${offset}&limit=${limit}`
    );
    const data = await res.json();

    // Añadir los nuevos datos al array
    personas = [...personas, ...data];

    // Incrementar el offset para la siguiente solicitud
    offset += limit;

    // Verificar si todavía quedan más datos por cargar
    moreData = data.length === limit; // Si el último lote no estaba completo, no hay más datos
  }

  return personas;
}

export default async function personasPage() {
  const personas = await fetchAllPersonas();
  return (
    <div>
      <ListaPersonas personas={personas} />
    </div>
  );
}
