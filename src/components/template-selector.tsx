import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import Image from "next/image";
import type { Template } from "@/types/resume";
import { useState } from "react";

interface TemplateSelectorProps {
    selectedTemplate: Template["id"];
    onSelect: (template: Template["id"]) => void;
}

const templates: Template[] = [
    {
        id: "classic",
        name: "Classic",
        image: "/file.svg",
        description: "Traditional layout with centered header",
    },
    {
        id: "modern",
        name: "Modern",
        image: "/file.svg",
        description: "Contemporary design with sidebar",
    },
    {
        id: "minimalist",
        name: "Minimalist",
        image: "/file.svg",
        description: "Clean two-column layout with icons",
    },
    {
        id: "professional",
        name: "Professional",
        image: "/file.svg",
        description: "Traditional with blue accents",
    },
    {
        id: "accent",
        name: "Accent",
        image: "/file.svg",
        description: "Modern with color accents",
    },
    {
        id: "engineering",
        name: "Engineering",
        image: "/file.svg",
        description: "Technical with highlight bar",
    },
];

export function TemplateSelector({
    selectedTemplate,
    onSelect,
}: TemplateSelectorProps) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Settings2 className="w-4 h-4 mr-2" />
                    Change Template
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Choose a Template</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4 p-4">
                    {templates.map((template) => (
                        <button
                            key={template.id}
                            onClick={() => {
                                onSelect(template.id);
                                setOpen(false);
                            }}
                            className={`relative flex flex-col gap-2 rounded-lg border-2 transition-all hover:border-primary ${
                                selectedTemplate === template.id
                                    ? "border-primary ring-2 ring-primary ring-offset-2"
                                    : "border-muted"
                            }`}
                        >
                            <div className="relative aspect-[210/297] overflow-hidden rounded-t-lg">
                                <Image
                                    src={template.image}
                                    alt={template.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-2 text-left">
                                <div className="font-medium">
                                    {template.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {template.description}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
