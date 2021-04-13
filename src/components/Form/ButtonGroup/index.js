import { Link } from 'react-router-dom'

export const ModifyRow = ({ canModify, onDelete, editPath }) =>
  canModify ? (
    <div className='mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3'>
      <button
        onClick={onDelete}
        type='button'
        className='btn btn--white btn--md'
      >
        Delete
      </button>
      <Link to={editPath} className='btn btn--primary btn--md'>
        Edit
      </Link>
    </div>
  ) : null
