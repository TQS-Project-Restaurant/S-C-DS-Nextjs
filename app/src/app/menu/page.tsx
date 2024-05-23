import { Menu } from "../_interfaces"

const pratos = [
    {
        id:1,
        nome:"Bacalhau",
        preco:10.99,
        imagemUrl:"https://fh-sites.imgix.net/sites/2712/2020/07/16140235/3.-bacalhau-a-bras.jpg?auto=compress%2Cformat&w=1000&h=1000&fit=max",
    },
    {
        id:2,
        nome:"Arroz de Pato",
        preco:10.99,
        imagemUrl:"https://fh-sites.imgix.net/sites/2712/2020/07/16140235/3.-bacalhau-a-bras.jpg?auto=compress%2Cformat&w=1000&h=1000&fit=max",
    },
]

const bebidas = [
    {
        id:1,
        nome:"Coca Cola",
        preco:10.99,
        imagemUrl:"https://fh-sites.imgix.net/sites/2712/2020/07/16140235/3.-bacalhau-a-bras.jpg?auto=compress%2Cformat&w=1000&h=1000&fit=max",
    },
    {
        id:2,
        nome:"Iced Tea",
        preco:10.99,
        imagemUrl:"https://fh-sites.imgix.net/sites/2712/2020/07/16140235/3.-bacalhau-a-bras.jpg?auto=compress%2Cformat&w=1000&h=1000&fit=max",
    },
]

const menu:Menu = {
    id:1,
    pratos:pratos,
    bebidas:bebidas,
    dia:new Date(),
    
}

export default function MenuPage():JSX.Element{

    return(
        <div className="relative">
            <img src="https://www.desktopbackground.org/download/o/2013/05/31/584855_black-chalkboard-wallpapers-walldevil-best-free-hd-desktop-and_1920x1080_h.jpg" className="h-[110%] w-full fixed"></img>
            <div className="text-white fixed w-full flex flex-col items-center">
                <div className="text-7xl text-center w-full p-3">Menu do Dia</div>
                    <div className="w-[40%] py-4">
                        <div className="text-3xl pt-3 pb-2">Pratos</div>
                        {pratos.map((element)=>(
                            <div className="px-2 w-full text-center text-2xl flex justify-between"><div>{element.nome}</div> {element.preco}</div>
                        ))}
                        <div className="text-3xl py-3 pt-4 pb-2">Bebidas</div>
                        {bebidas.map((element)=>(
                            <div className="px-2 w-full text-center text-2xl flex justify-between"><div>{element.nome}</div> {element.preco}</div>
                        ))}
                    </div>

            </div>
        </div>
    )
}