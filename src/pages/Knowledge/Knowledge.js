import { useEffect, useState } from "react"

import httpService from "../../services/httpService"

import { alreadyExistsIn } from "../../utils/array"

import List from "../../components/List"
import InputText from "../../components/InputText"
import Button from "../../components/Button"

const Knowledge = () => {
  const [knowledgeList, setKnowledgeList] = useState([])
  const [known, setKnown] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const getKnowledges = async () => {
      try {
        const { data } = await httpService.get('/knowledges')
        
        const list = data.map((item) => ({ key: item.id, desc: item.known }))
        
        setKnowledgeList(list)
      } catch(error) {
        setError('Ocorreu um erro inesperado!')
      }
    }

    getKnowledges()
  }, [])

  const validateSubmit = () => {
    if (known === "") {
      throw new Error(`Preencha o conhecimento antes de adicionar!`)
    }

    if (alreadyExistsIn(known, knowledgeList.map(item => item.desc))) {
      throw new Error(`O conhecimento "${known}" já existe!`)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("")

    try {
      validateSubmit();

      setKnowledgeList((prev) => ([
        ...prev,
        {
          key: prev.length + 1,
          desc: known
        }
      ]))

      setKnown('')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      { !!error && <div style={{ color: 'red' }} data-testid="error">{ error }</div> }
      <div>
        <form onSubmit={handleSubmit}>
          <InputText 
            type="text" 
            name="known" 
            value={known} 
            onChange={(evt) => setKnown(evt.target.value)}
          />
          <Button type="submit" name="button-add">Adicionar</Button>
        </form>
      </div>
      <div>
        <List items={knowledgeList} data-testid="list" />
      </div>
    </>
  )
}

export default Knowledge
