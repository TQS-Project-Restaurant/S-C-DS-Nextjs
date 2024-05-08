import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../src/app/page'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)
 
    const heading = screen.getAllByText("Find in-depth information about Next.js features and API.")[0]
 
    expect(heading).toBeInTheDocument()
  })
})