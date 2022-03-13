import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.scss'
const Home = React.lazy(() => import('./pages/Home'))
const Login = React.lazy(() => import('@/pages/Login'))

export default function App() {
  return (
    <>
      <Router>
        <div>
          <Suspense fallback={<div>loading...</div>}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Navigate replace to="/home" /> } />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </>
  )
}
