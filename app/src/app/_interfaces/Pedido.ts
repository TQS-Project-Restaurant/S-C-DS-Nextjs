import Comida from "./Comida";
import Status from "./Status";

export default interface Pedido{
    mesa: number;
    id: number;
    pratos: Array<Comida>;
    bebidas: Array<Comida>;
    status: Status;
  }