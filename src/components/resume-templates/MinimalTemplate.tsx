import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 11,
        fontFamily: "Helvetica",
    },
    container: {
        flex: 1,
        flexDirection: "row",
    },
    sidebar: {
        width: "30%",
        backgroundColor: "#f6f6f6",
        padding: 20,
    },
    main: {
        width: "70%",
        padding: 20,
    },
    name: {
        fontSize: 24,
        fontFamily: "Helvetica-Bold",
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: "Helvetica-Bold",
        marginBottom: 10,
        marginTop: 15,
    },
    contactItem: {
        fontSize: 10,
        marginBottom: 5,
    },
    skillItem: {
        fontSize: 10,
        marginBottom: 3,
    },
    experienceItem: {
        marginBottom: 15,
    },
    jobTitle: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
    },
    jobDetails: {
        fontSize: 10,
        color: "#666",
        marginBottom: 5,
    },
});

export default function MinimalTemplate({ data }: { data: ResumeData }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                    <View style={styles.sidebar}>
                        <Text style={styles.name}>
                            {data.personalInfo.fullName}
                        </Text>

                        <Text style={styles.sectionTitle}>Contact</Text>
                        <Text style={styles.contactItem}>
                            {data.personalInfo.email}
                        </Text>
                        <Text style={styles.contactItem}>
                            {data.personalInfo.phone}
                        </Text>
                        <Text style={styles.contactItem}>
                            {data.personalInfo.location}
                        </Text>

                        <Text style={styles.sectionTitle}>Skills</Text>
                        {data.skills.map((skill, index) => (
                            <Text key={index} style={styles.skillItem}>
                                {skill}
                            </Text>
                        ))}
                    </View>

                    <View style={styles.main}>
                        <Text style={styles.sectionTitle}>Profile</Text>
                        <Text style={styles.contactItem}>
                            {data.personalInfo.summary}
                        </Text>

                        <Text style={styles.sectionTitle}>Experience</Text>
                        {data.experience.map((exp) => (
                            <View key={exp.id} style={styles.experienceItem}>
                                <Text style={styles.jobTitle}>
                                    {exp.position}
                                </Text>
                                <Text style={styles.jobDetails}>
                                    {exp.company} | {exp.startDate} -{" "}
                                    {exp.endDate}
                                </Text>
                                <Text style={styles.contactItem}>
                                    {exp.description}
                                </Text>
                            </View>
                        ))}

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
                </View>
            </Page>
        </Document>
    );
}
