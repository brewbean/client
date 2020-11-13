import PourPlayer from 'components/PourPlayer';
import { ReactComponent as GifPlaceholder } from './undraw_coffee_break_j3of.svg';
import { usePourGuide } from './usePourGuide';

const PourGuidePage = () => {
  const { data, handler } = usePourGuide();
  const weight = 13;

  return (
    <div className="bg-gray-50 flex-1 flex items-stretch">
      <div className='max-w-7xl bg-pink w-full mx-auto p-4 sm:px-6 lg:px-8'>
        <PourPlayer
          {...data}
          {...handler}
          weight={weight}
          gif={GifPlaceholder}
        />
      </div>
    </div>
  )
}

export default PourGuidePage;