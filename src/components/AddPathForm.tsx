import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useAddresses } from '../contexts/AddressesContext';
import { usePath } from '../contexts/PathContext';

const AddPathForm = () => {
    const { addresses } = useAddresses()
    const { addToPath, path } = usePath()

    // Only allow addresses not already used in the path
    const availableAddresses = addresses.filter(addr => !path.includes(addr));

    const [selected, setSelected] = useState(availableAddresses[0] || "");
    const [loading, setLoading] = useState(false);

    const handleSend = async (e: FormEvent) => {
        e.preventDefault();
        if (!selected) return;
        setLoading(true);
        try {
            addToPath(selected);
            setSelected("")
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
    };

    useEffect(() => {
        if (!availableAddresses.includes(selected)) {
            setSelected("");
        }
    }, [availableAddresses]);

    return (
        <form
            onSubmit={handleSend}
            className="flex w-full flex-col items-left gap-2 p-4 bg-transparent border-b border-gray-200"
        >
            <label htmlFor="path-select" className="    text-sm font-semibold text-gray-700">
                Step 3: Add the steps of the path you want to check
            </label>
            
                <select
                    id="path-select"
                    className="w-full bg-white flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={selected}
                    onChange={handleChange}
                    disabled={loading || availableAddresses.length === 0}
                >
                    {availableAddresses.length === 0 ? (
                        <option value="" disabled>
                            No addresses available
                        </option>
                    ) : (
                        <option value="" disabled>
                            Select an address
                        </option>
                    )}
                    {availableAddresses.length > 0 &&
                        availableAddresses.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))
                    }
                </select>
                
                <button
                    type="submit"
                    className="blue-btn w-full"
                    disabled={!selected || loading || availableAddresses.length === 0}
                >
                    {loading ? "Adding ..." : "Add"}
                </button>
            
        </form>
    );
};

export default AddPathForm;
