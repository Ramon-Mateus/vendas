export type Produto = {
    id: number,
    nome: string,
    categoriaId: number,
    preco: number,
    fornecedorId: number,
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

export type Fornecedor = {
    id: number,
    nome: string
}

export type Estoque = {
    produtoId: number,
    nome: string,
    estoque: number,
    fornecedor: string
}