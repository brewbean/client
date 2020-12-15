import StageInput from 'components/StageInput'

const StagePage = ({ stages, setStages }) => {
  return (
    <>
      <div className='bg-gray-100 p-4 flex-1 overflow-y-scroll'>
        <div className='bg-white rounded shadow p-4 space-y-6'>
          {stages.map((s, i) => (
            <StageInput key={i} />
          ))}
        </div>
      </div>
      <div className='flex-none bg-white rounded shadow p-4'>
        <button
          onClick={() => setStages([...stages, 'test'])}
          type='button'
          className='w-full px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-500 hover:bg-green-400 focus:outline-none focus:border-green-600 focus:shadow-outline-green active:bg-green-600 transition ease-in-out duration-150'
        >
          add stage
        </button>
        <button
          type='button'
          className='mt-2 w-full px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150'
        >
          submit
        </button>
      </div>
    </>
  )
}

export default StagePage
