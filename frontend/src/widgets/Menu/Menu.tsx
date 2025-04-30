import Logout from '@/entities/auth/ui/Logout'
import { Link } from 'react-router-dom'
import styles from './menu.module.scss'

function Menu() {
    return (
        <div className="text-white lg:text-lg mb-5 lg:gap-x-8 mx-auto bg-green-800 p-4 shadow-md">
            <div className="container flex items-center gap-x-4">
                <Link to="/" className={styles.menuLink}>
                    Домой
                </Link>
                <Link to="/categories" className={styles.menuLink}>
                    Категории
                </Link>
                <Link to="/account-tags" className={styles.menuLink}>
                    Tags
                </Link>
                <Link
                    to="/transactions-and-transfers"
                    className={styles.menuLink}
                >
                    Операции
                </Link>
                <Logout className={styles.menuLinkLogout} />
            </div>
        </div>
    )
}

export default Menu
