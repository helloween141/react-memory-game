import React, { useEffect, useState } from 'react'
import { Suits } from './constants'
import { Card } from './components/Card'

export const Deck = () => {
  const [cards, setCards] = useState([])
  const [previousCard, setPreviousCard] = useState(null)
  const [update, setUpdate] = useState(false)
  const [score, setScore] = useState(0)

  const shuffle = array => array.sort(() => Math.random() - 0.5)

  const startGame = () => {
    let deck = []
    let id = 0
    Suits.forEach((suit, key) => {
      for (let i = 0; i < 10; i++) {
        deck.push({
          id: ++id,
          type: key,
          suit: suit,
          opened: false,
        })
      }
    })
    setCards(shuffle(deck))
  }

  const changeCardState = id => {
    return cards.map(card => {
      if (card.id === id) {
        card.opened = !card.opened
      }
      return card 
    })
  }

  const clickHandler = (id) => {
    if (!update) {

      const selectedCard = cards.find(element => element.id === id && !element.opened)

      if (selectedCard) {
        changeCardState(selectedCard.id)

        if (!previousCard) {
          setPreviousCard(selectedCard)
        } else {
          // ASYNC (show and hide)
          if (selectedCard.suit !== previousCard.suit) {
            setUpdate(true)

            setTimeout(() => {
              changeCardState(selectedCard.id)
              changeCardState(previousCard.id)

              setUpdate(false)
            }, 500)

            setScore(score - 1)

          } else {
            setScore(score + 1)
          }
          setPreviousCard(null)
        }
      }
    }
  }

  useEffect(() => {
    if (cards.length > 0 && cards.findIndex((element) => !element.opened) === -1) {
      alert(`Game Over! Your score ${score}`)
    }
  }, [cards, score])

  return (
    <div className='container'>
        <div className="start">
            <button className="btn" onClick={startGame}>Start</button>
        </div>
        <div className="score">
            Score: {score} 
        </div> 
        <div className="deck row">
          {cards.map((card, index) => (
            <Card key={index} {...card} clickHandler={clickHandler} />
          ))}
        </div>
    </div>
  )
}
