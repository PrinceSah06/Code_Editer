import React from 'react'
import SignUpForm from '../componets/SignUpForm'

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(6,182,212,0.15),rgba(255,255,255,0))] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 -right-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md p-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl mb-4">
            <svg className="w-8 h-8 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Create an Account</h1>
          <p className="text-slate-400 mt-2">Join us and start building amazing projects</p>
        </div>
        
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-2xl p-6 sm:p-8">
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}

export default SignUp
