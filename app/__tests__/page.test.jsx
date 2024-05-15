import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../src/app/signage/page'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)
 
    const inProgressHeader = screen.getByText('Orders In Progress');
    const pendingHeader = screen.getByText('Pending Orders');
    expect(inProgressHeader).toBeInTheDocument();
    expect(pendingHeader).toBeInTheDocument();

  })
})