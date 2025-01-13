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
                        {data.personalInfo.website && (
                            <Text style={styles.contactItem}>
                                {data.personalInfo.website}
                            </Text>
                        )}

                        <Text style={styles.sectionTitle}>Skills</Text>
                        {data.skills.length > 0 &&
                            data.skills.map((skill, index) => (
                                <Text key={index} style={styles.skillItem}>
                                    {skill}
                                </Text>
                            ))}
                    </View>

                    <View style={styles.main}>
                        {data.personalInfo.summary.length > 0 && (
                            <>
                                <Text style={styles.sectionTitle}>Profile</Text>
                                <Text style={styles.contactItem}>
                                    {data.personalInfo.summary}
                                </Text>
                            </>
                        )}

                        {data.experience.length > 0 && (
                            <>
                                <Text style={styles.sectionTitle}>
                                    Experience
                                </Text>
                                {data.experience.map((exp) => (
                                    <View
                                        key={exp.id}
                                        style={styles.experienceItem}
                                    >
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
                            </>
                        )}

                        {data.education.length > 0 && (
                            <>
                                <Text style={styles.sectionTitle}>
                                    Education
                                </Text>
                                {data.education.map((edu) => (
                                    <View
                                        key={edu.id}
                                        style={styles.experienceItem}
                                    >
                                        <Text style={styles.jobTitle}>
                                            {edu.degree} in {edu.fieldOfStudy}
                                        </Text>
                                        <Text style={styles.jobDetails}>
                                            {edu.school} | {edu.startDate} -{" "}
                                            {edu.endDate}
                                        </Text>
                                    </View>
                                ))}
                            </>
                        )}

                        {data.certifications.length > 0 && (
                            <>
                                <Text style={styles.sectionTitle}>
                                    Certifications
                                </Text>
                                {data.certifications.map((cert) => (
                                    <View
                                        key={cert.id}
                                        style={styles.experienceItem}
                                    >
                                        <Text style={styles.jobTitle}>
                                            {cert.name}
                                        </Text>
                                        <Text style={styles.jobDetails}>
                                            {cert.issuer} | {cert.issueDate}
                                            {cert.expiryDate
                                                ? ` - ${cert.expiryDate}`
                                                : ""}
                                        </Text>
                                        {cert.description && (
                                            <Text style={styles.contactItem}>
                                                {cert.description}
                                            </Text>
                                        )}
                                    </View>
                                ))}
                            </>
                        )}

                        {data.projects.length > 0 && (
                            <>
                                <Text style={styles.sectionTitle}>
                                    Projects
                                </Text>
                                {data.projects.map((proj) => (
                                    <View
                                        key={proj.id}
                                        style={styles.experienceItem}
                                    >
                                        <Text style={styles.jobTitle}>
                                            {proj.name}
                                        </Text>
                                        <Text style={styles.jobDetails}>
                                            {proj.startDate}
                                            {proj.endDate
                                                ? ` - ${proj.endDate}`
                                                : ""}
                                        </Text>
                                        <Text style={styles.contactItem}>
                                            Technologies:{" "}
                                            {proj.technologies.join(", ")}
                                        </Text>
                                        <Text style={styles.contactItem}>
                                            {proj.description}
                                        </Text>
                                        {proj.url && (
                                            <Text style={styles.contactItem}>
                                                URL: {proj.url}
                                            </Text>
                                        )}
                                    </View>
                                ))}
                            </>
                        )}

                        {data.languages.length > 0 && (
                            <>
                                <Text style={styles.sectionTitle}>
                                    Languages
                                </Text>
                                {data.languages.map((lang) => (
                                    <Text
                                        key={lang.id}
                                        style={styles.contactItem}
                                    >
                                        {lang.name} - {lang.proficiency}
                                    </Text>
                                ))}
                            </>
                        )}
                    </View>
                </View>
            </Page>
        </Document>
    );
}
