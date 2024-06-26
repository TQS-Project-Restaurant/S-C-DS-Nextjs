import { Comida } from '@/app/_interfaces';
import Link from 'next/link';

interface PratoPageProps {
    params: {
      readonly pratoID: number;
    };
}

export default async function PratoPage({ params }: Readonly<PratoPageProps>) {

  const prato:Comida = await fetch("http://api:8080/api/dishes/" + params.pratoID, {cache:"no-cache"}).then((response)=>{
    if (response.status === 200){
        return response.json();
    }else{
        return null
    }
  });

  return (
    <div className="relative">
        <img alt="wallpaper" src="https://www.desktopbackground.org/download/o/2013/05/31/584855_black-chalkboard-wallpapers-walldevil-best-free-hd-desktop-and_1920x1080_h.jpg" className="h-[110%] w-full fixed" />

        {prato !== null ? 
        <div className="text-white fixed w-full flex flex-col items-center">
            <div className="text-7xl text-center w-full p-3">{prato.nome}</div>
            <img alt={prato.nome} className="text-3xl py-3 pt-4 pb-2 w-[400px] h-[300px] object-cover" src={process.env.NEXT_PUBLIC_IP_ADDRESS + "" + prato.imagemUrl} />
            <div className="text-5xl text-center w-full p-3">€{prato.preco.toFixed(2)}</div>
            <div className="w-[400px] flex flex-col items-center pt-4">
                <div className="w-full flex justify-between p-2 bg-black bg-opacity-50 border border-gray-300 rounded-t-md">
                    <div className="p-2">Kcal</div>
                    <div className="p-2">{prato.kcal}</div>
                </div>
                <div className="w-full flex justify-between p-2 bg-black bg-opacity-50 border border-gray-300">
                    <div className="p-2">Hidratos de Carbono</div>
                    <div className="p-2">{prato.hidratosCarbono}g</div>
                </div>
                <div className="w-full flex justify-between p-2 bg-black bg-opacity-50 border border-gray-300 rounded-b-md">
                    <div className="p-2">Proteína</div>
                    <div className="p-2">{prato.proteina}g</div>
                </div>
            </div>
        </div> : <div className="text-white fixed w-full flex flex-col items-center text-7xl">Prato não foi encontrado</div> }
            
        <Link legacyBehavior href="/menu">
            <a className="absolute top-5 left-5 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
                Back to Menu
            </a>        
        </Link>   
    </div>
  );
}
