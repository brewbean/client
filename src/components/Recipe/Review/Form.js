// import { Link } from 'react-router-dom'
import { FieldError } from 'components/Form/Error'
import { combineClass } from 'helper/stringHelper'

export default function Form({ register, errors, onSubmit }) {
  console.log('errors->', errors)
  return (
    <form onSubmit={onSubmit} className='space-y-3'>
      <div>
        <label htmlFor='comment' className='sr-only'>
          About
        </label>
        <textarea
          id='comment'
          name='comment'
          rows='3'
          placeholder='Enter Review'
          className={combineClass('input', {
            'input--state-error': errors.comment,
          })}
          ref={register}
        />
        {errors.comment && <FieldError error={errors.comment} />}
      </div>
      <div>
        <label htmlFor='rating' className='sr-only'>
          Rating
        </label>
        <select
          id='rating'
          name='rating'
          placeholder='Enter Review'
          className='input'
          ref={register}
          defaultValue={5}
        >
          <option value={5}>5</option>
          <option value={4}>4</option>
          <option value={3}>3</option>
          <option value={2}>2</option>
          <option value={1}>1</option>
        </select>
      </div>
      {/* {error && <FieldError error={error} />} */}

      <button
        type='submit'
        disabled={Object.keys(errors).length > 0}
        className='btn btn--primary btn--md'
      >
        Add Review
      </button>
    </form>
  )
}
