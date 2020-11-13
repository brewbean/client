import { useEffect } from 'react';
import { useQuery } from 'urql';
import { GET_SINGLE_BEAN } from 'queries';
import InputRow from 'components/InputRow';
import { useUser } from 'context/UserContext';
import useBeanReview from './useBeanReview';

const CreateReview = (props) => {
  const { data: beanReviewData, methods } = useBeanReview();
  let { rating, comment } = beanReviewData;
  let { setBean, setRating, setComment, submitReview } = methods;
  const bean_id = props.match.params.id
  const { barista } = useUser();

  const [result, reexecuteQuery] = useQuery({
    query: GET_SINGLE_BEAN,
    variables: { id: bean_id }
  });

  const { data: beanData, fetching, error } = result;

  useEffect(() => {
    setBean(bean_id);
  });
  
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  const { name } = beanData.bean_by_pk;

  return (
    <div>
      <div className='font-bold'>Create Review</div>
      <InputRow value={barista.displayName} readOnly placeholder='Enter Barista' label='Barista' />
      <InputRow value={name} readOnly placeholder='Enter Bean' label='Bean' />
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