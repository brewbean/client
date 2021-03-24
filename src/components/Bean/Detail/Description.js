import { roundToHalfOrWhole } from 'helper/math'

const Section = ({ className, label, children }) => (
  <div className={className}>
    <dt className='text-sm font-medium text-gray-500'>{label}</dt>
    <dd className='mt-1 text-sm text-gray-900'>{children}</dd>
  </div>
)

export const Description = ({
  altitude,
  process,
  profile_note,
  region,
  roast_type,
  about,
  price,
  bean_reviews_aggregate,
}) => (
  <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
    <Section className='sm:col-span-1' label='Altitude'>
      {altitude.KM} km
    </Section>
    <Section className='sm:col-span-1' label='Process'>
      {process}
    </Section>
    <Section className='sm:col-span-1' label='Profile Notes'>
      {profile_note.join(', ')}
    </Section>
    <Section className='sm:col-span-1' label='Region'>
      {region}
    </Section>
    <Section className='sm:col-span-1' label='Roast Type'>
      {roast_type}
    </Section>
    <Section className='sm:col-span-1' label='Price'>
      {price} USD
    </Section>
    <Section className='sm:col-span-1' label='Rating'>
      {bean_reviews_aggregate.aggregate.avg.rating
        ? `${roundToHalfOrWhole(bean_reviews_aggregate.aggregate.avg.rating)}/5`
        : 'not rated'}
    </Section>
    <Section className='sm:col-span-2 whitespace-pre-line' label='About'>
      {about}
    </Section>
  </dl>
)
