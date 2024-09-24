'use client'

import { useEffect, useState } from "react";
import { EstoqueByCategoria } from "@/app/lib/types";
import { config, fetchApi } from "@/app/lib/utilities";

export default function EstoquePorCategoria() {
  const [estoques, setEstoques] = useState<EstoqueByCategoria[]>([])

  const getEstoques = async () => {
    try {
        const estoquesApi = await fetchApi(`${config.API_BASE_URL}/api/categoria/estoque`);
        setEstoques(estoquesApi);
    } catch (error) {
        console.error("Erro ao buscar estoques:", error);
    }
  };

  useEffect(() => {
      getEstoques();
  }, []);
  
  return (
      <div className="container mx-auto px-4 py-8">

      <div className="flex items-center mb-3">
        <h1 className="text-3xl font-bold text-gray-800">Listagem de Estoques por Categoria</h1>
      </div>
      <p className="text-xs mb-2 text-gray-600">Apenas categorias com produto(s) cadastrado(s)*</p>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 pl-8 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                Categoria
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                Estoques
              </th>
            </tr>
          </thead>
          <tbody>
            {estoques.map((estoque) => (
              <tr key={estoque.categoria}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-base">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap flex justify-center gap-2">
                        {estoque.categoria}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-base">
                  <p className="text-gray-900 whitespace-no-wrap">{estoque.estoqueTotal}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}