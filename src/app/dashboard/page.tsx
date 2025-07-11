"use client"

import { Car, Users, MapPin, Globe, MessageSquare, Bot, HardDrive, DollarSign, LayoutGrid } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data based on the provided Prisma schema
const dashboardData = {
  totalDrivers: 150,
  activeDrivers: 120,
  premiumDrivers: 50,
  totalPassengers: 2500,
  totalRegions: 10,
  activeRegions: 8,
  totalDistricts: 75,
  totalRides: 5000,
  activeRides: 150,
  totalRequests: 12000,
  sharedRequests: 8000,
  takenRequests: 6000,
  fakeReports: 200,
  totalUserBots: 25,
  runningUserBots: 20,
  stoppedUserBots: 3,
  errorUserBots: 2,
  totalInstances: 5,
  connectedInstances: 4,
  totalGroups: 120,
  activeGroups: 100,
  totalSubscriptions: 50,
  activeSubscriptions: 45,
  lastUpdated: new Date().toLocaleString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
}

export default function DashboardMainPage() {
  return (
    <div className="container mx-auto py-6">
      {" "}
      {/* Kontentni markazlashtirish va padding qo'shish */}
      <Card className="border-none shadow-none rounded-none bg-transparent">
        {" "}
        {/* Asosiy sarlavha kartasi */}
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Boshqaruv Paneli</CardTitle>
          <p className="text-muted-foreground">Tizimning umumiy holati va asosiy ko'rsatkichlari.</p>
          <p className="text-xs text-muted-foreground mt-2">Oxirgi yangilanish: {dashboardData.lastUpdated}</p>
        </CardHeader>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {" "}
        {/* Kartochkalar uchun grid */}
        {/* Drivers */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Haydovchilar</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalDrivers}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.activeDrivers} faol • {dashboardData.premiumDrivers} premium
            </p>
          </CardContent>
        </Card>
        {/* Passengers */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yo'lovchilar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalPassengers}</div>
            <p className="text-xs text-muted-foreground">Ro'yxatdan o'tgan jami yo'lovchilar</p>
          </CardContent>
        </Card>
        {/* Regions */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hududlar</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalRegions}</div>
            <p className="text-xs text-muted-foreground">{dashboardData.activeRegions} faol hududlar</p>
          </CardContent>
        </Card>
        {/* Districts */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tumanlar</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalDistricts}</div>
            <p className="text-xs text-muted-foreground">Jami tumanlar</p>
          </CardContent>
        </Card>
        {/* Rides */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safarlar</CardTitle>
            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalRides}</div>
            <p className="text-xs text-muted-foreground">{dashboardData.activeRides} faol safarlar</p>
          </CardContent>
        </Card>
        {/* Requests */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">So'rovlar</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalRequests}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.sharedRequests} ulashilgan • {dashboardData.takenRequests} qabul qilingan •{" "}
              {dashboardData.fakeReports} soxta
            </p>
          </CardContent>
        </Card>
        {/* User Bots */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Foydalanuvchi Botlari</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalUserBots}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.runningUserBots} ishlayapti • {dashboardData.stoppedUserBots} to'xtatilgan •{" "}
              {dashboardData.errorUserBots} xato
            </p>
          </CardContent>
        </Card>
        {/* Instances */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Instansiyalar</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalInstances}</div>
            <p className="text-xs text-muted-foreground">{dashboardData.connectedInstances} ulangan</p>
          </CardContent>
        </Card>
        {/* Groups */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Guruhlar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalGroups}</div>
            <p className="text-xs text-muted-foreground">{dashboardData.activeGroups} faol guruhlar</p>
          </CardContent>
        </Card>
        {/* Subscriptions */}
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Obunalar</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalSubscriptions}</div>
            <p className="text-xs text-muted-foreground">{dashboardData.activeSubscriptions} faol obunalar</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
