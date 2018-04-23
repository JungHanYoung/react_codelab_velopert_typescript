import * as React from 'react';

interface HeaderProps {
    isLoggedIn?: boolean;
    onLogout?: () => void;
}

class Header extends React.Component<HeaderProps, {}> {
    public static defaultProps: Partial<HeaderProps> = {
        isLoggedIn: false,
        onLogout: () => console.error("logout function not defined")
    }
    public render() {

        const loginButton = (
            <li>
                <a><i className="material-icons">vpn_key</i></a>
            </li>
        )
        const logoutButton = (
            <li>
                <a><i className="material-icons">lock_open</i></a>
            </li>
        )

        return (
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <a className="brand-logo center">MEMOPAD</a>

                    <ul>
                        <li><a><i className="material-icons">search</i></a></li>
                    </ul>

                    <div className="right">
                        <ul>
                            { this.props.isLoggedIn ? logoutButton : loginButton }
                        </ul>
                    </div>
                </div>
                Header
            </nav>
        );
    }
}

export default Header;
