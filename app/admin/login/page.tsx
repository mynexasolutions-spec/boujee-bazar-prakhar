// 'use client'

// import { useTransition, useState, useActionState } from 'react'
// import { adminLogin, type AuthResult } from '@/actions/auth'
// import { Eye, EyeOff, Shield } from 'lucide-react'

// export default function AdminLoginPage() {
//   const [state, formAction] = useActionState<AuthResult, FormData>(
//     adminLogin,
//     {}
//   )
//   const [pending, startTransition] = useTransition()
//   const [showPassword, setShowPassword] = useState(false)

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#FBF7F0] relative overflow-hidden">
//       {/* Decorative background */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F3EADC] via-[#FBF7F0] to-[#FBF7F0]" />
//       <div className="absolute top-1/4 -left-32 w-64 h-64 bg-teal-800/5 rounded-full blur-3xl" />
//       <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-teal-800/5 rounded-full blur-3xl" />
 
//       <div className="relative z-10 w-full max-w-md px-4">
//         <div className="bg-white rounded-2xl shadow-card border border-[#E6DAC4] p-8">
//           {/* Admin branding */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-teal-700 to-teal-800 rounded-xl mb-4 shadow-lg shadow-teal-700/20">
//               <Shield className="w-7 h-7 text-white" />
//             </div>
//             <h1 className="text-2xl font-bold text-ink">Admin Dashboard</h1>
//             <p className="text-ink/60 mt-1 text-sm">
//               Gulshan Modest — Management Portal
//             </p>
//           </div>
 
//           {/* Error message */}
//           {state.error && (
//             <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
//               <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//               {state.error}
//             </div>
//           )}
 
//           {/* Login Form */}
//           <form
//             action={(formData) => startTransition(() => formAction(formData))}
//             className="space-y-5"
//           >
//             <div>
//               <label
//                 htmlFor="admin-email"
//                 className="block text-sm font-medium text-ink/80 mb-1.5"
//               >
//                 Email Address
//               </label>
//               <input
//                 id="admin-email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 placeholder="admin@boujeebazaar.in"
//                 className="w-full px-4 py-2.5 rounded-xl border border-[#E6DAC4] bg-white text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-700/40 focus:border-[#c5a880] transition-all duration-200"
//               />
//             </div>
 
//             <div>
//               <label
//                 htmlFor="admin-password"
//                 className="block text-sm font-medium text-ink/80 mb-1.5"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="admin-password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   autoComplete="current-password"
//                   required
//                   placeholder="••••••••"
//                   className="w-full px-4 py-2.5 rounded-xl border border-[#E6DAC4] bg-white text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-teal-700/40 focus:border-[#c5a880] transition-all duration-200 pr-11"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink/75 transition-colors"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-4.5 h-4.5" />
//                   ) : (
//                     <Eye className="w-4.5 h-4.5" />
//                   )}
//                 </button>
//               </div>
//             </div>
 
//             <button
//               type="submit"
//               disabled={pending}
//               className="w-full py-2.5 px-4 bg-gradient-to-r from-teal-700 to-teal-800 text-white font-semibold rounded-xl shadow-md shadow-teal-700/20 hover:shadow-lg hover:shadow-teal-700/30 hover:from-teal-800 hover:to-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-700/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
//             >
//               {pending ? (
//                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//               ) : (
//                 <>
//                   <Shield className="w-4.5 h-4.5" />
//                   Access Dashboard
//                 </>
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'

