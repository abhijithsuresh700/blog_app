import React from 'react'
import "./card.css"

const Card = (articles) => {
  return (
    <div className='cardContainer'>
        <div className='cardImageContainerr'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcoaamhJdQMubojh8FRMKf2MS5_JFSKH5qL40Zw4-Ka0lvXoP_zfzz1nxmJCqwvACXIUIo&s'/>
        </div>
        <div className='cardTextContainer'>
            <div className='cardDetail'>
                <span className='cardDate'>2023-10-04</span>
                <span className='cardCategoryy'>Sports</span>
            </div>
            <h1>{articles.item.heading}</h1>
            <h6>{articles.item.description}</h6>
            <h5>read more</h5>
        </div>
    </div>
  )
}

export default Card