import React from 'react';
import { useQuery } from 'urql';
import { GET_SINGLE_REVIEW } from '../../queries'

const BeanReview = (props) => {
  let { id } = props;
  id = 1;
  const [result, reexecuteQuery] = useQuery({
    query: GET_SINGLE_REVIEW,
    variables: { id }
  });
  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  
  const { barista_id, bean_id, rating, comment } = data.bean_reviews_by_pk;

  console.log("RESult:", result);
  return (
    <div>
      <div className='font-bold'>Bean Review</div>
      <div>I guess some text here right</div>
      <div>Barista:{barista_id}</div>
      <div>Bean: {bean_id}</div>
      <div>Rating: {rating} </div>
      <div>Comment: {comment} </div>
    </div>
  )
}

export default BeanReview;