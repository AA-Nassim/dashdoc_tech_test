import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useAddresses } from '../contexts/AddressesContext';



const AddAdrForm = () => {
    const [adr, setAdr] = useState("");
    const [loading, setLoading] = useState(false);
    const { addAddress } = useAddresses();

    const isValidMessage = (msg: string) => /\S/.test(msg);

    const handleSend = async (e: FormEvent) => {
        e.preventDefault();
        if (!isValidMessage(adr)) return;
        setLoading(true);
        try {
            addAddress(adr);
            setAdr("");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAdr(e.target.value);
    };

    return (
        <form
            onSubmit={handleSend}
            className="flex w-full items-ceter gap-2 p-4 bg-transparent border-b border-gray-200"
        >
            <textarea
                className="bg-white flex-1 resize-none rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                rows={1}
                placeholder="Add an adress here"
                value={adr}
                onChange={handleChange}
                disabled={loading}
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                disabled={!isValidMessage(adr) || loading}
            >
                {loading ? "Adding ..." : "Add"}
            </button>
        </form>
    );
}

export default AddAdrForm