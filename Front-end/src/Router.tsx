import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./common/context/UserCotext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import { SystemProvider } from "./common/context/SystemContext";
import { AttemptProvider } from "./common/context/AttemptContext";
import ProtectedRoute from "./common/security/ProtectedRoute";
import AdminRoute from "./common/security/AdminRoute";
import HomeAluno from "./pages/HomeAluno";
import AdminCreateUser from "./pages/AdminCreateUser";
import AdminCreateItem from "./pages/AdminCreateItem";
import AdminUploadExam from "./pages/AdminUploadExam";
import Leaderboard from "./pages/Leaderboard";
import Dados from "./pages/Dados";
import Vestibulares from "./pages/Vest";
import QuestionBookDetails from "./pages/QuestionBookDetails";
import QuestionPage from "./pages/QuestionPage";
import ShopPage from "./pages/ShopPage.tsx";
import AdminHome from "./pages/HomeADM";

function Router() {
    return (
        <SystemProvider>
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Rotas Públicas */}
                        <Route path="/" element={<LoginPage />}/>
                        <Route path="/register" element={<RegisterPage />}/>

                        {/* BLOCO 1: Rotas Protegidas (Exige apenas Token - USER ou ADMIN) */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/home" element={<HomeAluno />} />=
                            <Route path="/leaderboard" element={<Leaderboard />} />
                            <Route path="/profile" element={<Dados />}/>

                            <Route path="/question_book" element={<Vestibulares />}/>
                                <Route path="/question_book/details/:book_id" element={<AttemptProvider><QuestionBookDetails /></AttemptProvider>}/>
                                <Route path="/question_book/attempt/:book_id" element={<div>Redirecionamento do /attempt/:book_id</div>} /> {/* Adicionei um elemento placeholder */}
                                <Route path="/question_book/attempt/:book_id/:question_id" element={<AttemptProvider><QuestionPage /></AttemptProvider>}/>

                            <Route path="/shop" element={<ShopPage />} />
                        </Route>

                        {/* BLOCO 2: Rotas Protegidas EXCLUSIVAMENTE para ADMIN */}
                        <Route element={<AdminRoute />}>
                            <Route path="/admin" element={<AdminHome />} />
                            <Route path="/admin/users" element={<AdminCreateUser />} />
                            <Route path="/admin/items" element={<AdminCreateItem />} />
                            <Route path="/admin/exams" element={<AdminUploadExam />} />
                        </Route>

                        {/* Rota 404 */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </SystemProvider>
    );
}

export default Router;