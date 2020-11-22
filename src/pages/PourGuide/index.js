import PourPlayer from 'components/PourPlayer';
import { ReactComponent as GifPlaceholder } from './undraw_coffee_break_j3of.svg';
import { usePourGuide } from './usePourGuide';

const PourGuidePage = () => {
  const { data, handler } = usePourGuide();
  const weight = 13;

  return (
    <PourPlayer
      {...data}
      {...handler}
      weight={weight}
      gif={GifPlaceholder}
    />
  )
}

export default PourGuidePage;