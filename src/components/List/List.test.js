import { render, screen } from '@testing-library/react'
import List from './List'

describe('List Component', () => {
  test('Renderização', () => {
    render(<List data-testid="list" items={[]} />)
    
    expect(screen.getByTestId('list')).toBeInTheDocument()
  })

  test('Se a lista está preenchida', () => {
    const data = [
      { key: 1, desc: 'ReactJS' }, 
      { key: 2, desc: 'NodeJS' }
    ]
    
    render(<List data-testid="list" items={data} />)
    
    expect(screen.getByTestId('list')).toBeInTheDocument(screen.getByText('NodeJS'))
  })
})
