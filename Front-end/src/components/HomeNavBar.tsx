import { refreshUserContext, UserContext } from "../common/context/UserCotext";
import { useContext, useEffect } from "react";
import HomeNavBarADM from "./HomeNavBarADM";
import HomeNavBarUser from "./HomeNavBarUser";


export default function HomeNavBar() {
    const userContext = useContext(UserContext);

    useEffect(() => {
        if (userContext.name === "") {
            refreshUserContext(userContext);
        }
    }, []);

    return (
        <>
        {(userContext.role === "admin") ? (<HomeNavBarADM />) : (<HomeNavBarUser />)}
        </>
    );

}