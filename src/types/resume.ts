export interface Certification {
    id: string
    name: string
    issuer: string
    issueDate: string
    expiryDate?: string
    credentialId?: string
    description?: string
}

export interface Project {
    id: string
    name: string
    description: string
    startDate: string
    endDate?: string
    url?: string
    technologies: string[]
}

export interface Language {
    id: string
    name: string
    proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic'
}

export interface Experience {
    id: string
    company: string
    position: string
    location: string
    startDate: string
    endDate: string
    description: string
}

export interface Education {
    id: string
    school: string
    degree: string
    fieldOfStudy: string
    startDate: string
    endDate: string
    description: string
}

export interface ResumeData {
    personalInfo: {
        fullName: string
        email: string
        phone: string
        location: string
        website?: string
        summary: string
    }
    experience: Experience[]
    education: Education[]
    skills: string[]
    certifications: Certification[]
    projects: Project[]
    languages: Language[]
    template: 'classic' | 'modern' | 'minimalist' | 'professional' | 'accent' | 'engineering'
}

export interface Template {
    id: 'classic' | 'modern' | 'minimalist' | 'professional' | 'accent' | 'engineering'
    name: string
    image: string
    description: string
}

