"use client"

import { useState } from "react"
import {
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Calendar,
  MessageSquare,
  MapPin,
  User,
  ToggleRight,
  ToggleLeft,
  Car,
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

// Mock Ride data based on the provided Prisma schema, including nested driver info
const rides = [
  {
    id: "RIDE-001",
    driver: {
      id: "DRV-001",
      fullname: "John Doe",
      phone: "+1122334455",
      profilePhoto: "/placeholder.svg?height=32&width=32",
    },
    message: "Looking for a ride to downtown.",
    direction: "North",
    date: "2024-07-10T08:00:00Z",
    isActive: true,
  },
  {
    id: "RIDE-002",
    driver: {
      id: "DRV-002",
      fullname: "Jane Smith",
      phone: "+1987654321",
      profilePhoto: "/placeholder.svg?height=32&width=32",
    },
    message: "Need a quick ride to the airport.",
    direction: "South",
    date: "2024-07-10T14:30:00Z",
    isActive: true,
  },
  {
    id: "RIDE-003",
    driver: {
      id: "DRV-001",
      fullname: "John Doe",
      phone: "+1122334455",
      profilePhoto: "/placeholder.svg?height=32&width=32",
    },
    message: "Ride to the concert venue.",
    direction: "East",
    date: "2024-07-09T19:00:00Z",
    isActive: false,
  },
  {
    id: "RIDE-004",
    driver: {
      id: "DRV-003",
      fullname: "Peter Jones",
      phone: "+1555123456",
      profilePhoto: "/placeholder.svg?height=32&width=32",
    },
    message: "Morning commute to the office.",
    direction: "West",
    date: "2024-07-11T07:15:00Z",
    isActive: true,
  },
  {
    id: "RIDE-005",
    driver: {
      id: "DRV-002",
      fullname: "Jane Smith",
      phone: "+1987654321",
      profilePhoto: "/placeholder.svg?height=32&width=32",
    },
    message: "Late night ride home.",
    direction: "North",
    date: "2024-07-09T23:00:00Z",
    isActive: false,
  },
  {
    id: "RIDE-006",
    driver: {
      id: "DRV-004",
      fullname: "Alice Brown",
      phone: "+1777888999",
      profilePhoto: "/placeholder.svg?height=32&width=32",
    },
    message: "Weekend trip to the mountains.",
    direction: "South",
    date: "2024-07-12T09:00:00Z",
    isActive: true,
  },
]

const ITEMS_PER_PAGE = 5

export default function RidesTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isActiveFilter, setIsActiveFilter] = useState("all")
  const [directionFilter, setDirectionFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const uniqueDirections = Array.from(new Set(rides.map((ride) => ride.direction))).filter(Boolean) as string[]

  const filteredRides = rides.filter((ride) => {
    const matchesSearch =
      ride.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.direction.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.driver.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.driver.phone.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesIsActive =
      isActiveFilter === "all" ||
      (isActiveFilter === "active" && ride.isActive) ||
      (isActiveFilter === "inactive" && !ride.isActive)
    const matchesDirection = directionFilter === "all" || ride.direction === directionFilter

    return matchesSearch && matchesIsActive && matchesDirection
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredRides.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedRides = filteredRides.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
    if (filterType === "isActive") setIsActiveFilter(value)
    if (filterType === "direction") setDirectionFilter(value)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-none shadow-none border-none">
        <CardHeader>
          <CardTitle>Driver Rides Management</CardTitle>
          <CardDescription>View and manage all rides created by drivers.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="relative flex-1 max-w-sm min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search rides..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={isActiveFilter} onValueChange={(value) => handleFilterChange("isActive", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={directionFilter} onValueChange={(value) => handleFilterChange("direction", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Directions</SelectItem>
                {uniqueDirections.map((direction) => (
                  <SelectItem key={direction} value={direction}>
                    {direction}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rides Table */}
          <div className="rounded-xs border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ride ID</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Direction</TableHead>
                  <TableHead>Depart Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRides.map((ride) => (
                  <TableRow key={ride.id}>
                    <TableCell className="font-medium">{ride.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={
                              ride.driver.profilePhoto ||
                              `/placeholder.svg?height=32&width=32&text=${
                                ride.driver.fullname
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("") || "/placeholder.svg"
                              }`
                            }
                          />
                          <AvatarFallback>
                            {ride.driver.fullname
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{ride.driver.fullname}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {ride.driver.phone}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageSquare className="h-3 w-3" />
                        {ride.message}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {ride.direction}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(ride.date).toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={ride.isActive ? "default" : "destructive"} className="gap-1">
                        {ride.isActive ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                        {ride.isActive ? "Active" : "Inactive"}
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
                            <Search className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {ride.isActive ? (
                              <ToggleLeft className="mr-2 h-4 w-4" />
                            ) : (
                              <ToggleRight className="mr-2 h-4 w-4" />
                            )}
                            {ride.isActive ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            View Driver Profile
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination and Results Info */}
          {filteredRides.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredRides.length)} of {filteredRides.length} results
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

          {filteredRides.length === 0 && (
            <div className="text-center py-8">
              <Car className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No rides found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
