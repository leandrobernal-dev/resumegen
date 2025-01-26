import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

const styles = StyleSheet.create({
    page: {
        padding: 50,
        fontSize: 11,
        fontFamily: "Helvetica",
    },
    header: {
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: "Helvetica-Bold",
        color: "#1a365d",
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#4a5568",
        marginBottom: 15,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: "Helvetica-Bold",
        color: "#1a365d",
        borderBottom: "1pt solid #cbd5e0",
        paddingBottom: 5,
        marginBottom: 10,
    },
    experienceItem: {
        marginBottom: 15,
    },
    jobTitle: {
        fontSize: 13,
        fontFamily: "Helvetica-Bold",
        marginBottom: 3,
    },
    jobDetails: {
        fontSize: 11,
        color: "#4a5568",
        marginBottom: 5,
    },
    description: {
        fontSize: 11,
        lineHeight: 1.4,
    },
    skillsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
    },
    skillItem: {
        fontSize: 10,
        backgroundColor: "#f7fafc",
        padding: "3 6",
        borderRadius: 3,
    },
});

export default function ProfessionalTemplate({ data }: { data: ResumeData }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>
                        {data.personalInfo.fullName}
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        {data.personalInfo.location} | {data.personalInfo.phone}{" "}
                        | {data.personalInfo.email} |{" "}
                        {data.personalInfo.website}
                    </Text>
                    <Text style={styles.description}>
                        {data.personalInfo.summary}
                    </Text>
                </View>

                {data.experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Professional Experience
                        </Text>
                        {data.experience.map((exp) => (
                            <View key={exp.id} style={styles.experienceItem}>
                                <Text style={styles.jobTitle}>
                                    {exp.position}
                                </Text>
                                <Text style={styles.jobDetails}>
                                    {exp.company} | {exp.startDate} -{" "}
                                    {!exp.endDate ||
                                    new Date(exp.endDate).toDateString() ===
                                        new Date().toDateString()
                                        ? "Present"
                                        : exp.endDate}
                                </Text>
                                <Text style={styles.description}>
                                    {exp.description}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {data.education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {data.education.map((edu) => (
                            <View key={edu.id} style={styles.experienceItem}>
                                <Text style={styles.jobTitle}>
                                    {edu.degree} in {edu.fieldOfStudy}
                                </Text>
                                <Text style={styles.jobDetails}>
                                    {edu.school} | {edu.startDate} -{" "}
                                    {!edu.endDate ||
                                    new Date(edu.endDate).toDateString() ===
                                        new Date().toDateString()
                                        ? "Present"
                                        : edu.endDate}
                                </Text>
                                <Text style={styles.description}>
                                    {edu.description}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {data.skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        <View style={styles.skillsGrid}>
                            {data.skills.map((skill, index) => (
                                <Text key={index} style={styles.skillItem}>
                                    {skill}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}

                {data.certifications.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Certifications</Text>
                        {data.certifications.map((cert) => (
                            <View key={cert.id} style={styles.experienceItem}>
                                <Text style={styles.jobTitle}>{cert.name}</Text>
                                <Text style={styles.jobDetails}>
                                    {cert.issuer} | {cert.issueDate}
                                    {cert.expiryDate
                                        ? ` - ${cert.expiryDate}`
                                        : ""}
                                </Text>
                                {cert.description && (
                                    <Text style={styles.description}>
                                        {cert.description}
                                    </Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {data.projects.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {data.projects.map((proj) => (
                            <View key={proj.id} style={styles.experienceItem}>
                                <Text style={styles.jobTitle}>{proj.name}</Text>
                                <Text style={styles.jobDetails}>
                                    {proj.startDate} {" - "}
                                    {!proj.endDate ||
                                    new Date(proj.endDate).toDateString() ===
                                        new Date().toDateString()
                                        ? "Present"
                                        : proj.endDate}
                                </Text>
                                <Text style={styles.description}>
                                    Technologies: {proj.technologies.join(", ")}
                                </Text>
                                <Text style={styles.description}>
                                    {proj.description}
                                </Text>
                                {proj.url && (
                                    <Text style={styles.description}>
                                        URL: {proj.url}
                                    </Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {data.languages.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Languages</Text>
                        {data.languages.map((lang) => (
                            <Text key={lang.id} style={styles.description}>
                                {lang.name} - {lang.proficiency}
                            </Text>
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    );
}
