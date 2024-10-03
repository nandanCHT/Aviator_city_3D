import React, { useState } from 'react'
import { image } from '../../assets/image'

const Simple = () => {
    const [active, setActive] = useState('Simple');
    const [isMuted, setIsMuted] = useState(false);

    const handleClick = (option) => {
        setActive(option);
    };


    const handleIconClick = () => {
        setIsMuted(prevState => !prevState);
    };
    return (
        <>
            <div className='simple-container'>
                <div className='simple-cont'>
                    <div className='simple-cont-section'>
                        <div className='fair-section'>
                            <div className='icon-image'>
                                <p>{image.iconProvably}</p>
                            </div>
                            <p>Provably Fair</p>
                        </div>
                    </div>

                    <div className='toggle-container'>
                        <div className="toggle-buttons">
                            <button
                                className={active === 'Simple' ? 'active' : ''}
                                onClick={() => handleClick('Simple')}
                            >
                                Simple
                            </button>
                            <button
                                className={active === 'Animated' ? 'active' : ''}
                                onClick={() => handleClick('Animated')}
                            >
                                Animated
                            </button>
                        </div>

                        <div className='mute-icon' onClick={handleIconClick}>
                            {isMuted ? (
                                <p>{image.soundIcon}</p>

                            ) : (
                                <p>{image.muteIcon}</p>

                            )}
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}

export default Simple