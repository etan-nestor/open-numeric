export interface ContactFormData {
    name: string
    email: string
    subject: string
    message: string
    phone?: string
    company?: string
  }
  
  export interface ContactInfo {
    address: string
    phone: string[]
    email: string[]
    workingHours: {
      day: string
      hours: string
    }[]
    socials: {
      name: string
      icon: string
      url: string
      color: string
    }[]
  }