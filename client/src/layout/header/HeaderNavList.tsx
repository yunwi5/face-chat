import { faUserPlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

const HeaderNavList = () => {
    return (
        <div id="nav__links" className="flex items-center gap-3">
            <NavLink to="/lobby" className="nav__link link-underline">
                Lobby
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#ede0e0"
                    viewBox="0 0 24 24"
                >
                    <path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z" />
                </svg>
            </NavLink>
            {/* <NavLink className="nav__link" id="create__room__btn" to="/lobby">
                Create Room
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#ede0e0"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
                </svg>
            </NavLink> */}
            <NavLink className="nav__link link-underline" to="/login">
                Log In
            </NavLink>
            <NavLink className="" to="/sign-up">
                <button className="flex-center gap-2 px-4 py-2 bg-pink-600/80 hover:bg-pink-700 rounded-full text-gray-50 transition-all hover:shadow-sm hover:shadow-yellow-200">
                    <FontAwesomeIcon icon={faUserPlus} className="text-white" />
                    Sign Up
                </button>
            </NavLink>
        </div>
    );
};

export default HeaderNavList;
