export default function Signage() {
  const orders = [
    {
      id: 1,
      mesa: 1,
      pratos: [{ nome: "bitoque" }, { nome: "bacalhau" }],
      bebida: [{ nome: "cocacola" }, {nome: "guarana"}],
      status: 0,
    },
    {
      id: 2,
      mesa: 2,
      pratos: [{ nome: "francesinha" }],
      bebida: [{ nome: "cocacola" }],
      status: 1,
    },
    {
      id: 3,
      mesa: 3,
      pratos: [{ nome: "sushi" }, { nome: "sashimi" }, {nome:"idk"}],
      bebida: [{ nome: "cocacola" }],
      status: 1,
    },
  ];

  return (
    <main className="m-4">
      {orders.map((order, orderIndex) => (
        <table
          key={orderIndex}
          className="table-lg w-full bg-gray-300 mb-4 rounded-lg"
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
                {order.pratos.map((prato, pratoIndex) => (
                    <div key={pratoIndex} className="mb-1 flex items-center gap-3 bg-gray-400 p-4 rounded-lg">
                      <div className="avatar mask mask-squircle w-12 h-12">
                        <img src="https://cdn.tasteatlas.com/images/dishes/9c4888bb938346c3ada2cddd5d1a0ebc.jpg" />
                      </div>
                      <div>
                        <div className="font-bold">{prato.nome}</div>
                      </div>
                    </div>
                ))}
              </td>
              <td>
                {order.bebida.map((bebida, bebidaIndex) => (
                    <div key={bebidaIndex} className="mb-1 flex items-center gap-3 bg-gray-400 p-4 rounded-lg">
                      <div className="avatar mask mask-squircle w-12 h-12">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1FAP0Qz-w0QwFTUppkmJJ-Ovd4xLKkZaVNv9r6gouvA&s" />
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
      ))}
    </main>
  );
}
