'use client'

import { Categoria, Produto } from "@/app/lib/types";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";

export default function CreateProduto() {
    const { register, control, handleSubmit, reset, formState: { errors } } = useForm<Produto>();
    const [categorias, setCategorias] = useState<Categoria[]>([])

    const onSubmit: SubmitHandler<Produto> = (data) => {
        fetch('https://localhost:44334/api/produto/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                ...data
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao enviar os dados para API');
            }
            return response.json();
        })
        .then((data) => {
            reset();
            //router.replace('/home');
        });
    };

    const nomeProduto = useWatch({
        control,
        name: "nome"
    });

    const categoriaProduto = useWatch({
        control,
        name: "categoriaId"
    });

    const precoProduto = useWatch({
        control,
        name: "preco",
        defaultValue: 0
    });

    const fornecedorProduto = useWatch({
        control,
        name: "fornecedor"
    });

    useEffect(() => {
        const getCategorias = async () => {
            try {
                const categorias = await fetchCategorias();
                setCategorias(categorias);
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        };
      
          getCategorias();
    }, []);

    return(
        <div className="w-2/5 gap-8 m-auto mt-32 bg-blue-100 p-10 rounded-xl">
            <h1 className="font-semibold text-xl mb-5">Criar Produto</h1>

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
                        <select {...register('categoriaId', { required: 'Por favor, selecione uma categoria' })} 
                        className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans bg-white">
                            <option value="">Selecione uma opção</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
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
                        {...register('preco', {required: 'Preço é obrigatório', valueAsNumber: true, min: 0, setValueAs: (value) => value === "" ? 0 : value})}
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
                        className="bg-blue-600 text-white w-full text-center py-3 rounded-md mt-5"
                    >
                        Adicionar Produto
                    </button>
            </form>
        </div>
    )
}

async function fetchCategorias() {
    const response = await fetch('https://localhost:44334/api/categoria');
    const data = await response.json();
    return data;
}