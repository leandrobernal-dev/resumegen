import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 11,
        fontFamily: "Helvetica",
    },
    header: {
        marginBottom: 20,
    },
    name: {
        fontSize: 26,
        fontFamily: "Helvetica",
        color: "#2E7D32", // Green accent color
        marginBottom: 5,
    },
    contactInfo: {
        fontSize: 10,
        color: "#666",
        marginBottom: 15,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: "Helvetica-Bold",
        color: "#2E7D32", // Green accent color
        textTransform: "capitalize",
        borderBottom: "1pt solid #2E7D32",
        paddingBottom: 4,
        marginBottom: 8,
    },
    experienceItem: {
        marginBottom: 12,
    },
    roleTitle: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
    },
    workplace: {
        fontSize: 11,
        fontStyle: "italic",
        color: "#444",
    },
    dateLocation: {
        fontSize: 10,
        color: "#666",
        marginBottom: 4,
    },
    bulletPoint: {
        fontSize: 10,
        marginBottom: 2,
        marginLeft: 15,
    },
    skillsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    skillItem: {
        fontSize: 10,
        color: "#2E7D32",
    },
    certificationItem: {
        fontSize: 10,
        marginBottom: 4,
    },
});

export default function AccentTemplate({ data }: { data: ResumeData }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.name}>
                        {data.personalInfo.fullName}
                    </Text>
                    <Text style={styles.contactInfo}>
                        {data.personalInfo.location} | {data.personalInfo.phone}{" "}
                        | {data.personalInfo.email}
                    </Text>
                </View>

                {data.personalInfo.summary && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Profile</Text>
                        <Text style={styles.bulletPoint}>
                            {data.personalInfo.summary}
                        </Text>
                    </View>
                )}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Work Experience</Text>
                    {data.experience.map((exp) => (
                        <View key={exp.id} style={styles.experienceItem}>
                            <Text style={styles.roleTitle}>{exp.position}</Text>
                            <Text style={styles.workplace}>{exp.company}</Text>
                            <Text style={styles.dateLocation}>
                                {exp.startDate} - {exp.endDate} | {exp.location}
                            </Text>
                            <Text style={styles.bulletPoint}>
                                • {exp.description}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    {data.education.map((edu) => (
                        <View key={edu.id} style={styles.experienceItem}>
                            <Text style={styles.roleTitle}>
                                {edu.degree} in {edu.fieldOfStudy}
                            </Text>
                            <Text style={styles.workplace}>{edu.school}</Text>
                            <Text style={styles.dateLocation}>
                                {edu.startDate} - {edu.endDate}
                            </Text>
                            {edu.description && (
                                <Text style={styles.bulletPoint}>
                                    • {edu.description}
                                </Text>
                            )}
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.skillsContainer}>
                        {data.skills.map((skill, index) => (
                            <Text key={index} style={styles.skillItem}>
                                • {skill}
                            </Text>
                        ))}
                    </View>
                </View>

                {/* {data.certifications && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert, index) => (
              <Text key={index} style={styles.certificationItem}>
                • {cert}
              </Text>
            ))}
          </View>
        )} */}
            </Page>
        </Document>
    );
}
