import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useSteps } from '../contexts/StepContext';
import { useAddresses } from '../contexts/AddressesContext';


const AddStepForm = () => {
    const { addStep, steps } = useSteps();
    const { addresses } = useAddresses();

    // addresses already used in steps
    const usedAddresses = steps.reduce<string[]>((acc, [a, b]) => {
        acc.push(a, b);
        return acc;
    }, []);

    // Only allow addresses not already used in any step
    const availableAddresses = addresses.filter(addr => !usedAddresses.includes(addr));

    const [pickup, setPickup] = useState(availableAddresses[0] || "");
    const [dropoff, setDropoff] = useState(availableAddresses.length > 1 ? availableAddresses[1] : "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Reset pickup/dropoff if they are no longer available
        if (!availableAddresses.includes(pickup)) {
            setPickup("");
        }
        if (!availableAddresses.includes(dropoff)) {
            setDropoff("");
        }
    }, [availableAddresses]);

    const handleSend = async (e: FormEvent) => {
        e.preventDefault();
        if (!pickup || !dropoff || pickup === dropoff) return;
        setLoading(true);
        try {
            addStep([pickup, dropoff]);
            setPickup("");
            setDropoff("");
        } finally {
            setLoading(false);
        }
    };

    const handlePickupChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === dropoff) 
            setDropoff(pickup);
        
        setPickup(e.target.value);
        
    };

    const handleDropoffChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === pickup) 
            setPickup(dropoff);
        
        setDropoff(e.target.value);
        
    };

    return (
        <form
            onSubmit={handleSend}
            className="flex flex-col w-full gap-2 p-4 bg-transparent border-b border-gray-200"
        >
            <label className=" text-sm font-semibold text-gray-700">
                Step 2: Register your deliveries.
            </label>
            <div className='flex flex-row gap-4'>


                <select
                    id="pickup-select"
                    className="w-full bg-white flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={pickup}
                    onChange={handlePickupChange}
                    disabled={loading || availableAddresses.length < 1}
                >
                    {availableAddresses.length < 1 ? (
                        <option value="" disabled>
                            Not enough addresses
                        </option>
                    ) : (
                        <option value="" disabled>
                            Select pickup
                        </option>
                    )}
                    {
                        availableAddresses
                            
                            .map(opt => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))
                    }
                </select>



                <select
                    id="dropoff-select"
                    className="w-full bg-white flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={dropoff}
                    onChange={handleDropoffChange}
                    disabled={loading || availableAddresses.length < 2}
                >

                    <option value="" disabled>
                        Select dropoff
                    </option>

                    {
                        availableAddresses
                            .filter(opt => opt )
                            .map(opt => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                </select>

            </div>
            <button
                type="submit"
                className="blue-btn w-full"
                disabled={
                    !pickup || !dropoff || pickup === dropoff || loading || availableAddresses.length < 2
                }
            >
                {loading ? "Adding ..." : "Add"}
            </button>
        </form>
    );
};

export default AddStepForm;
