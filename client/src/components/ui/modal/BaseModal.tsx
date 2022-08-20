import ReactDOM from 'react-dom';
import Backdrop from './BackDrop';
import classes from './BaseModal.module.scss';

/* Modal Overlay */
interface OverlayProps {
    classes?: string;
    children: React.ReactNode;
}

const ModalOverlay: React.FC<OverlayProps> = (props) => {
    return <div className={`${classes.modal} ${props.classes}`}>{props.children}</div>;
};

/* Modal */
interface ModalProps {
    onClose: () => void;
    className?: string;
    backdropClassName?: string;
    children: React.ReactNode;
}

// <div> element with id "modal" was added to index.html
const BaseModal: React.FC<ModalProps> = (props) => {
    const portalElement = document.getElementById('modal') as HTMLElement;

    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop className={props.backdropClassName || ''} onClose={props.onClose} />,
                portalElement,
            )}
            {ReactDOM.createPortal(
                <ModalOverlay classes={props.className}>{props.children}</ModalOverlay>,
                portalElement,
            )}
        </>
    );
};

export default BaseModal;
