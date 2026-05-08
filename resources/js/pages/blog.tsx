import { Separator } from "@/components/ui/separator";

import { 
    BaseLayout,
    HeaderSectionLayout,
} from "@/pages/common/layout";

import type * as Types from "@/pages/common/types";

import { dateFormat } from "@/pages/common/utils";

import * as Posts from "@/routes/posts/index";

export default function Blog({ 
    posts,
}: { 
    posts: Types.Post[],
}) {
    const metaProps = [
        { name: "description", content: "Edrick Sinsuan's personal blog" },
        { name: "keywords", content: "Blog, Programming Projects, Computer Programming, Engineering"},
        { name: "author", content: "Edrick Sinsuan" },
    ];

    return (
        <>
            <BaseLayout title="Blog" metaProps={metaProps}>
                {posts && posts.map((post, index) => 
                    <a
                        key={index}
                        href={Posts.show.url([post, post.slug])}
                    >
                        <HeaderSectionLayout 
                            layoutTitle={post.title}
                            subheader={dateFormat(post.created_at)}
                            description={post.excerpt}
                            className="p-4 hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                        />
                        <Separator />
                    </a>
                )}
            </BaseLayout>
        </>
    );
}
