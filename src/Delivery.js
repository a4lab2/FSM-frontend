import React, { useState } from 'react'
const Delivery = () => {
    const [state, setstate] = useState({ "id": "01H1QGV9A50YDXPW4YSDFYFZGT", "budget": 123, "notes": "Delivery to wife", "status": "completed" });

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
        </div>
    )
}

export default Delivery