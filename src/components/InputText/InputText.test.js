import { fireEvent, render, screen } from '@testing-library/react'
import InputText from './InputText';

describe('InputText component', () => {
  test('render input', () => {
    const { getByTestId } = render(<InputText data-testid="input" value="" onChange={jest.fn()} />)
    
    const element = getByTestId('input')
    
    expect(element).toBeInTheDocument()
  })

  test('call onchange function', async () => {
    const mockFunction = jest.fn()
    
    render(<InputText data-testid="input" value="" onChange={mockFunction}/>)
    
    fireEvent.change(screen.getByTestId('input'), { target: { value: 'ReactJS' }})
    
    expect(mockFunction).toHaveBeenCalled()
  })
})
