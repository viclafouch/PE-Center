import React, { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AnswerDialog from '@components/AnswerDialog/AnswerDialog'
import ListItem from '@components/ListItem/ListItem'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import * as api from '@shared/api'
import { AnswersContext } from '@stores/Answers'
import { RESET_ANSWERS, SET_ANSWERS, SET_IS_SEARCHING } from '@stores/constants'
import { DefaultContext } from '@stores/Default'
import { SettingsContext } from '@stores/Settings'
import { getProductLogoByName } from '@utils'
import { useDebouncedCallback } from 'use-debounce'

import { Intro, View, ViewBoxLoading } from '../views.styled'
import { BlockBottom, NoResultBox } from './answers.styled'

function AnswersView() {
  const { t } = useTranslation()
  const [defaultState] = useContext(DefaultContext)
  const [answersState, answersDispatch] = useContext(AnswersContext)
  const [settings] = useContext(SettingsContext)
  const { searchValue, isSearching, answers, page, hasNextPage } = answersState
  const { productsIdSelected, lang } = settings
  const [answerSelected, setAnswerSelected] = useState(null)
  const controller = useRef(null)

  const fetchAnswers = useDebouncedCallback(async params => {
    try {
      const { answers, nb_pages } = await api.searchAnswers(
        {
          productsId: params.productsIdSelected,
          search: params.search,
          page: params.page,
          lang: params.lang
        },
        { signal: controller.current.signal }
      )
      answersDispatch({
        type: SET_ANSWERS,
        payload: {
          hasNextPage: params.page < nb_pages,
          page: params.page,
          answers: answers
        }
      })
    } catch (error) {
      console.log(error) // TODO
    } finally {
      answersDispatch({
        type: SET_IS_SEARCHING,
        payload: { isSearching: false }
      })
    }
  }, 1000)

  const handleShowMore = event => {
    event.preventDefault()
    answersDispatch({
      type: SET_IS_SEARCHING,
      payload: { isSearching: true }
    })
    fetchAnswers.callback({
      lang,
      search: searchValue,
      productsIdSelected,
      page: page + 1
    })
  }

  useEffect(() => {
    const hasProductsSelected = productsIdSelected.length > 0
    if (hasProductsSelected && searchValue) {
      controller.current = new AbortController()
      answersDispatch({
        type: SET_IS_SEARCHING,
        payload: { isSearching: true }
      })
      fetchAnswers.callback({
        lang,
        search: searchValue,
        productsIdSelected,
        page: 1
      })
    } else {
      answersDispatch({
        type: SET_IS_SEARCHING,
        payload: { isSearching: false }
      })
    }

    return () => {
      answersDispatch({ type: RESET_ANSWERS })
      if (controller.current?.signal.aborted === false) {
        controller.current.abort()
      }
    }
  }, [answersDispatch, fetchAnswers, lang, searchValue, productsIdSelected])

  const getProductLogo = answer => {
    const product = defaultState.products.find(p => p.id === answer.ProductId)
    return getProductLogoByName(product.name)
  }

  const hasAnswers = answers.length > 0
  const showNoResult = !isSearching && !hasAnswers && searchValue
  const showLoadMore = !isSearching && hasNextPage && hasAnswers

  let content
  if (productsIdSelected.length === 0) {
    content = (
      <Intro>
        <img
          src="/images/super-hero.svg"
          alt="Choose product"
          width="160"
          height="130"
        />
        <Typography component="h1" variant="h6">
          Aucun produit séléctionné
        </Typography>
        <Typography component="p" variant="body2">
          {t('chooseProduct')}
        </Typography>
      </Intro>
    )
  } else if (!searchValue && !isSearching) {
    content = (
      <Intro>
        <img
          src="/images/search-files.svg"
          alt="Search answers"
          width="160"
          height="130"
        />
        <Typography component="h1" variant="h6">
          {t('searchTitle')}
        </Typography>
        <Typography component="p" variant="body2">
          {t('searchIntro')}
        </Typography>
      </Intro>
    )
  } else if (showNoResult) {
    content = (
      <NoResultBox>
        <Typography component="p" variant="body2">
          {t('noResult')}
        </Typography>
      </NoResultBox>
    )
  } else {
    content = (
      <>
        {hasAnswers && (
          <List>
            {answers.map(answer => {
              const product = defaultState.products.find(
                p => p.id === answer.ProductId
              )
              const productLogo = getProductLogoByName(product.name)
              return (
                <ListItem
                  button
                  img={productLogo}
                  key={answer.id}
                  description={answer.description}
                  title={answer.title}
                  onClick={() => setAnswerSelected(answer)}
                />
              )
            })}
          </List>
        )}
        {isSearching ? (
          <ViewBoxLoading>
            <CircularProgress size={20} />
          </ViewBoxLoading>
        ) : showLoadMore ? (
          <BlockBottom>
            <Button size="small" onClick={handleShowMore}>
              {t('viewMore')}
            </Button>
          </BlockBottom>
        ) : null}
      </>
    )
  }

  return (
    <View className="hide-scrollbar">
      {content}
      <AnswerDialog
        open={Boolean(answerSelected)}
        title={answerSelected ? answerSelected.title : ''}
        productLogo={answerSelected ? getProductLogo(answerSelected) : ''}
        onClose={() => setAnswerSelected(null)}
      />
    </View>
  )
}

AnswersView.propTypes = {}

export default AnswersView
