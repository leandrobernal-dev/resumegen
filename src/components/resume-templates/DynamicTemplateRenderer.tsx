import React from "react";
import { ResumeData } from "@/types/resume";
import { templateMap } from "./templateMap";

const DynamicTemplateRenderer = ({ data }: { data: ResumeData }) => {
    // const TemplateComponent = templateMap[data.template];
    const TemplateComponent =
        templateMap[data.template as keyof typeof templateMap];
    return <TemplateComponent data={data} />;
};

export default DynamicTemplateRenderer;
