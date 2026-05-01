import { 
    BaseLayout,
    HeaderSectionLayout,
} from "./common/layout";

export default function Blog() {
    return (
        <>
            <BaseLayout title="Blog">
                <HeaderSectionLayout title="Work in progress!" />
            </BaseLayout>
        </>
    );
}
