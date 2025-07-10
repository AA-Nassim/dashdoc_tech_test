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
        setPickup(e.target.value);
        if (e.target.value === dropoff) {
            const nextDropoff = availableAddresses.find(opt => opt !== e.target.value) || "";
            setDropoff(nextDropoff);
        }
    };

    const handleDropoffChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setDropoff(e.target.value);
        if (e.target.value === pickup) {
            const nextPickup = availableAddresses.find(opt => opt !== e.target.value) || "";
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
                    className="bg-white flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={pickup}
                    onChange={handlePickupChange}
                    disabled={loading || availableAddresses.length < 2}
                >

                    {availableAddresses.length < 2 ? (
                        <option value="" disabled>
                            Not enough addresses
                        </option>
                    ) : (
                        <option value="" disabled>
                            Select pickup
                        </option>
                    )}
                    {availableAddresses.length > 1 ? (
                        availableAddresses
                            .filter(opt => opt !== dropoff)
                            .map(opt => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))
                    ) : (null)}
                </select>
                <select
                    className="bg-white flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={dropoff}
                    onChange={handleDropoffChange}
                    disabled={loading || availableAddresses.length < 2}
                >

                    {availableAddresses.length < 2 ? (
                        <option value="" disabled>
                            Not enough addresses
                        </option>
                    ) : (
                        <option value="" disabled>
                            Select dropoff
                        </option>
                    )}
                    {availableAddresses.length > 1 ? (
                        availableAddresses
                            .filter(opt => opt !== pickup)
                            .map(opt => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))
                    ) : (null)}
                </select>
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
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
