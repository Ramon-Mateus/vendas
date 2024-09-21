export type Produto = {
    nome: string,
    categoriaId: number,
    preco: number,
    fornecedor: string
}

export type Categoria = {
    id: number,
    nome: string
}