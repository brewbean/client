import { Row } from 'components/Form/Row'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
const Create = () => {
  const schema = yup.object().shape({
    recipeName: yup.string().required(),
    recipeAbout: yup.string().required(),
  })
  const config = [
    {
      rowTitle: 'Basics',
      rowDescription: 'Tell us some details about your recipe',
      rows: [
        {
          rowType: 'input',
          value: 'name',
          props: {
            id: 'recipe-name',
            placeholder: 'e.g. My favorite pour over recipe',
            label: 'Recipe Name',
            name: 'recipeName',
          },
          validation: {
            required: true,
          },
        },
        {
          rowType: 'input',
          value: 'about',
          props: {
            id: 'recipe-about',
            placeholder: 'e.g. Super amazing elixir',
            label: 'About',
            name: 'recipeAbout',
          },
        },
        {
          rowType: 'input',
          value: 'about2',
          props: {
            id: 'recipe-about2',
            placeholder: 'e.g. Super amazing elixir222',
            label: 'About222',
            name: 'recipeAbout222',
          },
          validation: {
            required: true,
          },
        },
      ],
    },
    // {
    //   rowTitle: 'Bean',
    //   rowDescription: 'Add details about your coffee bean',
    //   rows: [
    //     {
    //       rowType: 'input',
    //       value: 'bean_name_free',
    //       props: {
    //         id: 'bean-name',
    //         placeholder: 'e.g. Kurasu House Blend Dark',
    //         label: 'Bean Name',
    //       },
    //     },
    //     {
    //       rowType: 'input',
    //       value: 'bean_weight',
    //       props: {
    //         id: 'bean-weight',
    //         placeholder: 'e.g. 12',
    //         label: 'Coffee Bean Amount',
    //         type: 'number',
    //         symbol: 'grams',
    //         symbolPadding: 'pr-14',
    //         min: 1,
    //         required: true,
    //       },
    //     },
    //     {
    //       rowType: 'dropdown',
    //       props: {
    //         id: 'bean-grind',
    //         value: 'bean_grind',
    //         options: [
    //           { key: 'Extra-fine', value: 'Extra-fine' },
    //           { key: 'Fine', value: 'Fine' },
    //           { key: 'Medium-fine', value: 'Medium-fine' },
    //           { key: 'Medium-coarse', value: 'Medium-coarse' },
    //           { key: 'Coarse', value: 'Coarse' },
    //           { key: 'Extra-coarse', value: 'Extra-coarse' },
    //         ],
    //         label: 'Bean Grind',
    //         required: true,
    //       },
    //     },
    //   ],
    // },
  ]
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => console.log(data)
  return (
    <div>
      <h1>Create Brew Log</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row
          config={config}
          register={register}
          schema={schema}
          errors={errors}
        />
      </form>
    </div>
  )
}

export default Create
