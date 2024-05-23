export default interface Comida {
    id: number;
    nome: string;
    preco: number;
    hidratosCarbono?: number;
    proteina?: number;
    kcal?: number;
    stock: number;
    imagemUrl?: string;
}