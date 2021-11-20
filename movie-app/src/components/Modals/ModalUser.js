import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions";
import '../../style/ModalUser.css'

export const ModalUser = () => {
    const [open, setOpen] = useState(true)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()

    const userName = (e) => {
        setName(e.target.value)
    }

    const userEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = () => {
        let user = [name, email]
        dispatch(setUser(user))
        setOpen(false)
    }


    if (!open) return null;
    return ReactDOM.createPortal(
        <div className="modal-user-overlay">
            <div className="modal-user">
                <h2>Регистрация</h2>
                <form onSubmit={handleSubmit}>
                    <input placeholder={'Введите свое имя'} required value={name} onChange={userName} />
                    <input placeholder={'Введите свой email'} required value={email} onChange={userEmail} /><br />
                    <button type="submit">Отправить</button>
                </form>
            </div>
        </div>,
        document.body
    );
}

export default ModalUser;