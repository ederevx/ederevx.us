import { Link } from "@inertiajs/react";

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
    href
}: { 
    name: string, 
    href: string 
}) {
    const id = React.useId();
    const baseClass = cn(
        navigationMenuTriggerStyle(), // Base styles for the navigation menu trigger
        "hover:text-primary hover:dark:text-primary transition-all duration-300", // Hover styles
        "max-sm:text-lg", // Responsive text size for smaller screens
        "animate-fade-in"
    );
    const inactiveClass = "text-gray-500 dark:text-gray-700";
    const activeClass = "active text-primary text-lg max-sm:text-2xl";

    React.useEffect(() => {
        const isActive = window.location.pathname === href;
        const element = document.getElementById(id);

        if (!element) {
            return;
        }

        element.classList = cn(baseClass, isActive ? activeClass : inactiveClass);
    }, [ baseClass, activeClass, inactiveClass, id, href ]);

    return (
        <>
            <NavigationMenuLink asChild className={cn(baseClass, inactiveClass)}>
                <Link id={id} href={href}>
                    {name}
                </Link>
            </NavigationMenuLink>
        </>
    )
}

export function NavigationBar() {
    return (
        <>
            <div className="flex max-sm:items-center max-sm:justify-center">
                <NavigationMenu className="w-full rounded-none bg-transparent border-0 shadow-none p-0 mb-4">
                    <NavigationMenuList>
                        {navigation.map((link, index) => (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuContent name={link.name} href={link.href} />
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </>
    );
}
