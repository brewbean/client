import React from 'react';
import InputRow from '../InputRow/index';
import Dropdown from '../DropDown/index';
import TextArea from '../TextArea/index';

import useBeanReview from './useBeanReview';
/*
  Need to make a new table
  THinka bout needs to be in the table
*/
const CreateReview = () => {
  const { data, methods } = useBeanReview();
  let { barista, bean, rating, comment } = data;
  let { setBarista, setBean, setRating, setComment } = methods;
  return (
    <div>
      <div className='font-bold'>Create Review</div>
      <div>I guess some forms here yeah</div>
      <InputRow value={barista} onChange={setBarista} placeholder='Enter Barista' label='Barista' />
      <InputRow value={bean} onChange={setBean} placeholder='Enter Bean' label='Bean' />
      <InputRow value={rating} onChange={setRating} placeholder='Enter Rating' label='Rating' />

    </div>
  )
}

export default CreateReview;