import Row from './Row'

const Timeline = ({ stages, stage, time }) => (
  <div className='lg:col-start-4 lg:col-span-1'>
    <div className='bg-white text-gray-900 rounded shadow p-4'>
      <h3 className='text-lg font-medium font-medium text-center mb-4'>
        Stages
      </h3>

      <ul>
        <Row stage='bloom' start=':00' />

        <Row stage='first pour' start=':40' />

        <Row stage='second pour' start='1:40' />

        <Row stage='serve' start='2:30' bottom />
      </ul>
    </div>
  </div>
)

export default Timeline
