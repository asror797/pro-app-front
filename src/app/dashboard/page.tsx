import { redirect } from "next/navigation"
// import { InstancesTab, RequestsTab, DriversTab } from "@/components/dashboard-tabs"

export default function DashboardPage() {
  const isAuthenticated = true; // Replace with actual auth logic

  if (!isAuthenticated) {
    redirect("/login")
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <a href="/dashboard/instances">Instances</a>
        <a href="/dashboard/requests">Requests</a>
        <a href="/dashboard/drivers">Drivers</a>
      </nav>
      <div>
       <h1>Hello world</h1>
      </div>
    </div>
  )
}