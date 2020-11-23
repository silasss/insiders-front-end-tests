import { render, screen } from '@testing-library/react'
import List from './List'

describe('List component', () => {
  test('should show empty list', () => {
    render(<List data-testid="list" items={[]} />)
    
    expect(screen.getByTestId('list')).toBeInTheDocument()
  })

  test('should show filled list out', () => {
    const data = [{ key: 1, desc: 'ReactJS' }, { key: 2, desc: 'NodeJS' }]
    
    render(<List data-testid="list" items={data} />)
    
    expect(screen.getByTestId('list')).toBeInTheDocument(screen.getByText('NodeJS'))
  })
})
