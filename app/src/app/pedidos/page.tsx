"use client";
import { useSession } from "next-auth/react";
import { Status,Pedido } from "../_interfaces";
import Ticket from "./Ticket";
import useSWR from "swr";
import { redirect } from "next/navigation";

async function fetcher<Pedido>(url:string,token:any):Promise<Pedido[]>{
  const res = await fetch(url,{
    headers:{Authorization: `Bearer ${token}`}
  });
  if(!res.ok){
    throw new Error("Error fetching data");
  }
  return(res.json())
}


export default function Pedidos() {
  const { data: session } = useSession({
    required:true,
    onUnauthenticated(){
      redirect('/api/auth/signin?callbackUrl=/signage')
    }
  })
  if(session?.user != undefined && session?.user.role !== "KITCHEN")
    redirect("/menu")
  const {data , error} = useSWR<Pedido[]>(session? ["http://localhost:8080/api/requests",session.user.token]:null,([url,token])=>fetcher(url,token),{refreshInterval:5000});
  if (error) return <div>Erro ao carregar os dados.</div>;
  if (!data) return <div>Carregando...</div>;
    return (
      <div className="grid grid-cols-3 p-4 gap-2 flex-grow">
        <div className=" bg-gray-300 rounded-md text-black p-2 overflow-scroll">
            <div className=" font-bold text-2xl p-2">Pending:</div>
            <div className="grid grid-cols-3 gap-3 gap-y-6">
              {data?.filter((element)=> element.status == Status.PENDING).map((pedido)=>(
                <Ticket data-testid="ticket" pedido={pedido}/>
              ))}
            </div>
        </div>
        <div className=" bg-gray-300 rounded-md text-black p-2 overflow-scroll">
            <div className=" font-bold text-2xl p-2">Progress:</div>
            <div className="grid grid-cols-3 gap-3 gap-y-6">
            {data?.filter((element)=> element.status == Status.PREPARING).map((pedido)=>(
                <Ticket data-testid="ticket" pedido={pedido}/>
              ))}
            </div>
        </div>
        <div className=" bg-gray-300 rounded-md text-black p-2 overflow-scroll">
            <div className=" font-bold text-2xl p-2">To deliver:</div>
            <div className="grid grid-cols-3 gap-3 gap-y-6">
            {data?.filter((element)=> element.status == Status.COMPLETED).map((pedido)=>(
                <Ticket data-testid="ticket" pedido={pedido}/>
              ))}
            </div>
        </div>
      </div>
    );
  }