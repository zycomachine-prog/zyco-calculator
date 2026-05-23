import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import {
  useEffect,
  useState,
} from 'react'
import AirBendingGuide from './pages/AirBendingGuide.jsx'
import BendAllowanceCalculator from './pages/BendAllowanceCalculator.jsx'
import EngineeringHub from './pages/EngineeringHub.jsx'
import InsideRadiusGuide from './pages/InsideRadiusGuide.jsx'
import MaterialDatabase from './pages/MaterialDatabase.jsx'
import PressBrakeCalculator from './pages/PressBrakeCalculator.jsx'
import PressBrakeTonnageGuide from './pages/PressBrakeTonnageGuide.jsx'
import PressBrakeVDieOpeningGuide from './pages/PressBrakeVDieOpeningGuide.jsx'
import SpringbackDatabase from './pages/SpringbackDatabase.jsx'
import VDieSelection from './pages/VDieSelection.jsx'
import { getStoredLanguage } from './languages/engineeringText.js'

export default function App() {
  const [language, setLanguage] = useState(getStoredLanguage)

  useEffect(() => {
    window.localStorage.setItem('zyco-language', language)
  }, [language])

  const languageProps = {
    language,
    setLanguage,
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<PressBrakeCalculator {...languageProps} />}
        />

        <Route
          path='/engineering-tools'
          element={<EngineeringHub {...languageProps} />}
        />

        <Route
          path='/engineering-tools/press-brake-calculator'
          element={<PressBrakeCalculator {...languageProps} />}
        />

        <Route
          path='/engineering-tools/bend-allowance-calculator'
          element={<BendAllowanceCalculator {...languageProps} />}
        />

        <Route
          path='/engineering-tools/material-database'
          element={<MaterialDatabase {...languageProps} />}
        />

        <Route
          path='/engineering-tools/springback-database'
          element={<SpringbackDatabase {...languageProps} />}
        />

        <Route
          path='/engineering-tools/inside-radius-guide'
          element={<InsideRadiusGuide {...languageProps} />}
        />

        <Route
          path='/engineering-tools/air-bending-guide'
          element={<AirBendingGuide {...languageProps} />}
        />

        <Route
          path='/engineering-tools/v-die-selection'
          element={<VDieSelection {...languageProps} />}
        />

        <Route
          path='/engineering/press-brake-tonnage-guide'
          element={<PressBrakeTonnageGuide {...languageProps} />}
        />

        <Route
          path='/engineering/how-to-choose-press-brake-v-die-opening'
          element={<PressBrakeVDieOpeningGuide {...languageProps} />}
        />

        <Route
          path='*'
          element={
            <Navigate
              to='/'
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
