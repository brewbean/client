import { Row } from 'components/Form/Row'
const Create = () => {
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
          },
        },
      ],
    },
    {
      rowTitle: 'Bean',
      rowDescription: 'Add details about your coffee bean',
      rows: [
        {
          rowType: 'input',
          value: 'bean_name_free',
          props: {
            id: 'bean-name',
            placeholder: 'e.g. Kurasu House Blend Dark',
            label: 'Bean Name',
          },
        },
        {
          rowType: 'input',
          value: 'bean_weight',
          props: {
            id: 'bean-weight',
            placeholder: 'e.g. 12',
            label: 'Coffee Bean Amount',
            type: 'number',
            symbol: 'grams',
            symbolPadding: 'pr-14',
            min: 1,
            required: true,
          },
        },
        {
          rowType: 'dropdown',
          props: {
            id: 'bean-grind',
            value: 'bean_grind',
            options: [
              { key: 'Extra-fine', value: 'Extra-fine' },
              { key: 'Fine', value: 'Fine' },
              { key: 'Medium-fine', value: 'Medium-fine' },
              { key: 'Medium-coarse', value: 'Medium-coarse' },
              { key: 'Coarse', value: 'Coarse' },
              { key: 'Extra-coarse', value: 'Extra-coarse' },
            ],
            label: 'Bean Grind',
            required: true,
          },
        },
      ],
    },
  ]
  return (
    <div>
      <h1>Create Brew Log</h1>

      <Row config={config} />
    </div>
  )
}

export default Create
