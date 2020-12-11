import { useState } from 'react'
import { useMutation } from 'urql'
import { INSERT_REVIEW_ONE } from 'queries'
import { useAuth } from 'context/AuthContext'

export const useBeanReview = () => {
  const [bean, setBean] = useState('')
  const [rating, setRating] = useState('5.0')
  const [comment, setComment] = useState('')
  const [, insertReview] = useMutation(INSERT_REVIEW_ONE)
  const { barista } = useAuth()

  const submitReview = async () => {
    const object = {
      barista_id: barista.id,
      bean_id: bean,
      rating: rating,
      comment: comment,
    }
    let result = await insertReview({ object })
    console.log('Bean Review Result: ', result)
  }

  return {
    data: {
      barista,
      bean,
      rating,
      comment,
    },
    methods: {
      setBean: (bean) => setBean(bean),
      setRating: (e) => setRating(e.target.value),
      setComment: (e) => setComment(e.target.value),
      submitReview,
    },
  }
}

export default useBeanReview
