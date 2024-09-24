'use client'

import { useEffect, useState } from "react";
import { Estoque, Movimentacao, Produto } from "../lib/types";
import { fetchApi } from "../lib/utilities";
import { Modal } from "@/components/Modal";
import { SubmitHandler, useForm } from "react-hook-form";

export default function EstoquePage() {
  const [estoques, setEstoques] = useState<Estoque[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [open, setOpen] = useState(false)
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm<Movimentacao>();

  const onSubmit: SubmitHandler<Movimentacao> = (data) => {
    console.log('Dados enviados:', data);
    fetch('https://localhost:44334/api/estoque/', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            ...data,
            tipoMovimentacao: Number(data.tipoMovimentacao),
            produtoId: Number(data.produtoId)
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao enviar os dados para API');
        }
    })
    .then((data) => {
        reset();
        setOpen(false);
        getEstoques();
    });
};

  const getEstoques = async () => {
    try {
        const estoquesApi = await fetchApi('https://localhost:44334/api/estoque');
        setEstoques(estoquesApi);
    } catch (error) {
        console.error("Erro ao buscar estoques:", error);
    }
  };

  const getProdutos = async () => {
    try {
        const produtosApi = await fetchApi('https://localhost:44334/api/produto');
        setProdutos(produtosApi);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
};

  useEffect(() => {
      getEstoques();
      getProdutos();
  }, []);
  
  return (
      <div className="container mx-auto px-4 py-8">
      
      <Modal open={open} onClose={() => setOpen(false)}>
          <form  onSubmit={handleSubmit(onSubmit)} className="w-96">
            
              <div className="mb-4">
                  <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="fornecedorNome">Quantidade:</label>
                  <input
                      type="number"
                      {...register('quantidade', { required: 'Quantidade é obrigatório',  valueAsNumber: true, min: 0 })}
                      className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans focus:outline-none"
                      min={0}
                  />
                  {errors.quantidade && <p className="text-red-500 text-xs italic mt-1">{errors.quantidade.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="tipoMovimentacao">Tipo de movimentação:</label>
                <select {...register('tipoMovimentacao', { required: 'Por favor, selecione um tipo de movimentação' })} 
                  className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans bg-white">
                    <option value="">Selecione uma opção</option>
                    <option value={0}>Entrada</option>
                    <option value={1}>Saída</option>
                </select>
                {errors.tipoMovimentacao && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.tipoMovimentacao.message}</p>
                    )}
                </div>

              <div className="mb-4">
                  <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="produto">Produto:</label>
                  <select {...register('produtoId', { required: 'Por favor, selecione um produto' })} 
                  className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans bg-white">
                      <option value="">Selecione uma opção</option>
                      {produtos.map((produto) => (
                          <option key={produto.id} value={produto.id}>{produto.nome}</option>
                      ))}
                  </select>
                  {errors.produtoId && (
                      <p className="text-red-500 text-xs italic mt-1">{errors.produtoId.message}</p>
                  )}
              </div>

              <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full text-center py-3 rounded-md mt-5"
              >
                  Adicionar Movimentacão
              </button>
          </form>
      </Modal>

      <div className="flex justify-between items-center mb-3">
        <h1 className="text-3xl font-bold text-gray-800">Listagem de Estoques</h1>
      </div>
      <div className="flex gap-2 mb-2 justify-between items-center">
        <div className="flex gap-2 justify-between">
          <div className="size-3 bg-red-600 rounded-md"></div>
          <p>Produto com estoque acabando ou em falta.</p>
        </div>
        <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                  <button onClick={() => setOpen(true)} className="bg-green-500 text-white flex justify-center items-center p-2 rounded-md">
                      Criar Movimentação
                  </button>
              </div>
          </div>
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