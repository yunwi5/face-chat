import classes from './BackDrop.module.scss';

/* BackDrop */
interface Props {
    onClose: () => void;
    className?: string;
}

const Backdrop: React.FC<Props> = ({ onClose, className }) => {
    return <div className={`${classes.backdrop} ${className}`} onClick={onClose} />;
};

export default Backdrop;
