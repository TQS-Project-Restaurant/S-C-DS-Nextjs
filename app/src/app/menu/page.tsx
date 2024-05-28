import { Menu } from "../_interfaces"
import ProductLine from "./ProductLine"


export default async function MenuPage(){
    const data:Menu = await fetch("http://api:8080/api/menu",{cache:"no-cache"}).then((response)=>{
        if (response.status === 200){
            return response.json();
        }else{
            return null
        }
    });
    
    return(
        <div className="relative">
            <img src="https://www.desktopbackground.org/download/o/2013/05/31/584855_black-chalkboard-wallpapers-walldevil-best-free-hd-desktop-and_1920x1080_h.jpg" className="h-[110%] w-full fixed" alt="backgound"></img>
            <div className="text-white fixed w-full flex flex-col items-center">
            <div className="text-8xl text-center w-full p-3">Restaurant Moles Ovos</div>
                <div className="text-7xl text-center w-full pt-3">Menu do Dia</div>
                {data !== null ? <div className="text-2xl text-center w-full pb-3">{data.dia}</div>:<></>}
                <div className="bg-white w-[40%] h-[2px]"></div>
                    {data !== null ?<div className="w-[40%] py-4">
                        <div className="text-3xl pt-3 pb-2">Pratos</div>
                        {data.pratos.map((element)=>(
                            <ProductLine key={element.id} comida={element}/>
                        ))}
                        <div className="text-3xl py-3 pt-4 pb-2">Bebidas</div>
                        {data.bebidas.map((element)=>(
                            <ProductLine key={element.id} comida={element}/>
                        ))}
                    </div> : <div className="bg-white w-[40%] h-[2px]">No Menu</div>}

            </div>
        </div>
    )
}