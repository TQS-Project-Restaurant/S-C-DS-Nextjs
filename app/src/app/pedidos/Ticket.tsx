
interface Pedido {
  mesa: number;
  id: number;
  pratos: number;
  bebidas: number;
  status: number;
}

interface PedidoProps {
  pedido: Pedido;
}


export default function Ticket({ pedido } : PedidoProps): JSX.Element {

  let buttonText:string;

  if(pedido.status == 0){
    buttonText = "Pass to in Progress";
  }else if(pedido.status == 1){
    buttonText = "Pass to done";
  }else{
    buttonText = "waiting to deliver";
  };

    return (
      <form className=" bg-yellow-100 w-full aspect-square p-4 text-black flex flex-col relative overflow-x-clip">
        <div className="flex justify-between">
          <div id="pedido">Pedido {pedido.id}</div>
          <div id="mesa">Mesa {pedido.mesa}</div>
        </div>
        <div>
          <div>Details:</div>
          <div className="flex justify-between">
            <div>Pratos {pedido.pratos}</div>
            <div>bebidas {pedido.bebidas}</div>
          </div>
        </div>
        <button className="mt-auto bg-blue-500 rounded-md z-10">
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
      </form>
    );
  }