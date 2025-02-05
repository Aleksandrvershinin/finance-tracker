import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from './Button/Button'

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-6">
            <motion.h1
                className="text-6xl font-bold text-gray-800 dark:text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                404
            </motion.h1>
            <motion.p
                className="text-lg text-gray-600 dark:text-gray-400 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                Упс! Страница не найдена.
            </motion.p>
            <motion.div
                className="mt-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                <Link to="/">
                    <Button className="px-6 py-2 text-lg">На главную</Button>
                </Link>
            </motion.div>
        </div>
    )
}

export default NotFound
