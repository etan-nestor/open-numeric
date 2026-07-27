export interface DevisFormData {
    name: string
    company: string
    email: string
    phone: string
    projectType: string
    budget: string
    timeline: string
    description: string
  }
  
  export const projectTypes = [
    'Site Web Vitrine',
    'Application Web',
    'Application Mobile',
    'E-commerce',
    'Refonte de Site',
    'SEO/Marketing',
    'Design UI/UX',
    'Autre'
  ]
  
  export const budgetRanges = [
    'Moins de 500 000 FCFA',
    '500 000 - 1 000 000 FCFA',
    '1 000 000 - 2 500 000 FCFA',
    '2 500 000 - 5 000 000 FCFA',
    '5 000 000 - 10 000 000 FCFA',
    'Plus de 10 000 000 FCFA'
  ]
  
  export const timelineOptions = [
    'Moins de 1 mois',
    '1-3 mois',
    '3-6 mois',
    '6-12 mois',
    'Plus de 12 mois',
    'Non déterminé'
  ]