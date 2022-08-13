import HeaderLogo from './HeaderLogo';
import HeaderNavList from './HeaderNavList';

// placehoder header. This will be fixed/upgraded soon.
const Header = () => {
    return (
        <header id="nav">
            <div className="nav--list">
                <HeaderLogo />
            </div>
            <HeaderNavList />
        </header>
    );
};

export default Header;
