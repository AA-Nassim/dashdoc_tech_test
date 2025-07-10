import { usePath } from '../contexts/PathContext'
import ValueListItem from './ValueListItem'

const PathDisplayer = () => {
    const { path } = usePath()

    return (
        <div className="w-full flex flex-col px-4 pb-4 gap-4">
            {path.map((point, id) => (
                <ValueListItem key={id} content={point} />
            ))}
        </div>
    )
}

export default PathDisplayer