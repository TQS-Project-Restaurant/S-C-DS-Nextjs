"use client";

import { useRouter } from "next/navigation";
import { Comida } from "../_interfaces";

interface ComidaProps {
  comida: Comida;
  isBebida: boolean;
}

export default function ProductLine({ comida, isBebida }: ComidaProps): JSX.Element {
  const router = useRouter();

    if (isBebida) {
        return (
            <button data-testid="prato" onClick={()=>router.push(`/bebidas/${comida.id}`)} className="px-2 w-full text-center text-2xl flex justify-between">
              <div>{comida.nome}</div> {comida.preco} €
            </button>
          );    
    } else {
        return (
            <button data-testid="prato" onClick={()=>router.push(`/pratos/${comida.id}`)} className="px-2 w-full text-center text-2xl flex justify-between">
                <div>{comida.nome}</div> {comida.preco} €
            </button>
        );    
    }


}
