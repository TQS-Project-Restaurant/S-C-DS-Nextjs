import { Comida } from '@/app/_interfaces';

export const COMIDA_SAMPLE: Comida = {
  id: 1,
  nome: "Francesinha",
  preco: 10.99,
  hidratosCarbono: 25.0,
  proteina: 15.0,
  kcal: 350,
  stock: 100,
  imagemUrl: "https://portuguesefood.pt/wp-content/uploads/2018/08/francesinha-porto-3.jpg",
};

export default function Page({ params }: { params: { prato: number } }) {
  return (
    <div className="relative">
      <img
        src="https://www.desktopbackground.org/download/o/2013/05/31/584855_black-chalkboard-wallpapers-walldevil-best-free-hd-desktop-and_1920x1080_h.jpg"
        className="h-[110%] w-full fixed"
      />
      <div className="text-white fixed w-full flex flex-col items-center">
        <div className="text-7xl text-center w-full p-3">{COMIDA_SAMPLE.nome}</div>
        <img
          className="text-3xl py-3 pt-4 pb-2 w-[400px] h-[300px] object-cover"
          src={COMIDA_SAMPLE.imagemUrl}
        />
        <div className="text-5xl text-center w-full p-3">€{COMIDA_SAMPLE.preco.toFixed(2)}</div>
        <div className="w-[400px] flex justify-center pt-4">
          <table className="text-white text-xl bg-black bg-opacity-50 border border-gray-300 w-full">
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300">Kcal</td>
                <td className="p-2 border border-gray-300">{COMIDA_SAMPLE.kcal}</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Hidratos de Carbono</td>
                <td className="p-2 border border-gray-300">{COMIDA_SAMPLE.hidratosCarbono}g</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Proteína</td>
                <td className="p-2 border border-gray-300">{COMIDA_SAMPLE.proteina}g</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
