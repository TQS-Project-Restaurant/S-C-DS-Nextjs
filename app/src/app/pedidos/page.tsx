"use client";
import { Pedido } from "../_interfaces/Pedido";
import Ticket from "./Ticket";
import useSWR from "swr";

const pedido = {
  mesa: 3,
  id:22,
  pratos:4,
  bebidas:5,
  status:0,
}


async function fetcher<Pedido>(url:string):Promise<Pedido[]>{
  const res = await fetch(url);
  if(!res.ok){
    throw new Error("Cant acess data");
  }
  return(res.json())
}

export default function pedidos() {
  const {data,error} = useSWR<Pedido[]>("http://localhost:8080/api/requests",fetcher,{refreshInterval:5000});
  if (error) return <div>Erro ao carregar os dados.</div>;
  if (!data) return <div>Carregando...</div>;

    return (
      <div className="h-[90%] grid grid-cols-3 p-4 gap-2">
        <div className=" bg-gray-300 rounded-md text-black p-2 overflow-scroll">
            <div className=" font-bold text-2xl p-2">Pending:</div>
            <div className="grid grid-cols-3 gap-3 gap-y-6">
              <Ticket pedido={pedido}/>
              <Ticket pedido={pedido}/>
              <Ticket pedido={pedido}/>
              <Ticket pedido={pedido}/>
              <Ticket pedido={pedido}/>
              <Ticket pedido={pedido}/>
              <Ticket pedido={pedido}/>
              <Ticket pedido={pedido}/>
              <Ticket pedido={pedido}/>
              <Ticket pedido={pedido}/>
              <Ticket pedido={pedido}/>
            </div>
        </div>
        <div className=" bg-gray-300 rounded-md text-black p-2 overflow-scroll">
            <div className=" font-bold text-2xl p-2">Progress:</div>
            <div className="grid grid-cols-3 gap-3 gap-y-6">
              <Ticket pedido={pedido}/>
              <Ticket pedido={pedido}/>
              <Ticket pedido={pedido}/>
            </div>
        </div>
        <div className=" bg-gray-300 rounded-md text-black p-2 overflow-scroll">
            <div className=" font-bold text-2xl p-2">To deliver:</div>
            <div className="grid grid-cols-3 gap-3 gap-y-6">
              <Ticket pedido={pedido}/>
              <Ticket pedido={pedido}/>
              <Ticket pedido={pedido}/>
            </div>
        </div>
      </div>
    );
  }