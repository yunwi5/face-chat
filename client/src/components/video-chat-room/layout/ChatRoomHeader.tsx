import { HeaderLogo, HeaderNavList } from 'layout/header';

const ChatRoomHeader = () => {
    return (
        <header id="nav">
            <div className="nav--list">
                {/* Hamburger icon for toggling participants sidebar */}
                <button id="members__button">
                    <svg
                        width="24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                    >
                        <path
                            d="M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z"
                            fill="#f7f7f7"
                        />
                        <path d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z" />
                    </svg>
                </button>
                <HeaderLogo />
            </div>
            <HeaderNavList />
        </header>
    );
};

export default ChatRoomHeader;
