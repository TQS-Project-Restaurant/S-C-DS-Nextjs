export default function Signage() {
  const inProgressOrders = [
    {
      id: 1,
      mesa: 1,
      pratos: [{ id:1, nome: "bitoque" }, { id:2, nome: "bacalhau" }],
      bebidas: [{ id:1, nome: "cocacola" }, { id:2, nome: "guarana" }],
      status: 0,
    },
  ];

  const pendingOrders = [
    {
      id: 5,
      mesa: 12,
      pratos: [{ id:3, nome: "polvo" }],
      bebidas: [{ id:1, nome: "cocacola" }, { id:2, nome: "guarana" }],
      status: 0,
    },
  ];

  const inProgressOrdersTables = inProgressOrders.map((order) => (
    <table
      key={order.id}
      className="table-lg w-full bg-gray-300 mb-4 rounded-lg bg-opacity-70"
    >
      <thead>
        <tr>
          <th className="text-left w-1/2">Order {order.id}</th>
          <th className="text-right w-1/2">Table {order.mesa}</th>
        </tr>
      </thead>
      <tbody className="align-top">
        <tr>
          <td>
            {order.pratos.map((prato) => (
              <div
                key={prato.id}
                className="mb-1 flex items-center gap-3 bg-gray-400 p-4 rounded-lg"
              >
                <div className="avatar mask mask-squircle w-12 h-12">
                  <img alt={prato.nome} src="https://cdn.tasteatlas.com/images/dishes/9c4888bb938346c3ada2cddd5d1a0ebc.jpg" />
                </div>
                <div>
                  <div className="font-bold">{prato.nome}</div>
                </div>
              </div>
            ))}
          </td>
          <td>
            {order.bebidas.map((bebida) => (
              <div
                key={bebida.id}
                className="mb-1 flex items-center gap-3 bg-gray-400 p-4 rounded-lg"
              >
                <div className="avatar mask mask-squircle w-12 h-12">
                  <img alt={bebida.nome} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1FAP0Qz-w0QwFTUppkmJJ-Ovd4xLKkZaVNv9r6gouvA&s" />
                </div>
                <div>
                  <div className="font-bold">{bebida.nome}</div>
                </div>
              </div>
            ))}
          </td>
        </tr>
      </tbody>
    </table>
  ));

  const pendingOrdersTables = pendingOrders.map((order) => (
    <table
      key={order.id}
      className="table-lg w-full bg-gray-300 mb-4 rounded-lg bg-opacity-70"
    >
      <thead>
        <tr>
          <th className="text-left w-1/2">Order {order.id}</th>
          <th className="text-right w-1/2">Table {order.mesa}</th>
        </tr>
      </thead>
      <tbody className="align-top">
        <tr>
          <td>
            <div className="mb-1 flex items-center gap-3 bg-gray-400 p-4 rounded-lg">
              <div>
                <div className="font-bold">{order.pratos.length} Pratos</div>
              </div>
            </div>
          </td>
          <td>
            <div className="mb-1 flex items-center gap-3 bg-gray-400 p-4 rounded-lg">
              <div>
                <div className="font-bold">{order.bebidas.length} Bebidas</div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  ));

  return (
    <main className="m-4 flex">
      <div className="w-2/3 mr-4 bg-green-400 p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Orders In Progress</h2>
        {inProgressOrdersTables}
      </div>
      <div className="w-1/3 bg-yellow-400 p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Pending Orders</h2>
        {pendingOrdersTables}
      </div>
    </main>
  );
}
