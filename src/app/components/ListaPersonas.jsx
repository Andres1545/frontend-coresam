"use client";

export default function ListaPersonas({ personas }) {
  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
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
                  </tr>
                </thead>
                <tbody>
                  {personas.map((persona, index) => (
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
                        {persona.ApellidoPaterno}
                        {persona.ApellidoMaterno}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {persona.Email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <button
                          onClick={() => {
                            alert("haz echo click");
                          }}
                        >
                          VER
                        </button>
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
