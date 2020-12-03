import { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'urql';
import { GET_SINGLE_BEAN, GET_SINGLE_REVIEW, UPDATE_BEAN_REVIEW } from 'queries';
import InputRow from 'components/InputRow';
import { useUser } from 'context/UserContext';
import useBeanReview from './useBeanReview';

const EditReview = (props) => {
  const review_id = props.match.params.id
  const { barista } = useUser();
  const [bean_id, setBeanId] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [updateReviewResult, updateReview] = useMutation(UPDATE_BEAN_REVIEW);

  const [reviewResult, reexecuteReviewQuery] = useQuery({
    query: GET_SINGLE_REVIEW,
    variables: { id: review_id }
  })
  const { data: dataReviewResult, fetching: fetchingReviewResult, error: errorReviewResult } = reviewResult;

  const submitUpdateReview = async () => {
      const object = {
        "rating": parseFloat(rating),
        "comment": comment,
    }
    await updateReview({id: parseInt(review_id), ...object});
  }
  useEffect(() => {
        if (fetchingReviewResult) return <p>Loading...</p>;
        if (errorReviewResult) return <p>Oh no... {errorReviewResult.message}</p>;
        if (dataReviewResult) {
          const { id, barista_id, bean_id, rating, comment } = dataReviewResult.bean_reviews_by_pk; 
          
          setDisplayName(barista.displayName);
          setBeanId(bean_id);
          setRating(rating)
          setComment(comment)
      }
  },[dataReviewResult,fetchingReviewResult,errorReviewResult]);

  const [result, reexecuteQuery] = useQuery({
    query: GET_SINGLE_BEAN,
    variables: { id: bean_id }
  });
  const { data: beanData, fetching, error } = result;

  useEffect(() => {
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    if(beanData) {
      const { id, name } = beanData.bean_by_pk;
      setName(name);
    }
  },[beanData, fetching, error]);

  return (
    <div>
      <div className='font-bold'>Edit Review</div>
      <InputRow value={barista.displayName} readOnly placeholder='Enter Barista' label='Barista' />
      <InputRow value={name} readOnly placeholder='Enter Bean' label='Bean' />
      <InputRow value={rating} onChange={(e) => setRating(e.target.value)} placeholder='Enter Rating' label='Rating' />
      <InputRow value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Enter Comment' label='Comment' />
      <button
        type="button" 
        onClick={submitUpdateReview}
        className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
        edit review
      </button>
    </div>
  )
}

export default EditReview;