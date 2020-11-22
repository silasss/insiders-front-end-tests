import { fireEvent, render, screen, cleanup, waitFor } from '@testing-library/react'
import Knowledge from './Knowledge'
import axios from 'axios'

beforeEach(() => {
  axios.get.mockResolvedValueOnce({
    data: []
  })
})

afterEach(cleanup)

describe('Page Knowledge', () => {
  it('Should do the first request, render without errors and with empty list', async () => {
    
    await waitFor(() => {
      render(<Knowledge />)
    })

    expect(axios.get).toHaveBeenCalled()
    
    expect(screen.queryByTestId(/error/i)).toBeNull()
    
    expect(screen.getByTestId('list')).toBeEmptyDOMElement()
  })

  it('Should show item loaded from api', async () => {
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

  it('Should show error if axios broken up', async () => {
    jest.resetAllMocks()

    axios.get.mockRejectedValue()

    await waitFor(() => {
      render(<Knowledge />)
    })

    expect(axios.get).toHaveBeenCalled()
    
    expect(screen.queryByTestId(/error/i)).toBeInTheDocument()
  })

  it('should add a knowledge to list', async () => {
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

  it('should fill out the input before click submit button', async () => {
    await waitFor(() => {
      render(<Knowledge />)
    })

    const button = screen.getByText('Adicionar')
    
    fireEvent.click(button)

    expect(screen.getByText(/Preencha o conhecimento/)).toBeInTheDocument()
  })

  it('show error when trying to add duplicated item in list', async () => {
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
