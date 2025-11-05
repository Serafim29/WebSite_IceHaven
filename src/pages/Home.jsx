import React from 'react'
import Hero from '../components/Hero'
import EventsCalendar from '../components/EventsCalendar'
import About from '../components/About'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <main>
        <Hero />
        <About />
        <EventsCalendar />
        <Contact />
    </main>
  )
}

export default Home