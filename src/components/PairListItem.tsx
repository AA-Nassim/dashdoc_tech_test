type PairListItemProps = {
    id: number,
    from: string,
    to: string
}

const PairListItem:React.FC<PairListItemProps> = ({id, from, to}) => {
    return (
        <div className="flex flex-row items-center w-full py-2 px-4  
        border-1 bg-white border-gray-400 rounded-lg">
            <div className="flex flex-col w-full">
            <p>{from}</p>
            <p>{to}</p>
            </div>
            <button
                type="button"
                aria-label="Delete"
                //onClick={}
                className="w-10 h-10 hover:bg-gray-300 rounded group text-gray-400 hover:text-red-600"
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

export default PairListItem