"use client"

import { useState } from "react"
import { Search, MoreHorizontal, CheckCircle, XCircle, ToggleRight, ToggleLeft, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
// import { v4 as uuidv4 } from "uuid" // For generating unique IDs

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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock Region data with districts, groups, and drivers
const initialRegions = [
  {
    id: "REG-001",
    name: "North America",
    code: "NA",
    isActive: true,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-01-15T10:00:00Z",
    districts: [
      {
        id: "DIST-001",
        name: "New York City",
        code: "NYC",
        regionId: "REG-001",
        isActive: true,
        latitude: 40.7128,
        longitude: -74.006,
        boundary: {},
        createdAt: "2023-01-15T10:00:00Z",
        updatedAt: "2023-01-15T10:00:00Z",
      },
      {
        id: "DIST-002",
        name: "Los Angeles",
        code: "LA",
        regionId: "REG-001",
        isActive: true,
        latitude: 34.0522,
        longitude: -118.2437,
        boundary: {},
        createdAt: "2023-01-15T10:00:00Z",
        updatedAt: "2023-01-15T10:00:00Z",
      },
    ],
    groups: [
      {
        id: "GRP-001",
        name: "NA Sales Team",
        regionId: "REG-001",
        isActive: true,
        createdAt: "2023-01-15T10:00:00Z",
        updatedAt: "2023-01-15T10:00:00Z",
      },
      {
        id: "GRP-002",
        name: "NA Support Team",
        regionId: "REG-001",
        isActive: true,
        createdAt: "2023-01-15T10:00:00Z",
        updatedAt: "2023-01-15T10:00:00Z",
      },
    ],
    drivers: [
      { id: "DRV-001", fullname: "John Doe", regionId: "REG-001" },
      { id: "DRV-005", fullname: "Bob White", regionId: "REG-001" },
    ],
  },
  {
    id: "REG-002",
    name: "Europe",
    code: "EU",
    isActive: true,
    createdAt: "2023-02-20T11:30:00Z",
    updatedAt: "2023-03-01T14:00:00Z",
    districts: [
      {
        id: "DIST-003",
        name: "London",
        code: "LDN",
        regionId: "REG-002",
        isActive: true,
        latitude: 51.5074,
        longitude: 0.1278,
        boundary: {},
        createdAt: "2023-02-20T11:30:00Z",
        updatedAt: "2023-02-20T11:30:00Z",
      },
      {
        id: "DIST-004",
        name: "Paris",
        code: "PRS",
        regionId: "REG-002",
        isActive: true,
        latitude: 48.8566,
        longitude: 2.3522,
        boundary: {},
        createdAt: "2023-02-20T11:30:00Z",
        updatedAt: "2023-02-20T11:30:00Z",
      },
    ],
    groups: [
      {
        id: "GRP-003",
        name: "EU Marketing",
        regionId: "REG-002",
        isActive: true,
        createdAt: "2023-02-20T11:30:00Z",
        updatedAt: "2023-02-20T11:30:00Z",
      },
    ],
    drivers: [
      { id: "DRV-002", fullname: "Jane Smith", regionId: "REG-002" },
      { id: "DRV-006", fullname: "Charlie Green", regionId: "REG-002" },
    ],
  },
  {
    id: "REG-003",
    name: "Asia",
    code: "AS",
    isActive: false,
    createdAt: "2023-03-10T09:00:00Z",
    updatedAt: "2023-03-10T09:00:00Z",
    districts: [],
    groups: [],
    drivers: [],
  },
  {
    id: "REG-004",
    name: "South America",
    code: "SA",
    isActive: true,
    createdAt: "2023-04-05T15:00:00Z",
    updatedAt: "2023-04-05T15:00:00Z",
    districts: [],
    groups: [],
    drivers: [],
  },
  {
    id: "REG-005",
    name: "Africa",
    code: "AF",
    isActive: false,
    createdAt: "2023-05-12T08:00:00Z",
    updatedAt: "2023-05-12T08:00:00Z",
    districts: [],
    groups: [],
    drivers: [],
  },
  {
    id: "REG-006",
    name: "Oceania",
    code: "OC",
    isActive: true,
    createdAt: "2023-06-01T13:00:00Z",
    updatedAt: "2023-06-01T13:00:00Z",
    districts: [],
    groups: [],
    drivers: [],
  },
]

const ITEMS_PER_PAGE = 5

export default function RegionsTable() {
  const [regions, setRegions] = useState(initialRegions)
  const [searchTerm, setSearchTerm] = useState("")
  const [isActiveFilter, setIsActiveFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isNewRegionDialogOpen, setIsNewRegionDialogOpen] = useState(false)
  const [newRegionName, setNewRegionName] = useState("")
  const [newRegionCode, setNewRegionCode] = useState("")
  const [newRegionIsActive, setNewRegionIsActive] = useState(true)

  const filteredRegions = regions.filter((region) => {
    const matchesSearch =
      region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      region.code.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesIsActive =
      isActiveFilter === "all" ||
      (isActiveFilter === "active" && region.isActive) ||
      (isActiveFilter === "inactive" && !region.isActive)

    return matchesSearch && matchesIsActive
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredRegions.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedRegions = filteredRegions.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
    if (filterType === "isActive") setIsActiveFilter(value)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleAddNewRegion = () => {
    const newRegion = {
      id: "a5s4asas58", // Generate a unique ID
      name: newRegionName,
      code: newRegionCode,
      isActive: newRegionIsActive,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      districts: [], // New regions start with no districts
      groups: [], // New regions start with no groups
      drivers: [], // New regions start with no drivers
    }
    setRegions((prevRegions) => [...prevRegions, newRegion])
    setIsNewRegionDialogOpen(false) // Close the dialog
    setNewRegionName("") // Reset form fields
    setNewRegionCode("")
    setNewRegionIsActive(true)
    setCurrentPage(1) // Go back to the first page to see the new region
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="space-y-6">
        <Card className="rounded-none shadow-none border-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Region Management</CardTitle>
              <CardDescription>View and manage all defined regions.</CardDescription>
            </div>
            <Dialog open={isNewRegionDialogOpen} onOpenChange={setIsNewRegionDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <Plus className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">New Region</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Region</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the new region. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newRegionName}
                      onChange={(e) => setNewRegionName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="code" className="text-right">
                      Code
                    </Label>
                    <Input
                      id="code"
                      value={newRegionCode}
                      onChange={(e) => setNewRegionCode(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="isActive" className="text-right">
                      Active
                    </Label>
                    <Switch
                      id="isActive"
                      checked={newRegionIsActive}
                      onCheckedChange={setNewRegionIsActive}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleAddNewRegion}>Save Region</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="relative flex-1 max-w-sm min-w-[200px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search regions..."
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
            </div>

            {/* Regions Table */}
            <div className="rounded-xs border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Region Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Districts</TableHead>
                    <TableHead>Groups</TableHead>
                    <TableHead>Drivers</TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRegions.map((region) => (
                    <TableRow key={region.id}>
                      <TableCell className="font-medium">{region.name}</TableCell>
                      <TableCell>{region.code}</TableCell>
                      <TableCell>
                        <Badge variant={region.isActive ? "default" : "destructive"} className="gap-1">
                          {region.isActive ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                          {region.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {region.districts.length > 0 ? (
                          <Tooltip>
                            <TooltipTrigger className="underline cursor-pointer">
                              {region.districts.length}
                            </TooltipTrigger>
                            <TooltipContent>
                              <ul className="list-disc pl-4">
                                {region.districts.map((district) => (
                                  <li key={district.id}>{district.name}</li>
                                ))}
                              </ul>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          "0"
                        )}
                      </TableCell>
                      <TableCell>
                        {region.groups.length > 0 ? (
                          <Tooltip>
                            <TooltipTrigger className="underline cursor-pointer">{region.groups.length}</TooltipTrigger>
                            <TooltipContent>
                              <ul className="list-disc pl-4">
                                {region.groups.map((group) => (
                                  <li key={group.id}>{group.name}</li>
                                ))}
                              </ul>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          "0"
                        )}
                      </TableCell>
                      <TableCell>
                        {region.drivers.length > 0 ? (
                          <Tooltip>
                            <TooltipTrigger className="underline cursor-pointer">
                              {region.drivers.length}
                            </TooltipTrigger>
                            <TooltipContent>
                              <ul className="list-disc pl-4">
                                {region.drivers.map((driver) => (
                                  <li key={driver.id}>{driver.fullname}</li>
                                ))}
                              </ul>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          "0"
                        )}
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
                              {region.isActive ? (
                                <ToggleLeft className="mr-2 h-4 w-4" />
                              ) : (
                                <ToggleRight className="mr-2 h-4 w-4" />
                              )}
                              {region.isActive ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem>View Districts</DropdownMenuItem>
                            <DropdownMenuItem>View Groups</DropdownMenuItem>
                            <DropdownMenuItem>View Drivers</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Delete Region</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination and Results Info */}
            {filteredRegions.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredRegions.length)} of {filteredRegions.length}{" "}
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

            {filteredRegions.length === 0 && (
              <div className="text-center py-8">
                <Search className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No regions found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
