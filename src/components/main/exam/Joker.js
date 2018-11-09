import React from 'react'

const Joker = () => {
  return (
    <div className="flex-container">
      <button className="btn-joker">50% Hakkı</button>
      <button className="btn-joker disabled">Soruyu geç</button>
      <button className="btn-joker disabled">Süreyi uzat</button>
    </div>
  )
}

export default Joker
