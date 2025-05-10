import { Outlet } from 'react-router';

export default function DefaultLayout() {

    return (
        <>
            <header>
                <nav className='flex justify-around items-center mb-12 p-3'>
                    <div>
                        LOGO
                    </div>
                    <div>
                        Home
                    </div>
                    <div>
                        Aggiungi
                    </div>
                </nav>
            </header>
            <Outlet />
        </>
    )
}