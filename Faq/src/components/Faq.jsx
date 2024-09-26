import React from 'react'

const Faq = ({data}) => {
    console.log(data)
  return (
    <div>
        {data.faqs.map((qna)=>{
            return <div className='qna'>{qna.question}
            <span>+</span>
            </div>
        })}
    </div>
  )
}

export default Faq