import React from 'react'
import { image } from '../../assets/image'

const ChartBoard = ({ playerCount }) => {
    return (
        <>
            <div className='chart-container'>
                <div className='simple-cont'>
                    <div className='simple-cont-section'>
                        <div className='fair-section'>
                            <div className='chart-icon'>
                                <p>{image.chartIcon}</p>
                            </div>
                            <p>Show Chart</p>
                        </div>
                    </div>
                    <div className='' style={{ display: "flex", gap: "8px" }}>
                        <div className='toggle-buttons'>
                            <div className=''>
                                <div className='connect-section'>
                                    <span className='green-dot' />
                                    <p>connected</p>
                                </div>
                            </div>
                        </div>

                        <div className='toggle-buttons'>
                            <div className='eye-container'>
                                <div className='eye-section'>
                                    <p>{image.eyeIcon}</p>
                                </div>
                                <p style={{ fontSize: "12px", fontWeight: "600" }}>{playerCount}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ChartBoard