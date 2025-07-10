import { useSteps } from '../contexts/StepContext'
import PairListItem from './PairListItem'

const StepDisplayer = () => {

    const { steps } = useSteps()

    return (
        <div className="w-full max-h-full overflow-scroll flex flex-col px-4 pb-4 gap-4">
            {steps.map(([from, to], id) => (
                <PairListItem key={id} from={from} to={to} />
            ))}
        </div>
    )
}

export default StepDisplayer