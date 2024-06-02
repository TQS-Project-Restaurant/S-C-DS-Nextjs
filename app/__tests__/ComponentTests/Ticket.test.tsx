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

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" }
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
    }),
  };
});

const lasanha:Comida = {
  id:2,
  nome:"woof",
  imagemUrl:"woof",
  preco:20,
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