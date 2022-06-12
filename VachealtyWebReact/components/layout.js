import Header from "./header";
import Sidebar from "./sidebar";
import {useEffect, useState} from "react";
import Footer from "./footer";
import Dashboard from "../pages/dashboard";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

const Layout = ({children}) => {
    const [sidebar, setSidebar] = useState(true);
    const router = useRouter();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    return (
        <>
            <div className={`wrapper sidebar-mini ${!sidebar ? 'sidebar-collapse' : ''}`}>
                <Header onSidebarToggle={() => setSidebar(prev => !prev)}/>
                <Sidebar/>
                <div className="content-wrapper py-2 px-2">
                    {router.route === '/' && isLoggedIn ?
                        router.push("/dashboard") && children
                        :
                        children}
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default Layout;
