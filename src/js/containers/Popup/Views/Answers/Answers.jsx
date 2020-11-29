import React, { useContext, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import ListItem from '@components/ListItem/ListItem'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import { searchAnswers } from '@shared/api'
import { AnswersContext } from '@stores/Answers'
import {
  RESET_ANSWERS,
  SET_ANSWERS,
  SET_IS_SEARCHING,
  SHOW_MORE
} from '@stores/constants'
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
  const controller = useRef(null)

  const fetchAnswers = useDebouncedCallback(async params => {
    try {
      const { answers, nb_pages } = await searchAnswers(
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
          answers: answers
        }
      })
    } catch (error) {
      console.log(error) // TODO
    } finally {
      answersDispatch({
        type: SET_IS_SEARCHING,
        payload: {
          isSearching: false
        }
      })
    }
  }, 1000)

  const handleShowMore = event => {
    event.preventDefault()
    answersDispatch({ type: SHOW_MORE })
  }

  useEffect(() => {
    const hasProductsSelected = productsIdSelected.length > 0
    if (hasProductsSelected && searchValue) {
      answersDispatch({
        type: SET_IS_SEARCHING,
        payload: { isSearching: true }
      })
      controller.current = new AbortController()
      fetchAnswers.callback({
        lang,
        search: searchValue,
        productsIdSelected,
        page
      })
    } else {
      answersDispatch({
        type: SET_IS_SEARCHING,
        payload: { isSearching: false }
      })
    }

    return () => {
      answersDispatch({ type: RESET_ANSWERS })
      if (!controller.current?.signal.aborted) {
        controller.current.abort()
      }
    }
  }, [
    answersDispatch,
    fetchAnswers,
    lang,
    searchValue,
    productsIdSelected,
    page
  ])

  const hasAnswers = answers.length > 0
  const showNoResult = !isSearching && !hasAnswers && searchValue
  const showLoadMore = !isSearching && hasNextPage && hasAnswers

  if (productsIdSelected.length === 0) {
    return (
      <View className="hide-scrollbar">
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
      </View>
    )
  } else if (!searchValue && !isSearching) {
    return (
      <View className="hide-scrollbar">
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
      </View>
    )
  } else if (showNoResult) {
    return (
      <View className="hide-scrollbar">
        <NoResultBox>
          <Typography component="p" variant="body2">
            {t('noResult')}
          </Typography>
        </NoResultBox>
      </View>
    )
  } else {
    return (
      <View className="hide-scrollbar">
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
      </View>
    )
  }
}

AnswersView.propTypes = {}

export default AnswersView
