export interface Produto {
  id?: number;
  produtoNome?: string;
  descricao?: string;
  preco?: number;
  estoqueMinimo?: number;
  codigoBarras: string;
  //categoria?: string;
}
