import { DirectorProfile, ManagerProfile, WorkerProfile } from '@/lib/types/profile.types'

// Sample director profiles data
export const sampleDirectors: DirectorProfile[] = [
  {
    id: '1',
    name: 'Lila Anderson',
    email: 'lila.anderson@darkful.com',
    designation: 'Director',
    joiningDate: 'Dec 7, 2024',
    platform: 'Darkful',
    role: 'Director',
    status: 'active',
    department: 'Engineering',
    teamSize: 25,
    projects: ['Project Alpha', 'Project Beta']
  },
  {
    id: '2',
    name: 'Ella Parker',
    email: 'ella.parker@darkful.com',
    designation: 'Director',
    joiningDate: 'Aug 14, 2025',
    platform: 'Darkful',
    role: 'Director',
    status: 'active',
    department: 'Marketing',
    teamSize: 18,
    projects: ['Marketing Campaign 2025']
  },
  {
    id: '3',
    name: 'Lisa Williams',
    email: 'lisa.williams@darkful.com',
    designation: 'Director',
    joiningDate: 'Jun 1, 2025',
    platform: 'Darkful',
    role: 'Director',
    status: 'active',
    department: 'Operations',
    teamSize: 32,
    projects: ['Operations Optimization', 'Process Improvement']
  },
  {
    id: '4',
    name: 'Michael Chen',
    email: 'michael.chen@darkful.com',
    designation: 'Director',
    joiningDate: 'Mar 15, 2025',
    platform: 'Darkful',
    role: 'Director',
    status: 'active',
    department: 'Finance',
    teamSize: 12,
    projects: ['Budget Planning 2026']
  },
  {
    id: '5',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@darkful.com',
    designation: 'Director',
    joiningDate: 'Jan 8, 2025',
    platform: 'Darkful',
    role: 'Director',
    status: 'active',
    department: 'Human Resources',
    teamSize: 15,
    projects: ['Talent Acquisition', 'Employee Engagement']
  }
]

// Sample manager profiles data
export const sampleManagers: ManagerProfile[] = [
  {
    id: '6',
    name: 'David Rodriguez',
    email: 'david.rodriguez@darkful.com',
    designation: 'Manager',
    joiningDate: 'Feb 20, 2025',
    platform: 'Darkful',
    role: 'Manager',
    status: 'active',
    department: 'Engineering',
    reportsTo: '1',
    teamMembers: ['11', '12', '13']
  },
  {
    id: '7',
    name: 'Emily Davis',
    email: 'emily.davis@darkful.com',
    designation: 'Manager',
    joiningDate: 'Apr 10, 2025',
    platform: 'Darkful',
    role: 'Manager',
    status: 'active',
    department: 'Marketing',
    reportsTo: '2',
    teamMembers: ['14', '15', '16']
  }
]

// Sample worker profiles data
export const sampleWorkers: WorkerProfile[] = [
  {
    id: '11',
    name: 'John Smith',
    email: 'john.smith@darkful.com',
    designation: 'Senior Developer',
    joiningDate: 'May 5, 2025',
    platform: 'Darkful',
    role: 'Worker',
    status: 'active',
    manager: '6',
    skills: ['React', 'TypeScript', 'Node.js'],
    currentProject: 'Project Alpha'
  },
  {
    id: '12',
    name: 'Jane Wilson',
    email: 'jane.wilson@darkful.com',
    designation: 'Frontend Developer',
    joiningDate: 'Jun 15, 2025',
    platform: 'Darkful',
    role: 'Worker',
    status: 'active',
    manager: '6',
    skills: ['React', 'CSS', 'JavaScript'],
    currentProject: 'Project Beta'
  }
]

// Example of how to use the DataTable with different profile types
export const getTableColumnsForProfileType = (type: 'director' | 'manager' | 'worker') => {
  const baseColumns = [
    {
      key: 'avatar' as const,
      label: 'Image',
    },
    {
      key: 'name' as const,
      label: 'Name',
      sortable: true,
    },
    {
      key: 'designation' as const,
      label: 'Designation',
      sortable: true,
    },
    {
      key: 'joiningDate' as const,
      label: 'Joining Date',
      sortable: true,
    },
    {
      key: 'platform' as const,
      label: 'Platform',
    }
  ]

  switch (type) {
    case 'director':
      return [
        ...baseColumns,
        {
          key: 'department' as const,
          label: 'Department',
          sortable: true,
        },
        {
          key: 'teamSize' as const,
          label: 'Team Size',
          sortable: true,
        }
      ]
    case 'manager':
      return [
        ...baseColumns,
        {
          key: 'department' as const,
          label: 'Department',
          sortable: true,
        }
      ]
    case 'worker':
      return [
        ...baseColumns,
        {
          key: 'currentProject' as const,
          label: 'Current Project',
          sortable: true,
        }
      ]
    default:
      return baseColumns
  }
}