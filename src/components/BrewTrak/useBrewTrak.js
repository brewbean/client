import { useState } from 'react'
import { useMutation } from 'urql'
import { INSERT_RECIPE_ONE } from '../../queries'

export const useBrewTrak = () => {
  /*
        CreateCard States
            NOTE: Initial states are temporary random defaults.
    */
  const [state, setState] = useState({
    img: '',
    date: '',
    beanWeight: '',
    brewType: 'Pour Over',
    beanGrind: 'Extra Fine',
    waterAmount: '',
    beanType: '',
    waterTemp: '',
    bloomWaterAmount: '',
    bloomTime: '',
    rating: '1',
    brewComments: '',
    brewSelected: 'false',
  })
  const [, insertRecipe] = useMutation(INSERT_RECIPE_ONE)
  const [id] = useState('')
  // ratio state (how to implement best way) (Water Amount / beanWeight = ratio)
  // but how to make both inputs respond when other is inputted?
  // if i want a ratio if 16 but type in 50g of coffee

  const submitRecipe = async () => {
    const object = {
      barista_id: 6, //temp-id
      brew_type: state.brewType,
      bean_weight: state.beanWeight,
      bean_grind: state.beanGrind,
      water_temp: state.waterTemp,
      rating: state.rating,
      comment: state.brewComments,
      private: true, //temp-setting
      water_amount: state.waterAmount,
    }
    let result = await insertRecipe({ object })
    console.log('Result', result)
  }

  return {
    data: {
      ...state,
      id,
    },
    methods: {
      onChangeGenerator: (attr) => (e) =>
        setState({ ...state, [attr]: e.target.value }),
      submitRecipe,
    },
  }
}

export default useBrewTrak
