import React from 'react'

type StepCardProps = {
    address: string, 
    action: "pickup" | "dropoff" | null
}

const StepCard:React.FC<StepCardProps> = ({address, action}) => {
  return (
    <div className='flex flex-col min-w-[30%] p-3
    bg-white rounded-lg border border-gray-200 shadow-md '>
        <p>adress : {address}</p>
        <p>action : {action}</p>
    </div>
  )
}

export default StepCard