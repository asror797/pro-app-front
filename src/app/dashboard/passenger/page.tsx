"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Phone, User, MapPin, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

// Mock Passenger data based on the provided Prisma schema
const passengers = [
  {
    id: "PSN-001",
    fullname: "Emily White",
    phone: "+1112223333",
    telegramId: "emilyw_tg",
    region: "New York",
    lastActiveAt: "2024-07-09T12:00:00Z",
  },
  {
    id: "PSN-002",
    fullname: "David Green",
    phone: "+14445556666",
    telegramId: "davidg_tg",
    region: "Los Angeles",
    lastActiveAt: "2024-07-08T18:00:00Z",
  },
  {
    id: "PSN-003",
    fullname: "Sophia Blue",
    phone: "+17778889999",
    telegramId: "sophiab_tg",
    region: "Chicago",
    lastActiveAt: "2024-07-09T09:30:00Z",
  },
  {
    id: "PSN-004",
    fullname: "Daniel Black",
    phone: "+10001112222",
    telegramId: "danielb_tg",
    region: "New York",
    lastActiveAt: "2024-07-07T11:00:00Z",
  },
  {
    id: "PSN-005",
    fullname: "Olivia Red",
    phone: "+13334445555",
    telegramId: "oliviard_tg",
    region: "Houston",
    lastActiveAt: "2024-07-09T14:00:00Z",
  },
  {
    id: "PSN-006",
    fullname: "James Yellow",
    phone: "+16667778888",
    telegramId: "jamesy_tg",
    region: "Los Angeles",
    lastActiveAt: "2024-07-06T10:00:00Z",
  },
]

const ITEMS_PER_PAGE = 5

export default function PassengersTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [regionFilter, setRegionFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const uniqueRegions = Array.from(new Set(passengers.map((passenger) => passenger.region))).filter(Boolean) as string[]

  const filteredPassengers = passengers.filter((passenger) => {
    const matchesSearch =
      passenger.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.telegramId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRegion = regionFilter === "all" || passenger.region === regionFilter

    return matchesSearch && matchesRegion
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredPassengers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedPassengers = filteredPassengers.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
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
          <CardTitle>Passenger Management</CardTitle>
          <CardDescription>View and manage all registered passengers.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="relative flex-1 max-w-sm min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search passengers..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
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

          {/* Passengers Table */}
          <div className="rounded-xs border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Passenger Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPassengers.map((passenger) => (
                  <TableRow key={passenger.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32&text=${passenger.fullname
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}`}
                          />
                          <AvatarFallback>
                            {passenger.fullname
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {passenger.fullname}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {passenger.phone}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <User className="h-3 w-3" />
                          {passenger.telegramId}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {passenger.region}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {passenger.lastActiveAt ? new Date(passenger.lastActiveAt).toLocaleDateString() : "N/A"}
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
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Contact Passenger
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
          {filteredPassengers.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredPassengers.length)} of{" "}
                {filteredPassengers.length} results
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

          {filteredPassengers.length === 0 && (
            <div className="text-center py-8">
              <User className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No passengers found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
