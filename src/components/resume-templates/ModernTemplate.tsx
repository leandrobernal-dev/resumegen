import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";

// Define styles
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 11,
        fontFamily: "Helvetica",
        color: "#333",
        lineHeight: 1.5,
    },
    header: {
        textAlign: "center",
        marginBottom: 20,
    },
    fullName: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 5,
    },
    subHeader: {
        fontSize: 12,
        color: "#555",
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#222",
        marginTop: 20,
        marginBottom: 10,
        borderBottom: "1px solid #ddd",
        paddingBottom: 5,
    },
    details: {
        marginBottom: 15,
    },
    detailItem: {
        marginBottom: 5,
    },
    list: {
        marginLeft: 10,
        marginBottom: 10,
    },
    listItem: {
        marginBottom: 5,
    },
    experienceSection: {
        marginBottom: 15,
    },
    experienceTitle: {
        fontWeight: "bold",
        fontSize: 12,
        marginBottom: 2,
    },
    experienceDetails: {
        fontSize: 10,
        color: "#555",
    },
    description: {
        fontSize: 10,
        marginBottom: 5,
    },
    skills: {
        marginTop: 10,
        flexWrap: "wrap",
        display: "flex",
        flexDirection: "row",
    },
    skillItem: {
        fontSize: 10,
        backgroundColor: "#f1f1f1",
        padding: "3px 5px",
        borderRadius: 3,
        margin: "3px 5px",
    },
});

// Resume PDF Component
const ModernTemplate = ({ data }: { data: ResumeData }) => (
    <Document>
        <Page style={styles.page}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.fullName}>
                    {data.personalInfo.fullName}
                </Text>
                <Text style={styles.subHeader}>
                    {data.personalInfo.location} | {data.personalInfo.phone} |{" "}
                    {data.personalInfo.email}
                </Text>
            </View>

            {/* Profile Summary Section */}
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.details}>{data.personalInfo.summary}</Text>

            {/* Skills Section */}
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skills}>
                {data.skills.map((skill, index) => (
                    <Text key={index} style={styles.skillItem}>
                        {skill}
                    </Text>
                ))}
            </View>

            {/* Experience Section */}
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp) => (
                <View key={exp.id} style={styles.experienceSection}>
                    <Text style={styles.experienceTitle}>
                        {exp.position} at {exp.company}
                    </Text>
                    <Text style={styles.experienceDetails}>
                        {exp.startDate} - {exp.endDate} | {exp.location}
                    </Text>
                    <Text style={styles.description}>{exp.description}</Text>
                </View>
            ))}

            {/* Education Section */}
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
                <View key={edu.id} style={styles.experienceSection}>
                    <Text style={styles.experienceTitle}>
                        {edu.degree} in {edu.fieldOfStudy} at {edu.school}
                    </Text>
                    <Text style={styles.experienceDetails}>
                        {edu.startDate} - {edu.endDate}
                    </Text>
                    <Text style={styles.description}>{edu.description}</Text>
                </View>
            ))}
        </Page>
    </Document>
);

export default ModernTemplate;
