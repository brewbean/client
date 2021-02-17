// import { Link } from 'react-router-dom'
import {
  PourOver,
  MokaPot,
  FrenchPress,
  Espresso,
  Capsule,
  Aeropress,
} from 'image'

export default function BrewSelect() {
  return (
    <div className='my-8'>
      <div className='space-y-12'>
        <div className='text-center'>
          <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
            What are we working with?
          </h2>
        </div>

        <ul className='mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl'>
          <li>
            <div className='flex flex-col items-center space-y-6'>
              <img
                className='h-40 w-40 rounded-full xl:w-56 xl:h-56 object-cover'
                src={PourOver}
                alt=''
              />
              <h3 className='text-lg leading-6 font-medium'>Pour over</h3>
            </div>
          </li>

          <li>
            <div className='space-y-6'>
              <img
                className='mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 object-cover'
                src={FrenchPress}
                alt=''
              />
              <div className='space-y-2'>
                <div className='text-lg leading-6 font-medium space-y-1'>
                  <h3>French press</h3>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className='space-y-6'>
              <img
                className='mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 object-cover'
                src={Espresso}
                alt=''
              />
              <div className='space-y-2'>
                <div className='text-lg leading-6 font-medium space-y-1'>
                  <h3>Espresso</h3>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className='space-y-6'>
              <img
                className='mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 object-cover'
                src={MokaPot}
                alt=''
              />
              <div className='space-y-2'>
                <div className='text-lg leading-6 font-medium space-y-1'>
                  <h3>Moka</h3>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className='space-y-6'>
              <img
                className='mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 object-cover'
                src={Capsule}
                alt=''
              />
              <div className='space-y-2'>
                <div className='text-lg leading-6 font-medium space-y-1'>
                  <h3>Single serve</h3>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className='space-y-6'>
              <img
                className='mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56'
                src={Aeropress}
                alt=''
              />
              <div className='space-y-2'>
                <div className='text-lg leading-6 font-medium space-y-1'>
                  <h3>Aeropress</h3>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
