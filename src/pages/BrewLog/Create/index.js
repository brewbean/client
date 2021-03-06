import { Row } from 'components/Form/Row'
const Create = () => {
  const config = [
    {
      rowTitle: 'Basics',
      rowDescription: 'Tell us some details about your recipe',
      rows: [
        {
          type: 'input',
          id: 'recipe-name',
          placeholder: 'e.g. My favorite pour over recipe',
          label: 'Recipe Name',
        },
        {
          type: 'input',
          id: 'recipe-about',
          placeholder: 'e.g. Super amazing elixir',
          label: 'About',
        },
      ],
    },
    {
      rowTitle: 'Basics 2',
      rowDescription: 'Tell us some details about your recipe 2',
      rows: [
        {
          type: 'input',
          id: 'recipe-name',
          placeholder: 'e.g. My favorite pour over recipe!!',
          label: 'Recipe Name',
        },
        {
          type: 'input',
          id: 'recipe-about',
          placeholder: 'e.g. Super amazing elixir!!!',
          label: 'About',
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
