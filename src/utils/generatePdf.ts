import jsPDF from 'jspdf'
import type { ResumeData } from '../types/resume'

// export function generatePDF(data: ResumeData): jsPDF {
//     const pdf = new jsPDF()

//     // Set up dimensions
//     const margin = 20
//     const pageWidth = pdf.internal.pageSize.width
//     const contentWidth = pageWidth - (margin * 2)

//     if (data.template === 'classic') {
//         return generateClassicTemplate(data, pdf)
//     } else {
//         return generateModernTemplate(data, pdf)
//     }
// }
export function generatePDF(data: ResumeData): jsPDF {
    const pdf = new jsPDF()

    switch (data.template) {
        case 'classic':
            return generateClassicTemplate(data, pdf)
        case 'modern':
            return generateModernTemplate(data, pdf)
        case 'minimalist':
            return generateMinimalistTemplate(data, pdf)
        case 'professional':
            return generateProfessionalTemplate(data, pdf)
        case 'accent':
            return generateAccentTemplate(data, pdf)
        case 'engineering':
            return generateEngineeringTemplate(data, pdf)
        default:
            return generateClassicTemplate(data, pdf)
    }
}

function generateClassicTemplate(data: ResumeData, pdf: jsPDF) {
    let yPos = 20
    const margin = 20
    const pageWidth = pdf.internal.pageSize.width
    const contentWidth = pageWidth - (margin * 2)

    // Helper function to add text and update position
    const addText = (text: string, size = 12, isBold = false, align: 'left' | 'center' = 'left') => {
        if (!text) return

        if (isBold) {
            pdf.setFont('times', 'bold')
        } else {
            pdf.setFont('times', 'normal')
        }
        pdf.setFontSize(size)

        if (yPos > 280) {
            pdf.addPage()
            yPos = 20
        }

        if (align === 'center') {
            pdf.text(text, pageWidth / 2, yPos, { align: 'center' })
        } else {
            pdf.text(text, margin, yPos)
        }
        yPos += size / 2 + 4
    }

    const addLineBreak = (space = 5) => {
        yPos += space
    }

    const addLine = () => {
        pdf.setDrawColor(0, 0, 0)
        pdf.line(margin, yPos, pageWidth - margin, yPos)
        yPos += 5
    }

    const addWrappedText = (text: string, size = 10) => {
        if (!text) return

        pdf.setFontSize(size)
        const lines = pdf.splitTextToSize(text, contentWidth)
        lines.forEach((line: string) => {
            if (yPos > 280) {
                pdf.addPage()
                yPos = 20
            }
            pdf.text(line, margin, yPos)
            yPos += size / 2 + 2
        })
        yPos += 2
    }

    // Personal Information (Classic Style)
    addText(data.personalInfo.fullName, 18, true, 'center')
    if (data.personalInfo.email || data.personalInfo.phone || data.personalInfo.location) {
        const contactInfo = [
            data.personalInfo.email,
            data.personalInfo.phone,
            data.personalInfo.location
        ].filter(Boolean).join(' • ')
        addText(contactInfo, 10, false, 'center')
    }
    addLineBreak()

    // Profile Section
    if (data.personalInfo.summary) {
        addText('PROFILE', 12, true)
        addLine()
        addWrappedText(data.personalInfo.summary)
        addLineBreak(10)
    }

    // Experience Section
    if (data.experience.length > 0) {
        addText('EMPLOYMENT HISTORY', 12, true)
        addLine()
        data.experience.forEach((exp, index) => {
            addText(exp.position, 11, true)
            pdf.setFont('times', 'italic')
            addText(`${exp.company} ${exp.location ? `• ${exp.location}` : ''}`, 10)
            const dateText = `${exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : ''} - ${exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : 'Present'}`
            addText(dateText, 10)
            if (exp.description) {
                addWrappedText(exp.description)
            }
            if (index < data.experience.length - 1) {
                addLineBreak(8)
            }
        })
        addLineBreak(10)
    }

    // Education Section
    if (data.education.length > 0) {
        addText('EDUCATION', 12, true)
        addLine()
        data.education.forEach((edu, index) => {
            addText(edu.school, 11, true)
            pdf.setFont('times', 'italic')
            addText(`${edu.degree} ${edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}`, 10)
            const dateText = `${edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : ''} - ${edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : 'Present'}`
            addText(dateText, 10)
            if (edu.description) {
                addWrappedText(edu.description)
            }
            if (index < data.education.length - 1) {
                addLineBreak(8)
            }
        })
        addLineBreak(10)
    }

    // Skills Section
    if (data.skills.length > 0) {
        addText('SKILLS', 12, true)
        addLine()
        addWrappedText(data.skills.join(' • '))
    }

    return pdf
}

