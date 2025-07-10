import React from 'react'

type StepCardProps = {
    id: number,
    address: string,
    action: "pickup" | "dropoff" | null
}

const StepCard: React.FC<StepCardProps> = ({ id, address, action }) => {
    let tagColor = "bg-gray-300 text-gray-700";
    let tagLabel = "No action";
    if (action === "pickup") {
        tagColor = "bg-blue-100 text-blue-700";
        tagLabel = "Pickup";
    } else if (action === "dropoff") {
        tagColor = "bg-blue-700 text-white";
        tagLabel = "Dropoff";
    }
    return (
        <div className='flex flex-col min-w-[30%] p-3
    bg-white rounded-lg border border-gray-200 shadow-md '>
            <div className='flex justify-between'>
                <label className='text-gray-600'>Adresse n°{id}:</label>

                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${tagColor}`}>
                    {tagLabel}
                </span>
            </div>

            <span className=' text-2xl font-bold'>{address}</span>

        </div>
    )
}

export default StepCard