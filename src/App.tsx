import Hero from './components/Hero'
import Problem from './components/Problem'
import ArmsRace from './components/ArmsRace'
import Hypothesis from './components/Hypothesis'
import Evidence from './components/Evidence'
import Simulation from './components/Simulation'
import Quiz from './components/Quiz'
import Footer from './components/Footer'

function App() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      <ArmsRace />
      <Hypothesis />
      <Evidence />
      <Simulation />
      <Quiz />
      <Footer />
    </main>
  )
}

export default App
