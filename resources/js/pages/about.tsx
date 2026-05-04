import { Separator } from "@/components/ui/separator";

import { 
    aboutIntro,
    workExperience,
    education,
    contact,
} from "@/data/about.json";

import {
    BaseLayout,
    CardSectionLayout,
    CollapsibleSectionLayout,
    HeaderSectionLayout,
} from "./common/layout";

export default function About() {
    const metaProps = [
        { name: "description", content: "Edrick Sinsuan's personal website overview" },
        { name: "keywords", content: "Portfolio, Computer Engineer, Programmer, Open-source, Software Developer"},
        { name: "author", content: "Edrick Sinsuan" },
    ];

    return (
        <>
            <BaseLayout title="About" metaProps={metaProps}>
                <div className="flex flex-row flex-wrap gap-4">
                    <div className="max-w-2xl w-full">
                    <HeaderSectionLayout
                        title={aboutIntro.name}
                        header={aboutIntro.title}
                        subheader={aboutIntro.location}
                        description={aboutIntro.overview}
                    />
                    <CollapsibleSectionLayout title="contact">
                        {contact.map((contact, index) => (
                            <a 
                                key={index} 
                                href={contact.href}
                                target="_blank"
                            >
                                <CardSectionLayout
                                    title={contact.title} 
                                    description={contact.description}
                                    className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                                />
                            </a>
                        ))}
                    </CollapsibleSectionLayout>
                    </div>
                    <Separator className="max-w-2xl min-2xl:hidden" />
                    <div className="max-w-2xl w-full">
                        <CollapsibleSectionLayout title="work experience">
                            {workExperience.map((experience, index) => (
                                <CardSectionLayout 
                                    key={index}
                                    title={experience.title} 
                                    description={experience.description}
                                >
                                    <CollapsibleSectionLayout title="responsibilities">
                                        <ListContent items={experience.responsibilities} />
                                    </CollapsibleSectionLayout>
                                </CardSectionLayout>
                            ))}
                        </CollapsibleSectionLayout>
                        <CollapsibleSectionLayout title="education">
                            {education.map((education, index) => (
                                <CardSectionLayout
                                    key={index}
                                    title={education.title} 
                                    description={education.description}
                                />
                            ))}
                        </CollapsibleSectionLayout>
                    </div>
                </div>
            </BaseLayout>
        </>
    );
}

function ListContent({ items }: { items: (string | string[])[] }) {
    return (
        <>
            <ul className="list-disc pl-4 text-sm my-2">
                {items.map((item, index) => {
                    /* Support for nested lists: if the item is an array, render it as a nested list */
                    if (Array.isArray(item)) {
                        return (
                            <ListContent key={index} items={item} />
                        );
                    }

                    return <li key={index}>{item}</li>;
                })}
            </ul>
        </>
    );
}