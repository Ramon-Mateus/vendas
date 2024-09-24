'use client'

import { useEffect, useState } from "react";
import { Produto } from "../lib/types";
import { config, fetchApi } from "../lib/utilities";
import Link from "next/link";

export default function Produtos(){
    const [produtos, setProdutos] = useState<Produto[]>([])

    useEffect(() => {
        const getProdutos = async () => {
            try {
                const produtos = await fetchApi(`${config.API_BASE_URL}/api/produto`);
                setProdutos(produtos);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        };

        getProdutos();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir esse produto?");

        if(confirmDelete) {
            try{
                await fetch(`${config.API_BASE_URL}/api/produto/${id}`, {
                    method: 'DELETE',
                })

                setProdutos(produtos.filter(p => p.id !== id));
            } catch (error) {
                console.error("Erro ao excluir o produto:", error);
                alert("Erro ao excluir o produto.");
            }
        }
    }

    return(
        <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Listagem de Produtos</h1>
          <Link href='../produtos/create'>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
              Adicionar Produto
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 pl-8 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                  Nome
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                  Categoria
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                  Preço
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                  Fornecedor
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-base">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {produto.nome}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-base">
                    <p className="text-gray-900 whitespace-no-wrap">{produto.categoriaNome}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-base">
                    <p className="text-gray-900 whitespace-no-wrap">
                      R$ {produto.preco.toFixed(2)}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-base">
                    <p className="text-gray-900 whitespace-no-wrap">{produto.fornecedor}</p>
                  </td>
                  <td className="py-5 border-b border-gray-200 bg-white text-base">
                    <Link className="text-white hover:bg-green-600 mr-3 bg-green-500 py-2 px-3 rounded-lg" href={`../produtos/${produto.id}`}>Editar</Link>
                    <button onClick={() => handleDelete(produto.id)} className="text-white hover:bg-red-600 bg-red-500 py-2 px-3 rounded-lg">
                        Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
}