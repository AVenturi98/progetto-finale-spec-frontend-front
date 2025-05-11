import * as React from 'react';
const URL_API = import.meta.env.VITE_URL_API;

//Types 
import type { Travel } from './types/types';

// Components
import Form from './components/Form';
import List from './components/List';
import SettingModals from './components/SettingModals';

function App() {

  const [travels, setTravels] = React.useState<Travel[] | null>(null);
  const [filteredTravels, setFilteredTravels] = React.useState<Travel[] | null>(null);

  // set Open Modal
  const [openModal, setOpenModal] = React.useState<boolean>(false);


  // Show setting
  const [getIDs, setGetIDs] = React.useState<number | null>(null);
  const [record, setRecord] = React.useState<Travel | null>(null);

  // Comparison setting
  const [openCompare, setOpenCompare] = React.useState<boolean>(false);
  const [recordCompare, setRecordCompare] = React.useState<Travel | null>(null);
  const [getIDCompare, setGetIDCompare] = React.useState<number | null>(null);


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
  }, [record, recordCompare]);




  async function getItem({ set }: { set: (travel: Travel) => void }): Promise<Travel | null> {
    try {
      const res = await fetch(`${URL_API}/${getIDs}`);
      if (!res.ok) throw new Error(`Errore durante il recupero dei dati. Errore: ${res.status}, message: ${res.statusText}`)
      const data = await res.json();
      // console.log(data);
      set(data.travel)
      return data
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Errore: ${err.message}`)
      } else {
        console.error(err)
      }
      return null
    }
  };


  React.useEffect(() => {
    openModal && getItem({ set: setRecord });
    openCompare && getItem({ set: setRecordCompare })
  }, [getIDs, getIDCompare]);



  return (
    <>
      <header>
        <nav className='mb-3 md:mb-12 p-3'>
          <div>
            LOGO
          </div>
        </nav>
      </header>

      <main>
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
            travels={travels}
            setOpenModal={setOpenModal}
            setGetID={setGetIDs} />

          {/* SETTING MODALS */}
          <SettingModals
            openModal={openModal}
            openCompare={openCompare}
            record={record}
            setOpenModal={setOpenModal}
            setRecord={setRecord}
            setFilteredTravels={setFilteredTravels}
            travels={travels}
            setGetIDs={setGetIDs}
            filteredTravels={filteredTravels}
            setOpenCompare={setOpenCompare}
            recordCompare={recordCompare}
            setRecordCompare={setRecordCompare}
            setGetIDCompare={setGetIDCompare} />

        </div>
      </main>
    </>
  )
}

export default App
