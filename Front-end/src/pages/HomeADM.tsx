import HomeNavBarADM from "../components/HomeNavBarADM";
// import { User } from "./types/User"

export default function AdminHome() {
    return (
        <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center p-6">
            <HomeNavBarADM/>

            {/* MAIN CONTENT */}
            <div className="w-full max-w-5xl bg-gray-300 mt-8 rounded-xl p-10 flex items-center justify-center text-center shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800">
                    Aqui abaixo irão textos explicando funcionamento do sistema.
                </h1>
            </div>
        </div>
    );
}
