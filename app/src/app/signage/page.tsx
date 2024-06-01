"use client";
import {
  PedidoSignageInProgress,
  PedidoSignagePending,
} from "./PedidosSignage";
import { Pedido } from "../_interfaces";
import { useSession } from "next-auth/react";

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

export default function Signage() {
  const { data: session } = useSession({
    required:true,
    onUnauthenticated(){
      redirect('/api/auth/signin?callbackUrl=/signage')
    }
  })
  if(session?.user.role !== "KITCHEN")
    redirect("/menu")
  const {data : orders, error} = useSWR<Pedido[]>(session? ["http://localhost:8080/api/requests",session.user.token]:null,([url,token])=>fetcher(url,token),{refreshInterval:5000});
  if (error) return <div>Erro ao carregar os dados.</div>;
  if (!orders) return <div>Carregando...</div>;

  const inProgressOrders = orders.filter(order => order.status === 1);
  const pendingOrders = orders.filter(order => order.status === 0);

  return (
    <main className="m-4 flex">
      <div className="w-2/3 mr-4 bg-green-400 p-4 rounded-lg">
        <div className="text-2xl font-bold mb-4">
          <h2>Orders In Progress</h2>
        </div>
        {inProgressOrders.map((pedido) => (
          <PedidoSignageInProgress key={pedido.id} pedido={pedido} />
        ))}
      </div>
      <div className="w-1/3 bg-yellow-400 p-4 rounded-lg">
        <div className="text-2xl font-bold mb-4">
          <h2>Pending Orders</h2>
        </div>
        {pendingOrders.map((pedido) => (
          <PedidoSignagePending key={pedido.id} pedido={pedido} />
        ))}
      </div>
    </main>
  );
}
