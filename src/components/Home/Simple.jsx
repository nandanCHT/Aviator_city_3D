import React from 'react'
import { image } from '../../assets/image'

const Simple = () => {
    return (
        <>
            <div className='simple-container'>
                <div className='' style={{ border: "1px solid red", display: "flex", justifyContent: "space-between", gap: "5rem", alignItems: "center" }}>
                    <div className='simple-cont-section'>
                        <div className='fair-section'>
                            {image.iconProvably}
                            <p>Provably Fair</p>
                        </div>
                    </div>
                    <div className='' style={{ display: "flex" }}>
                        <div className='' style={{ display: "flex", justifyContent: "space-between", gap: "2rem", border: "1px solid red" }}>
                            <p>Simple</p>
                            <p>Animation</p>
                        </div>

                        <div className=''>
                            <p>{image.muteIcon}</p>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}

export default Simple