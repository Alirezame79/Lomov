import classes from './SearchResult.module.css';
import { useSelector, UseSelector } from 'react-redux';
import SearchResultCard from '../ui/SearchResultCard';

export default function SearchResult() {

    const searchResultList = useSelector((state) => {
        // console.log(state.result)
        return state.result;
    })

    return (
        <div className={classes.container}>
            {
                <div>
                    {searchResultList.map((item) => {
                        return <SearchResultCard movie={item} />
                    })}
                </div>
                // || <h3 className={classes.txt}>Search Result Here...</h3>
            }
        </div>
    );
}