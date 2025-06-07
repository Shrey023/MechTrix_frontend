import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MechanicTracker from './components/MechanicTracker';
import MechanicLocationSender from './components/MechanicLocationSender';

function App() {
  return (
    <Router>
      <div>
        <h2>Live Mechanic Location</h2>
        <MechanicTracker />

        <Routes>
          <Route path="/mechanic/send-location" element={<MechanicLocationSender />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
