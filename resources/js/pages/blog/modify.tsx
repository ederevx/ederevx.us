import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from '@inertiajs/react'

import * as React from "react";

import { Controller, useForm } from "react-hook-form";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";

import {
    BaseLayout,
    CardSectionLayout,
    HeaderSectionLayout,
} from "@/pages/common/layout";

import type * as Types from "@/pages/common/types";

import * as Posts from "@/routes/posts/index";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(64, "Title must be at most 64 characters."),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters.")
})

export default function Modify({ 
    post,
}: {
    post: Types.Post,
}) {
    const metaProps = [
        { name: "description", content: "Edrick Sinsuan's personal blog" },
        { name: "keywords", content: "Blog, Programming Projects, Computer Programming, Engineering"},
        { name: "author", content: "Edrick Sinsuan" },
    ];

    const getProps = () => post.exists ? 
    {
        headerTitle: "Modify Post",
        form: {
            default: {
                title: post.title,
                content: post.content,
            },
            action: Posts.update.form(post.slug),
        },
    } : {
        headerTitle: "Create Post",
        form: {
            default: {
                title: "",
                content: "",
            },
            action: Posts.store.form(),
        },
    };

    const formIds = {
        form: React.useId(),
        title: React.useId(),
        content: React.useId(),
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: getProps().form.default,
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        console.log(getProps())
    };

    React.useEffect(() => {

    },[]);

    return (
        <BaseLayout title="Blog" metaProps={metaProps}>
            <HeaderSectionLayout
                title={getProps().headerTitle}
            />
            <Separator />
            <Form
                id={formIds.form}
                onSubmit={form.handleSubmit(onSubmit)}
                {...getProps().form.action}
            >
                <FieldGroup className="p-4">
                    <Controller
                        name="title"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="my-2"
                            >
                                <CardSectionLayout
                                    cardTitle={(
                                        <FieldLabel 
                                            htmlFor={formIds.title}
                                            className="text-lg"
                                        >
                                            Title
                                        </FieldLabel>
                                    )}
                                >
                                    <InputGroup>
                                        <InputGroupInput
                                            id={formIds.title}
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                            {... field}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText className="tabular-nums">
                                                {field.value.length} characters (5 minimum / 64 maximum)
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && 
                                        <FieldError errors={[fieldState.error]} />
                                    }
                                </CardSectionLayout>
                            </Field>
                        )}
                    />
                    <Controller 
                        name="content"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="my-2"
                            >
                                <CardSectionLayout
                                    cardTitle={
                                        <FieldLabel 
                                            htmlFor={formIds.content}
                                            className="text-lg"
                                        >
                                            Content
                                        </FieldLabel>
                                    }
                                >
                                    <InputGroup>
                                        <InputGroupTextarea
                                            id={formIds.content}
                                            aria-invalid={fieldState.invalid}
                                            className="min-h-24"
                                            {... field}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText className="tabular-nums">
                                                {field.value.length} characters (10 minimum)
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && 
                                        <FieldError errors={[fieldState.error]} />
                                    }
                                </CardSectionLayout>
                            </Field>
                        )}
                    />
                    <Field orientation="horizontal">
                        <CardSectionLayout 
                            cardTitle={
                                <p className="text-lg">Actions</p>
                            }
                        >
                            <Button type="button" variant="outline" onClick={() => form.reset()}>
                                Reset
                            </Button>
                            <Button type="submit" form={formIds.form}>
                                Submit
                            </Button>
                        </CardSectionLayout>
                    </Field>
                </FieldGroup>
            </Form>
        </BaseLayout>
    );
}