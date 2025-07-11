"use client"

import { useState } from "react"
import {
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Phone,
  Car,
  MapPin,
  Calendar,
  Star,
  User,
  ToggleRight,
  ToggleLeft,
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

// Mock Driver data based on the provided Prisma schema
const drivers = [
  {
    id: "DRV-001",
    fullname: "John Doe",
    phone: "+1122334455",
    telegramId: "johndoe_tg",
    isPremium: true,
    isActive: true,
    region: "New York",
    carModel: "Toyota Camry",
    carNumber: "XYZ 123",
    carColor: "Silver",
    carYear: 2020,
    lastActiveAt: "2024-07-09T10:00:00Z",
  },
  {
    id: "DRV-002",
    fullname: "Jane Smith",
    phone: "+1987654321",
    telegramId: "janesmith_tg",
    isPremium: false,
    isActive: true,
    region: "Los Angeles",
    carModel: "Honda Civic",
    carNumber: "ABC 456",
    carColor: "Blue",
    carYear: 2018,
    lastActiveAt: "2024-07-08T15:30:00Z",
  },
  {
    id: "DRV-003",
    fullname: "Peter Jones",
    phone: "+1555123456",
    telegramId: "peterj_tg",
    isPremium: true,
    isActive: false,
    region: "Chicago",
    carModel: "Ford F-150",
    carNumber: "DEF 789",
    carColor: "Black",
    carYear: 2022,
    lastActiveAt: "2024-07-07T09:00:00Z",
  },
  {
    id: "DRV-004",
    fullname: "Alice Brown",
    phone: "+1777888999",
    telegramId: "aliceb_tg",
    isPremium: false,
    isActive: true,
    region: "Houston",
    carModel: "Nissan Altima",
    carNumber: "GHI 012",
    carColor: "White",
    carYear: 2019,
    lastActiveAt: "2024-07-09T11:45:00Z",
  },
  {
    id: "DRV-005",
    fullname: "Bob White",
    phone: "+1444333222",
    telegramId: "bobw_tg",
    isPremium: true,
    isActive: true,
    region: "New York",
    carModel: "Tesla Model 3",
    carNumber: "JKL 345",
    carColor: "Red",
    carYear: 2023,
    lastActiveAt: "2024-07-09T08:00:00Z",
  },
  {
    id: "DRV-006",
    fullname: "Charlie Green",
    phone: "+1000111222",
    telegramId: "charlieg_tg",
    isPremium: false,
    isActive: false,
    region: "Los Angeles",
    carModel: "BMW X5",
    carNumber: "MNO 678",
    carColor: "Gray",
    carYear: 2021,
    lastActiveAt: "2024-07-06T14:00:00Z",
  },
]

const ITEMS_PER_PAGE = 5

export default function DriversTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isActiveFilter, setIsActiveFilter] = useState("all")
  const [isPremiumFilter, setIsPremiumFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const uniqueRegions = Array.from(new Set(drivers.map((driver) => driver.region))).filter(Boolean) as string[]

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.telegramId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (driver.carModel && driver.carModel.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (driver.carNumber && driver.carNumber.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesIsActive =
      isActiveFilter === "all" ||
      (isActiveFilter === "active" && driver.isActive) ||
      (isActiveFilter === "inactive" && !driver.isActive)
    const matchesIsPremium =
      isPremiumFilter === "all" ||
      (isPremiumFilter === "premium" && driver.isPremium) ||
      (isPremiumFilter === "standard" && !driver.isPremium)
    const matchesRegion = regionFilter === "all" || driver.region === regionFilter

    return matchesSearch && matchesIsActive && matchesIsPremium && matchesRegion
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredDrivers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedDrivers = filteredDrivers.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
    if (filterType === "isActive") setIsActiveFilter(value)
    if (filterType === "isPremium") setIsPremiumFilter(value)
    if (filterType === "region") setRegionFilter(value)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-none shadow-none border-none">
        <CardHeader>
          <CardTitle>Driver Management</CardTitle>
          <CardDescription>View and manage all registered drivers.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="relative flex-1 max-w-sm min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search drivers..."
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
            <Select value={isPremiumFilter} onValueChange={(value) => handleFilterChange("isPremium", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by premium" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
              </SelectContent>
            </Select>
            <Select value={regionFilter} onValueChange={(value) => handleFilterChange("region", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {uniqueRegions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Drivers Table */}
          <div className="rounded-xs border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Car Details</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedDrivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32&text=${driver.fullname
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}`}
                          />
                          <AvatarFallback>
                            {driver.fullname
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {driver.fullname}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {driver.phone}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <User className="h-3 w-3" />
                          {driver.telegramId}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Car className="h-3 w-3 text-muted-foreground" />
                          {driver.carModel} ({driver.carYear})
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {driver.carNumber} - {driver.carColor}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant={driver.isActive ? "default" : "destructive"} className="gap-1">
                          {driver.isActive ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                          {driver.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant={driver.isPremium ? "default" : "outline"} className="gap-1">
                          {driver.isPremium ? <Star className="h-3 w-3" /> : <User className="h-3 w-3" />}
                          {driver.isPremium ? "Premium" : "Standard"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {driver.region}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {driver.lastActiveAt ? new Date(driver.lastActiveAt).toLocaleDateString() : "N/A"}
                      </div>
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
                            {driver.isActive ? (
                              <ToggleLeft className="mr-2 h-4 w-4" />
                            ) : (
                              <ToggleRight className="mr-2 h-4 w-4" />
                            )}
                            {driver.isActive ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {driver.isPremium ? <User className="mr-2 h-4 w-4" /> : <Star className="mr-2 h-4 w-4" />}
                            {driver.isPremium ? "Remove Premium" : "Make Premium"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Contact Driver
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
          {filteredDrivers.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredDrivers.length)} of {filteredDrivers.length}{" "}
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

          {filteredDrivers.length === 0 && (
            <div className="text-center py-8">
              <Car className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No drivers found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
