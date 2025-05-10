import { BrowserRouter, Routes, Route } from "react-router";

// Context
import { GlobalProvider } from "./context/GlobalContext";

// Components
import DefaultLayout from './layout/DefaultLayout';
import List from './components/List';
import Show from "./pages/Show";

function App() {


  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<DefaultLayout />}>
            <Route path='/' element={<List />}>
            </Route>
            <Route path='/:id' element={<Show />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
