import React from 'react'
import Hero from '../components/Hero'
import EventsCalendar from '../components/EventsCalendar'
import About from '../components/About'

const Home = () => {
  return (
    <main>
        <Hero />
        <About />
        <EventsCalendar />
    </main>
  )
}

export default Home