import React from 'react';
import preloader from './loading.svg';
import style from './Preloader.module.css';

const Preloader: React.FC = () => {
    return (
        <div className={style.preloader}>
            <img src={preloader} alt='loading'/>
        </div>
    )
}

export default Preloader;