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
  let { setBarista, setBean, setRating, setComment, submitReview } = methods;
  return (
    <div>
      <div className='font-bold'>Create Review</div>
      <div>I guess some forms here yeah</div>
      <InputRow value={barista} onChange={setBarista} placeholder='Enter Barista' label='Barista' />
      <InputRow value={bean} onChange={setBean} placeholder='Enter Bean' label='Bean' />
      <InputRow value={rating} onChange={setRating} placeholder='Enter Rating' label='Rating' />
      <button
        type="button" 
        onClick={submitReview}
        className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
        submit review
      </button>
    </div>
  )
}

export default CreateReview;