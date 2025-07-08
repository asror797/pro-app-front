"use client"

import { useState } from "react"
import {
  Search,
  Download,
  Eye,
  MoreHorizontal,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock orders data
const orders = [
  {
    id: "ORD-001",
    customer: {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-15",
    status: "delivered",
    amount: 1999.0,
    items: 3,
    paymentMethod: "Credit Card",
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    id: "ORD-002",
    customer: {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-14",
    status: "processing",
    amount: 39.0,
    items: 1,
    paymentMethod: "PayPal",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
  },
  {
    id: "ORD-003",
    customer: {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-13",
    status: "shipped",
    amount: 299.0,
    items: 2,
    paymentMethod: "Credit Card",
    shippingAddress: "789 Pine St, Chicago, IL 60601",
  },
  {
    id: "ORD-004",
    customer: {
      name: "William Kim",
      email: "will@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-12",
    status: "pending",
    amount: 99.0,
    items: 1,
    paymentMethod: "Credit Card",
    shippingAddress: "321 Elm St, Houston, TX 77001",
  },
  {
    id: "ORD-005",
    customer: {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-11",
    status: "delivered",
    amount: 39.0,
    items: 1,
    paymentMethod: "Apple Pay",
    shippingAddress: "654 Maple Dr, Phoenix, AZ 85001",
  },
  {
    id: "ORD-006",
    customer: {
      name: "Michael Chen",
      email: "michael.chen@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-10",
    status: "cancelled",
    amount: 159.0,
    items: 2,
    paymentMethod: "Credit Card",
    shippingAddress: "987 Cedar Ln, Miami, FL 33101",
  },
  {
    id: "ORD-007",
    customer: {
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-09",
    status: "processing",
    amount: 449.0,
    items: 4,
    paymentMethod: "Credit Card",
    shippingAddress: "147 Birch St, Seattle, WA 98101",
  },
  {
    id: "ORD-008",
    customer: {
      name: "James Rodriguez",
      email: "james.rodriguez@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-08",
    status: "shipped",
    amount: 79.0,
    items: 1,
    paymentMethod: "Google Pay",
    shippingAddress: "258 Spruce Ave, Denver, CO 80201",
  },
  {
    id: "ORD-008",
    customer: {
      name: "James Rodriguez",
      email: "james.rodriguez@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-08",
    status: "shipped",
    amount: 79.0,
    items: 1,
    paymentMethod: "Google Pay",
    shippingAddress: "258 Spruce Ave, Denver, CO 80201",
  },
  {
    id: "ORD-008",
    customer: {
      name: "James Rodriguez",
      email: "james.rodriguez@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-08",
    status: "shipped",
    amount: 79.0,
    items: 1,
    paymentMethod: "Google Pay",
    shippingAddress: "258 Spruce Ave, Denver, CO 80201",
  },
  {
    id: "ORD-008",
    customer: {
      name: "James Rodriguez",
      email: "james.rodriguez@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-08",
    status: "shipped",
    amount: 79.0,
    items: 1,
    paymentMethod: "Google Pay",
    shippingAddress: "258 Spruce Ave, Denver, CO 80201",
  },
  {
    id: "ORD-008",
    customer: {
      name: "James Rodriguez",
      email: "james.rodriguez@email.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "2024-01-08",
    status: "shipped",
    amount: 79.0,
    items: 1,
    paymentMethod: "Google Pay",
    shippingAddress: "258 Spruce Ave, Denver, CO 80201",
  },
]

const statusConfig = {
  pending: { label: "Pending", variant: "outline" as const, icon: Clock, color: "text-yellow-600" },
  processing: { label: "Processing", variant: "secondary" as const, icon: Package, color: "text-blue-600" },
  shipped: { label: "Shipped", variant: "default" as const, icon: Truck, color: "text-purple-600" },
  delivered: { label: "Delivered", variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
  cancelled: { label: "Cancelled", variant: "destructive" as const, icon: XCircle, color: "text-red-600" },
}

const ITEMS_PER_PAGE = 10

export function OrdersContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
    if (filterType === "status") setStatusFilter(value)
    if (filterType === "date") setDateFilter(value)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-none shadow-none border-none">
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>View and manage all orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={(value) => handleFilterChange("status", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={(value) => handleFilterChange("date", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders Table */}
          <div className="rounded-xs border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((order) => {
                  const statusInfo = statusConfig[order.status as keyof typeof statusConfig]
                  const StatusIcon = statusInfo.icon

                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={order.customer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {order.customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{order.customer.name}</div>
                            <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusInfo.variant} className="gap-1">
                          <StatusIcon className="h-3 w-3" />
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.items} items</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{order.paymentMethod}</TableCell>
                      <TableCell className="text-right font-medium">${order.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Package className="mr-2 h-4 w-4" />
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination and Results Info */}
          {filteredOrders.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length}{" "}
                results
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No orders found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
