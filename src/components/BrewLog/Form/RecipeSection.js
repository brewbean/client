import ReactMarkdown from 'react-markdown'
import { DataSection } from 'components/Layout/Detail'
import { StageSection } from 'components/Stage'

const RecipeSection = ({
  name,
  barista,
  about,
  brew_type,
  bean_name_free,
  bean_weight,
  bean_grind,
  water_amount,
  water_temp,
  device,
  stages,
  instructions,
}) => (
  <>
    <DataSection className='sm:col-span-1' label='Recipe Name'>
      {name}
    </DataSection>
    <DataSection className='sm:col-span-1' label='Author'>
      {barista.display_name}
    </DataSection>
    <DataSection className='sm:col-span-2' label='About'>
      {about ? about : 'N/A'}
    </DataSection>
    <DataSection className='sm:col-span-1' label='Brew Type'>
      {brew_type}
    </DataSection>
    <DataSection className='sm:col-span-1' label='Bean'>
      {bean_name_free ? bean_name_free : 'N/A'}
    </DataSection>
    <DataSection className='sm:col-span-1' label='Bean Weight'>
      {bean_weight} g
    </DataSection>
    <DataSection className='sm:col-span-1' label='Bean Grind'>
      {bean_grind}
    </DataSection>
    <DataSection className='sm:col-span-1' label='Water Amount'>
      {water_amount} g
    </DataSection>
    <DataSection className='sm:col-span-1' label='Water Temp'>
      {water_temp} {'\u00b0C'}
    </DataSection>
    <DataSection className='sm:col-span-1' label='Device'>
      {device ? device : 'N/A'}
    </DataSection>
    <DataSection className='sm:col-span-2' label='Recipe Player'>
      <StageSection stages={stages} />
    </DataSection>
    <DataSection className='sm:col-span-2' label='Instructions'>
      <article className='prose prose-sm prose-indigo text-gray-900'>
        <ReactMarkdown>{instructions}</ReactMarkdown>
      </article>
    </DataSection>
  </>
)

export default RecipeSection
