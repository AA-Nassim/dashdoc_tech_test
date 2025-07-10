import { usePopUp } from '../contexts/PopUpContext'
import StepCard from './StepCard'

const PopUp = () => {
    const { popupContent, hide } = usePopUp()

    if (popupContent?.type == "error")
        return (
            <div className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex px-4 bg-gray-500/50 h-screen w-screen items-center justify-center  text-center ">

                    <div className="flex flex-col gap-4 bg-white rounded-lg p-4 text-left overflow-hidden shadow-xl transform transition-all max-h-[80%] sm:w-full sm:max-w-[50%] "
                        role="dialog" aria-modal="true" aria-labelledby="modal-headline">

                        <div>
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                    {popupContent?.title}
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        {popupContent?.content}
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div >
                            <button
                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:red-blue-500 sm:text-sm"
                                onClick={hide}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )

    if (popupContent?.type == "success")
        return (
            <div className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex bg-gray-500/50 h-screen w-screen items-center justify-center  text-center ">

                    <div className="flex flex-col gap-4 bg-white rounded-lg p-4 text-left overflow-hidden shadow-xl transform transition-all max-h-[80%] sm:w-full sm:max-w-[80%] "
                        role="dialog" aria-modal="true" aria-labelledby="modal-headline">

                        <div>
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                                <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                    {popupContent?.title}
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        {popupContent?.content}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col  sm:flex-row gap-4 px-4 bg-blue-50 rounded-lg border border-gray-200  overflow-scroll w-full h-full py-5 '>
                            {popupContent.steps?.map((step, id) => (
                                <StepCard key={id} id={id + 1} address={step.address} action={step.action} />
                            ))}

                        </div>

                        <div >
                            <button
                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                onClick={hide}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default PopUp