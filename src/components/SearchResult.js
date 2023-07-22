import classes from './SearchResult.module.css';
import { useSelector } from 'react-redux';
import SearchResultCard from './SearchResultCard';

export default function SearchResult() {
    const searchResultList = useSelector((state) => {
        return state.result;
    })

    return (
        <div className={classes.container}>
            {
                <div>
                    {searchResultList.map((item) => {
                        return <SearchResultCard key={item.title + item.year} movie={item} />
                    })}
                </div>
            }
        </div>
    );
}