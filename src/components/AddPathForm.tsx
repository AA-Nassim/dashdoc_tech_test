import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useAddresses } from '../contexts/AddressesContext';
import { usePath } from '../contexts/PathContext';



const AddPathForm = () => {


    const { addresses } = useAddresses()
    const { addToPath } = usePath()

    const [selected, setSelected] = useState(addresses[0] || "");
    const [loading, setLoading] = useState(false);

    const handleSend = async (e: FormEvent) => {
        e.preventDefault();
        if (!selected) return;
        setLoading(true);
        try {
            addToPath(selected);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
    };

    return (
        <form
            onSubmit={handleSend}
            className="flex w-full items-center gap-2 p-4 bg-transparent border-b border-gray-200"
        >
            <select
                className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={selected}
                onChange={handleChange}
                disabled={loading || addresses.length === 0}
            >
                {addresses.length === 0 ? (
                    <option value="" disabled>
                        No addresses available
                    </option>
                ) : (
                    addresses.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))
                )}
            </select>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                disabled={!selected || loading || addresses.length === 0}
            >
                {loading ? "Adding ..." : "Add"}
            </button>
        </form>
    );
};

export default AddPathForm;
