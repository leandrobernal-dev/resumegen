import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

const styles = StyleSheet.create({
    page: {
        padding: 50,
        fontSize: 11,
        fontFamily: "Times-Roman",
        color: "#333",
    },
    header: {
        borderBottom: "2pt solid #232323",
        paddingBottom: 10,
        marginBottom: 20,
    },
    fullName: {
        fontSize: 24,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    contactInfo: {
        fontSize: 10,
        color: "#666",
        marginTop: 5,
        textAlign: "center",
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: "Times-Bold",
        marginTop: 20,
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    experienceItem: {
        marginBottom: 15,
    },
    jobTitle: {
        fontSize: 12,
        fontFamily: "Times-Bold",
    },
    jobDetails: {
        fontSize: 10,
        color: "#666",
        marginBottom: 5,
    },
    bulletPoint: {
        marginLeft: 15,
        fontSize: 10,
        marginBottom: 3,
    },
});

export default function ClassicTemplate({ data }: { data: ResumeData }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.fullName}>
                        {data.personalInfo.fullName}
                    </Text>
                    <Text style={styles.contactInfo}>
                        {data.personalInfo.location} | {data.personalInfo.phone}{" "}
                        | {data.personalInfo.email}
                        {data.personalInfo.website
                            ? ` | ${data.personalInfo.website}`
                            : ""}
                    </Text>
                </View>

                {/* Professional Experience Section */}
                {data.experience.length > 0 && (
                    <View>
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
                                    {exp.endDate}
                                </Text>
                                <Text style={styles.bulletPoint}>
                                    • {exp.description}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Education Section */}
                {data.education.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {data.education.map((edu) => (
                            <View key={edu.id} style={styles.experienceItem}>
                                <Text style={styles.jobTitle}>
                                    {edu.degree} in {edu.fieldOfStudy}
                                </Text>
                                <Text style={styles.jobDetails}>
                                    {edu.school} | {edu.startDate} -{" "}
                                    {edu.endDate}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills Section */}
                {data.skills.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        <Text style={styles.bulletPoint}>
                            {data.skills.join(", ")}
                        </Text>
                    </View>
                )}

                {/* Certifications Section */}
                {data.certifications.length > 0 && (
                    <View>
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
                                {cert.credentialId && (
                                    <Text style={styles.bulletPoint}>
                                        Credential ID: {cert.credentialId}
                                    </Text>
                                )}
                                {cert.description && (
                                    <Text style={styles.bulletPoint}>
                                        {cert.description}
                                    </Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Projects Section */}
                {data.projects.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {data.projects.map((proj) => (
                            <View key={proj.id} style={styles.experienceItem}>
                                <Text style={styles.jobTitle}>{proj.name}</Text>
                                <Text style={styles.jobDetails}>
                                    {proj.startDate}
                                    {proj.endDate ? ` - ${proj.endDate}` : ""}
                                </Text>
                                <Text style={styles.bulletPoint}>
                                    Technologies: {proj.technologies.join(", ")}
                                </Text>
                                <Text style={styles.bulletPoint}>
                                    {proj.description}
                                </Text>
                                {proj.url && (
                                    <Text style={styles.bulletPoint}>
                                        URL: {proj.url}
                                    </Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Languages Section */}
                {data.languages.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Languages</Text>
                        {data.languages.map((lang) => (
                            <Text key={lang.id} style={styles.bulletPoint}>
                                {lang.name} - {lang.proficiency}
                            </Text>
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    );
}
