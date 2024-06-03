"use client";

import { useRouter } from "next/navigation";
import { Comida } from "../_interfaces";

interface ComidaProps {
    comida: Comida;
    isBebida: boolean;
}

export default function ProductLine({ comida, isBebida }: Readonly<ComidaProps>): JSX.Element {
    const router = useRouter();

    const url = isBebida ? `/bebidas/${comida.id}`:`/pratos/${comida.id}`;

    return (
        <button data-testid="prato" onClick={()=>router.push(url)} className="px-2 w-full text-center text-2xl flex justify-between">
            <div>{comida.nome}</div> {comida.preco} €
        </button>
    );

}
