"use client";
import { redirect, useRouter } from "next/navigation";
import { Status,Pedido } from "../_interfaces";
import { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";

interface PedidoProps {
  pedido: Pedido;
}

async function updatePedido(id:number,pedido:Pedido,token:string):Promise<Pedido>{
  const res = await fetch(`http://localhost:8080/api/requests/${id}`,{
    method:"PUT",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body:JSON.stringify(pedido),
  });
  if(!res.ok){
    throw new Error("cannot edit")
  }
  return res.json();
}


export default function Ticket({ pedido } : PedidoProps): JSX.Element {
  const { data: session } = useSession({
    required:true,
    onUnauthenticated(){
      redirect('/api/auth/signin?callbackUrl=/signage')
    }
  })
  const { mutate } = useSWRConfig()
  let buttonText:string;

  if(pedido.status == 0){
    buttonText = "Pass to in Progress";
  }else if(pedido.status == 1){
    buttonText = "Pass to done";
  }else{
    buttonText = "waiting to deliver";
  };

    return (
      <div id="ticket" className=" bg-yellow-100 w-full aspect-square p-4 text-black flex flex-col relative overflow-x-clip">
        <div className="flex justify-between">
          <div id="pedido">Pedido {pedido.id}</div>
          <div id="mesa">Mesa {pedido.mesa}</div>
        </div>
        <div>
          <div>Details:</div>
          <div className="px-2 flex justify-between">
            <div>Pratos: {pedido.pratos.length}</div>
            <div>bebidas: {pedido.bebidas.length}</div>
          </div>
        </div>
        <button onClick={session?()=>{pedido.status = pedido.status +1;
                                      updatePedido(pedido.id,pedido,session.user.token).then(()=>{
                                        mutate(["http://localhost:8080/api/requests",session.user.token])
                                      })}
                                :()=>{}} 
                disabled={pedido.status == Status.COMPLETED}
                className={"mt-auto bg-blue-500 rounded-md z-10 disabled:bg-blue-200 disabled:text-gray-800"}>
          {buttonText}
        </button>
        <div className="flex absolute top-[95%] justify-evenly w-[100%] left-[-0px]">
          <div className=" bg-yellow-100 size-6 rotate-45"></div>
          <div className=" bg-yellow-100 size-6 rotate-45"></div>
          <div className=" bg-yellow-100 size-6 rotate-45"></div>
          <div className=" bg-yellow-100 size-6 rotate-45"></div>
          <div className=" bg-yellow-100 size-6 rotate-45"></div>
          <div className=" bg-yellow-100 size-6 rotate-45"></div>
          <div className=" bg-yellow-100 size-6 rotate-45"></div>
        </div>
      </div>
    );
  }