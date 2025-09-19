"use client"

import React, { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface PictureUploadProps {
  onUpload: (url: string) => void
  onRemove: () => void
  currentImage?: string
  placeholder?: string
  className?: string
}

export default function PictureUpload({
  onUpload,
  onRemove,
  currentImage,
  placeholder = "Please Upload Pictures",
  className = ""
}: PictureUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB')
      return
    }

    setIsUploading(true)
    
    try {
      // Convert file to data URL (in a real app, you'd upload to a server)
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        onUpload(dataUrl)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Upload failed:', error)
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200 cursor-pointer
          ${isDragging 
            ? 'border-[#8898f0] bg-[#8898f0]/10' 
            : 'border-[#e5e7eb] hover:border-[#8898f0] hover:bg-[#8898f0]/5'
          }
          ${currentImage ? 'min-h-[200px]' : 'min-h-[160px]'}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />

        {currentImage ? (
          <div className="relative">
            <Image
              src={currentImage}
              alt="Uploaded"
              className="w-full h-48 object-cover rounded-xl"
              width={400}
              height={200}
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation()
                onRemove()
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            {isUploading ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8898f0]"></div>
                <p className="text-sm text-[#9ca3af]">Uploading...</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#8898f0]/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-[#8898f0]" />
                  </div>
                </div>
                <p className="text-[#8898f0] font-medium mb-2">{placeholder}</p>
                <p className="text-sm text-[#9ca3af]">
                  Drag and drop an image here, or click to select
                </p>
                <p className="text-xs text-[#9ca3af] mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
