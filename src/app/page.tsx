import { redirect } from "next/navigation"
import { OrdersContent } from "@/components/dashboard-content"
import { DashboardLayout } from "@/components/dashboard-layout"

// In a real app, you'd check authentication here
// For demo purposes, we'll redirect to login if not authenticated
export default function DashboardPage() {
  // Simulate auth check - in real app, check cookies/session
  const isAuthenticated = true // Change to false to test login redirect

  if (!isAuthenticated) {
    redirect("/login")
  }

  return (
    <DashboardLayout>
      <OrdersContent />
    </DashboardLayout>
  )
}
