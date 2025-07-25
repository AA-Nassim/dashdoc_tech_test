import { useAddresses } from "../contexts/AddressesContext"
import ValueListItem from "./ValueListItem"


const AdressDisplayer = () => {

    const {addresses} = useAddresses()

    return (
        <div className="w-full max-h-full overflow-scroll flex flex-col px-4 pb-4 gap-4">
            {addresses.map((adr, id) => (
                <ValueListItem key={id} content={adr} isAdr={true}/>
            ))}
        </div>
    )
}

export default AdressDisplayer