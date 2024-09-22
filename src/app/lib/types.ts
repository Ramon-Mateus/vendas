export type Produto = {
    id: number,
    nome: string,
    categoriaId: number,
    preco: number,
    fornecedor: string,
    categoriaNome: string
}

export type ProdutoEdit = {
    id: number,
    nome: string,
    categoriaId: number,
    preco: number,
    fornecedor: string
}

export type Categoria = {
    id: number,
    nome: string
}