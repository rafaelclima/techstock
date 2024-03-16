interface Elementos {
  recente: string;
  action: number;
}

export default function TableRecente({ recente, action }: Elementos) {
  return (
    <div className="flex flex-col ml-8">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-start text-xs font-medium bg-zinc-800 uppercase"
                  >
                    Itens Recentes
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-xs font-medium bg-zinc-800 uppercase"
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100 dark:hover:bg-zinc-900">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    {recente}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-purple-500 hover:text-purple-400 disabled:opacity-50 disabled:pointer-events-none dark:text-purple-500 dark:focus:outline-none"
                    >
                      Ver {action}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
