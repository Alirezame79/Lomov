import Modal from "./Modal";
import { useSelector } from "react-redux";

export default function ShowModal({ movie }) {

    const modal = useSelector((state) => {
        return state.modal;
    })

    return (
        <>
            {modal && <Modal movie={movie} />}
        </>
    )
}