import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import Delivery from './Delivery';
// import axios from 'axios';

function App() {
  const [id, setid] = useState("01H1QGV9A50YDXPW4YSDFYFZGT");

  const submit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const data = Object.fromEntries(form.entries())
    const response = await fetch('http://localhost:8000/deliveries/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'CREATE_DELIVERY', data }),

    })

    console.log(JSON.stringify({ type: 'CREATE_DELIVERY', data }))
    console.log(response)
    const content = await response.json()
    // const id = await response.json()
    setid(content.id)
    // await axios.post('http://localhost:8000/deliveries/create', {
    //   type: 'CREATE_DELIVERY',
    //   data: data,
    // }, {
    //   headers: { 'Content-Type': 'application/json' },
    // }).then((r) => {
    //   const { id } = r.data;
    //   setid(id);
    // })

  }
  return (
    <div classname="py-5">
      <div className="bg-dark text-secondary px-4 py-5 text-center">
        {id === "" ? <div className="card">
          <div className='card-header'>
            Create Delivery
          </div>

          <form className='card-body' onSubmit={submit}>
            <div className='mb-3'>
              <input type="number" name="budget" className="form-control" placeholder='Budget' />
            </div>
            <div className='mb-3'>
              <input type="text" name="notes" className="form-control" placeholder='Note' />
            </div>
            <button className='btn btn-primary' type='submit'>Submit</button>
          </form>
        </div> : <Delivery />}
      </div>
    </div>
  );
}

export default App;
