import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import EngineeringHub from './pages/EngineeringHub.jsx'
import InsideRadiusGuide from './pages/InsideRadiusGuide.jsx'
import MaterialDatabase from './pages/MaterialDatabase.jsx'
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
          path='/engineering-tools/material-database'
          element={<MaterialDatabase />}
        />

        <Route
          path='/engineering-tools/inside-radius-guide'
          element={<InsideRadiusGuide />}
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
