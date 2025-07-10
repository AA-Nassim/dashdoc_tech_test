import { deliveryCheck } from "../api/deliveryAPI"
import { usePath } from "../contexts/PathContext"
import { usePopUp } from "../contexts/PopUpContext"
import { useSteps } from "../contexts/StepContext"


const Header = () => {

    const { steps } = useSteps()
    const { path } = usePath()
    const { show } = usePopUp()

    const handleRunButton = () => {
        console.log(steps)
        console.log(path)

        const result = JSON.parse(deliveryCheck(steps, path))

        console.log("result : ")
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

    return (
        <header
            className="fixed md:static inset-x-0 top-0 z-10  w-full  border border-gray-100 bg-blue-50 py-3 shadow backdrop-blur-lg ">
            <div className="px-4">
                <div className="flex items-center justify-between">
                    <div className="flex shrink-0">
                        <a aria-current="page" className="flex items-center" href="/">
                            <img className="h-10 w-auto rounded-lg" src="https://pbs.twimg.com/profile_images/1483478683310563332/Mpbtk6Na_400x400.jpg" alt="" />
                            <p className="sr-only">Website Title</p>
                        </a>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <button className="items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex">
                            Help
                        </button>

                        <button onClick={handleRunButton} className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500">
                            Run
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header