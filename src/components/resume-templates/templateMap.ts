import AccentTemplate from "./AccentTemplate";
import ClassicTemplate from "./ClassicTemplate";
import EngineeringTemplate from "./EngineeringTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ModernTemplate from "./ModernTemplate";
import ProfessionalTemplate from "./ProfessionalTemplate";
// Add other templates here

export const templateMap = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    minimalist: MinimalTemplate,
    professional: ProfessionalTemplate,
    accent: AccentTemplate,
    engineering: EngineeringTemplate
    // Add other templates: minimalist, professional, etc.
};