function generateModernTemplate(data: ResumeData, pdf: jsPDF) {
    let yPos = 20
    const margin = 20
    const pageWidth = pdf.internal.pageSize.width
    const contentWidth = pageWidth - (margin * 2)
    const sidebarWidth = 65
    const mainContentMargin = sidebarWidth + margin + 10

    // Helper functions
    const addText = (text: string, size = 12, isBold = false, x = margin) => {
        if (!text) return

        if (isBold) {
            pdf.setFont('helvetica', 'bold')
        } else {
            pdf.setFont('helvetica', 'normal')
        }
        pdf.setFontSize(size)

        if (yPos > 280) {
            pdf.addPage()
            yPos = 20
        }

        pdf.text(text, x, yPos)
        yPos += size / 2 + 4
    }

    const addLineBreak = (space = 5) => {
        yPos += space
    }

    const addWrappedText = (text: string, size = 10, x = margin, maxWidth = contentWidth) => {
        if (!text) return

        pdf.setFontSize(size)
        const lines = pdf.splitTextToSize(text, maxWidth)
        lines.forEach((line: string) => {
            if (yPos > 280) {
                pdf.addPage()
                yPos = 20
            }
            pdf.text(line, x, yPos)
            yPos += size / 2 + 2
        })
        yPos += 2
    }

    // Draw sidebar background
    pdf.setFillColor(249, 249, 249)
    pdf.rect(0, 0, sidebarWidth, pdf.internal.pageSize.height, 'F')

    // Reset Y position
    yPos = 20

    // Name (large, bold, main content area)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(24)
    pdf.text(data.personalInfo.fullName, mainContentMargin, yPos)
    yPos += 16

    // Details in sidebar
    const initialYPos = yPos
    yPos = 50 // Reset for sidebar content

    // Contact Details in sidebar
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(14)
    pdf.text('DETAILS', margin, yPos)
    yPos += 10

    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(10)
    if (data.personalInfo.location) {
        pdf.text('ADDRESS', margin, yPos)
        yPos += 5
        addWrappedText(data.personalInfo.location, 9, margin, sidebarWidth - 10)
    }

    if (data.personalInfo.phone) {
        yPos += 5
        pdf.text('PHONE', margin, yPos)
        yPos += 5
        pdf.text(data.personalInfo.phone, margin, yPos)
        yPos += 10
    }

    if (data.personalInfo.email) {
        yPos += 5
        pdf.text('EMAIL', margin, yPos)
        yPos += 5
        addWrappedText(data.personalInfo.email, 9, margin, sidebarWidth - 10)
    }

    // Skills in sidebar
    if (data.skills.length > 0) {
        yPos += 15
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(14)
        pdf.text('SKILLS', margin, yPos)
        yPos += 10

        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(10)
        data.skills.forEach((skill) => {
            if (yPos > 280) {
                pdf.addPage()
                yPos = 20
            }
            pdf.text(skill, margin, yPos)
            yPos += 5
        })
    }

    // Reset Y position for main content
    yPos = initialYPos

    // Profile section
    if (data.personalInfo.summary) {
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(16)
        pdf.text('PROFILE', mainContentMargin, yPos)
        yPos += 10

        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(10)
        addWrappedText(data.personalInfo.summary, 10, mainContentMargin, pageWidth - mainContentMargin - margin)
        yPos += 10
    }

    // Employment History
    if (data.experience.length > 0) {
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(16)
        pdf.text('EMPLOYMENT HISTORY', mainContentMargin, yPos)
        yPos += 10

        data.experience.forEach((exp) => {
            pdf.setFont('helvetica', 'bold')
            pdf.setFontSize(12)
            pdf.text(exp.position, mainContentMargin, yPos)
            yPos += 6

            pdf.setFont('helvetica', 'normal')
            pdf.setFontSize(10)
            pdf.text(`${exp.company} ${exp.location ? `• ${exp.location}` : ''}`, mainContentMargin, yPos)
            yPos += 5

            const dateText = `${exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : ''} - ${exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : 'Present'}`
            pdf.text(dateText, mainContentMargin, yPos)
            yPos += 8

            if (exp.description) {
                addWrappedText(exp.description, 10, mainContentMargin, pageWidth - mainContentMargin - margin)
            }
            yPos += 10
        })
    }

    // Education
    if (data.education.length > 0) {
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(16)
        pdf.text('EDUCATION', mainContentMargin, yPos)
        yPos += 10

        data.education.forEach((edu) => {
            pdf.setFont('helvetica', 'bold')
            pdf.setFontSize(12)
            pdf.text(edu.school, mainContentMargin, yPos)
            yPos += 6

            pdf.setFont('helvetica', 'normal')
            pdf.setFontSize(10)
            pdf.text(`${edu.degree} ${edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}`, mainContentMargin, yPos)
            yPos += 5

            const dateText = `${edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : ''} - ${edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : 'Present'}`
            pdf.text(dateText, mainContentMargin, yPos)
            yPos += 8

            if (edu.description) {
                addWrappedText(edu.description, 10, mainContentMargin, pageWidth - mainContentMargin - margin)
            }
            yPos += 10
        })
    }

    return pdf
}

