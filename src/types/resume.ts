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
        summary: string
    }
    experience: Experience[]
    education: Education[]
    skills: string[]
    template: 'classic' | 'modern' | 'minimalist' | 'professional' | 'accent' | 'engineering'
}

export interface Template {
    id: 'classic' | 'modern' | 'minimalist' | 'professional' | 'accent' | 'engineering'
    name: string
    image: string
    description: string
}

