import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "@/types/resume";

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: "Helvetica",
    },
    header: {
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
    },
    contact: {
        fontSize: 10,
        color: "#666666",
        marginBottom: 3,
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#CCCCCC",
        paddingBottom: 3,
    },
    experienceItem: {
        marginBottom: 10,
    },
    jobTitle: {
        fontSize: 12,
        fontWeight: "bold",
    },
    jobDetails: {
        fontSize: 10,
        color: "#666666",
        marginBottom: 5,
    },
    description: {
        fontSize: 10,
        marginBottom: 5,
    },
    skills: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
    },
    skill: {
        fontSize: 10,
        backgroundColor: "#F3F4F6",
        padding: "4 8",
        borderRadius: 4,
    },
});

interface ResumePDFProps {
    data: ResumeData;
}

export function ResumePDF({ data }: ResumePDFProps) {
    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.name}>
                        {data.personalInfo.fullName}
                    </Text>
                    <Text style={styles.contact}>
                        {[
                            data.personalInfo.email,
                            data.personalInfo.phone,
                            data.personalInfo.location,
                        ]
                            .filter(Boolean)
                            .join(" • ")}
                    </Text>
                </View>

                {data.personalInfo.summary && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Professional Summary
                        </Text>
                        <Text style={styles.description}>
                            {data.personalInfo.summary}
                        </Text>
                    </View>
                )}

                {data.experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {data.experience.map((exp, index) => (
                            <View key={index} style={styles.experienceItem}>
                                <Text style={styles.jobTitle}>
                                    {exp.position}
                                </Text>
                                <Text style={styles.jobDetails}>
                                    {exp.company}{" "}
                                    {exp.location && `• ${exp.location}`}
                                </Text>
                                <Text style={styles.jobDetails}>
                                    {formatDate(exp.startDate)} -{" "}
                                    {exp.endDate
                                        ? formatDate(exp.endDate)
                                        : "Present"}
                                </Text>
                                {exp.description && (
                                    <Text style={styles.description}>
                                        {exp.description}
                                    </Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {data.education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {data.education.map((edu, index) => (
                            <View key={index} style={styles.experienceItem}>
                                <Text style={styles.jobTitle}>
                                    {edu.school}
                                </Text>
                                <Text style={styles.jobDetails}>
                                    {edu.degree}{" "}
                                    {edu.fieldOfStudy &&
                                        `in ${edu.fieldOfStudy}`}
                                </Text>
                                <Text style={styles.jobDetails}>
                                    {formatDate(edu.startDate)} -{" "}
                                    {edu.endDate
                                        ? formatDate(edu.endDate)
                                        : "Present"}
                                </Text>
                                {edu.description && (
                                    <Text style={styles.description}>
                                        {edu.description}
                                    </Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {data.skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        <View style={styles.skills}>
                            {data.skills.map((skill, index) => (
                                <Text key={index} style={styles.skill}>
                                    {skill}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}
            </Page>
        </Document>
    );
}
