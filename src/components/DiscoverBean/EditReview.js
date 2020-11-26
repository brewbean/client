import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { GET_SINGLE_BEAN } from 'queries';
import InputRow from 'components/InputRow';
import { useUser } from 'context/UserContext';
import useBeanReview from './useBeanReview';

/*
  TODO: -
*/
const EditReview = (props) => {
  // TODO - Bean_id needs to be changed? Or well it has to be passed in somehow because this is the wrong bean
  // I wonder if the other one fails
  const bean_id = props.match.params.id
  const { barista } = useUser();

  const [displayName, setDisplayName] = useState('');
  // const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const [result, reexecuteQuery] = useQuery({
    query: GET_SINGLE_BEAN,
    variables: { id: bean_id }
  });
  console.log("Result:", result);
  const submitReview = () => {

  }
  useEffect(() => {
    // setBean(bean_id);
  });

  const { data: beanData, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  console.log("Beandata:",beanData);
  // const { name } = beanData.bean_by_pk;

  return (
    <div>
      <div className='font-bold'>Create Review</div>
      <InputRow value={barista.displayName} readOnly placeholder='Enter Barista' label='Barista' />
      {/* <InputRow value={name} readOnly placeholder='Enter Bean' label='Bean' /> */}
      <InputRow value={rating} onChange={setRating} placeholder='Enter Rating' label='Rating' />
      <InputRow value={comment} onChange={setComment} placeholder='Enter Comment' label='Comment' />
      <button
        type="button" 
        onClick={submitReview}
        className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
        edit review
      </button>
    </div>
  )
}

export default EditReview;