export const templates = {
    classic: {
        heading: "text-center mb-4",
        name: "text-2xl font-serif mb-1",
        contact: "text-sm text-gray-600 mb-6",
        sectionTitle: "text-lg font-serif border-b border-gray-300 pb-1 mb-4",
        sectionContent: "mb-6",
        jobTitle: "font-bold",
        jobMeta: "text-sm text-gray-600",
        dates: "text-sm text-gray-600",
        description: "mt-2 text-sm",
        skills: "flex flex-wrap gap-2",
        skill: "text-sm bg-gray-100 px-2 py-1 rounded",
    },
    modern: {
        heading: "mb-8",
        name: "text-4xl font-bold tracking-tight mb-1",
        contact: "text-gray-600",
        sectionTitle: "text-xl font-bold tracking-tight border-b-2 border-black pb-1 mb-4 uppercase",
        sectionContent: "mb-8",
        jobTitle: "font-medium",
        jobMeta: "text-gray-600",
        dates: "text-gray-600",
        description: "mt-2",
        skills: "flex flex-wrap gap-2",
        skill: "bg-gray-100 px-3 py-1 rounded-full",
    }
} as const

export type TemplateStyle = keyof typeof templates

