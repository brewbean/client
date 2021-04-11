import Content, { HeaderBlock, HeaderSection } from 'components/Content'

export default function Contact() {
  return (
    <Content>
      <HeaderSection>
        <HeaderBlock preTitle='Contact us' title="We'd love to chat" />
      </HeaderSection>
      <div className='mt-6 prose prose-indigo prose-md text-gray-700 mx-auto'>
        <h2>Questions? Feedback? Collaboration?</h2>
        <p>
          We're happy to chat with you about anything. Feel free to get in reach
          by sending us an email <a href='mailto:info@brewbean.io'>here</a>.
        </p>
        <h2>Found a bug?</h2>
        <p>
          If you found something that isn't working quite right, let us know! We
          welcome all the bug catchers we can get. Please fill out this{' '}
          <a href='https://forms.gle/AvP1q5rt1mXp4WLEA'>form</a> to let us know
          what to fix!
        </p>
      </div>
    </Content>
  )
}
