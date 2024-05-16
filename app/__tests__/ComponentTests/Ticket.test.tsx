import '@testing-library/jest-dom'
import { render, screen,queryByAttribute } from '@testing-library/react'
import Ticket from '../../src/app/pedidos/Ticket'
import { Status,Pedido,Comida } from '@/app/_interfaces'

jest.mock('next/navigation', () => ({
  useRouter() {
    return ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    });
  },
}));

const lasanha:Comida = {
  id:2,
  nome:"woof",
  imagemUrl:"woof",
}

const pedido:Pedido = {
  mesa:3,
  id:22,
  pratos:[lasanha],
  bebidas: [lasanha],
  status:Status.PENDING,
}
const getById = queryByAttribute.bind(null, 'id');

describe('Testing Ticket component', () => {
  beforeEach(async () => {
    const useRouter = jest.spyOn(require("next/navigation"), "useRouter");

    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    }));
  });

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