import React from 'react'
import AddAdrForm from '../components/AddAdrForm'
import AdressDisplayer from '../components/AdressDisplayer'


const AdressSection = () => {

    return (
        <section className='section-container'>
            <AddAdrForm />
            <AdressDisplayer />
        </section>
    )
}

export default AdressSection