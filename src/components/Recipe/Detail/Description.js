import { Rating } from 'components/Badge'
import { roundToHalfOrWhole } from 'helper/math'

const Section = ({ className, label, children }) => (
  <div className={className}>
    <dt className='text-sm font-medium text-gray-500'>{label}</dt>
    <dd className='mt-1 text-sm text-gray-900'>{children}</dd>
  </div>
)

export const Description = ({
  brew_type,
  bean_weight,
  bean_grind,
  water_amount,
  water_temp,
  bean_name_free,
  recipe_reviews_aggregate,
  about,
  device,
  instructions,
}) => (
  <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
    <Section className='sm:col-span-1' label='Brew Type'>
      {brew_type}
    </Section>
    <Section className='sm:col-span-1' label='Bean'>
      {bean_name_free ? bean_name_free : 'N/A'}
    </Section>
    <Section className='sm:col-span-1' label='Bean Weight'>
      {bean_weight}g
    </Section>
    <Section className='sm:col-span-1' label='Bean Grind'>
      {bean_grind}
    </Section>
    <Section className='sm:col-span-1' label='Water Amount'>
      {water_amount}g
    </Section>
    <Section className='sm:col-span-1' label='Water Temp'>
      {water_temp}F
    </Section>
    <Section className='sm:col-span-1' label='Rating'>
      <Rating
        value={roundToHalfOrWhole(
          recipe_reviews_aggregate.aggregate.avg.rating
        )}
      />
    </Section>
    <Section className='sm:col-span-1' label='Device'>
      {device ? device : 'N/A'}
    </Section>
    <Section className='sm:col-span-2' label='About'>
      {about ? about : 'N/A'}
    </Section>
    <Section className='sm:col-span-2 whitespace-pre-line' label='Instructions'>
      {instructions}
    </Section>
  </dl>
)
