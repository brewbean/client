import React from 'react';
import StageInput from './StageInput';

const PourStageEditor = ({ stages }) => {

  return (
    <div className='overflow-y-auto bg-white text-gray-800 rounded shadow p-4 flex flex-col'>
      <div className="space-y-6 flex flex-col">
        {
          stages.map((s, i) => <StageInput key={i} />)
        }
      </div>
    </div>
  )
}

export default PourStageEditor;