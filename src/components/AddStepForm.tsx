import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useSteps } from '../contexts/StepContext';
import { useAddresses } from '../contexts/AddressesContext';


const AddStepForm = () => {
    
    const {addStep} = useSteps()
    const {addresses} = useAddresses()

    const [pickup, setPickup] = useState(addresses[0] || "");
    const [dropoff, setDropoff] = useState(addresses.length > 1 ? addresses[1] : "");
    const [loading, setLoading] = useState(false);

    const handleSend = async (e: FormEvent) => {
        e.preventDefault();
        if (!pickup || !dropoff || pickup === dropoff) return;
        setLoading(true);
        try {
            addStep([pickup, dropoff]);
        } finally {
            setLoading(false);
        }
    };

    const handlePickupChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPickup(e.target.value);
        // If dropoff is now the same as pickup, auto-select a different dropoff if possible
        if (e.target.value === dropoff) {
            const nextDropoff = addresses.find(opt => opt !== e.target.value) || "";
            setDropoff(nextDropoff);
        }
    };

    const handleDropoffChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setDropoff(e.target.value);
        // If pickup is now the same as dropoff, auto-select a different pickup if possible
        if (e.target.value === pickup) {
            const nextPickup = addresses.find(opt => opt !== e.target.value) || "";
            setPickup(nextPickup);
        }
    };

    return (
        <form
            onSubmit={handleSend}
            className="flex w-full items-center gap-2 p-4 bg-transparent border-b border-gray-200"
        >
            <div className='flex w-full flex-col sm:flex-row gap-2'>
                <select
                    className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={pickup}
                    onChange={handlePickupChange}
                    disabled={loading || addresses.length < 2}
                >
                    {addresses.length < 2 ? (
                        <option value="" disabled>
                            Not enough addresses
                        </option>
                    ) : (
                        addresses
                            .filter(opt => opt !== dropoff)
                            .map(opt => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))
                    )}
                </select>
                <select
                    className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={dropoff}
                    onChange={handleDropoffChange}
                    disabled={loading || addresses.length < 2}
                >
                    {addresses.length < 2 ? (
                        <option value="" disabled>
                            Not enough addresses
                        </option>
                    ) : (
                        addresses
                            .filter(opt => opt !== pickup)
                            .map(opt => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))
                    )}
                </select>
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                disabled={
                    !pickup || !dropoff || pickup === dropoff || loading || addresses.length < 2
                }
            >
                {loading ? "Adding ..." : "Add"}
            </button>
        </form>
    );
};

export default AddStepForm;
