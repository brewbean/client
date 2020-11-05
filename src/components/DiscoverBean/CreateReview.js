import React, { useEffect } from 'react';
import InputRow from '../InputRow/index';
import Dropdown from '../DropDown/index';
import TextArea from '../TextArea/index';
import { GET_SINGLE_REVIEW } from '../../queries';
import { useQuery } from 'urql';
import { useUser } from '../../context/userContext';
import useBeanReview from './useBeanReview';

const CreateReview = (props) => {
  const { data, methods } = useBeanReview();
  const bean_id = props.match.params.id
  let { bean, rating, comment } = data;
  let { setBarista, setBean, setRating, setComment, submitReview } = methods;
  const { isAuthenticated, getAuth, didAuthError, barista } = useUser();

  useEffect(() => {
    setBean(bean_id);
  });

  return (
    <div>
      <div className='font-bold'>Create Review</div>
      <InputRow value={barista.id} placeholder='Enter Barista' label='Barista' />
      <InputRow value={bean_id} placeholder='Enter Bean' label='Bean' />
      <InputRow value={rating} onChange={setRating} placeholder='Enter Rating' label='Rating' />
      <InputRow value={comment} onChange={setComment} placeholder='Enter Comment' label='Comment' />
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