function generateMinimalistTemplate(data: ResumeData, pdf: jsPDF) {

    let yPos = 20
    const margin = 20
    const pageWidth = pdf.internal.pageSize.width
    const contentWidth = pageWidth - (margin * 2)

    // Helper function to add text and update position
    const addText = (text: string, size = 12, isBold = false, align: 'left' | 'center' = 'left') => {
        if (!text) return

        if (isBold) {
            pdf.setFont('times', 'bold')
        } else {
            pdf.setFont('times', 'normal')
        }
        pdf.setFontSize(size)

        if (yPos > 280) {
            pdf.addPage()
            yPos = 20
        }

        if (align === 'center') {
            pdf.text(text, pageWidth / 2, yPos, { align: 'center' })
        } else {
            pdf.text(text, margin, yPos)
        }
        yPos += size / 2 + 4
    }

    const addLineBreak = (space = 5) => {
        yPos += space
    }

    const addLine = () => {
        pdf.setDrawColor(0, 0, 0)
        pdf.line(margin, yPos, pageWidth - margin, yPos)
        yPos += 5
    }

    const addWrappedText = (text: string, size = 10) => {
        if (!text) return

        pdf.setFontSize(size)
        const lines = pdf.splitTextToSize(text, contentWidth)
        lines.forEach((line: string) => {
            if (yPos > 280) {
                pdf.addPage()
                yPos = 20
            }
            pdf.text(line, margin, yPos)
            yPos += size / 2 + 2
        })
        yPos += 2
    }

    // Personal Information (Classic Style)
    addText(data.personalInfo.fullName, 18, true, 'center')
    if (data.personalInfo.email || data.personalInfo.phone || data.personalInfo.location) {
        const contactInfo = [
            data.personalInfo.email,
            data.personalInfo.phone,
            data.personalInfo.location
        ].filter(Boolean).join(' • ')
        addText(contactInfo, 10, false, 'center')
    }
    addLineBreak()

    // Profile Section
    if (data.personalInfo.summary) {
        addText('PROFILE', 12, true)
        addLine()
        addWrappedText(data.personalInfo.summary)
        addLineBreak(10)
    }

    // Experience Section
    if (data.experience.length > 0) {
        addText('EMPLOYMENT HISTORY', 12, true)
        addLine()
        data.experience.forEach((exp, index) => {
            addText(exp.position, 11, true)
            pdf.setFont('times', 'italic')
            addText(`${exp.company} ${exp.location ? `• ${exp.location}` : ''}`, 10)
            const dateText = `${exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : ''} - ${exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : 'Present'}`
            addText(dateText, 10)
            if (exp.description) {
                addWrappedText(exp.description)
            }
            if (index < data.experience.length - 1) {
                addLineBreak(8)
            }
        })
        addLineBreak(10)
    }

    // Education Section
    if (data.education.length > 0) {
        addText('EDUCATION', 12, true)
        addLine()
        data.education.forEach((edu, index) => {
            addText(edu.school, 11, true)
            pdf.setFont('times', 'italic')
            addText(`${edu.degree} ${edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}`, 10)
            const dateText = `${edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : ''} - ${edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : 'Present'}`
            addText(dateText, 10)
            if (edu.description) {
                addWrappedText(edu.description)
            }
            if (index < data.education.length - 1) {
                addLineBreak(8)
            }
        })
        addLineBreak(10)
    }

    // Skills Section
    if (data.skills.length > 0) {
        addText('SKILLS', 12, true)
        addLine()
        addWrappedText(data.skills.join(' • '))
    }

    return pdf

}

