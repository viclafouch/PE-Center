import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDebounce } from '@shared/hooks/useDebounce'
import { searchCards } from '@shared/api/Card.api'
import ListCards from '@components/ListCards/ListCards'
import Loader from '@components/Loader/Loader'

const Form = styled.form`
  width: 100%;
  margin-bottom: 10px;
  &:focus-within {
    input {
      background-color: rgba(255, 255, 255, 1);
      color: #202124;
    }
  }
`

const Content = styled.div`
  flex: 1;
  overflow-y: scroll;
`

const Input = styled.input`
  padding: 7px 13px;
  width: 100%;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.87);
  background-color: rgba(255, 255, 255, 0.16);
  transition: color 0.3s, background-color 0.3s;
  outline: none;
  border: none;
  border-radius: 22px;
`

export default function SearchCards() {
  const [searchTerm, setSearchTerm] = useState('')
  const [cards, setCards] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true)
      searchCards().then(({ result }) => {
        setCards(result)
        setIsSearching(false)
      })
    } else {
      setCards([])
    }
  }, [debouncedSearchTerm])

  return (
    <React.Fragment>
      <Form>
        <Input placeholder="Rechercher une aide" onChange={e => setSearchTerm(e.target.value)} />
      </Form>
      <Content>
        {isSearching && <Loader />}
        <ListCards cards={cards} />
      </Content>
    </React.Fragment>
  )
}
