import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./common/context/UserCotext";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./common/security/ProtectedRoute";
import HomeAluno from "./pages/HomeAluno";
import HomeADM from "./pages/HomeADM";
import RegisterPage from "./pages/RegisterPage";
import QuestionPage from "./pages/QuestionPage";
import Dados from "./pages/Dados";
import NotFound from "./pages/NotFound";
import { SystemProvider } from "./common/context/SystemContext";
import Vestibulares from "./pages/Vest";
import QuestionBookDetails from "./pages/QuestionBookDetails";
import { AttemptProvider } from "./common/context/AttemptContext";
import Leaderboard from "./pages/Leaderboard";

function Router() {
    return (
        <SystemProvider>
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage />}/>
                        <Route path="/register" element={<RegisterPage />}/>

                        <Route element={<ProtectedRoute />}>
                            <Route path="/home" element={<HomeAluno />} />
                            <Route path="/home_adm" element={<HomeADM />} />
                            <Route path="/leaderboard" element={<Leaderboard />} />
                            <Route path="/profile" element={<Dados />}/>

                            <Route path="/question_book" element={<Vestibulares />}/>
                                <Route path="/question_book/details/:book_id" element={<AttemptProvider><QuestionBookDetails /></AttemptProvider>}/>
                                <Route path="/question_book/attempt/:book_id"/>
                                <Route path="/question_book/attempt/:book_id/:question_id" element={<AttemptProvider><QuestionPage /></AttemptProvider>}/>
                            
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </SystemProvider>
    );
}

export default Router;