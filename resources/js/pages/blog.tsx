import { 
    BaseLayout,
    HeaderSectionLayout,
} from "./common/layout";

export default function Blog() {
    const metaProps = [
        { name: "description", content: "Edrick Sinsuan's personal blog" },
        { name: "keywords", content: "Blog, Programming Projects, Computer Programming, Engineering"},
        { name: "author", content: "Edrick Sinsuan" },
    ];

    return (
        <>
            <BaseLayout title="Blog" metaProps={metaProps}>
                <HeaderSectionLayout title="Work in progress!" />
            </BaseLayout>
        </>
    );
}
