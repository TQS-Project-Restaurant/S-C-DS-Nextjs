import Comida from "./Comida";

export default interface Menu{
    id: number;
    pratos: Array<Comida>;
    bebidas: Array<Comida>;
    dia: string;
}