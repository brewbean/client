import { timeString } from 'helper/timer'
import Row from './Row'

const Timeline = ({ stages, stage, seconds }) => (
  <div className='lg:col-start-4 lg:col-span-1'>
    <div className='bg-white text-gray-900 rounded shadow p-4'>
      <h3 className='text-2xl font-medium font-bold text-center mb-4'>
        Stages
      </h3>

      <ul>
        {stages.map(({ name, start, end }, index) => (
          <Row
            key={name}
            stage={name}
            start={timeString(start)}
            bottom={index === stages.length - 1}
            isCurrent={stage === name}
            isDone={seconds >= end}
          />
        ))}
      </ul>
    </div>
  </div>
)

export default Timeline
