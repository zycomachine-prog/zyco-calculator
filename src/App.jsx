import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import EngineeringHub from './pages/EngineeringHub.jsx'
import PressBrakeCalculator from './pages/PressBrakeCalculator.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<PressBrakeCalculator />}
        />

        <Route
          path='/engineering-tools'
          element={<EngineeringHub />}
        />

        <Route
          path='/engineering-tools/press-brake-calculator'
          element={<PressBrakeCalculator />}
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
