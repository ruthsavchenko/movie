import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSessions } from '../../redux/actions';
import '../../style/Schedule.css'
import ModalSchedule from '../Modals/ModalSchedule';
import Spinner from '../Spinner';

function Schedule() {
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date())
    const [isOpen, setOpen] = useState(false);

    const closeModal = () => {
      setOpen(false);
    };

    const sessions = useSelector(state => state.sessions);
    const isLoading = useSelector(state => state.isLoading);

    useEffect(() => {
        dispatch(fetchSessions());
    }, [dispatch]);

    const handleChange = (e) => {
        setDate(e.target.value)
    };

    let schedule = []

    for (let item of sessions) {
        let dateItem = item.date.slice(0, 10)
        console.log(dateItem)
        if (dateItem === date) {
            schedule.push(item)
        }
    }

    if(isLoading) {
        return <Spinner />
    }

    if (schedule.length === 0) {
        return (
            <div className="schedule-container">
                <div className="input-date">
                    <p>Выберите дату:</p>
                    <input className="date" type="date" value={date} onChange={handleChange} />
                </div>
                <h3 className="no-date">По выбранной дате нет киносеансов</h3>
            </div>
        )
    }

    return (
        <div className="schedule-container">
            <div className="input-date">
                <p>Выберите дату:</p>
                <input className="date" type="date" value={date} onChange={handleChange} />
            </div>
            <div>
                {schedule.map(item => (
                    <div key={item.id} className="schedule-card">
                        <div>
                            <img src={item.movie.poster} alt="" className="schedule-poster" />
                        </div>
                        <div className="schedule-info">
                            <h3>{item.movie.title}</h3>
                            <p>Зал: <span className={(item.room.label === 'Red') ? 'red' : (item.room.label === 'Green') ? 'green' : (item.room.label === 'Yellow') ? 'yellow' : ''}>●</span></p>
                            <p>Время: {item.date.slice(11, 16)}</p>
                            <button className="schedule-button" onClick={() => setOpen(true)}>Купить билет</button>
                            <ModalSchedule
                                open={isOpen}
                                onClose={closeModal}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Schedule
