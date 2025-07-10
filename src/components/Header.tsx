import { deliveryCheck } from "../api/deliveryAPI"
import { useAddresses } from "../contexts/AddressesContext"
import { usePath } from "../contexts/PathContext"
import { usePopUp } from "../contexts/PopUpContext"
import { useSteps } from "../contexts/StepContext"


const Header = () => {

    const { steps } = useSteps()
    const { path } = usePath()
    const {resetAddresses} = useAddresses()
    const { show } = usePopUp()

    const handleRunButton = () => {
        
        console.log("Steps : ############")
        console.log(steps)

        console.log("Path : ############")
        console.log(path)

        const result = JSON.parse(deliveryCheck(steps, path))

        console.log("result : ############")
        console.log(result)

        if (result.status == "error"){
            show({
                type: "error",
                title: `error : ${result.error_code}`,
                content: result.error_message
            })
            return; 
        }

        if (result.status == "success") {
            show({
                type: "success", 
                title: "Sucess!", 
                content: "your path is correct, here are the steps :",
                steps: result.steps
            })
        }

    }

    const handleResetButton = () => {
        resetAddresses()
    }

    return (
        <header
            className="fixed md:static inset-x-0 top-0 z-10  w-full  border border-gray-100 bg-blue-50 py-3 shadow backdrop-blur-lg ">
            <div className="px-4">
                <div className="flex items-center justify-between">
                    <div className="flex shrink-0">
                        <a aria-current="page" className="flex items-center" href="/">
                            <img className="h-10 w-auto rounded-lg" src="https://pbs.twimg.com/profile_images/1483478683310563332/Mpbtk6Na_400x400.jpg" alt="" />
                            <p className="hidden md:inline ml-5 text-blue-900 font-semibold">Delivery Checker</p>
                        </a>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <button className="white-btn">
                            Help
                        </button>

                        <button className="red-btn" onClick={handleResetButton}>
                            Reset
                        </button>

                        <button onClick={handleRunButton} className="blue-btn">
                            Run Checker
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header