function generateProfessionalTemplate(data: ResumeData, pdf: jsPDF) {

    let yPos = 20
    const margin = 20
    const pageWidth = pdf.internal.pageSize.width
    const contentWidth = pageWidth - (margin * 2)

    // Helper function to add text and update position
    const addText = (text: string, size = 12, isBold = false, align: 'left' | 'center' = 'left') => {
        if (!text) return

        if (isBold) {
            pdf.setFont('times', 'bold')
        } else {
            pdf.setFont('times', 'normal')
        }
        pdf.setFontSize(size)

        if (yPos > 280) {
            pdf.addPage()
            yPos = 20
        }

        if (align === 'center') {
            pdf.text(text, pageWidth / 2, yPos, { align: 'center' })
        } else {
            pdf.text(text, margin, yPos)
        }
        yPos += size / 2 + 4
    }

    const addLineBreak = (space = 5) => {
        yPos += space
    }

    const addLine = () => {
        pdf.setDrawColor(0, 0, 0)
        pdf.line(margin, yPos, pageWidth - margin, yPos)
        yPos += 5
    }

    const addWrappedText = (text: string, size = 10) => {
        if (!text) return

        pdf.setFontSize(size)
        const lines = pdf.splitTextToSize(text, contentWidth)
        lines.forEach((line: string) => {
            if (yPos > 280) {
                pdf.addPage()
                yPos = 20
            }
            pdf.text(line, margin, yPos)
            yPos += size / 2 + 2
        })
        yPos += 2
    }

    // Personal Information (Classic Style)
    addText(data.personalInfo.fullName, 18, true, 'center')
    if (data.personalInfo.email || data.personalInfo.phone || data.personalInfo.location) {
        const contactInfo = [
            data.personalInfo.email,
            data.personalInfo.phone,
            data.personalInfo.location
        ].filter(Boolean).join(' • ')
        addText(contactInfo, 10, false, 'center')
    }
    addLineBreak()

    // Profile Section
    if (data.personalInfo.summary) {
        addText('PROFILE', 12, true)
        addLine()
        addWrappedText(data.personalInfo.summary)
        addLineBreak(10)
    }

    // Experience Section
    if (data.experience.length > 0) {
        addText('EMPLOYMENT HISTORY', 12, true)
        addLine()
        data.experience.forEach((exp, index) => {
            addText(exp.position, 11, true)
            pdf.setFont('times', 'italic')
            addText(`${exp.company} ${exp.location ? `• ${exp.location}` : ''}`, 10)
            const dateText = `${exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : ''} - ${exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : 'Present'}`
            addText(dateText, 10)
            if (exp.description) {
                addWrappedText(exp.description)
            }
            if (index < data.experience.length - 1) {
                addLineBreak(8)
            }
        })
        addLineBreak(10)
    }

    // Education Section
    if (data.education.length > 0) {
        addText('EDUCATION', 12, true)
        addLine()
        data.education.forEach((edu, index) => {
            addText(edu.school, 11, true)
            pdf.setFont('times', 'italic')
            addText(`${edu.degree} ${edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}`, 10)
            const dateText = `${edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : ''} - ${edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : 'Present'}`
            addText(dateText, 10)
            if (edu.description) {
                addWrappedText(edu.description)
            }
            if (index < data.education.length - 1) {
                addLineBreak(8)
            }
        })
        addLineBreak(10)
    }

    // Skills Section
    if (data.skills.length > 0) {
        addText('SKILLS', 12, true)
        addLine()
        addWrappedText(data.skills.join(' • '))
    }

    return pdf

}

