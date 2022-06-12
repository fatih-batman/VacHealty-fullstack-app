import { useSelector } from "react-redux";
import { useEffect, useState  } from "react";

const Header = ({onSidebarToggle}) => {
    const [userEmail, setUserEmail] = useState("");
    const user = useSelector((state) => {return state;});

    useEffect(() => {
        //setUserEmail(user.auth.user.email);
    },[]);

    return (
        <>
            <div>
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="javascript:void(0)" role="button"
                               onClick={() => onSidebarToggle()}>
                                <i className="fas fa-bars"/>
                            </a>
                        </li>
                    </ul>
                    <div className="row justify-content-end w-100">
                        <div className="userEmail" style={{paddingRight:35}}>
                        <span className="font-weight-bold h-100 align-middle">
                            {userEmail}
                        </span>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Header;
