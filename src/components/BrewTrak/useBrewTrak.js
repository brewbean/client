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
    brewSelected: 'false'
  })
  const [, insertRecipe] = useMutation(INSERT_RECIPE_ONE)
  const [id, setId] = useState('')
  // ratio state (how to implement best way) (Water Amount / beanWeight = ratio)
  // but how to make both inputs respond when other is inputted?
  // if i want a ratio if 16 but type in 50g of coffee
  const setCardValues = card => {
    setId(id)
  }

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
      water_amount: state.waterAmount
    }
    let result = await insertRecipe({ object })
    console.log('Result', result)
  }

  return {
    data: {
      ...state,
      id
    },
    methods: {
      // setDate: e => setDate(e.target.value),
      // setBeanWeight: e => setBeanWeight(e.target.value),
      // setBrewType: e => setBrewType(e.target.value),
      // setBeanGrind: e => setBeanGrind(e.target.value),
      // setWaterAmount: e => setWaterAmount(e.target.value),
      // setBeanType: e => setBeanType(e.target.value),
      // setWaterTemp: e => setWaterTemp(e.target.value),
      // setBloomWaterAmount: e => setBloomWaterAmount(e.target.value),
      // setBloomTime: e => setBloomTime(e.target.value),
      // setRating: e => setRating(e.target.value),
      // setBrewComments: e => setBrewComments(e.target.value),
      // setCardValues,
      submitRecipe
    }
  }
}

export default useBrewTrak
