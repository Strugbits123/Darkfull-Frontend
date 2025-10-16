// Profile related types
export interface UserProfile {
  id: string
  name: string
  email: string
  designation: string
  joiningDate: string
  platform: string
  avatar?: string
  role: 'Director' | 'Manager' | 'Worker' | 'Admin'
  status: 'active' | 'inactive' | 'pending'
}

export interface DirectorProfile extends UserProfile {
  role: 'Director'
  department?: string
  projects?: string[]
  teamSize?: number
}

export interface ManagerProfile extends UserProfile {
  role: 'Manager'
  department?: string
  reportsTo?: string
  teamMembers?: string[]
}

export interface WorkerProfile extends UserProfile {
  role: 'Worker'
  manager?: string
  skills?: string[]
  currentProject?: string
}

// Table column definition
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

// Action button types
export interface ActionButton {
  label: string
  icon?: React.ReactNode
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  onClick: (id: string) => void
}

// Page header props
export interface PageHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
}

// Data table props
export interface DataTableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  searchPlaceholder?: string
  actions?: ActionButton[]
  onRowSelect?: (rows: T[]) => void
  loading?: boolean
}