import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import ReactDOM from "react-dom"
import '../../style/ModalSchedule.css'
import {useSelector} from "react-redux";

function ModalSchedule({ open, setOpen, onClose }) {
  let user = useSelector(state => state.user)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [availableSeats, setAvailableSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])

  const seats = Array.from({ length: 8 * 8 }, (_, i) => i + 1);

  const occupiedSeats = [10, 12, 50, 33, 28, 47];

  const onClickData = (seats) => {
    if (selectedSeats.indexOf(seats) > -1) {
      setAvailableSeats(availableSeats.concat(seats))
      setSelectedSeats(selectedSeats.filter(item => item !== seats))
    } else {
      setSelectedSeats(selectedSeats.concat(seats))
      setAvailableSeats(availableSeats.filter(item => item !== seats))
    }
  }

  const onClickSeat = (seats) => {
    onClickData(seats);
  }

  const handleSubmit = e => {
    onClose()
    setOpenSuccessModal(true)
  }

//   function closeSuccessModal(){
//     setSelectedSeats([])
//     setOpenSuccessModal(false);
// }

  if (openSuccessModal) {
    return ReactDOM.createPortal(
      <div className='overlay'>
        <div className='modal'>
          <div className='text-to-main'>
            <h3>Благодарим за покупку!</h3>
            <p>Билеты высланы на вашу почту <span className="email">{user[1]}</span></p>
          </div>
          <div className="to-main-button"><Link to={'/'}><button>На главную</button></Link></div>
        </div>
      </div>,
      document.body
    )
  }

  if (!open) return null;
  return ReactDOM.createPortal(
    <div className="overlay">
      <div className="modal">
        <div>
          <ul className="ShowCase">
            <li>
              <span className="seat" /> <small>N/A</small>
            </li>
            <li>
              <span className="seat selected" /> <small>Selected</small>
            </li>
            <li>
              <span className="seat occupied" /> <small>Occupied</small>
            </li>
          </ul>
        </div>
        <div className="Cinema">
          <div className="screen"></div>
          <div className="seats">
            {seats.map(seat =>
              <span
                className={selectedSeats.indexOf(seat) > -1 ? 'seat selected' : occupiedSeats.indexOf(seat) > -1 ? 'seat occupied' : 'seat'}
                key={seat} onClick={occupiedSeats.includes(seat) ? null : e => onClickSeat(seat)}></span>)}
          </div>
        </div>
        <div className="count-tickets">
          <h4>Выбранные места: ({selectedSeats.length})</h4>
          <div>Ваши билеты:
            {!selectedSeats.length ? ' 0' : selectedSeats.map(res => <span key={res}> {res} </span>)}
          </div>
        </div>
        <div className="buy-tikets">
          <button onClick={handleSubmit}>Купить билеты</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ModalSchedule
