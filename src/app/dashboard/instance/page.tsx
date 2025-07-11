"use client"

import { useState } from "react"
import {
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  User,
  Bot,
  Plug,
  PlugZap,
  Calendar,
  MessageSquareText,
  Users,
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

// Mock user bot instances data
const userBotInstances = [
  {
    id: "BOT-001",
    name: "DefaultBot-Alpha",
    userBotAccount: {
      name: "Alice Smith",
      phone: "+1234567890",
      profilePhoto: "/placeholder.svg?height=32&width=32",
    },
    lastActive: "2024-07-08T14:30:00Z",
    connectionStatus: "connected",
    type: "default",
  },
  {
    id: "BOT-002",
    name: "UserBot-Beta",
    userBotAccount: {
      name: "Bob Johnson",
      phone: "+1987654321",
      profilePhoto: "/placeholder.svg?height=32&width=32",
    },
    lastActive: "2024-07-07T10:00:00Z",
    connectionStatus: "disconnected",
    type: "custom",
  },
  {
    id: "BOT-003",
    name: "DefaultBot-Gamma",
    userBotAccount: {
      name: "Charlie Brown",
      phone: "+1122334455",
      profilePhoto: "/placeholder.svg?height=32&width=32",
    },
    lastActive: "2024-07-08T16:15:00Z",
    connectionStatus: "connecting",
    type: "default",
  },
  {
    id: "BOT-004",
    name: "UserBot-Delta",
    userBotAccount: {
      name: "Diana Prince",
      phone: "+1555123456",
      profilePhoto: "/placeholder.svg?height=32&width=32",
    },
    lastActive: "2024-07-06T08:45:00Z",
    connectionStatus: "connected",
    type: "custom",
  },
  {
    id: "BOT-005",
    name: "DefaultBot-Epsilon",
    userBotAccount: {
      name: "Eve Adams",
      phone: "+1777888999",
      profilePhoto: "/placeholder.svg?height=32&width=32",
    },
    lastActive: "2024-07-08T11:00:00Z",
    connectionStatus: "connected",
    type: "default",
  },
  {
    id: "BOT-006",
    name: "UserBot-Zeta",
    userBotAccount: {
      name: "Frank White",
      phone: "+1444333222",
      profilePhoto: "/placeholder.svg?height=32&width=32",
    },
    lastActive: "2024-07-05T20:00:00Z",
    connectionStatus: "disconnected",
    type: "custom",
  },
  {
    id: "BOT-007",
    name: "DefaultBot-Eta",
    userBotAccount: {
      name: "Grace Hopper",
      phone: "+1666777888",
      profilePhoto: "/placeholder.svg?height=32&width=32",
    },
    lastActive: "2024-07-08T09:00:00Z",
    connectionStatus: "connected",
    type: "default",
  },
  {
    id: "BOT-008",
    name: "UserBot-Theta",
    userBotAccount: {
      name: "Harry Potter",
      phone: "+1000111222",
      profilePhoto: "/placeholder.svg?height=32&width=32",
    },
    lastActive: "2024-07-04T18:00:00Z",
    connectionStatus: "connected",
    type: "custom",
  },
]

const statusConfig = {
  connected: { label: "Connected", variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
  disconnected: { label: "Disconnected", variant: "destructive" as const, icon: XCircle, color: "text-red-600" },
  connecting: { label: "Connecting", variant: "secondary" as const, icon: Clock, color: "text-blue-600" },
}

const ITEMS_PER_PAGE = 5

export default function UserBotInstancesTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredInstances = userBotInstances.filter((instance) => {
    const matchesSearch =
      instance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instance.userBotAccount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instance.userBotAccount.phone.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || instance.connectionStatus === statusFilter
    const matchesType = typeFilter === "all" || instance.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredInstances.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedInstances = filteredInstances.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
    if (filterType === "status") setStatusFilter(value)
    if (filterType === "type") setTypeFilter(value)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-none shadow-none border-none">
        <CardHeader>
          <CardTitle>User Bot Instances</CardTitle>
          <CardDescription>Manage your Telegram user bot accounts and their connection status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search instances..."
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
                <SelectItem value="connected">Connected</SelectItem>
                <SelectItem value="disconnected">Disconnected</SelectItem>
                <SelectItem value="connecting">Connecting</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={(value) => handleFilterChange("type", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User Bot Instances Table */}
          <div className="rounded-xs border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Instance Name</TableHead>
                  <TableHead>User Bot Account</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Connection Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedInstances.map((instance) => {
                  const statusInfo = statusConfig[instance.connectionStatus as keyof typeof statusConfig]
                  const StatusIcon = statusInfo.icon

                  return (
                    <TableRow key={instance.id}>
                      <TableCell className="font-medium">{instance.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={instance.userBotAccount.profilePhoto || "/placeholder.svg"} />
                            <AvatarFallback>
                              {instance.userBotAccount.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{instance.userBotAccount.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {instance.userBotAccount.phone}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(instance.lastActive).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusInfo.variant} className="gap-1">
                          <StatusIcon className="h-3 w-3" />
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1">
                          {instance.type === "default" ? <Bot className="h-3 w-3" /> : <User className="h-3 w-3" />}
                          {instance.type.charAt(0).toUpperCase() + instance.type.slice(1)}
                        </Badge>
                      </TableCell>
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
                              <MessageSquareText className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              Listen Group Messages
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <PlugZap className="mr-2 h-4 w-4" />
                              Disconnect
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Plug className="mr-2 h-4 w-4" />
                              Connect
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
          {filteredInstances.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredInstances.length)} of {filteredInstances.length}{" "}
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

          {filteredInstances.length === 0 && (
            <div className="text-center py-8">
              <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No user bot instances found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
