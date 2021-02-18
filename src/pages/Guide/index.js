// import { Link } from 'react-router-dom'
import {
  PourOver,
  MokaPot,
  FrenchPress,
  Espresso,
  Capsule,
  Aeropress,
} from 'image'
import ImageCell from './ImageCell'

const links = [
  {
    src: PourOver,
    alt: 'pour-over',
    text: 'Pour over',
    disabled: false,
    to: '/recipe',
  },
  {
    src: FrenchPress,
    alt: 'french press',
    text: 'French press',
    disabled: true,
  },
  {
    src: Espresso,
    alt: 'espresso',
    text: 'Espresso',
    disabled: true,
  },
  {
    src: MokaPot,
    alt: 'moka pot',
    text: 'Moka',
    disabled: true,
  },
  {
    src: Capsule,
    alt: 'single serve',
    text: 'Single serve',
    disabled: true,
  },
  {
    src: Aeropress,
    alt: 'aeropress',
    text: 'Aeropress',
    disabled: true,
  },
]

export default function Guide() {
  return (
    <div className='my-8 flex flex-col items-center'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
          What are we working with?
        </h2>
      </div>

      <ul className='justify-items-center space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl'>
        {links.map((link) => (
          <li key={link.text}>
            <ImageCell {...link} />
          </li>
        ))}
      </ul>
    </div>
  )
}
