import Sidebar from './Sidebar'
import ReactMarkdown from 'react-markdown'
import { externalLinkPlugin } from 'helper/sanitize'

export default function Overview({
  content,
  phone_number,
  site_link,
  site_text,
  location,
  location_link,
  hours,
}) {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='col-span-2 border-b pb-12'>
        <div className='prose prose-md prose-indigo'>
          <ReactMarkdown plugins={externalLinkPlugin}>{content}</ReactMarkdown>
        </div>
      </div>
      <div>
        <Sidebar
          phoneNumber={phone_number}
          website={{
            link: site_link,
            text: site_text,
          }}
          location={{
            link: location_link,
            text: location,
          }}
          hours={hours}
        />
      </div>
    </div>
  )
}
