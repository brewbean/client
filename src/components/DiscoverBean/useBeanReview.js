import { useState } from 'react'; 
import { useMutation } from 'urql';
import { INSERT_REVIEW_ONE } from '../../queries';

export const useBeanReview = () => {
    const [barista, setBarista] = useState('');
    const [bean, setBean] = useState('');
    const [rating, setRating] = useState('5.0');
    const [comment, setComment] = useState('');
    const [insertReviewResult, insertReview] = useMutation(INSERT_REVIEW_ONE);

    const submitReview = async () => {
      const object = {
        "barista_id": barista,
        "bean_id": bean,
        "rating": rating,
        "comment": comment
      }
      console.log("UseBeanReview submitReview object:", object);
      let result = await insertReview({object});
      console.log("Review Result: ", result);
    }

    return (
        {
            data : {
                barista,
                bean,
                rating,
                comment,
            },
            methods : {
              setBarista: e => setBarista(e.target.value),
              setBean: e => setBean(e.target.value),
              setRating: e => setRating(e.target.value),
              setComment: e => setComment(e.target.value),
              submitReview
            }
        }
    )
}

export default useBeanReview;