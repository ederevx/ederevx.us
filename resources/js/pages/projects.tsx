import { Separator } from "@/components/ui/separator"

import { projects } from "@/data/projects.json";

import { 
    BaseLayout,
    HeaderSectionLayout,
} from "@/pages/common/layout";

export default function Projects() {
    const metaProps = [
        { name: "description", content: "Edrick Sinsuan's personal projects" },
        { name: "keywords", content: "Projects, Programming Projects, Computer Programming, Engineering, Linux Kernel, Website, Scripts"},
        { name: "author", content: "Edrick Sinsuan" },
    ];

    return (
        <>
            <BaseLayout title="Projects" metaProps={metaProps}>
                {projects.map((project, index) => (
                        <a
                            key={index} 
                            href={project.href}
                            target="_blank"
                        >
                            <HeaderSectionLayout
                                layoutTitle={project.title}
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
