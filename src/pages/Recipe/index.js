import React from 'react';
import Header from '../../components/Header';
import StagePage from './StagePage';
import { useRecipe } from './useRecipe';

const RecipePage = props => {
  const { data, handler } = useRecipe();

  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <StagePage {...data} {...handler} />
    </div>
  )
}

export default RecipePage;