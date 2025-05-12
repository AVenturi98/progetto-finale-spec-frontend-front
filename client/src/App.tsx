import * as React from 'react';
const URL_API = import.meta.env.VITE_URL_API;

//Types 
import type { Travel, Base } from './types/types';

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

  // Favorites setting
  const [favorites, setFavorites] = React.useState<Base[] | null>(null);
  const [filteredFavorites, setFilteredFavorites] = React.useState<Base[] | null>(null);
  const exists = favorites?.find(t => t.id === record?.id || t.id === recordCompare?.id);



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
  }, [getIDs, getIDCompare, favorites]);




  return (
    <>
      <header>
        <nav className='mb-3 md:mb-12 p-3'>
          <div>
            LOGO
          </div>
        </nav>
      </header>

      <main className='flex flex-col gap-10'>
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
            setFilteredTravels={setFilteredTravels}
            travels={travels}
            setGetIDs={setGetIDs}
            filteredTravels={filteredTravels}
            setOpenCompare={setOpenCompare}
            recordCompare={recordCompare}
            setGetIDCompare={setGetIDCompare}
            setFavorites={setFavorites}
            textBtnFavorite={`${exists ? 'Rimuovi dai' : 'Aggiungi ai'} preferiti`} />

        </div>

        <section>
          <h2>PREFERITI</h2>
          {favorites && favorites.length > 0 ?
            <>
              <Form
                // form search
                setFilteredTravels={setFilteredFavorites}
                travels={favorites as unknown as Travel[]} />
              <List
                filteredTravels={filteredFavorites as unknown as Travel[] | null}
                travels={[...favorites] as unknown as Travel[] | null}
                setOpenModal={setOpenModal}
                setGetID={setGetIDs}
                gridCols={'grid-cols-1'}
                onDelete={true}
                setDeleted={setFavorites} />
            </>
            :
            <div className='flex justify-center items-center'>
              Nessun elemento tra i Preferiti
            </div>}
        </section>
      </main>
    </>
  )
}

export default App
