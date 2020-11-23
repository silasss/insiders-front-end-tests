import { fireEvent, render, screen, cleanup, waitFor } from '@testing-library/react'
import Knowledge from './Knowledge'
import axios from 'axios'

beforeEach(() => {
  axios.get.mockResolvedValueOnce({
    data: []
  })
})

afterEach(cleanup)

describe('Página Knowledge', () => {
  it('Deve fazer o primeiro request, rendizar sem erros e com lista vazia', async () => {
    
    await waitFor(() => {
      render(<Knowledge />)
    })

    expect(axios.get).toHaveBeenCalled()
    
    expect(screen.queryByTestId(/error/i)).toBeNull()
    
    expect(screen.getByTestId('list')).toBeEmptyDOMElement()
  })

  it('Deve preencher a lista com o response da API', async () => {
    jest.resetAllMocks()

    axios.get.mockResolvedValueOnce({ 
      data: [
        {
          id: 1,
          known: 'Mocked'
        }
      ]
    })

    await waitFor(() => {
      render(<Knowledge />)
    })
    
    expect(screen.getByText('Mocked')).toBeInTheDocument()
  })

  it('Deve exibir erro quando o axios responder com erro', async () => {
    jest.resetAllMocks()

    axios.get.mockRejectedValue()

    await waitFor(() => {
      render(<Knowledge />)
    })

    expect(axios.get).toHaveBeenCalled()
    
    expect(screen.queryByTestId(/error/i)).toBeInTheDocument()
  })

  it('Deve permitir adicionar um conhecimento novo na lista', async () => {
    await waitFor(() => {
      render(<Knowledge />)
    })

    const input = screen.getByRole('textbox')
    const button = screen.getByText('Adicionar')

    fireEvent.change(input, { target: { value: 'ReactJS' }})
    fireEvent.click(button)
    
    expect(screen.getByTestId('list')).toContainElement(screen.getByText('ReactJS'))
    expect(input).toHaveValue('')
  })

  it('Deve validar se preencheu o input antes de clicar no botão submit', async () => {
    await waitFor(() => {
      render(<Knowledge />)
    })

    const button = screen.getByText('Adicionar')
    
    fireEvent.click(button)

    expect(screen.getByText(/Preencha o conhecimento/)).toBeInTheDocument()
  })

  it('Deve validar a tentativa de inclusão de conhecimento duplicado', async () => {
    await waitFor(() => {
      render(<Knowledge />)
    })

    const input = screen.getByRole('textbox')
    const button = screen.getByText('Adicionar')
    
    fireEvent.change(input, { target: { value: 'ReactJS' }})
    fireEvent.click(button)

    fireEvent.change(input, { target: { value: 'ReactJS' }})
    fireEvent.click(button)

    expect(screen.getByText(/já existe/)).toBeInTheDocument()
  })
})
