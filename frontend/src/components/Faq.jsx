import React from 'react'
import "./styles/faq.css"
import { formatDate } from '../utils/helpers';

const Faq = ({event}) => {
  return (
    <div className='faq-container'>
        <div className='faq'>
            <p className='question'>Question: What is the date and time of the event?</p>
            <p className='answer'>Answer: The event will take place on {formatDate(event.startDate)} at {event.startTime}.</p>
        </div>
        <div className='faq'>
            <p className='question'>Question: Where is the venue located?</p>
            <p className='answer'>Answer: The venue for the event is located at {event.location.address}, {event.location.city}, {event.location.country}.</p>
        </div>
        <div className='faq'>
            <p className='question'>Question: What is the theme of the event?</p>
            <p className='answer'>Answer: The theme of the event is {event.title}.</p>
        </div>
        <div className='faq'>
            <p className='question'>Question: Will there be refreshments available?</p>
            <p className='answer'>Answer: Yes, refreshments will be provided during the event.</p>
        </div>
        <div className='faq'>
            <p className='question'>Question: Are there any prerequisites for attending the event?</p>
            <p className='answer'>Answer: No prerequisites are required for attending the event. All are welcome to join!</p>
        </div>
    </div>
  )
}

export default Faq