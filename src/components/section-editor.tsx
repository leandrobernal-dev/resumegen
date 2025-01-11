import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, GripVertical, Trash2 } from "lucide-react";
import type { Section } from "../types/resume";
import { generateId } from "../utils/generateId";

interface SectionEditorProps {
    sections: Section[];
    onUpdate: (sections: Section[]) => void;
}

export function SectionEditor({ sections, onUpdate }: SectionEditorProps) {
    const addSection = () => {
        const newSection: Section = {
            id: generateId(),
            title: "New Section",
            type: "custom",
            content: [],
            order: sections.length,
        };
        onUpdate([...sections, newSection]);
    };

    const updateSection = (id: string, updates: Partial<Section>) => {
        onUpdate(
            sections.map((section) =>
                section.id === id ? { ...section, ...updates } : section
            )
        );
    };

    const removeSection = (id: string) => {
        onUpdate(sections.filter((section) => section.id !== id));
    };

    return (
        <div className="space-y-4">
            {sections.map((section) => (
                <Card key={section.id}>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4 mb-4">
                            <GripVertical className="w-5 h-5 text-muted-foreground" />
                            <Input
                                value={section.title}
                                onChange={(e) =>
                                    updateSection(section.id, {
                                        title: e.target.value,
                                    })
                                }
                                className="font-semibold"
                                placeholder="Section Title"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeSection(section.id)}
                                disabled={section.type === "basic"}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
            <Button onClick={addSection} className="w-full">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Section
            </Button>
        </div>
    );
}
