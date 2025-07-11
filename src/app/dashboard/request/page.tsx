"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, MoreHorizontal, Calendar, MessageSquare, Share2, Truck, User, Bot, Users, Car } from "lucide-react"

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
import { Switch } from "@/components/ui/switch" // Assuming shadcn/ui Switch component is available
import { Label } from "@/components/ui/label" // Assuming shadcn/ui Label component is available

// Mock Request data based on the provided Prisma schema, including nested relations
const initialRequests = [
  {
    id: "REQ-001",
    content: "Need a ride to the city center ASAP.",
    isShared: true,
    isDelivery: false,
    sharedBy: { fullname: "John Doe" },
    scrapedBy: null,
    passenger: { fullname: "Emily White" },
    group: null,
    createdAt: "2024-07-10T10:00:00Z",
  },
  {
    id: "REQ-002",
    content: "Deliver a package to 123 Main St.",
    isShared: false,
    isDelivery: true,
    sharedBy: null,
    scrapedBy: { name: "DefaultBot-Alpha" },
    passenger: null,
    group: { name: "Local Community Hub" },
    createdAt: "2024-07-10T11:30:00Z",
  },
  {
    id: "REQ-003",
    content: "Looking for a driver for a long trip.",
    isShared: true,
    isDelivery: false,
    sharedBy: { fullname: "Jane Smith" },
    scrapedBy: null,
    passenger: { fullname: "David Green" },
    group: null,
    createdAt: "2024-07-09T15:00:00Z",
  },
  {
    id: "REQ-004",
    content: "Urgent document delivery to office.",
    isShared: false,
    isDelivery: true,
    sharedBy: null,
    scrapedBy: { name: "UserBot-Beta" },
    passenger: null,
    group: { name: "Telegram Devs Chat" },
    createdAt: "2024-07-09T09:00:00Z",
  },
  {
    id: "REQ-005",
    content: "Ride to the airport tomorrow morning.",
    isShared: true,
    isDelivery: false,
    sharedBy: { fullname: "Peter Jones" },
    scrapedBy: null,
    passenger: { fullname: "Sophia Blue" },
    group: null,
    createdAt: "2024-07-08T18:00:00Z",
  },
  {
    id: "REQ-006",
    content: "Scraping new messages from group.",
    isShared: false,
    isDelivery: false,
    sharedBy: null,
    scrapedBy: { name: "DefaultBot-Gamma" },
    passenger: null,
    group: { name: "Crypto Enthusiasts" },
    createdAt: "2024-07-08T12:00:00Z",
  },
]

const ITEMS_PER_PAGE = 5
let nextRequestId = initialRequests.length + 1

