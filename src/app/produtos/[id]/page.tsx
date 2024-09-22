'use client'

import { Categoria, Produto } from "@/app/lib/types";
import { fetchApi } from "@/app/lib/utilities";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function EditProduto() {
    const { register, control, handleSubmit, reset, formState: { errors } } = useForm<Produto>();
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [produto, setProduto] = useState<Produto | null>(null);
    const router = useRouter();
    const { id } = useParams();

    const onSubmit: SubmitHandler<Produto> = (data) => {
        fetch(`https://localhost:44334/api/produto/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                ...data,
            })
        })
        .then(() => {
            reset();
            router.replace('/produtos');
        });
    };

    useEffect(() => {
        const getProduto = async () => {
            try {
                const produto = await fetchApi(`https://localhost:44334/api/produto/${id}`);
                setProduto(produto);
                reset(produto);
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
            }
        };

        const getCategorias = async () => {
            try {
                const categorias = await fetchApi('https://localhost:44334/api/categoria');
                setCategorias(categorias);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        };

        if (id) {
            getProduto();
            getCategorias();
        }
    }, [id, reset]);

    return(
        <div className="w-2/5 gap-8 m-auto mt-32 bg-blue-100 p-10 rounded-xl">
            <h1 className="font-semibold text-xl mb-5">Editar Produto</h1>

            {produto && (
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="mb-4">
                        <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="nome">Nome:</label>
                        <input
                            type="text"
                            {...register('nome', { required: 'Nome é obrigatório' })}
                            className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans focus:outline-none"
                        />
                        {errors.nome && <p className="text-red-500 text-xs italic mt-1">{errors.nome.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="categoria">Categoria</label>
                        <select 
                            {...register('categoriaId', { required: 'Por favor, selecione uma categoria' })} 
                            className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans bg-white">
                            <option value="">Selecione uma opção</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id} selected={categoria.id === produto.categoriaId}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </select>
                        {errors.categoriaId && (
                            <p className="text-red-500 text-xs italic mt-1">{errors.categoriaId.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="preco">Preço (R$)</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register('preco', { required: 'Preço é obrigatório', valueAsNumber: true })}
                            className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans focus:outline-none"
                            min={0}
                        />
                        {errors.preco && <p className="text-red-500 text-xs italic mt-1">{errors.preco.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="fornecedor">Fornecedor:</label>
                        <input
                            type="text"
                            {...register('fornecedor', { required: "Fornecedor é obrigatório" })}
                            className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans focus:outline-none"
                        />
                        {errors.fornecedor && <p className="text-red-500 text-xs italic mt-1">{errors.fornecedor.message}</p>}
                    </div>

                    <button 
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full text-center py-3 rounded-md mt-5"
                    >
                        Salvar Alterações
                    </button>
                </form>
            )}
        </div>
    )
}