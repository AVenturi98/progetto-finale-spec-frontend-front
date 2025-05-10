import * as React from 'react';
const URL_API = import.meta.env.VITE_URL_API;

//Types 
import type { Travel } from './types/types';

// Components
import Form from './components/Form';
import List from './components/List';

function App() {

  const [travels, setTravels] = React.useState<Travel[] | null>(null);
  const [filteredTravels, setFilteredTravels] = React.useState<Travel[] | null>(null);

  // creo una funzione fetch per recuperare i records
  async function fetchURL(): Promise<Travel[]> {
    try {
      const res: Response = await fetch(URL_API);
      if (!res.ok) throw new Error(`Errore durante il recupero dei dati. Errore: ${res.status}, message: ${res.statusText}`)
      const data = await res.json();
      setTravels(data);
      return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Errore: ${err.message}`)
      } else {
        console.error(err)
      }
      return []
    }
  }

  React.useEffect(() => {
    fetchURL();
  }, [])


  return (
    <>
      <header>
        <nav className='mb-3 md:mb-12 p-3'>
          <div>
            LOGO
          </div>
        </nav>
      </header>

      <div className='m-2'>
        <h1>Viaggia oltre meta</h1>

        {/* FORM SEARCH */}
        <Form
          // form search
          setFilteredTravels={setFilteredTravels}
          travels={travels} />

        {/* RECORDS LIST */}
        <List
          filteredTravels={filteredTravels}
          travels={travels} />

      </div>
    </>
  )
}

export default App
