import { Head } from '@inertiajs/react';

import { ArrowDownIcon } from "@phosphor-icons/react";

import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { cn } from "@/lib/utils";

import { NavigationBar } from "./navigation";

export function CardSectionLayout({
    title,
    description,
    children,
    className,
    ...props
}: React.ComponentProps<typeof Card> & { 
    title: string,
    description: (string | string[]),
    children?: React.ReactNode,
    className?: string,
}) {
    return (
        <>
            <Card className={cn("w-full bg-background mt-4", className)} {...props}>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>
                        {Array.isArray(description) ? 
                            description.map((desc, i) => 
                                <p key={i}>{desc}</p>
                            ) : description
                        }
                    </CardDescription>
                </CardHeader>
                {children && <CardContent>{children}</CardContent>}
            </Card>
        </>
    );
}

export function CollapsibleSectionLayout({
    title,
    children,
    className,
    ...props
}: React.ComponentProps<typeof Collapsible> & {
    title: string,
    children: React.ReactNode,
    className?: string,
}) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <Collapsible
                className={cn("w-full mt-4", className)}
                open={isOpen}
                onOpenChange={setIsOpen}
                {...props}
            >
                <CollapsibleTrigger className={cn(buttonVariants({ variant: "outline", size: "lg" }), "transition-transform")}>
                    {title}
                    <ArrowDownIcon 
                        data-state={isOpen ? "open" : "closed"}
                        className="ml-2 h-4 w-4 transition-transform data-[state=open]:rotate-180" 
                    />
                </CollapsibleTrigger>
                <CollapsibleContent
                    data-state={isOpen ? "open" : "closed"}
                    className={cn("duration-200",
                        "data-[state=closed]:animate-collapsible-up",
                        "data-[state=open]:animate-collapsible-down")}
                >
                    <div
                        data-state={isOpen ? "open" : "closed"}
                        className={cn("duration-300",
                            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
                            "data-[state=open]:animate-in data-[state=open]:fade-in-0")}
                    >
                        {children}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </>
    );
}

export function HeaderSectionLayout({
    title,
    header,
    subheader,
    description,
    children,
    className,
    ...props
}: React.ComponentProps<"div"> & {
    title: string,
    header?: string,
    subheader?: string,
    description?: string,
    children?: React.ReactNode,
    className?: string,
}) {
    return (
        <>
            <div className={cn("w-full mt-4", className)} {...props}>
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl mb-4">{title}</h1>
                    <h2 className="text-lg text-primary">
                        {header}
                    </h2>
                    {subheader &&
                        <p className="text-md text-muted-foreground">
                            {subheader}
                        </p>
                    }
                    {description &&
                        <p className="text-sm text-primary mt-4">
                            {description}
                        </p>
                    }
                    {children}
                </div>
            </div>
        </>
    )
}

export function BaseLayout({
    title,
    children,
    metaProps,
    ...props
}: React.ComponentProps<"main"> & {
    title: string,
    children?: React.ReactNode,
    metaProps?: {name: string, content: string}[],
}) {
    // Handle dark class on root DOM in BaseLayout
    React.useEffect(() => {
        const windowDark = window.matchMedia('(prefers-color-scheme: dark)');

        const handleDarkMode = () => {
            const element = document.documentElement;
            const isDark = windowDark.matches;
            element?.classList.toggle('dark', isDark);
        };

        windowDark.addEventListener('change', handleDarkMode);

        // Trigger whenever the website is reloaded by SSR
        handleDarkMode();

        return () => windowDark.removeEventListener('change', handleDarkMode);
    }, [ ]);

    // Hide the main class first then reveal at hydration
    return (
        <>
            <Head title={title}>
                {/* Implement CSP as strict as possible */}
                <meta http-equiv="Content-Security-Policy"
                    content="default-src 'none'; 
                            script-src 'self' 127.0.0.1:5173; 
                            connect-src 'self' ws://127.0.0.1:5173; 
                            img-src 'self'; 
                            style-src 'self' 'unsafe-inline';
                            font-src 'self' https://fonts.bunny.net 127.0.0.1:5173;"/>
                {metaProps?.map((prop) => 
                    <meta name={prop.name} content={prop.content} />
                )}
            </Head>
            <main className="bg-background text-foreground min-h-screen transition-all duration-300" {...props}>
                <section className="flex w-full h-full min-h-screen">
                    <div className="container m-10">
                        <NavigationBar />
                        {children && <div className="flex flex-col gap-2 animate-in fade-in duration-500">{children}</div>}
                    </div>
                </section>
                <footer className="w-full py-4">
                    <div className="container mx-auto text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Edrick Sinsuan. Made using Laravel + React. All rights reserved.
                    </div>
                </footer>
            </main>
        </>
    );
}
