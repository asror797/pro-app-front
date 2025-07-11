"use client"

import { useState } from "react"
import {
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  Hash,
  ToggleRight,
  ToggleLeft,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

// Mock Group data based on the provided Prisma schema
const groups = [
  {
    id: "GRP-001",
    name: "Telegram Devs Chat",
    telegramId: "1000001",
    region: "Global",
    isActive: true,
    createdAt: "2023-01-10T10:00:00Z",
  },
  {
    id: "GRP-002",
    name: "Local Community Hub",
    telegramId: "1000002",
    region: "New York",
    isActive: true,
    createdAt: "2023-03-15T14:30:00Z",
  },
  {
    id: "GRP-003",
    name: "Crypto Enthusiasts",
    telegramId: "1000003",
    region: "Global",
    isActive: false,
    createdAt: "2023-02-20T09:00:00Z",
  },
  {
    id: "GRP-004",
    name: "Tech Innovators NYC",
    telegramId: "1000004",
    region: "New York",
    isActive: true,
    createdAt: "2023-06-01T11:00:00Z",
  },
  {
    id: "GRP-005",
    name: "Gaming Squad",
    telegramId: "1000005",
    region: "Europe",
    isActive: true,
    createdAt: "2023-04-22T16:00:00Z",
  },
  {
    id: "GRP-006",
    name: "Travel Buddies",
    telegramId: "1000006",
    region: "Global",
    isActive: false,
    createdAt: "2023-07-05T08:00:00Z",
  },
]

const ITEMS_PER_PAGE = 5

export default function GroupsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isActiveFilter, setIsActiveFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const uniqueRegions = Array.from(new Set(groups.map((group) => group.region))).filter(Boolean) as string[]

  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.telegramId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.region.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesIsActive =
      isActiveFilter === "all" ||
      (isActiveFilter === "active" && group.isActive) ||
      (isActiveFilter === "inactive" && !group.isActive)
    const matchesRegion = regionFilter === "all" || group.region === regionFilter

    return matchesSearch && matchesIsActive && matchesRegion
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredGroups.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedGroups = filteredGroups.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
    if (filterType === "isActive") setIsActiveFilter(value)
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
          <CardTitle>Telegram Group Management</CardTitle>
          <CardDescription>View and manage all registered Telegram groups.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="relative flex-1 max-w-sm min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
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

          {/* Groups Table */}
          <div className="rounded-xs border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Group Name</TableHead>
                  <TableHead>Telegram ID</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedGroups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {group.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Hash className="h-3 w-3" />
                        {group.telegramId}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {group.region}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={group.isActive ? "default" : "destructive"} className="gap-1">
                        {group.isActive ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                        {group.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(group.createdAt).toLocaleDateString()}
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
                            {group.isActive ? (
                              <ToggleLeft className="mr-2 h-4 w-4" />
                            ) : (
                              <ToggleRight className="mr-2 h-4 w-4" />
                            )}
                            {group.isActive ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            Manage User Bots
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
          {filteredGroups.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredGroups.length)} of {filteredGroups.length}{" "}
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

          {filteredGroups.length === 0 && (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No groups found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
