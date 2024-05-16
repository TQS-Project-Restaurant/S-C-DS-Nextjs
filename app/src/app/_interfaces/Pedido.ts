import Prato from "./Prato";
import Status from "./Status";

export default interface Pedido{
    mesa: number;
    id: number;
    pratos: Array<Prato>;
    bebidas: Array<Prato>;
    status: Status;
  }