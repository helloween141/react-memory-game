import React from 'react'
export const Card = ({ id, type, suit, opened, clickHandler }) => {
  return (
    <div
      className={'g-card col s2 ' + (opened ? 'opened' : '')}
      onClick={() => clickHandler(id)}
    >
      {opened ? (
        <div className={'suit-' + (type < 2 ? 'red' : 'black')}>{suit}</div>
      ) : (
        <div>☠</div>
      )}
    </div>
  )
}
