'use client'

import { Categoria, Fornecedor, Produto } from "@/app/lib/types";
import { fetchApi } from "@/app/lib/utilities";
import { Modal } from "@/components/Modal";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";

export default function CreateProduto() {
    const { register, control, handleSubmit, reset, formState: { errors } } = useForm<Produto>();
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([])
    const [open, setOpen] = useState(false)
    const [openCat, setOpenCat] = useState(false)

    const { register: registerFornecedor, handleSubmit: handleSubmitFornecedor, reset: resetFornecedor, formState: { errors: errorsFornecedor } } = useForm<Fornecedor>();
    const { register: registerCategoria, handleSubmit: handleSubmitCategoria, reset: resetCategoria, formState: { errors: errorsCategoria } } = useForm<Categoria>();

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
        });
    };

    const onSubmitFornecedor: SubmitHandler<Fornecedor> = (data) => {
        fetch('https://localhost:44334/api/fornecedor/', {
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
            resetFornecedor();
            setOpen(false);
            getFornecedores();
        });
    };

    const onSubmitCategoria: SubmitHandler<Categoria> = (data) => {
        fetch('https://localhost:44334/api/categoria/', {
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
            resetCategoria();
            setOpenCat(false);
            getCategorias();
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
        name: "fornecedorId"
    });

    const fornecedorNome = useWatch({
        control,
        name: "nome"
    });

    const categoriaNome = useWatch({
        control,
        name: "nome"
    });

    const getCategorias = async () => {
        try {
            const categorias = await fetchApi('https://localhost:44334/api/categoria');
            setCategorias(categorias);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    };

    const getFornecedores = async () => {
        try {
            const fornecedores = await fetchApi('https://localhost:44334/api/fornecedor');
            setFornecedores(fornecedores);
        } catch (error) {
            console.error("Erro ao buscar forncedores:", error);
        }
    };

    useEffect(() => {
        getFornecedores();
        getCategorias();
    }, []);

    return(
        <div className="w-2/5 gap-8 m-auto mt-32 bg-blue-100 p-10 rounded-xl">
            
            <Modal open={open} onClose={() => setOpen(false)}>
                <form  onSubmit={handleSubmitFornecedor(onSubmitFornecedor)}>
                    <div className="mb-4">
                        <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="fornecedorNome">Nome do fornecedor:</label>
                        <input
                            type="text"
                            {...registerFornecedor('nome', { required: 'Nome é obrigatório' })}
                            className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans focus:outline-none"
                        />
                        {errorsFornecedor.nome && <p className="text-red-500 text-xs italic mt-1">{errorsFornecedor.nome.message}</p>}
                    </div>

                    <button 
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full text-center py-3 rounded-md mt-5"
                    >
                        Adicionar Fornecedor
                    </button>
                </form>
            </Modal>

            <Modal open={openCat} onClose={() => setOpenCat(false)}>
                <form  onSubmit={handleSubmitCategoria(onSubmitCategoria)}>
                    <div className="mb-4">
                        <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="categoriaNome">Nome da categoria:</label>
                        <input
                            type="text"
                            {...registerCategoria('nome', { required: 'Nome é obrigatório' })}
                            className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans focus:outline-none"
                        />
                        {errorsCategoria.nome && <p className="text-red-500 text-xs italic mt-1">{errorsCategoria.nome.message}</p>}
                    </div>

                    <button 
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full text-center py-3 rounded-md mt-5"
                    >
                        Adicionar Categoria
                    </button>
                </form>
            </Modal>

            <div className="flex items-center justify-between">    
                <h1 className="font-semibold text-xl mb-5">Criar Produto</h1>
                <div className="flex items-center gap-2">
                    <button onClick={() => setOpenCat(true)} className="bg-green-500 text-white flex justify-center items-center p-2 rounded-md">
                        Criar Categoria
                    </button>
                    <button onClick={() => setOpen(true)} className="bg-green-500 text-white flex justify-center items-center p-2 rounded-md">
                        Criar Fornecedor
                    </button>
                </div>
            </div>
            
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
                    <label className="block text-gray-800 text-sm font-bold mb-1" htmlFor="fornecedor">Fornecedor</label>
                    <select {...register('fornecedorId', { required: 'Por favor, selecione um fornecedor' })} 
                    className="w-full px-3 py-2 border rounded-md text-gray-700 font-sans bg-white">
                        <option value="">Selecione uma opção</option>
                        {fornecedores.map((fornecedor) => (
                            <option key={fornecedor.id} value={fornecedor.id}>{fornecedor.nome}</option>
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

                <button 
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full text-center py-3 rounded-md mt-5"
                    >
                        Adicionar Produto
                    </button>
            </form>
        </div>
    )
}