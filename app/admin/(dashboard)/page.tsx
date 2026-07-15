import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  ShoppingCart,
  Users,
  Package,
  IndianRupee,
  ArrowUpRight,
  Clock,
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

// async function getStats() {
//   const supabase = await createClient()

//   const [ordersRes, customersRes, productsRes, recentOrdersRes] =
//     await Promise.all([
//       supabase
//         .from('orders')
//         .select('id, total_amount', { count: 'exact', head: false }),
//       supabase
//         .from('profiles')
//         .select('id', { count: 'exact', head: true })
//         .eq('role', 'customer'),
//       supabase
//         .from('products')
//         .select('id', { count: 'exact', head: true }),
//       supabase
//         .from('orders')
//         .select('id, order_number, total_amount, order_status, payment_status, created_at')
//         .order('created_at', { ascending: false })
//         .limit(5),
//     ])
async function getStats() {
  // ✅ FIXED: Instantiates the master service token bypass client
  const supabase = createAdminClient() 

  const [ordersRes, customersRes, productsRes, recentOrdersRes] =
    await Promise.all([
      // A. Query your orders table cleanly
      supabase
        .from('orders')
        .select('id, total', { count: 'exact', head: false }),

      // B. 🌟 FIXED: Points to your true 'users' table and filters out admin operators
      supabase
        .from('users')
        .select('id', { count: 'exact', head: true })
        .or('is_admin.eq.false'),

      // C. Query your jewelry products inventory catalog count cleanly
      supabase
        .from('products')
        .select('id', { count: 'exact', head: true }),

      // D. Query your recent orders log list matching your direct row schema
      supabase
        .from('orders')
        .select('id, order_number, total, order_status, payment_status, created_at')
        .order('created_at', { ascending: false })
        .limit(5),
    ])
    console.log("ordersRes.data:", ordersRes.data)
console.log("ordersRes.count:", ordersRes.count)
console.log("ordersRes.error:", ordersRes.error)


  // 1. Safe order count checker
  const totalOrders = ordersRes.count || ordersRes.data?.length || 0

  // 2. ✅ FIXED REVENUE MATH: Reads your true 'total' column key safely
  const totalRevenue =
    ordersRes.data?.reduce(
      (sum, order: any) => sum + (Number(order.total || order.total_amount || 0)),
      0
    ) || 0

  // 3. Customers and products extraction counters
  const totalCustomers = customersRes.count || customersRes.data?.length || 0
  const totalProducts = productsRes.count || productsRes.data?.length || 0
  const recentOrders = recentOrdersRes.data || []

  return { totalOrders, totalRevenue, totalCustomers, totalProducts, recentOrders }

}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default async function AdminDashboardPage() {
  const { totalOrders, totalRevenue, totalCustomers, totalProducts, recentOrders } =
    await getStats()

  const statCards = [
    {
      label: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      icon: IndianRupee,
      gradient: 'from-stone-800 to-stone-900',
      shadowColor: 'shadow-stone-900/10',
    },
    {
      label: 'Total Orders',
      value: totalOrders.toString(),
      icon: ShoppingCart,
      gradient: 'from-stone-800 to-stone-900',
      shadowColor: 'shadow-stone-900/10',
    },
    {
      label: 'Customers',
      value: totalCustomers.toString(),
      icon: Users,
      gradient: 'from-stone-800 to-stone-900',
      shadowColor: 'shadow-stone-900/10',
    },
    {
      label: 'Products',
      value: totalProducts.toString(),
      icon: Package,
      gradient: 'from-stone-800 to-stone-900',
      shadowColor: 'shadow-stone-900/10',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Overview</h1>
        <p className="text-stone-500 text-sm mt-0.5">
          Welcome back! Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className="bg-white rounded-xl border border-stone-200/80 p-5 hover:shadow-lg hover:shadow-stone-200/50 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-md ${card.shadowColor}`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-stone-400 transition-colors" />
              </div>
              <p className="text-2xl font-bold text-stone-900">{card.value}</p>
              <p className="text-sm text-stone-500 mt-0.5">{card.label}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-stone-200/80 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4.5 h-4.5 text-stone-400" />
            <h2 className="text-base font-semibold text-stone-900">
              Recent Orders
            </h2>
          </div>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingCart className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <p className="text-stone-500 text-sm">No orders yet</p>
            <p className="text-stone-400 text-xs mt-1">
              Orders will appear here once customers start placing them.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-stone-50/50">
                  <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3">
                    Order
                  </th>
                  <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3">
                    Amount
                  </th>
                  <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3">
                    Payment
                  </th>
                  <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-stone-50/50 transition-colors"
                  >
                    <td className="px-6 py-3.5 text-sm font-medium text-stone-900">
                      #{order.order_number}
                    </td>
                    <td className="px-6 py-3.5 text-sm text-stone-700">
                      ₹{Number(order.total).toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize ${
                          statusColors[order.order_status] ||
                          'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {order.order_status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize ${
                          order.payment_status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-stone-500">
                      {new Date(order.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
