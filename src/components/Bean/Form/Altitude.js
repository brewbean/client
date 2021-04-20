import { MinusIcon } from '@heroicons/react/outline'
import { FieldError } from 'components/Form/Error'
import { combineClass } from 'helper/stringHelper'
import { useState } from 'react'

const SymbolInput = ({ symbol, children }) => (
  <div className={symbol ? 'relative' : ''}>
    {children}
    {symbol && (
      <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
        <p className='text-sm text-gray-500'>{symbol}</p>
      </div>
    )}
  </div>
)

export default function Altitude({ register, isOptional, errors }) {
  const [isRange, setIsRange] = useState(false)

  return (
    <div>
      <div className='flex justify-between items-center mb-1'>
        <label
          className='block text-sm font-medium text-gray-700'
          htmlFor='altitude'
        >
          Altitude
        </label>
        {isOptional && <p className='text-xs text-gray-500 italic'>optional</p>}
      </div>
      {isRange ? (
        <>
          <div className='flex items-center'>
            <SymbolInput symbol='m' id='altitude'>
              <input
                ref={register}
                id='altitude'
                name='altitude_start'
                className={combineClass('input pr-7', {
                  'input--state-error': errors.altitude_start,
                })}
                type='number'
                placeholder='Start'
              />
            </SymbolInput>

            <MinusIcon className='mx-2 w-6 h-6 text-gray-700' />

            <SymbolInput symbol='m'>
              <input
                ref={register}
                name='altitude_end'
                className={combineClass('input pr-7', {
                  'input--state-error': errors.altitude_end,
                })}
                type='number'
                placeholder='End'
              />
            </SymbolInput>
          </div>
          <div>
            <FieldError error={errors.altitude_start} />
            <FieldError error={errors.altitude_end} />
          </div>
        </>
      ) : (
        <div>
          <SymbolInput symbol='m'>
            <input
              ref={register}
              id='altitude'
              name='altitude_start'
              className={combineClass('input pr-7', {
                'input--state-error': errors.altitude_start,
              })}
              type='number'
              placeholder='e.g. 1000'
            />
          </SymbolInput>
          <FieldError error={errors.altitude_start} />
        </div>
      )}

      <div className='mt-2 flex'>
        <div className='p-1 space-x-2 rounded-lg flex bg-gray-200 hover:bg-gray-300 text-sm text-gray-700'>
          <button
            type='button'
            onClick={() => setIsRange(false)}
            className={combineClass(
              'px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500',
              {
                'rounded-md bg-white': !isRange,
              }
            )}
          >
            Single
          </button>
          <button
            type='button'
            onClick={() => setIsRange(true)}
            className={combineClass(
              'px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500',
              {
                'rounded-md bg-white': isRange,
              }
            )}
          >
            Range
          </button>
        </div>
      </div>
    </div>
  )
}
