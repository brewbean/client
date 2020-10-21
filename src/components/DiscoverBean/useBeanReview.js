import { useState } from 'react'; 

export const useBeanReview = () => {
    const [barista, setBarista] = useState('Wiliam');
    const [bean, setBean] = useState('ETHIOPIAN YIRGACHEFFE');
    const [rating, setRating] = useState('5.0');
    const [comment, setComment] = useState('It was really good.');

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
              setComment: e => setComment(e.target.value)
            }
        }
    )
}

export default useBeanReview;