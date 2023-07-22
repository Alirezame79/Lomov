import ShowModal from '../portal/ShowModal';
import classes from './SearchResultCard.module.css';
import { useDispatch } from 'react-redux';
import { setMovie, visibility } from '../store/index';

export default function SearchResultCard({ movie }) {
    const dispatch = useDispatch();

    function movieCardClicked() {
        dispatch(visibility(true));
        dispatch(setMovie(movie));
    }

    return (
        <>
            <ShowModal />
            <div className={classes.card} onClick={movieCardClicked}>
                <h3 className={classes.name}>{movie.title}</h3>
                <h4 className={classes.year}>{movie.year}</h4>
            </div>
        </>

    );
}