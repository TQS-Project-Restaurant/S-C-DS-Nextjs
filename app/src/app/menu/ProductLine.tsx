"use client";

import { useRouter } from "next/navigation";
import { Comida } from "../_interfaces";

interface ComidaProps{
    comida:Comida,
}

export default function ProductLine({ comida }:Readonly<ComidaProps>) : JSX.Element{
    const router = useRouter();
    return(
        <button data-testid="prato" onClick={()=>router.push(`/pratos/${comida.id}`)} className="px-2 w-full text-center text-2xl flex justify-between">
            <div>{comida.nome}</div> {comida.preco} €
        </button>
    )
}