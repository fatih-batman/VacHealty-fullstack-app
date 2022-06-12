import Link from "next/link";
import {useRouter} from "next/router";
import {authAsyncLogoutAction} from "../store/auth.store";
import {useDispatch} from "react-redux";
import Logo from '../assets/image/logo.png';

const Sidebar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const logout = async () => {
        await authAsyncLogoutAction()(dispatch);
        await router.push('/auth/login');
    };

    return (
        <aside className="main-sidebar elevation-4" style={{backgroundColor: '#191126', color: '#a4a6b3'}}>
            <a href="javascript:void(0)" className="brand-link">
                <img src={Logo.src} style={{marginLeft:'10px', width:'3em'}} alt="Covid" className="mr-2"/>
                <span className="brand-text text-center">Covid Statistics</span>
            </a>

            <div className="sidebar sidebar-active">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
                        <li className="nav-item menu-open">
                            <Link href="/dashboard">
                                    <a className={`nav-link ${router.route === '/dashboard' && 'active'}`}>
                                    <i className="nav-icon fas fa-tachometer-alt sidebar-icon "/>
                                    <p>Dashboard</p>
                                </a>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/sinovac">
                                <a className={`nav-link ${router.route === '/sinovac' && 'active'}`}>
                                    <i className="nav-icon fas fa-ticket sidebar-icon"/>
                                    <p>Sinovac</p>
                                </a>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/biontech">
                                <a className={`nav-link ${router.route === '/biontech' && 'active'}`}>
                                    <i className="nav-icon fas fa-ticket sidebar-icon"/>
                                    <p>BioNTech</p>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/sputnikv">
                                <a className={`nav-link ${router.route === '/sputnikv' && 'active'}`}>
                                    <i className="nav-icon fas fa-ticket sidebar-icon"/>
                                    <p>SputnikV</p>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/turkovac">
                                <a className={`nav-link ${router.route === '/turkovac' && 'active'}`}>
                                    <i className="nav-icon fas fa-ticket sidebar-icon"/>
                                    <p>TurcoVac</p>
                                </a>
                            </Link>
                        </li>





                        <li className="nav-item">
                            <Link href="/turkovac">
                                <a className={`nav-link ${router.route === '/turkovac' && 'active'}`}>
                                    <i className="nav-icon fas fa-gear sidebar-icon"/>
                                    <p>Settings</p>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link`} onClick={() => logout()} href="#">
                                <i className="nav-icon fas fa-power-off sidebar-icon"/>
                                <p>Logout</p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
