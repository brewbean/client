import { InfoCard } from 'components/Layout/Panel'

export const TitleSection = ({ children }) => (
  <div className='px-4 py-5 sm:px-6 border-b border-gray-200'>
    <h2 className='text-lg leading-6 font-medium text-gray-900'>{children}</h2>
  </div>
)

export const ContentSection = ({ children }) => (
  <div className='px-4 py-5 sm:px-6'>
    <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
      {children}
    </dl>
  </div>
)

export const DataSection = ({ className, label, children }) => (
  <div className={className}>
    <dt className='text-sm font-medium text-gray-500'>{label}</dt>
    <dd className='mt-1 text-sm text-gray-900'>{children}</dd>
  </div>
)

export const DescriptionSection = ({ title, children }) => (
  <InfoCard>
    <TitleSection>{title}</TitleSection>
    <ContentSection>{children}</ContentSection>
  </InfoCard>
)
