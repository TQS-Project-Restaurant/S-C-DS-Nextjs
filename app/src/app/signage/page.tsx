import {
  PedidoSignageInProgress,
  PedidoSignagePending,
} from "./PedidosSignage";

const inProgressOrders = [
  {
    id: 1,
    mesa: 1,
    pratos: [
      { id: 1, nome: "bitoque", imagemUrl: "https://cdn.tasteatlas.com/images/dishes/9c4888bb938346c3ada2cddd5d1a0ebc.jpg" },
      { id: 2, nome: "bacalhau", imagemUrl: "https://cdn.tasteatlas.com/images/dishes/9c4888bb938346c3ada2cddd5d1a0ebc.jpg" },
    ],
    bebidas: [
      { id: 1, nome: "cocacola", imagemUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1FAP0Qz-w0QwFTUppkmJJ-Ovd4xLKkZaVNv9r6gouvA&s" },
      { id: 2, nome: "guarana", imagemUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1FAP0Qz-w0QwFTUppkmJJ-Ovd4xLKkZaVNv9r6gouvA&s" },
    ],
    status: 0,
  },
];

const pendingOrders = [
  {
    id: 5,
    mesa: 12,
    pratos: [{ id: 3, nome: "polvo", imagemUrl: "https://cdn.tasteatlas.com/images/dishes/9c4888bb938346c3ada2cddd5d1a0ebc.jpg" }],
    bebidas: [
      { id: 1, nome: "cocacola", imagemUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1FAP0Qz-w0QwFTUppkmJJ-Ovd4xLKkZaVNv9r6gouvA&s" },
      { id: 2, nome: "guarana", imagemUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1FAP0Qz-w0QwFTUppkmJJ-Ovd4xLKkZaVNv9r6gouvA&s" },
    ],
    status: 0,
  },
];

export default function signage() {
  return (
    <main className="m-4 flex">
      <div className="w-2/3 mr-4 bg-green-400 p-4 rounded-lg">
        <div className="text-2xl font-bold mb-4">
          <h2>Orders In Progress</h2>
        </div>
        {inProgressOrders.map((pedido) => (
          <PedidoSignageInProgress pedido={pedido} />
        ))}
      </div>
      <div className="w-1/3 bg-yellow-400 p-4 rounded-lg">
        <div className="text-2xl font-bold mb-4">
          <h2>Pending Orders</h2>
        </div>
        {pendingOrders.map((pedido) => (
          <PedidoSignagePending pedido={pedido} />
        ))}
      </div>
    </main>
  );
}
