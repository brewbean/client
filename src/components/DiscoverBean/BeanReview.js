import React from 'react';
import { useQuery } from 'urql';
import { GET_ALL_REVIEW_OF_BEAN } from '../../queries'

const BeanReview = (props) => {
  let { bean_id } = props;
  
  const [result, reexecuteQuery] = useQuery({
    query: GET_ALL_REVIEW_OF_BEAN,
    variables: { _eq: bean_id }
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  const { nodes } = data.bean_reviews_aggregate;
  return (
    <div>
      <div className='font-bold'>Bean Review</div>
      { nodes.map((n, i) => 
        <div key={i}>
          <div>Barista:{n.barista && n.barista.display_name}</div>
          <div>Rating: {n.rating} </div>
          <div>Comment: {n.comment} </div>
        </div>
      )}
      
    </div>
  )
}

export default BeanReview;