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
            className="flex w-full flex-col items-ceter gap-2 p-4 bg-blue-50 border-b border-gray-200"
        >
            
            <label htmlFor="address-textarea" className="ml-2 text-sm font-semibold text-gray-700">
                Step 1 : Setup your addresses here.
            </label>
            <textarea
                id="address-textarea"
                className="bg-white flex-1 resize-none rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                rows={1}
                placeholder="Add an adress here"
                value={adr}
                onChange={handleChange}
                disabled={loading}
            />
            <button
                type="submit"
                className="blue-btn"
                disabled={!isValidMessage(adr) || loading}
            >
                {loading ? "Adding ..." : "Add"}
            </button>
        </form>
    );
}

export default AddAdrForm