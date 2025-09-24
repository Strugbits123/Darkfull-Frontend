import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ProfileAvatarProps {
  src?: string
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  src,
  name,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  )
}

export default ProfileAvatar