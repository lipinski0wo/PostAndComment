import React from 'react';
import loading_sprite from '../../img/small_loading_sprite.png';

const Spinner = () => {
    return (
        <div className="Spinner">
            <img src={loading_sprite} alt="" />
        </div>
    )
}

export default Spinner;
