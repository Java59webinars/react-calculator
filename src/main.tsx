import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import withAuth from "./components/withAuth.tsx";
import LoginPage from "./components/LoginPage.tsx";
const ProtectedApp = withAuth(App);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/*" element={<ProtectedApp/>}/>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
