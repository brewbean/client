import { useState } from 'react'
import { useMutation } from 'urql'
import { UPDATE_BEAN_REVIEW } from 'queries'
import InputRow from 'components/InputRow'
import { useAuth } from 'context/AuthContext'
import { useHistory } from 'react-router-dom'

const EditBeanReviewForm = ({ beanReview, id }) => {
  const [state, setState] = useState(beanReview)
  const [, updateReview] = useMutation(UPDATE_BEAN_REVIEW)
  const { barista } = useAuth()
  const history = useHistory()
  const onChangeGenerator = (attr) => (e) => {
    setState({
      ...state,
      [attr]: e.target.value,
    })
  }

  const submitUpdateReview = async () => {
    const { bean, date_added, __typename, ...rest } = state
    await updateReview({
      id,
      object: {
        ...rest,
      },
    })
    history.push(`/bean/${beanReview.bean_id}`)
  }

  if (barista)
    return (
      <div>
        <div className='font-bold'>Edit Review</div>
        <InputRow
          value={barista.display_name}
          readOnly={true}
          placeholder='Enter Barista'
          label='Barista'
        />
        <InputRow
          value={state.bean.name}
          readOnly={true}
          placeholder='Enter Bean'
          label='Bean'
        />
        <InputRow
          value={state.rating}
          onChange={onChangeGenerator('rating')}
          placeholder='Enter Rating'
          label='Rating'
        />
        <InputRow
          value={state.comment}
          onChange={onChangeGenerator('comment')}
          placeholder='Enter Comment'
          label='Comment'
        />
        <button
          type='button'
          onClick={submitUpdateReview}
          className='mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150'
        >
          edit review
        </button>
      </div>
    )
  return null
}

export default EditBeanReviewForm