function generateAccentTemplate(data: ResumeData, pdf: jsPDF) {

    let yPos = 20
    const margin = 20
    const pageWidth = pdf.internal.pageSize.width
    const contentWidth = pageWidth - (margin * 2)

    // Helper function to add text and update position
    const addText = (text: string, size = 12, isBold = false, align: 'left' | 'center' = 'left') => {
        if (!text) return

        if (isBold) {
            pdf.setFont('times', 'bold')
        } else {
            pdf.setFont('times', 'normal')
        }
        pdf.setFontSize(size)

        if (yPos > 280) {
            pdf.addPage()
            yPos = 20
        }

        if (align === 'center') {
            pdf.text(text, pageWidth / 2, yPos, { align: 'center' })
        } else {
            pdf.text(text, margin, yPos)
        }
        yPos += size / 2 + 4
    }

    const addLineBreak = (space = 5) => {
        yPos += space
    }

    const addLine = () => {
        pdf.setDrawColor(0, 0, 0)
        pdf.line(margin, yPos, pageWidth - margin, yPos)
        yPos += 5
    }

    const addWrappedText = (text: string, size = 10) => {
        if (!text) return

        pdf.setFontSize(size)
        const lines = pdf.splitTextToSize(text, contentWidth)
        lines.forEach((line: string) => {
            if (yPos > 280) {
                pdf.addPage()
                yPos = 20
            }
            pdf.text(line, margin, yPos)
            yPos += size / 2 + 2
        })
        yPos += 2
    }

    // Personal Information (Classic Style)
    addText(data.personalInfo.fullName, 18, true, 'center')
    if (data.personalInfo.email || data.personalInfo.phone || data.personalInfo.location) {
        const contactInfo = [
            data.personalInfo.email,
            data.personalInfo.phone,
            data.personalInfo.location
        ].filter(Boolean).join(' • ')
        addText(contactInfo, 10, false, 'center')
    }
    addLineBreak()

    // Profile Section
    if (data.personalInfo.summary) {
        addText('PROFILE', 12, true)
        addLine()
        addWrappedText(data.personalInfo.summary)
        addLineBreak(10)
    }

    // Experience Section
    if (data.experience.length > 0) {
        addText('EMPLOYMENT HISTORY', 12, true)
        addLine()
        data.experience.forEach((exp, index) => {
            addText(exp.position, 11, true)
            pdf.setFont('times', 'italic')
            addText(`${exp.company} ${exp.location ? `• ${exp.location}` : ''}`, 10)
            const dateText = `${exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : ''} - ${exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : 'Present'}`
            addText(dateText, 10)
            if (exp.description) {
                addWrappedText(exp.description)
            }
            if (index < data.experience.length - 1) {
                addLineBreak(8)
            }
        })
        addLineBreak(10)
    }

    // Education Section
    if (data.education.length > 0) {
        addText('EDUCATION', 12, true)
        addLine()
        data.education.forEach((edu, index) => {
            addText(edu.school, 11, true)
            pdf.setFont('times', 'italic')
            addText(`${edu.degree} ${edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}`, 10)
            const dateText = `${edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : ''} - ${edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : 'Present'}`
            addText(dateText, 10)
            if (edu.description) {
                addWrappedText(edu.description)
            }
            if (index < data.education.length - 1) {
                addLineBreak(8)
            }
        })
        addLineBreak(10)
    }

    // Skills Section
    if (data.skills.length > 0) {
        addText('SKILLS', 12, true)
        addLine()
        addWrappedText(data.skills.join(' • '))
    }

    return pdf

}

