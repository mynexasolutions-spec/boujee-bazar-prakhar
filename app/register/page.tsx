import AuthForm from '@/app/login/_components/AuthForm' // Verify this matches your true form path location
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ToastProvider } from '@/context/ToastContext'
import { CartProvider } from '@/context/CartContext'

export const metadata = {
  title: 'Create Account | The Boujee Bazaar',
  description: 'Register a premium jewelry profile collector account to manage tracking logs.',
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>
}) {
  const params = await searchParams
  const fallbackRedirect = params.redirect || '/shop'

  return (
    <ToastProvider>
      <CartProvider>
        {/* Universal Store Navigation Bar */}
        <Header />

        <main className="min-h-screen bg-stone-50 flex items-center justify-center pt-32 pb-20 px-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <div className="w-full max-w-md bg-white border border-stone-200/60 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            
            {/* Jewelry Brand Typography Header Stack */}
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-bold text-stone-900 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                Join The Bazaar
              </h1>
              <p className="text-xs text-stone-400 font-medium">
                Register your account info to complete fine jewelry purchases.
              </p>
            </div>

            {/* Renders your custom form layout block cleanly */}
            <AuthForm redirectTo={fallbackRedirect} />
            
          </div>
        </main>

        {/* Store Footer */}
        <Footer />
      </CartProvider>
    </ToastProvider>
  )
}
