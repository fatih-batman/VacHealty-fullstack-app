import {useRouter} from "next/router";
import Layout from "../components/layout";
import {useSelector} from "react-redux";
import {useEffect} from "react";

export default function Home() {
    const router = useRouter();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/dashboard');
        }
    }, [isLoggedIn]);

    return (
        <Layout/>

    )
}
