import * as Inertia from "@inertiajs/react";

import * as React from "react";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { navigation } from "@/data/navigation.json";

import { cn } from "@/lib/utils";

function NavigationMenuContent({
    name,
    href,
}: {
    name: string,
    href: string,
}) {
    // Generate unique ID per nav link
    const id = React.useId();
    const baseClass = cn(
        navigationMenuTriggerStyle(), // Base styles for the navigation menu trigger
        "hover:text-primary focus:text-primary", // Hover and focus styles
        "transition-all duration-300"
    );
    // Responsive text size for various screens
    const inactiveClass = "text-muted-foreground text-base max-sm:text-lg";
    const activeClass = "active text-primary text-lg max-sm:text-2xl";
    // Use relative href to allow pathname detection
    const hrefTarget = href;

    React.useEffect(() => {
        const element = document.getElementById(id);

        if (!element) {
            return;
        }

        const handlePathname = () => {
            const pathname = window.location.pathname.toLowerCase();
            const target = hrefTarget.toLowerCase();

            if (target === null) {
                return;
            }

            // Detect cases wherein we are within a child path, excluding direct descendants of root
            const isActive = (target !== '/') ? pathname.includes(target) : pathname === target;
            element.classList = cn(baseClass, isActive ? activeClass : inactiveClass);
        };

        // Trigger whenever inertia changes path at url
        handlePathname();

        // Also detect changes when popstate gets triggered
        window.addEventListener('popstate', handlePathname);

        return () => window.removeEventListener('popstate', handlePathname);
    }, [ baseClass, activeClass, inactiveClass, hrefTarget, id ]);

    return (
        <>
            <NavigationMenuLink asChild className={cn(baseClass, inactiveClass)}>
                <Inertia.Link id={id} href={hrefTarget}>
                    {name}
                </Inertia.Link>
            </NavigationMenuLink>
        </>
    )
}

export function NavigationBar({
    navigationData = navigation,
    ...props
}: React.ComponentProps<typeof NavigationMenu> & {
    navigationData?: {
        name: string,
        href: string,
    }[],
}) {
    return (
        <>
            <div className="flex max-sm:items-center max-sm:justify-center">
                <NavigationMenu className="w-full rounded-none bg-transparent border-0 shadow-none p-0 mb-4" {...props}>
                    <NavigationMenuList>
                        {navigationData.map((link, index) => (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuContent {...link} />
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </>
    );
}
