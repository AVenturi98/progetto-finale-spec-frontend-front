import * as React from 'react';

type Travel = {
  id: number,
  title: string,
  category: string,
  image?: string,
  start: string,
  price: number,
  duration: number,
  direct: boolean,
  scale?: number,
  available: boolean
}


function App() {

  const [travels, setTravels] = React.useState<Travel[] | null>(null);
  const [filteredTravels, setFilteredTravels] = React.useState<Travel[] | null>(null);
  const [order, setOrder] = React.useState<"A-Z" | "Z-A" | undefined>(undefined);

  const search = React.useRef<HTMLInputElement>(null);
  const scaloRef = React.useRef<HTMLInputElement>(null);
  const direttoRef = React.useRef<HTMLInputElement>(null);

  // fetch for get a records list
  async function fetchGetList(): Promise<Travel | null> {
    try {
      const res = await fetch('http://localhost:3001/travels');

      if (!res.ok) throw new Error(`Errore: ${res.status}, message: ${res.statusText}`)

      const data = await res.json();

      setTravels(data);

      console.log(data)

      return data as Travel

    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Errore: ${err.message}`)

      } else {
        console.error(err)
      }
      return null
    }
  }

  React.useEffect(() => {
    fetchGetList();
  }, [])


  // handle submit to Form
  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setFilteredTravels(
      travels?.filter(t =>
        search.current && t.title.toLowerCase().trim().includes(search.current.value.toLowerCase().trim()) &&
        (scaloRef.current?.checked || direttoRef.current?.checked ? t.category === (scaloRef.current?.checked ? 'scalo' : 'diretto') : true)
      ) || null
    )
  }


  // order by selected 
  const sorted = React.useMemo(() => {
    const arrayToSort = filteredTravels || travels;
    if (!arrayToSort) return null; // Controlla che l'array non sia null

    return [...arrayToSort].sort((a: Travel, b: Travel) => {
      if (order === "A-Z") {
        return a.title.localeCompare(b.title); // Ordine alfabetico crescente
      } else if (order === "Z-A") {
        return b.title.localeCompare(a.title); // Ordine alfabetico decrescente
      }
      return 0; // Nessun ordinamento se `order` non è definito
    });
  }, [filteredTravels, travels, order])


  // handle change for Category
  function handleCheckboxChange(selected: 'scalo' | 'diretto'): void {
    if (selected === 'scalo' && scaloRef.current) {
      scaloRef.current.checked = true; // Seleziona "scalo"
      if (direttoRef.current) direttoRef.current.checked = false; // Deseleziona "diretto"
    } else if (selected === 'diretto' && direttoRef.current) {
      direttoRef.current.checked = true; // Seleziona "diretto"
      if (scaloRef.current) scaloRef.current.checked = false; // Deseleziona "scalo"
    }
  }

  return (
    <>
      <h1>Viaggia oltre meta</h1>

      {/* FILTER BY QUERY/CATEGORY */}
      <form
        onSubmit={handleSubmitSearch}
        className='my-5 flex flex-wrap sm:flex-nowrap gap-3'>

        <input
          type="text"
          placeholder='Cerca..'
          ref={search}
          className='border-2 border-gray-500 rounded-sm px-1 mx-3' />

        <div className='flex items-center'>
          <div className='flex items-center'>
            <label htmlFor="scalo" className='mx-2'>scalo</label>
            <input
              type="checkbox"
              name="scalo"
              ref={scaloRef}
              onChange={() => handleCheckboxChange('scalo')} />
          </div>

          <div className='flex items-center'>
            <label htmlFor="diretto" className='mx-2'>diretto</label>
            <input
              type="checkbox"
              name="diretto"
              ref={direttoRef}
              onChange={() => handleCheckboxChange('diretto')} />
          </div>

        </div>
        <button type="submit">Cerca</button>
      </form>

      {/* ALPHABETIC ORDER */}
      <div className='mx-5 flex items-center gap-2'>
        <label htmlFor="sorted">Ordina</label>
        <select
          name="sorted"
          id="sorted"
          value={order}
          onChange={e => setOrder(e.target.value as "A-Z" | "Z-A" | undefined)}
          className='border-2 border-gray-700 rounded-sm my-1'>

          <option
            value=""
            className='bg-[rgb(20,20,20)]'
            disabled={!!order}>Seleziona</option>
          <option
            value="A-Z"
            className='bg-[rgb(20,20,20)]'>A-Z</option>
          <option
            value="Z-A"
            className='bg-[rgb(20,20,20)]'>Z-A</option>

        </select>
      </div>

      {/* RECORDS LIST */}
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        {sorted ? (
          sorted.map((e: Travel) => (
            <li key={e.id} className='border-4 border-gray-300 rounded-md p-3 m-2 min-w-[250px]'>
              <div className='flex justify-between'>
                <h2>{e.title}</h2>
                <p className='text-gray-500 italic'>{e.category}</p>
              </div>
              <div>
                <p className='italic text-gray-400'>partenza:
                  <span className='text-white'>{' ' + e.start}</span>
                </p>
              </div>
            </li>
          ))
        ) : (
          <div className='flex justify-center items-center'>
            Caricamento...
          </div>
        )}
      </ul>
    </>
  )
}

export default App
