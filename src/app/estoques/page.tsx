'use client'

import { useEffect, useState } from "react";
import { Estoque } from "../lib/types";
import { fetchApi } from "../lib/utilities";

export default function EstoquePage() {
    const [estoques, setEstoques] = useState<Estoque[]>([])

    useEffect(() => {
        const getProdutos = async () => {
            try {
                const estoquesApi = await fetchApi('https://localhost:44334/api/estoque');
                setEstoques(estoquesApi);
            } catch (error) {
                console.error("Erro ao buscar estoques:", error);
            }
        };

        getProdutos();
    }, []);
    
    return (
        <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Listagem de Estoques</h1>
        </div>
        <div className="flex justify-start gap-2 mb-2">
          <div className="size-3 bg-red-600 rounded-md mb-4"></div>
          <p>Produto com estoque acabando ou em falta.</p>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 pl-8 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                  Nome
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                  Quantidade
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                  Fornecedor
                </th>
              </tr>
            </thead>
            <tbody>
              {estoques.map((estoque) => (
                <tr key={estoque.produtoId}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-base">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap flex justify-center gap-2">
                          {estoque.nome}
                          { estoque.estoque <= 10 && ( <div className="size-3 bg-red-600 rounded-md"></div> ) }
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-base">
                    <p className="text-gray-900 whitespace-no-wrap">{estoque.estoque}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-base">
                    <p className="text-gray-900 whitespace-no-wrap">{estoque.fornecedor}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
}