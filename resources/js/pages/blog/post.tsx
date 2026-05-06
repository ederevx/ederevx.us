import { 
    BaseLayout,
    HeaderSectionLayout,
} from "@/pages/common/layout";

import type * as Types from "@/pages/common/types";

import { dateFormat } from "@/pages/common/utils";

export default function Post({ 
    post,
}: {
    post: Types.Post,
}) {
    const metaProps = [
        { name: "description", content: "Edrick Sinsuan's personal blog" },
        { name: "keywords", content: "Blog, Programming Projects, Computer Programming, Engineering"},
        { name: "author", content: "Edrick Sinsuan" },
    ];

    return (
        <>
            <BaseLayout title="Blog" metaProps={metaProps}>
                <HeaderSectionLayout
                    title={post.title}
                    subheader={dateFormat(post.created_at)}
                    description={post.content}
                />
            </BaseLayout>
        </>
    );
}