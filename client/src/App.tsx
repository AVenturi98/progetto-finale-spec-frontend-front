import { BrowserRouter, Routes, Route } from "react-router";

// Components
import DefaultLayout from './layout/DefaultLayout';
import List from './components/List'

function App() {


  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<DefaultLayout />}>
          <Route path='/' element={<List />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
