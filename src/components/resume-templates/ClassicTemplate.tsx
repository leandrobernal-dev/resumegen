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
                    </Text>
                </View>

                <View>
                    <Text style={styles.sectionTitle}>
                        Professional Experience
                    </Text>
                    {data.experience.map((exp) => (
                        <View key={exp.id} style={styles.experienceItem}>
                            <Text style={styles.jobTitle}>{exp.position}</Text>
                            <Text style={styles.jobDetails}>
                                {exp.company} | {exp.startDate} - {exp.endDate}
                            </Text>
                            <Text style={styles.bulletPoint}>
                                • {exp.description}
                            </Text>
                        </View>
                    ))}
                </View>

                <View>
                    <Text style={styles.sectionTitle}>Education</Text>
                    {data.education.map((edu) => (
                        <View key={edu.id} style={styles.experienceItem}>
                            <Text style={styles.jobTitle}>
                                {edu.degree} in {edu.fieldOfStudy}
                            </Text>
                            <Text style={styles.jobDetails}>
                                {edu.school} | {edu.startDate} - {edu.endDate}
                            </Text>
                        </View>
                    ))}
                </View>

                <View>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <Text style={styles.bulletPoint}>
                        {data.skills.join(" • ")}
                    </Text>
                </View>
            </Page>
        </Document>
    );
}
