const CreateCard = ({
  date,
  beanWeight,
  beanGrind,
  waterWeight,
  waterTemp,
  comments,
  rating,
  beanType,
  setDate,
  setBeanWeight,
  setBeanGrind,
  setWaterWeight,
  setWaterTemp,
  setComments,
  setRating,
  setBeanType,
}) => {
  return (
    <div className='card'>
      <div className='flexbox-horizontal'>
        <h1>CREATE CARD</h1>
        Date: <input value={date} onChange={setDate} />
        Coffee Bean Weight:{' '}
        <input value={beanWeight} onChange={setBeanWeight} />
        Coffee Bean Grind: <input value={beanGrind} onChange={setBeanGrind} />
        Water Amount: <input value={waterWeight} onChange={setWaterWeight} />
        Water Temperature: <input value={waterTemp} onChange={setWaterTemp} />
        Comment: <input value={comments} onChange={setComments} />
        Rating: <input value={rating} onChange={setRating} />
        Beans: <input value={beanType} onChange={setBeanType} />
      </div>
    </div>
  )
}

export default CreateCard
