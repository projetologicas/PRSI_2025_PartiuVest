import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./common/context/UserCotext";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./common/security/ProtectedRoute";
import HomeAluno from "./pages/HomeAluno";
import HomeADM from "./pages/HomeADM";
import RegisterPage from "./pages/RegisterPage";
import QuestionPage from "./pages/QuestionPage";
import Dados from "./pages/Dados";

function Router() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />}/>
                    <Route path="/register" element={<RegisterPage />}/>

                    <Route element={<ProtectedRoute />}>
                        <Route path="/home" element={<HomeAluno />} />
                        <Route path="/home_adm" element={<HomeADM />} />

                        <Route path="/profile" element={<Dados />}/>

                        <Route path="/question_book">
                            <Route path="/question_book/attempt">
                                <Route path="/question_book/attempt/question" element={<QuestionPage />}/>
                            </Route>
                        </Route>
                    </Route>

                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default Router;