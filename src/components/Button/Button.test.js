import { fireEvent, render } from '@testing-library/react'
import Button from './Button'

describe('Button component', () => {
  test('render button', () => {
    const { getByText, debug } = render(<Button>Adicionar</Button>)
    
    const element = getByText('Adicionar')

    expect(element).toBeInTheDocument()
  })

  test('call callback function', () => {
    const mockFunction = jest.fn()

    const { getByText } = render(<Button onClick={mockFunction}>Adicionar</Button>)

    fireEvent.click(getByText('Adicionar'))
    
    expect(mockFunction).toHaveBeenCalled()
  })
})
