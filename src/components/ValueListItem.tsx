import { useAddresses } from "../contexts/AddressesContext"
import { usePath } from "../contexts/PathContext"

type ValueListItemProps = {
    content: string, 
    isAdr?: boolean 
}

const ValueListItem:React.FC<ValueListItemProps> = ({content, isAdr}) => {

    const {removeAddress} = useAddresses()
    const {removeFromPath} = usePath()

    const handleDeleteAdr = () => {
        removeAddress(content)
    }

    const handleDeletePath = () => {
        removeFromPath(content)
    }   

    return (
        <div className="w-full py-2 px-4  
        border-1 bg-white shadow-sm border-gray-400 rounded-lg flex items-center justify-between">
            <p>{content}</p>
            <button
                type="button"
                aria-label="Delete"
                onClick={() => {isAdr? handleDeleteAdr() : handleDeletePath()}}
                className="w-8 h-8 hover:bg-gray-300 rounded group text-gray-400 hover:text-red-600"
            >
                <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6 16C5.44772 16 5 15.5523 5 15V7H15V15C15 15.5523 14.5523 16 14 16H6Z"
                        fill="currentColor"
                    />
                    <path
                        d="M8 9V13"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M12 9V13"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    <rect
                        x="4"
                        y="4"
                        width="12"
                        height="2"
                        rx="1"
                        fill="currentColor"
                    />
                </svg>
            </button>
        </div>
    )
}

export default ValueListItem