import React, { Component } from 'react'
import styled from 'styled-components'
import ListCards from '@components/ListCards/ListCards'
import CircularProgress from '@material-ui/core/CircularProgress'
import { DefaultContext } from '@/js/stores/DefaultContext'

const Loader = styled.div`
  display: inline-block;
  width: 100%;
  text-align: center;
`

export class SearchCards extends Component {
  render() {
    return (
      <DefaultContext.Consumer>
        {([{ isSearching, cards }]) => (
          <div className="main-content">
            {isSearching ? (
              <Loader>
                <CircularProgress size={20} />
              </Loader>
            ) : (
              <ListCards cards={cards} />
            )}
          </div>
        )}
      </DefaultContext.Consumer>
    )
  }
}

export default SearchCards
