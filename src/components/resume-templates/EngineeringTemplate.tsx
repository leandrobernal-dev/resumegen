import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

const styles = StyleSheet.create({
    page: {
        padding: 45,
        fontSize: 11,
        fontFamily: "Helvetica",
        backgroundColor: "#FFFFFF",
    },
    header: {
        borderBottom: "2pt solid #2B4562",
        paddingBottom: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontFamily: "Helvetica-Bold",
        color: "#2B4562",
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 11,
        color: "#666",
        marginBottom: 4,
        textAlign: "center",
    },
    contact: {
        fontSize: 10,
        color: "#666",
        textAlign: "center",
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: "Helvetica-Bold",
        color: "#2B4562",
        backgroundColor: "#F5F5F5",
        padding: "4 8",
        marginBottom: 8,
    },
    experienceItem: {
        marginBottom: 12,
    },
    experienceHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    companyName: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
    },
    location: {
        fontSize: 10,
        color: "#666",
        textAlign: "right",
    },
    roleDate: {
        fontSize: 11,
        color: "#444",
        marginBottom: 4,
    },
    bulletPoint: {
        fontSize: 10,
        marginLeft: 15,
        marginBottom: 2,
    },
    skillsGrid: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    skillCategory: {
        width: "45%",
        marginBottom: 8,
    },
    skillTitle: {
        fontSize: 11,
        fontFamily: "Helvetica-Bold",
        marginBottom: 4,
    },
    skillItem: {
        fontSize: 10,
        marginLeft: 10,
        marginBottom: 2,
    },
    education: {
        marginBottom: 8,
    },
    degree: {
        fontSize: 11,
        fontFamily: "Helvetica-Bold",
    },
    school: {
        fontSize: 10,
        color: "#444",
    },
    gpa: {
        fontSize: 10,
        color: "#666",
    },
    certificationItem: {
        fontSize: 10,
        marginBottom: 4,
    },
    projectItem: {
        fontSize: 10,
        marginBottom: 8,
    },
    languageItem: {
        fontSize: 10,
        marginBottom: 4,
    },
    website: {
        fontSize: 10,
        color: "#2B4562",
        textAlign: "center",
        marginTop: 10,
    },
});

export default function EngineeringTemplate({ data }: { data: ResumeData }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {data.personalInfo.fullName}
                    </Text>
                    <Text style={styles.subtitle}>
                        {data.personalInfo.summary}
                    </Text>
                    <Text style={styles.contact}>
                        {data.personalInfo.location} | {data.personalInfo.phone}{" "}
                        | {data.personalInfo.email}
                    </Text>
                    {data.personalInfo.website && (
                        <Text style={styles.website}>
                            {data.personalInfo.website}
                        </Text>
                    )}
                </View>

                {data.experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Professional Experience
                        </Text>
                        {data.experience.map((exp) => (
                            <View key={exp.id} style={styles.experienceItem}>
                                <View style={styles.experienceHeader}>
                                    <Text style={styles.companyName}>
                                        {exp.company}
                                    </Text>
                                    <Text style={styles.location}>
                                        {exp.location}
                                    </Text>
                                </View>
                                <Text style={styles.roleDate}>
                                    {exp.position} | {exp.startDate} -{" "}
                                    {exp.endDate}
                                </Text>
                                <Text style={styles.bulletPoint}>
                                    • {exp.description}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {data.skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Technical Skills
                        </Text>
                        <View style={styles.skillsGrid}>
                            <View style={styles.skillCategory}>
                                <Text style={styles.skillTitle}>
                                    Programming
                                </Text>
                                {data.skills
                                    .filter(
                                        (skill) =>
                                            skill
                                                .toLowerCase()
                                                .includes("programming") ||
                                            skill
                                                .toLowerCase()
                                                .includes("development")
                                    )
                                    .map((skill, index) => (
                                        <Text
                                            key={index}
                                            style={styles.skillItem}
                                        >
                                            • {skill}
                                        </Text>
                                    ))}
                            </View>
                            <View style={styles.skillCategory}>
                                <Text style={styles.skillTitle}>
                                    Tools & Technologies
                                </Text>
                                {data.skills
                                    .filter(
                                        (skill) =>
                                            !skill
                                                .toLowerCase()
                                                .includes("programming") &&
                                            !skill
                                                .toLowerCase()
                                                .includes("development")
                                    )
                                    .map((skill, index) => (
                                        <Text
                                            key={index}
                                            style={styles.skillItem}
                                        >
                                            • {skill}
                                        </Text>
                                    ))}
                            </View>
                        </View>
                    </View>
                )}

                {data.education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {data.education.map((edu) => (
                            <View key={edu.id} style={styles.education}>
                                <Text style={styles.degree}>
                                    {edu.degree} in {edu.fieldOfStudy}
                                </Text>
                                <Text style={styles.school}>
                                    {edu.school} | {edu.startDate} -{" "}
                                    {edu.endDate}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {data.certifications.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Certifications</Text>
                        {data.certifications.map((cert, index) => (
                            <Text key={index} style={styles.certificationItem}>
                                • {cert.name} - {cert.issuer}
                            </Text>
                        ))}
                    </View>
                )}

                {data.projects.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {data.projects.map((project, index) => (
                            <Text key={index} style={styles.projectItem}>
                                • {project.name}: {project.description}
                            </Text>
                        ))}
                    </View>
                )}

                {data.languages.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Languages</Text>
                        {data.languages.map((language, index) => (
                            <Text key={index} style={styles.languageItem}>
                                • {language.name}
                            </Text>
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    );
}
