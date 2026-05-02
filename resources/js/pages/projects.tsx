import { Separator } from "@/components/ui/separator"

import { projects } from "@/data/projects.json";

import { 
    BaseLayout,
    HeaderSectionLayout,
} from "./common/layout";

export default function Projects() {
    return (
        <>
            <BaseLayout title="Projects">
                {projects.map((project, index) => (
                        <a
                            key={index} 
                            href={project.href}
                            target="_blank"
                        >
                            <HeaderSectionLayout
                                title={project.title}
                                header={project.header}
                                subheader={project.subheader}
                                className="p-4 hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                            />
                            <Separator />
                        </a>
                ))}
            </BaseLayout>
        </>
    );
}