function generateEngineeringTemplate(data: ResumeData, pdf: jsPDF) {

    let yPos = 20
    const margin = 20
    const pageWidth = pdf.internal.pageSize.width
    const contentWidth = pageWidth - (margin * 2)

    // Helper function to add text and update position
    const addText = (text: string, size = 12, isBold = false, align: 'left' | 'center' = 'left') => {
        if (!text) return

        if (isBold) {
            pdf.setFont('times', 'bold')
        } else {
            pdf.setFont('times', 'normal')
        }
        pdf.setFontSize(size)

        if (yPos > 280) {
            pdf.addPage()
            yPos = 20
        }

        if (align === 'center') {
            pdf.text(text, pageWidth / 2, yPos, { align: 'center' })
        } else {
            pdf.text(text, margin, yPos)
        }
        yPos += size / 2 + 4
    }

    const addLineBreak = (space = 5) => {
        yPos += space
    }

    const addLine = () => {
        pdf.setDrawColor(0, 0, 0)
        pdf.line(margin, yPos, pageWidth - margin, yPos)
        yPos += 5
    }

    const addWrappedText = (text: string, size = 10) => {
        if (!text) return

        pdf.setFontSize(size)
        const lines = pdf.splitTextToSize(text, contentWidth)
        lines.forEach((line: string) => {
            if (yPos > 280) {
                pdf.addPage()
                yPos = 20
            }
            pdf.text(line, margin, yPos)
            yPos += size / 2 + 2
        })
        yPos += 2
    }

    // Personal Information (Classic Style)
    addText(data.personalInfo.fullName, 18, true, 'center')
    if (data.personalInfo.email || data.personalInfo.phone || data.personalInfo.location) {
        const contactInfo = [
            data.personalInfo.email,
            data.personalInfo.phone,
            data.personalInfo.location
        ].filter(Boolean).join(' • ')
        addText(contactInfo, 10, false, 'center')
    }
    addLineBreak()

    // Profile Section
    if (data.personalInfo.summary) {
        addText('PROFILE', 12, true)
        addLine()
        addWrappedText(data.personalInfo.summary)
        addLineBreak(10)
    }

    // Experience Section
    if (data.experience.length > 0) {
        addText('EMPLOYMENT HISTORY', 12, true)
        addLine()
        data.experience.forEach((exp, index) => {
            addText(exp.position, 11, true)
            pdf.setFont('times', 'italic')
            addText(`${exp.company} ${exp.location ? `• ${exp.location}` : ''}`, 10)
            const dateText = `${exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : ''} - ${exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : 'Present'}`
            addText(dateText, 10)
            if (exp.description) {
                addWrappedText(exp.description)
            }
            if (index < data.experience.length - 1) {
                addLineBreak(8)
            }
        })
        addLineBreak(10)
    }

    // Education Section
    if (data.education.length > 0) {
        addText('EDUCATION', 12, true)
        addLine()
        data.education.forEach((edu, index) => {
            addText(edu.school, 11, true)
            pdf.setFont('times', 'italic')
            addText(`${edu.degree} ${edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}`, 10)
            const dateText = `${edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : ''} - ${edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }) : 'Present'}`
            addText(dateText, 10)
            if (edu.description) {
                addWrappedText(edu.description)
            }
            if (index < data.education.length - 1) {
                addLineBreak(8)
            }
        })
        addLineBreak(10)
    }

    // Skills Section
    if (data.skills.length > 0) {
        addText('SKILLS', 12, true)
        addLine()
        addWrappedText(data.skills.join(' • '))
    }

    return pdf

}
