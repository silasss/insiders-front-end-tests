import { fireEvent, render, screen } from '@testing-library/react'
import InputText from './InputText'

describe('InputText Component', () => {
  test('Renderização', () => {
    const { getByTestId } = render(<InputText data-testid="input" value="" onChange={jest.fn()} />)
    
    const element = getByTestId('input')
    
    expect(element).toBeInTheDocument()
  })

  test('Chamar callback no evento de onChange', async () => {
    const mockFunction = jest.fn()
    
    const { debug } = render(<InputText data-testid="input" value="" onChange={mockFunction}/>)
    
    fireEvent.change(screen.getByTestId('input'), { target: { value: 'ReactJS' }})
    
    expect(mockFunction).toHaveBeenCalled()
  })
})
