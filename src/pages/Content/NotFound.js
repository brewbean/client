import Content, { HeaderBlock, HeaderSection } from 'components/Content'

export default function About() {
  return (
    <Content>
      <HeaderSection>
        <HeaderBlock preTitle='404' title='Page not found' />
      </HeaderSection>

      <h3 className='mt-8 font-medium text-lg text-gray-700 text-center'>
        Sorry, there's no hot bean water here.
      </h3>
    </Content>
  )
}
