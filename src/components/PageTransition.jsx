import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const pageVariants = {
    initial: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
        scale: 1, // No scale for cleaner slide
        zIndex: 1,
    }),
    animate: {
        x: 0,
        opacity: 1,
        scale: 1,
        zIndex: 2,
        transition: {
            x: { type: 'tween', ease: 'easeInOut', duration: 0.5 },
            opacity: { duration: 0.3 },
        },
    },
    exit: (direction) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
        scale: 1,
        zIndex: 0,
        transition: {
            x: { type: 'tween', ease: 'easeInOut', duration: 0.5 },
            opacity: { duration: 0.3 },
        },
    }),
};

const PageTransition = ({ children, direction }) => {
    const location = useLocation();

    return (
        <motion.div
            key={location.pathname}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
