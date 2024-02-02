import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

function App() {
  let [s_time, setstime] = useState("");
  let [l_time, setltime] = useState("");
  let [slots, setslots] = useState([]);

  const generateSlots = () => {
    if (s_time && l_time) {
      const start_Time = new Date(`2024-01-01T${s_time}`);
      const end_Time = new Date(`2024-01-01T${l_time}`);
      if (start_Time < end_Time) {
        const slotArray = [];
        while (start_Time < end_Time) {
          if (new Date(start_Time.getTime() + 10 * 60 * 1000) < end_Time) {
            let set_time = new Date(start_Time.getTime() + 10 * 60 * 1000);
            const slot = {
              start: start_Time.getHours() + ":" + start_Time.getMinutes(),
              end: set_time.getHours() + ":" + set_time.getMinutes()
            }
            slotArray.push(slot);
          }
          else {
            let diff = end_Time.getMinutes() - start_Time.getMinutes();
            let set_time = new Date(start_Time.getTime() + diff * 60 * 1000);
            const slot = {
              start: start_Time.getHours() + ":" + start_Time.getMinutes(),
              end: set_time.getHours() + ":" + set_time.getMinutes()
            }
            slotArray.push(slot);
          }
          start_Time.setMinutes(start_Time.getMinutes() + 10);
        }
        setslots(slotArray);
      } else {
        alert("End time should be after start time");
      }
    }
  };

  
  



  return (
    <div className="App">
      <div className='main'>
        <span className='time'>TIME-1</span>
        <input type='time' value={s_time} onChange={(e) => setstime(e.target.value)}></input><br></br>
        <span className='time'>TIME-2</span>
        <input type='time' value={l_time} onChange={(e) => setltime(e.target.value)}></input><br></br>
        <input type='button' className='btn' onClick={generateSlots} value={"Generate Slots"}></input>

        <h2 className='gene'>Generated Slots</h2>
        <ul>
          {Array.isArray(slots) && slots.length > 0 ? (
            slots.map((slot, index) => (
              <li key={index}>
                Start: {slot.start}, End: {slot.end}
              </li>
            ))
          ) : (
            <li>No slots available</li>
          )}

        </ul>
      </div>
    </div>
  );
}

export default App;
