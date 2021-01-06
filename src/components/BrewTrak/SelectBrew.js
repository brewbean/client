import { ReactComponent as CoffeePlaceHolder } from './Icons/coffee-mug.svg'

const SelectBrew = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='text-2xl font-semibold'>
        Select a brew to view it's details!
      </div>
      <CoffeePlaceHolder className='h-24 w-24 m-4' />
    </div>
  )
}

export default SelectBrew
