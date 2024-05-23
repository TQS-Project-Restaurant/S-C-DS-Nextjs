"use client";

import { useRouter } from "next/navigation";
import { Comida } from "../_interfaces";

interface comidaProps{
    comida:Comida,
}

export default function ProductLine({ comida }:comidaProps) : JSX.Element{
    const router = useRouter();
    return(
        <button onClick={()=>router.push(`/pratos/${comida.id}`)} className="px-2 w-full text-center text-2xl flex justify-between">
            <div>{comida.nome}</div> {comida.preco} $
        </button>
    )
}