import Ticket from "./Ticket";

const pedido = {
  mesa: 3,
  id:22,
  pratos:4,
  bebidas:5,
  status:0,
}

export default function pedidos() {
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