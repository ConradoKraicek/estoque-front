import { Produto } from './produto.model';
import { Filial } from './filial.model';

export interface EstoqueFilial {
  id: number;
  filialNome: string;
  produtoNome: string;
  quantidade: number;
  produto: Produto;
  estoqueMinimo: number;
}
