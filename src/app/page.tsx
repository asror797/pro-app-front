import { redirect } from "next/navigation"
import { OrdersContent } from "@/components/dashboard-content"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function DashboardPage() {
  const isAuthenticated = true

  if (!isAuthenticated) {
    redirect("/login")
  }

  return (
    <DashboardLayout>
      <OrdersContent />
    </DashboardLayout>
  )
}
