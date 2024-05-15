import '@testing-library/jest-dom'
import { render, screen,queryByAttribute } from '@testing-library/react'
import Ticket from '../../src/app/pedidos/Ticket'

interface Pedido {
    mesa: number;
    id: number;
    pratos: number;
    bebidas: number;
    status: number;
  }

const pedido:Pedido = {
  mesa:3,
  id:22,
  pratos:3,
  bebidas: 2,
  status:0,
}
const getById = queryByAttribute.bind(null, 'id');

describe('Testing Ticket component', () => {
    it('renders a ticket correct id', () => {
      const dom = render(<Ticket pedido={pedido} />)
      const hearder = getById(dom.container,"pedido")
   
      expect(hearder?.textContent).toMatch("Pedido 22")
    })

    it("renders a ticket corret table", ()=>{
      const dom = render(<Ticket pedido={pedido} />)
      const hearder = getById(dom.container,"mesa")
   
      expect(hearder?.textContent).toMatch("Mesa 3")
    })
  })