"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2, Download } from "lucide-react";
import type { ResumeData, Experience, Education } from "@/types/resume";
import { DownloadDialog } from "@/components/download-dialog";

import { generateId } from "@/utils/generateId";
import { TemplateSelector } from "@/components/template-selector";
import { PDFPreview } from "@/components/preview";

export default function ResumeGenerator() {
    const [resumeData, setResumeData] = useState<ResumeData>({
        personalInfo: {
            fullName: "John Doe",
            email: "john.doe@example.com",
            phone: "(123) 456-7890",
            location: "New York, NY",
            summary: "Experienced professional with a track record of...",
        },
        experience: [],
        education: [],
        skills: [],
        template: "classic",
    });

    const [showDownLoadDialog, setShowDownloadDialog] = useState(false);

    const addExperience = () => {
        setResumeData({
            ...resumeData,
            experience: [
                ...resumeData.experience,
                {
                    id: generateId(),
                    company: "",
                    position: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                },
            ],
        });
    };

    const addEducation = () => {
        setResumeData({
            ...resumeData,
            education: [
                ...resumeData.education,
                {
                    id: generateId(),
                    school: "",
                    degree: "",
                    fieldOfStudy: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                },
            ],
        });
    };

    const updatePersonalInfo = (field: string, value: string) => {
        setResumeData({
            ...resumeData,
            personalInfo: {
                ...resumeData.personalInfo,
                [field]: value,
            },
        });
    };

    const updateExperience = (
        id: string,
        field: keyof Omit<Experience, "id">,
        value: string
    ) => {
        setResumeData({
            ...resumeData,
            experience: resumeData.experience.map((exp) =>
                exp.id === id ? { ...exp, [field]: value } : exp
            ),
        });
    };

    const updateEducation = (
        id: string,
        field: keyof Omit<Education, "id">,
        value: string
    ) => {
        setResumeData({
            ...resumeData,
            education: resumeData.education.map((edu) =>
                edu.id === id ? { ...edu, [field]: value } : edu
            ),
        });
    };

    const updateSkills = (value: string) => {
        setResumeData({
            ...resumeData,
            skills: value.split(",").map((skill) => skill.trim()),
        });
    };

    const removeExperience = (id: string) => {
        setResumeData({
            ...resumeData,
            experience: resumeData.experience.filter((exp) => exp.id !== id),
        });
    };

    const removeEducation = (id: string) => {
        setResumeData({
            ...resumeData,
            education: resumeData.education.filter((edu) => edu.id !== id),
        });
    };

    return (
        <div className="container mx-auto p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Resume Generator</h1>
                    <TemplateSelector
                        selectedTemplate={resumeData.template}
                        onSelect={(template) =>
                            setResumeData({ ...resumeData, template })
                        }
                    />
                </div>
                <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="personal">Personal</TabsTrigger>
                        <TabsTrigger value="experience">Experience</TabsTrigger>
                        <TabsTrigger value="education">Education</TabsTrigger>
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                    </TabsList>
                    <TabsContent value="personal" className="space-y-4">
                        <Card>
                            <CardContent className="pt-6 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input
                                        id="fullName"
                                        value={resumeData.personalInfo.fullName}
                                        onChange={(e) =>
                                            updatePersonalInfo(
                                                "fullName",
                                                e.target.value
                                            )
                                        }
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={resumeData.personalInfo.email}
                                        onChange={(e) =>
                                            updatePersonalInfo(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        placeholder="john.doe@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        value={resumeData.personalInfo.phone}
                                        onChange={(e) =>
                                            updatePersonalInfo(
                                                "phone",
                                                e.target.value
                                            )
                                        }
                                        placeholder="(123) 456-7890"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={resumeData.personalInfo.location}
                                        onChange={(e) =>
                                            updatePersonalInfo(
                                                "location",
                                                e.target.value
                                            )
                                        }
                                        placeholder="New York, NY"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="summary">
                                        Professional Summary
                                    </Label>
                                    <Textarea
                                        id="summary"
                                        value={resumeData.personalInfo.summary}
                                        onChange={(e) =>
                                            updatePersonalInfo(
                                                "summary",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Experienced professional with a track record of..."
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="experience" className="space-y-4">
                        {resumeData.experience.map((exp) => (
                            <Card key={exp.id}>
                                <CardContent className="pt-6 space-y-4">
                                    <div className="flex justify-end">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                removeExperience(exp.id)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Company</Label>
                                        <Input
                                            value={exp.company}
                                            onChange={(e) =>
                                                updateExperience(
                                                    exp.id,
                                                    "company",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Company Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Position</Label>
                                        <Input
                                            value={exp.position}
                                            onChange={(e) =>
                                                updateExperience(
                                                    exp.id,
                                                    "position",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Job Title"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Location</Label>
                                        <Input
                                            value={exp.location}
                                            onChange={(e) =>
                                                updateExperience(
                                                    exp.id,
                                                    "location",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="City, State"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Start Date</Label>
                                            <Input
                                                type="date"
                                                value={exp.startDate}
                                                onChange={(e) =>
                                                    updateExperience(
                                                        exp.id,
                                                        "startDate",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>End Date</Label>
                                            <Input
                                                type="date"
                                                value={exp.endDate}
                                                onChange={(e) =>
                                                    updateExperience(
                                                        exp.id,
                                                        "endDate",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Textarea
                                            value={exp.description}
                                            onChange={(e) =>
                                                updateExperience(
                                                    exp.id,
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Describe your responsibilities and achievements..."
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Button onClick={addExperience} className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Experience
                        </Button>
                    </TabsContent>
                    <TabsContent value="education" className="space-y-4">
                        {resumeData.education.map((edu) => (
                            <Card key={edu.id}>
                                <CardContent className="pt-6 space-y-4">
                                    <div className="flex justify-end">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                removeEducation(edu.id)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>School</Label>
                                        <Input
                                            value={edu.school}
                                            onChange={(e) =>
                                                updateEducation(
                                                    edu.id,
                                                    "school",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="University Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Degree</Label>
                                        <Input
                                            value={edu.degree}
                                            onChange={(e) =>
                                                updateEducation(
                                                    edu.id,
                                                    "degree",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Bachelor of Science"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Field of Study</Label>
                                        <Input
                                            value={edu.fieldOfStudy}
                                            onChange={(e) =>
                                                updateEducation(
                                                    edu.id,
                                                    "fieldOfStudy",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Computer Science"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Start Date</Label>
                                            <Input
                                                type="date"
                                                value={edu.startDate}
                                                onChange={(e) =>
                                                    updateEducation(
                                                        edu.id,
                                                        "startDate",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>End Date</Label>
                                            <Input
                                                type="date"
                                                value={edu.endDate}
                                                onChange={(e) =>
                                                    updateEducation(
                                                        edu.id,
                                                        "endDate",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Textarea
                                            value={edu.description}
                                            onChange={(e) =>
                                                updateEducation(
                                                    edu.id,
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Describe your academic achievements..."
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Button onClick={addEducation} className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Education
                        </Button>
                    </TabsContent>
                    <TabsContent value="skills" className="space-y-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-2">
                                    <Label htmlFor="skills">
                                        Skills (comma-separated)
                                    </Label>
                                    <Textarea
                                        id="skills"
                                        value={resumeData.skills.join(", ")}
                                        onChange={(e) =>
                                            updateSkills(e.target.value)
                                        }
                                        placeholder="React, JavaScript, TypeScript, etc."
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Preview</h2>
                    <Button onClick={() => setShowDownloadDialog(true)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                    </Button>
                </div>
                <PDFPreview data={resumeData} />
            </div>
            <DownloadDialog
                open={showDownLoadDialog}
                onOpenChange={setShowDownloadDialog}
                data={resumeData}
            />
        </div>
    );
}
