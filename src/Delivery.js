import React, { useEffect, useState } from 'react'
const Delivery = ({ id }) => {
    const [state, setstate] = useState({});
    const [refresh, setrefresh] = useState(false);
    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:8000/deliveries/${id}/status`)
            const data = await response.json()
            setstate(data)
        })()
    }, [refresh]);
    const submit = async (e, type) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const data = Object.fromEntries(form.entries())
        const response = await fetch('http://localhost:8000/event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, data, delivery_id: state.id }),

        })

        if (!response.ok) {
            const { detail } = await response.json()
            alert(detail);
            return
        }

        setrefresh(!refresh)


    }
    return (
        <div className='row w-100'>
            <div className='col-12 mb-4'>
                Delivery {state.id}
            </div>
            <div className='col-12 mb-5'>

                <div className="progress " role="progressbar" aria-label="Default striped example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                    {state.status != "ready" ? <div className={state.status === 'active' ? "progress-bar progress-bar-striped bg-success progress-bar-animated" : "progress-bar bg-success"} role='progressbar' style={{ width: "50%" }}></div> : ""}

                    {state.status === "collected" || state.status === "completed" ?
                        <div className={state.status === 'collected' ? "progress-bar progress-bar-striped bg-success progress-bar-animated" : "progress-bar bg-success"} role='progressbar' style={{ width: "50%" }}></div> : ""}
                </div>

            </div>
            <div className='col-3'>
                <div className="card">
                    <div className='card-header'>
                        Create Delivery
                    </div>
                    <form className='card-body' onSubmit={e => submit(e, "START_DELIVERY")}>

                        <button className='btn btn-primary' type='submit'>Submit</button>
                    </form>
                </div>
            </div>

            <div className='col-3'>
                <div className="card">
                    <div className='card-header'>
                        Increase Budget
                    </div>
                    <form className='card-body' onSubmit={e => submit(e, "INCREASE_BUDGET")} >
                        <div className='mb-3'>
                            <input type="number" name="budget" className="form-control" placeholder='Budget' />
                        </div>
                        <button className='btn btn-primary' type='submit'>Submit</button>
                    </form>
                </div>
            </div>

            <div className='col-3'>
                <div className="card">
                    <div className='card-header'>
                        Pick Up Delivery
                    </div>
                    <form className='card-body' onSubmit={e => submit(e, "PICKUP_PRODUCTS")}>
                        <div className='mb-3'>
                            <input type="number" name="purchase_price" className="form-control" placeholder='Purchase Price' />
                        </div>
                        <div className='mb-3'>
                            <input type="number" name="quantity" className="form-control" placeholder='Quantity' />
                        </div>
                        <button className='btn btn-primary' type='submit'>Submit</button>
                    </form>
                </div>
            </div>
            <div className='col-3'>
                <div className="card">
                    <div className='card-header'>
                        Deliver
                    </div>
                    <form className='card-body' onSubmit={e => submit(e, "DELIVER_PRODUCTS")}>
                        <div className='mb-3'>
                            <input type="number" name="sell_price" className="form-control" placeholder='Sell Price' />
                        </div>
                        <div className='mb-3'>
                            <input type="number" name="quantity" className="form-control" placeholder='Quantity' />
                        </div>
                        <button className='btn btn-primary' type='submit'>Submit</button>
                    </form>
                </div>
            </div>
            <code className='col-12 mt-4'>
                {JSON.stringify(state)}
            </code>
        </div>
    )
}

export default Delivery