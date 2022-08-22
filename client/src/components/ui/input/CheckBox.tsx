import { Theme } from 'models/ui/Theme';
import classes from './CheckBox.module.scss';

interface Props {
    name?: string;
    id?: string;
    onToggle?: () => void;
    checked?: boolean;
    theme?: Theme;
}

const Checkbox: React.FC<Props> = (props) => {
    const { name, id, theme, onToggle, checked } = props;

    return (
        <label className={classes.container}>
            <input id={id} name={name} onChange={onToggle} type="checkbox" checked={checked} />
            <span className={`${classes.checkmark} ${classes[`checkmark-${theme}`]}`}></span>
        </label>
    );
};

export default Checkbox;
