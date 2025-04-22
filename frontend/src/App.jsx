import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import CreateUser from './pages/CreateUser';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateUser />} />
            </Routes>
        </Router>
    );
}

export default App;
