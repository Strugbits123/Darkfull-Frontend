'use client'

import React, { useState } from 'react'
import { Search, ChevronDown, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

// Sample order data
const ordersData = [
  {
    id: '10454646',
    brand: 'Becomfy',
    platform: 'salla',
    image: '/images/products/sweater-brown.jpg',
    productName: 'Premium Wireless Headphones',
    sku: 'WH-001-BLK',
    variants: ['S', 'White'],
    status: 'Returned'
  },
  {
    id: '34567890',
    brand: 'Becomfy',
    platform: 'salla',
    image: '/images/products/tshirt-white.jpg',
    productName: 'Premium Wireless Headphones',
    sku: 'SW-042-SLV',
    variants: ['M', 'White'],
    status: 'Shipped'
  },
  {
    id: '12345678',
    brand: 'Becomfy',
    platform: 'salla',
    image: '/images/products/sweater-grey.jpg',
    productName: 'Premium Wireless Headphones',
    sku: 'CT-WHT-M',
    variants: ['L', 'White'],
    status: 'Picked'
  },
  {
    id: '78901234',
    brand: 'Becomfy',
    platform: 'salla',
    image: '/images/products/sweater-light-brown.jpg',
    productName: 'Premium Wireless Headphones',
    sku: 'LW-BRN-001',
    variants: ['XL', 'White'],
    status: 'Packed'
  },
  {
    id: '90123456',
    brand: 'Becomfy',
    platform: 'salla',
    image: '/images/products/shirt-black.jpg',
    productName: 'Wireless Phone Charger',
    sku: 'WC-15W-WHT',
    variants: ['S', 'Black'],
    status: 'New'
  },
  {
    id: '98765432',
    brand: 'Becomfy',
    platform: 'salla',
    image: '/images/products/sweater-brown.jpg',
    productName: 'Premium Wireless Headphones',
    sku: 'WH-001-BLK',
    variants: ['S', 'White'],
    status: 'Delivered'
  },
  {
    id: '23456780',
    brand: 'Becomfy',
    platform: 'salla',
    image: '/images/products/tshirt-white.jpg',
    productName: 'Smart Fitness Watch',
    sku: 'SW-042-SLV',
    variants: ['M', 'White'],
    status: 'Cancelled'
  }
]

const getStatusBadge = (status: string) => {
  const statusConfig = {
    'New': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    'Picked': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    'Packed': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    'Shipped': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    'Delivered': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    'Cancelled': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    'Returned': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
  }
  
  return (
    <Badge className={`${statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </Badge>
  )
}

export default function FulfillmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(new Set(ordersData.map(order => order.id)))
    } else {
      setSelectedOrders(new Set())
    }
  }

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    const newSelected = new Set(selectedOrders)
    if (checked) {
      newSelected.add(orderId)
    } else {
      newSelected.delete(orderId)
    }
    setSelectedOrders(newSelected)
  }

  const isAllSelected = ordersData.length > 0 && selectedOrders.size === ordersData.length
  const isIndeterminate = selectedOrders.size > 0 && selectedOrders.size < ordersData.length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Fulfillments
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          View orders to be fulfilled.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="view-orders" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="view-orders">View Orders</TabsTrigger>
          <TabsTrigger value="view-transfer">View Transfer</TabsTrigger>
        </TabsList>

        <TabsContent value="view-orders" className="space-y-4">
          {/* Search and Filter Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by SKU, Brand, or name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80 h-9"
                />
              </div>

              {/* Filter */}
              <Button variant="outline" className="flex items-center space-x-2 h-9">
                <span>Filter by SKU, or Status</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            {/* Export Button */}
            <Button className="bg-teal-600 hover:bg-teal-700 text-white h-9 w-60">
              <ArrowUp className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Orders Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-900">
                  <TableHead className="w-12 py-4">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                      className={isIndeterminate ? "data-[state=indeterminate]:bg-blue-600" : ""}
                    />
                  </TableHead>
                  <TableHead className="py-4">Order ID</TableHead>
                  <TableHead className="py-4">Brand</TableHead>
                  <TableHead className="py-4">Platform</TableHead>
                  <TableHead className="py-4">Image</TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 py-4">
                    Product Name
                    <ChevronDown className="inline h-4 w-4 ml-1" />
                  </TableHead>
                  <TableHead className="py-4">SKU</TableHead>
                  <TableHead className="py-4">Product Variants</TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 py-4">
                    Status
                    <ChevronDown className="inline h-4 w-4 ml-1" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordersData.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-900 border-b">
                    <TableCell className="py-4">
                      <Checkbox
                        checked={selectedOrders.has(order.id)}
                        onCheckedChange={(checked) => handleSelectOrder(order.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell className="font-medium py-4">{order.id}</TableCell>
                    <TableCell className="py-4">{order.brand}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">S</span>
                        </div>
                        <span className="text-sm">{order.platform}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        <img 
                          src={order.image} 
                          alt={order.productName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <span className="text-xs text-gray-500 hidden">IMG</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">{order.productName}</TableCell>
                    <TableCell className="font-mono text-sm py-4">{order.sku}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex space-x-1">
                        {order.variants.map((variant, index) => (
                          <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                            {variant}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      {getStatusBadge(order.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="view-transfer" className="space-y-4">
          <div className="text-center py-12 text-gray-500">
            View Transfer content will be implemented here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
