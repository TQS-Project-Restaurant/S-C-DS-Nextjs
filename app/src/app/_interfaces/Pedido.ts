import { Prato } from "./Prato";

export interface Pedido{
    mesa: number;
    id: number;
    pratos: Array<Prato>;
    bebidas: Array<Prato>;
    status: number;
  }