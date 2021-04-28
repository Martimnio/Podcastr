import styles from './styles.module.scss';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { useContext } from 'react'
import { PlayerContext } from '../../contexts/playerContext'


function Header() {

    const currentDate = format(new Date(),'EEEEEE, d MMMM', {locale:ptBR})

    return (
        <header className={styles.headerContainer}>
            <img src='/logo.svg' alt="podcastr"/>

            <p>O melhor para você ouvir,sempre</p>
            <span>{currentDate}</span>
        </header>
    )
}

export default Header