export default function RequestsTable() {
  const [requests, setRequests] = useState(initialRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSharedFilter, setIsSharedFilter] = useState("all")
  const [isDeliveryFilter, setIsDeliveryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [liveUpdatesEnabled, setLiveUpdatesEnabled] = useState(false)

  const generateNewRequest = useCallback(() => {
    const newId = `REQ-${String(nextRequestId++).padStart(3, "0")}`
    const isDelivery = Math.random() > 0.5
    const isShared = Math.random() > 0.5
    const contentOptions = [
      "New ride request received!",
      "Delivery task assigned.",
      "Urgent message from a user.",
      "Group activity detected.",
      "Driver looking for a passenger.",
      "Package pickup needed.",
    ]
    const randomContent = contentOptions[Math.floor(Math.random() * contentOptions.length)]
    const randomDriver = { fullname: ["Alice Brown", "Bob White", "Charlie Green"][Math.floor(Math.random() * 3)] }
    const randomUserBot = {
      name: ["DefaultBot-Alpha", "UserBot-Beta", "DefaultBot-Gamma"][Math.floor(Math.random() * 3)],
    }
    const randomPassenger = { fullname: ["Daniel Black", "Olivia Red", "James Yellow"][Math.floor(Math.random() * 3)] }
    const randomGroup = {
      name: ["Telegram Devs Chat", "Local Community Hub", "Crypto Enthusiasts"][Math.floor(Math.random() * 3)],
    }

    return {
      id: newId,
      content: randomContent,
      isShared: isShared,
      isDelivery: isDelivery,
      sharedBy: isShared ? randomDriver : null,
      scrapedBy: !isShared ? randomUserBot : null, // If not shared, assume scraped
      passenger: isDelivery ? null : randomPassenger, // If ride, assume passenger
      group: !isDelivery ? randomGroup : null, // If not delivery, assume group
      createdAt: new Date().toISOString(),
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (liveUpdatesEnabled) {
      interval = setInterval(() => {
        setRequests((prevRequests): any => {
          const newRequest = generateNewRequest()
          // Add new request or update an existing one
          if (Math.random() > 0.7 && prevRequests.length > 0) {
            // Simulate updating an existing request
            const randomIndex = Math.floor(Math.random() * prevRequests.length)
            const updatedRequests = [...prevRequests]
            updatedRequests[randomIndex] = {
              ...updatedRequests[randomIndex],
              content: `(UPDATED) ${updatedRequests[randomIndex].content}`,
              createdAt: new Date().toISOString(), // Update timestamp to show it's fresh
            }
            return updatedRequests
          } else {
            // Add a new request
            return [newRequest, ...prevRequests].slice(0, 10) // Keep max 10 for demo
          }
        })
      }, 3000) // Update every 3 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [liveUpdatesEnabled, generateNewRequest])

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.sharedBy?.fullname && request.sharedBy.fullname.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.scrapedBy?.name && request.scrapedBy.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.passenger?.fullname && request.passenger.fullname.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.group?.name && request.group.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesIsShared =
      isSharedFilter === "all" ||
      (isSharedFilter === "yes" && request.isShared) ||
      (isSharedFilter === "no" && !request.isShared)
    const matchesIsDelivery =
      isDeliveryFilter === "all" ||
      (isDeliveryFilter === "yes" && request.isDelivery) ||
      (isDeliveryFilter === "no" && !request.isDelivery)

    return matchesSearch && matchesIsShared && matchesIsDelivery
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedRequests = filteredRequests.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
    if (filterType === "isShared") setIsSharedFilter(value)
    if (filterType === "isDelivery") setIsDeliveryFilter(value)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-none shadow-none border-none">
        <CardHeader>
          <CardTitle>Request Management</CardTitle>
          <CardDescription>View and manage all ride and delivery requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="relative flex-1 max-w-sm min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={isSharedFilter} onValueChange={(value) => handleFilterChange("isShared", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by shared status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Shared Status</SelectItem>
                <SelectItem value="yes">Shared</SelectItem>
                <SelectItem value="no">Not Shared</SelectItem>
              </SelectContent>
            </Select>
            <Select value={isDeliveryFilter} onValueChange={(value) => handleFilterChange("isDelivery", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by delivery type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="yes">Delivery</SelectItem>
                <SelectItem value="no">Ride</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2 ml-auto">
              <Switch id="live-updates" checked={liveUpdatesEnabled} onCheckedChange={setLiveUpdatesEnabled} />
              <Label htmlFor="live-updates">Live Updates</Label>
            </div>
          </div>

          {/* Requests Table */}
          <div className="rounded-xs border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Shared By</TableHead>
                  <TableHead>Scraped By</TableHead>
                  <TableHead>Passenger</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageSquare className="h-3 w-3" />
                        {request.content}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        {request.isDelivery ? <Truck className="h-3 w-3" /> : <Car className="h-3 w-3" />}
                        {request.isDelivery ? "Delivery" : "Ride"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {request.sharedBy ? (
                        <div className="flex items-center gap-1 text-sm">
                          <User className="h-3 w-3 text-muted-foreground" />
                          {request.sharedBy.fullname}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {request.scrapedBy ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Bot className="h-3 w-3 text-muted-foreground" />
                          {request.scrapedBy.name}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {request.passenger ? (
                        <div className="flex items-center gap-1 text-sm">
                          <User className="h-3 w-3 text-muted-foreground" />
                          {request.passenger.fullname}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {request.group ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          {request.group.name}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(request.createdAt).toLocaleDateString()}
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
                            <Share2 className="mr-2 h-4 w-4" />
                            Toggle Shared Status
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            Toggle Delivery Type
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
          {filteredRequests.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredRequests.length)} of {filteredRequests.length}{" "}
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

          {filteredRequests.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No requests found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