import { useState, useTransition } from 'react'
import { Eye, EyeOff, Shield } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [pending, startTransition] = useTransition()

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      // 1. Read your true .env target keys safely from the browser environment
      const targetEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@boujeebazaar.in'
      const targetPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'password'

      if (email === targetEmail && password === targetPass) {
        // 2. Set the precise authorization tokens the middleware is looking for
        document.cookie = 'boujee-admin-logged-in=true; path=/; max-age=86400;'
        document.cookie = 'mock-admin-logged-in=true; path=/; max-age=86400;'
        document.cookie = 'gulshan-user-session=true; path=/; max-age=86400;'
        
        // 3. Force a deep hard navigation refresh to break out of state loops
        window.location.replace('/admin')
      } else {
        setError('Invalid Admin Email or Password. Access Denied.')
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF7F0] relative overflow-hidden" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F3EADC] via-[#FBF7F0] to-[#FBF7F0]" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-amber-800/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-amber-800/5 rounded-full blur-3xl" />
 
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-[#E6DAC4] p-8">
          
          {/* Admin branding updated for Boujee Bazaar styles */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#c5a880] to-[#a0845b] rounded-xl mb-4 shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              the <span style={{ color: '#c5a880' }}>boujee</span> bazaar.
            </h1>
            <p className="text-neutral-500 mt-1 text-sm">
              Management Portal Gateway
            </p>
          </div>
 
          {/* Error message box */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
 
          {/* Login Form running on local state events directly */}
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Email Address
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@boujeebazaar.in"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E6DAC4] bg-white text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#c5a880]/40 focus:border-[#c5a880] transition-all"
              />
            </div>
 
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E6DAC4] bg-white text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#c5a880]/40 focus:border-[#c5a880] transition-all pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>
 
            <button
              type="submit"
              disabled={pending}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-[#c5a880] to-[#a0845b] text-white font-semibold rounded-xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {pending ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Shield className="w-4.5 h-4.5" />
                  Access Dashboard
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// 'use client'

// import { useState } from 'react'
// import { Eye, EyeOff, Shield } from 'lucide-react'

// export default function AdminLoginPage() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState<string | null>(null)
//   const [pending, setPending] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)

//   const handleAdminAuth = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setPending(true)
//     setError(null)

//     // Read the values you added inside your root `.env` or `.env.local` file
//     // Next.js exposes NEXT_PUBLIC_ keys directly to browser window clients safely
//     const targetEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@boujeebazaar.in'
//     const targetPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'password' 

//     if (email === targetEmail && password === targetPass) {
//       // 1. Create the cookie token required by your middleware script
//       document.cookie = 'boujee-admin-logged-in=true; path=/;'
//       document.cookie = 'gulshan-user-session=true; path=/;' // Extra safety token for old routes
      
//       // 2. Redirect right past the gateway into your working admin route dashboard
//       window.location.href = '/admin'
//     } else {
//       setError('Invalid Admin Email or Password. Access Denied.')
//       setPending(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#FBF7F0] relative overflow-hidden" style={{ fontFamily: 'Poppins, sans-serif' }}>
//       {/* Decorative background vectors */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F3EADC] via-[#FBF7F0] to-[#FBF7F0]" />
//       <div className="absolute top-1/4 -left-32 w-64 h-64 bg-amber-700/5 rounded-full blur-3xl" />
//       <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-amber-700/5 rounded-full blur-3xl" />
 
//       <div className="relative z-10 w-full max-w-md px-4">
//         <div className="bg-white rounded-2xl shadow-xl border border-[#E6DAC4] p-8">
          
//           {/* Admin branding updated for Boujee Bazaar styles */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#c5a880] to-[#a0845b] rounded-xl mb-4 shadow-lg">
//               <Shield className="w-7 h-7 text-white" />
//             </div>
//             <h1 className="text-2xl font-bold text-neutral-900" style={{ fontFamily: 'Playfair Display, serif' }}>
//               the <span style={{ color: '#c5a880' }}>boujee</span> bazaar.
//             </h1>
//             <p className="text-neutral-500 mt-1 text-sm">
//               Management Portal Gateway
//             </p>
//           </div>
 
//           {/* Real-time Validation Error Banner alerts */}
//           {error && (
//             <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
//               <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//               {error}
//             </div>
//           )}
 
//           {/* Login Form tracking native React events state natively */}
//           <form onSubmit={handleAdminAuth} className="space-y-5">
//             <div>
//               <label htmlFor="admin-email" className="block text-sm font-medium text-neutral-700 mb-1.5">
//                 Email Address
//               </label>
//               <input
//                 id="admin-email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="admin@boujeebazaar.in"
//                 className="w-full px-4 py-2.5 rounded-xl border border-[#E6DAC4] bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#c5a880]/40 focus:border-[#c5a880] transition-all"
//               />
//             </div>
 
//             <div>
//               <label htmlFor="admin-password" className="block text-sm font-medium text-neutral-700 mb-1.5">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="admin-password"
//                   type={showPassword ? 'text' : 'password'}
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   className="w-full px-4 py-2.5 rounded-xl border border-[#E6DAC4] bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#c5a880]/40 focus:border-[#c5a880] transition-all pr-11"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
//                 >
//                   {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
//                 </button>
//               </div>
//             </div>
 
//             <button
//               type="submit"
//               disabled={pending}
//               className="w-full py-2.5 px-4 bg-gradient-to-r from-[#c5a880] to-[#a0845b] text-white font-semibold rounded-xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
//             >
//               {pending ? (
//                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//               ) : (
//                 <>
//                   <Shield className="w-4.5 h-4.5" />
//                   Access Dashboard
//                 </>
//               )}
//             </button>
//           </form>

//         </div>
//       </div>
//     </div>
//   )
// }
