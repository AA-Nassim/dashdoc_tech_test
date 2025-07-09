import AddPathForm from '../components/AddPathForm'
import PathDisplayer from '../components/PathDisplayer'

const PathSection = () => {


    return (
        <section className='section-container'>
            <AddPathForm  />
            <PathDisplayer />
        </section>
    )
}

export default PathSection