// Types 
import type { Show, Travel, Food } from '../types/types';

// Components
import TravelShow from './TravelShow';
import FoodShow from './FoodShow';

export default function Show({
    item,
    comparison,
    adding,
    activeComparison,
    favorites,
    category
}: Show) {

    const exists = favorites?.some(t => {
        if (t.id === item?.id && t.category === item?.category) {
            return true
        } else return false
    });


    return (
        <div className='flex justify-center items-center m-3'>
            {item && category === 'travels' ?
                <TravelShow
                    item={item as Travel}
                    exists={exists}
                    activeComparison={activeComparison}
                    comparison={comparison}
                    adding={() => adding({ id: item?.id!, title: item?.title!, category: item?.category! } as Travel)}
                />
                : item && category === 'foods' ?
                    <FoodShow
                        item={item as Food}
                        exists={exists}
                        activeComparison={activeComparison}
                        comparison={comparison}
                        adding={() => adding({ id: item?.id!, title: item?.title!, category: item?.category! } as Food)}
                    />
                    :
                    <div className='flex justify-center items-center'>
                        Nessun elemento trovato
                    </div>
            }
        </div>
    )
}