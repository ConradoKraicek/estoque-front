export interface Produto {
  id?: number;
  nome: string;
  descricao?: string;
  preco: number;
  estoqueMinimo: number;
  codigoBarras: string;
  //categoria?: string;
}
