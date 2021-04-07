import { Link, useRouteMatch } from 'react-router-dom'
import { Rating } from 'components/Badge'
import { Eye, EyeOff } from 'components/Icon'
import { DataSection } from 'components/Layout/Detail'
import { StageSection } from 'components/Stage'
import { combineClass } from 'helper/stringHelper'

export const Description = ({
  id,
  comment,
  title,
  date_created,
  is_private,
  rating,
  recipe,
  template_recipe,
  onDelete,
}) => {
  const { url } = useRouteMatch()

  return (
    <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
      <DataSection className='sm:col-span-1' label='Title'>
        {title}
      </DataSection>

      <div className='sm:col-span-1 justify-self-end space-x-2'>
        <button className='btn btn--white btn--sm' onClick={() => onDelete()}>
          Delete
        </button>
        <Link to={`${url}/edit`} className='btn btn--primary btn--sm'>
          Edit
        </Link>
      </div>

      <DataSection className='sm:col-span-1' label='Log Private'>
        <span
          className={combineClass('badge', {
            'badge--gray': is_private,
            'badge--indigo': !is_private,
          })}
        >
          {is_private.toString()}
          {is_private ? (
            <EyeOff className='h-3 w-3 ml-1' />
          ) : (
            <Eye className='h-3 w-3 ml-1' />
          )}
        </span>
      </DataSection>
      <DataSection className='sm:col-span-1' label='Rating'>
        <Rating value={rating} />
      </DataSection>
      <DataSection className='sm:col-span-1' label='Created On'>
        {date_created.substring(0, 10)}
      </DataSection>
      <DataSection
        className='sm:col-span-2 whitespace-pre-line'
        label='Comment'
      >
        {comment}
      </DataSection>

      <div className='sm:col-span-2 border-t border-gray-200'></div>

      <DataSection className='sm:col-span-1' label='Recipe Name'>
        <Link
          className='text-indigo-600 font-medium hover:underline inline-flex items-center'
          to={'/recipe/' + recipe.id}
        >
          {recipe.name}
        </Link>
      </DataSection>
      <DataSection className='sm:col-span-1' label='Author'>
        {recipe.barista.display_name}
      </DataSection>

      {template_recipe && (
        <>
          <DataSection className='sm:col-span-1' label='Template Name'>
            <Link
              className='text-indigo-600 font-medium hover:underline inline-flex items-center'
              to={'/recipe/' + template_recipe.id}
            >
              {template_recipe.name}
            </Link>
          </DataSection>
          <DataSection className='sm:col-span-1' label='Template Author'>
            {template_recipe.barista.display_name}
          </DataSection>
        </>
      )}

      <DataSection className='sm:col-span-2' label='About'>
        {recipe.about ? recipe.about : 'N/A'}
      </DataSection>
      <DataSection className='sm:col-span-1' label='Brew Type'>
        {recipe.brew_type}
      </DataSection>
      <DataSection className='sm:col-span-1' label='Bean'>
        {recipe.bean_name_free ? recipe.bean_name_free : 'N/A'}
      </DataSection>
      <DataSection className='sm:col-span-1' label='Bean Weight'>
        {recipe.bean_weight}g
      </DataSection>
      <DataSection className='sm:col-span-1' label='Bean Grind'>
        {recipe.bean_grind}
      </DataSection>
      <DataSection className='sm:col-span-1' label='Water Amount'>
        {recipe.water_amount}g
      </DataSection>
      <DataSection className='sm:col-span-1' label='Water Temp'>
        {recipe.water_temp}F
      </DataSection>
      <DataSection className='sm:col-span-1' label='Device'>
        {recipe.device ? recipe.device : 'N/A'}
      </DataSection>
      <DataSection className='sm:col-span-2' label='Recipe Player'>
        <StageSection
          stages={recipe.stages}
          playerPath={`/recipe/${recipe.id}/player`}
        />
      </DataSection>
      <DataSection
        className='sm:col-span-2 whitespace-pre-line'
        label='Instructions'
      >
        {recipe.instructions}
      </DataSection>
    </dl>
  )
}
