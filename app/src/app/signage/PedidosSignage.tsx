import { Pedido } from "../_interfaces";

interface PedidoProps {
  pedido: Pedido;
}

export function PedidoSignageInProgress({ pedido }: Readonly<PedidoProps>): JSX.Element {
  return (
    <div className="flex flex-col bg-gray-300 mb-4 rounded-lg bg-opacity-70 p-4">

      <div className="flex justify-between mb-5">
        <div className="w-1/2">
          <h3 className="text-left font-bold">Order {pedido.id}</h3>
        </div>
        <div className="w-1/2">
          <h3 className="text-right font-bold">Table {pedido.mesa}</h3>
        </div>
      </div>

      <div className="flex">
        <div className="w-1/2 mr-10">
          {pedido.pratos.map((prato) => (
            <div key={prato.id} className="mb-1 flex items-center gap-3 bg-gray-400 p-4 rounded-lg">
              <div className="avatar mask mask-squircle w-12 h-12">
                <img alt={prato.nome} src={"http://localhost:8080" + prato.imagemUrl} />
              </div>
              <div className="font-bold">{prato.nome}</div>
            </div>
          ))}
        </div>
        <div className="w-1/2">
          {pedido.bebidas.map((bebida) => (
            <div key={bebida.id} className="mb-1 flex items-center gap-3 bg-gray-400 p-4 rounded-lg">
              <div className="avatar mask mask-squircle w-12 h-12">
                <img alt={bebida.nome} src={"http://localhost:8080" + bebida.imagemUrl} />
              </div>
              <div className="font-bold">{bebida.nome}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}


export function PedidoSignagePending({ pedido }: Readonly<PedidoProps>): JSX.Element {
  return (
    <div className="flex flex-col bg-gray-300 mb-4 rounded-lg bg-opacity-70 p-4">

      <div className="flex justify-between mb-5">
        <div className="w-1/2">
          <h3 className="text-left font-bold">Order {pedido.id}</h3>
        </div>
        <div className="w-1/2">
          <h3 className="text-right font-bold">Table {pedido.mesa}</h3>
        </div>
      </div>

      <div className="flex">
        <div className="w-1/2 mr-10">
            <div className="mb-1 flex items-center gap-3 bg-gray-400 p-4 rounded-lg">
              <div className="font-bold">{pedido.pratos.length} Pratos</div>
            </div>
        </div>
        <div className="w-1/2">
            <div className="mb-1 flex items-center gap-3 bg-gray-400 p-4 rounded-lg">
              <div className="font-bold">{pedido.bebidas.length} Bebidas</div>
            </div>
        </div>
      </div>

    </div>
  )
}
