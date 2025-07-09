import { useAddresses } from "../contexts/AddressesContext"
import ValueListItem from "./ValueListItem"


const AdressDisplayer = () => {

    const {addresses} = useAddresses()

    return (
        <div className="w-full flex flex-col px-4 pb-4 gap-4">
            {addresses.map((adr, id) => (
                <ValueListItem key={id} id={id} content={adr} />
            ))}
        </div>
    )
}

export default AdressDisplayer