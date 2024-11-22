import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Penni from './pages/project_pages/penni'
import Editor_Portfolio from './pages/project_pages/editor_portfolio'
import Kazooey from './pages/project_pages/kazooey'
import FitTracker from './pages/project_pages/fitTracker'
import Virusware from './pages/project_pages/virusware'
import MTDfile from './pages/project_pages/mtd_file'
import Resistance from './pages/project_pages/resistance_ai'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/penni" element={<Penni />} />
        <Route path="/projects/editor_portfolio" element={<Editor_Portfolio />} />
        <Route path="/projects/kazooey" element={<Kazooey />} />
        <Route path="/projects/fitTracker" element={<FitTracker />} />
        <Route path="/projects/virusware" element={<Virusware />} />
        <Route path="/projects/mtdfile" element={<MTDfile />} />
        <Route path="/projects/resistance" element={<Resistance />} />
      </Routes>
    </Router>
  )
}

export default App