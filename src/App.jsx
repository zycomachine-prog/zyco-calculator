import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from 'react'
import PressBrakeCalculator from './pages/PressBrakeCalculator.jsx'
import { getStoredLanguage } from './languages/engineeringText.js'

const AirBendingGuide = lazy(() => import('./pages/AirBendingGuide.jsx'))
const BottomingVsCoiningGuide = lazy(() => import('./pages/BottomingVsCoiningGuide.jsx'))
const BendAllowanceCalculator = lazy(() => import('./pages/BendAllowanceCalculator.jsx'))
const BendDeductionGuide = lazy(() => import('./pages/BendDeductionGuide.jsx'))
const KFactorGuide = lazy(() => import('./pages/KFactorGuide.jsx'))
const EngineeringHub = lazy(() => import('./pages/EngineeringHub.jsx'))
const InsideRadiusGuide = lazy(() => import('./pages/InsideRadiusGuide.jsx'))
const MaterialDatabase = lazy(() => import('./pages/MaterialDatabase.jsx'))
const PressBrakeTonnageGuide = lazy(() => import('./pages/PressBrakeTonnageGuide.jsx'))
const PressBrakeCrowningGuide = lazy(() => import('./pages/PressBrakeCrowningGuide.jsx'))
const PressBrakeToolingSelectionGuide = lazy(() => import('./pages/PressBrakeToolingSelectionGuide.jsx'))
const PressBrakeVDieOpeningGuide = lazy(() => import('./pages/PressBrakeVDieOpeningGuide.jsx'))
const MinimumFlangeLengthGuide = lazy(() => import('./pages/MinimumFlangeLengthGuide.jsx'))
const StainlessSteelBendingGuide = lazy(() => import('./pages/StainlessSteelBendingGuide.jsx'))
const AluminumBendingGuide = lazy(() => import('./pages/AluminumBendingGuide.jsx'))
const SpringbackDatabase = lazy(() => import('./pages/SpringbackDatabase.jsx'))
const SpringbackCompensationGuide = lazy(() => import('./pages/SpringbackCompensationGuide.jsx'))
const VDieSelection = lazy(() => import('./pages/VDieSelection.jsx'))

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
      <Suspense
        fallback={
          <div
            role='status'
            aria-live='polite'
            style={{
              minHeight: '100vh',
              display: 'grid',
              placeItems: 'center',
              background: '#071a33',
              color: '#8acbff',
              fontFamily: 'system-ui, sans-serif',
              letterSpacing: '0.08em',
            }}
          >
            Loading engineering tool...
          </div>
        }
      >
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
            path='/engineering'
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
            path='/engineering/bend-deduction-guide'
            element={<BendDeductionGuide {...languageProps} />}
          />

          <Route
            path='/engineering/k-factor-guide'
            element={<KFactorGuide {...languageProps} />}
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
            path='/springback-compensation-guide'
            element={<SpringbackCompensationGuide {...languageProps} />}
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
            path='/engineering-tools/bottoming-vs-coining-guide'
            element={<BottomingVsCoiningGuide {...languageProps} />}
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
            path='/engineering/press-brake-crowning-guide'
            element={<PressBrakeCrowningGuide {...languageProps} />}
          />

          <Route
            path='/engineering/press-brake-tooling-selection-guide'
            element={<PressBrakeToolingSelectionGuide {...languageProps} />}
          />

          <Route
            path='/engineering/how-to-choose-press-brake-v-die-opening'
            element={<PressBrakeVDieOpeningGuide {...languageProps} />}
          />

          <Route
            path='/engineering/minimum-flange-length-guide'
            element={<MinimumFlangeLengthGuide {...languageProps} />}
          />

          <Route
            path='/engineering/stainless-steel-bending-guide'
            element={<StainlessSteelBendingGuide {...languageProps} />}
          />

          <Route
            path='/engineering/aluminum-bending-guide'
            element={<AluminumBendingGuide {...languageProps} />}
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
      </Suspense>
    </BrowserRouter>
  )
}
