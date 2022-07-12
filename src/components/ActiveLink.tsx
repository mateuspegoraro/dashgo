import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    shouldMatchExactHref?: boolean;
}

export function ActiveLink({ 
    children, 
    shouldMatchExactHref = false, 
    ...rest 
}: ActiveLinkProps) {
    const {asPath} = useRouter()
    let isActive = false;
    const matchExact = asPath === rest.href || asPath === rest.as;
    const matchContains = asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as));
    if(shouldMatchExactHref && matchExact) {
        isActive = true;
    }
    if(!shouldMatchExactHref && matchContains){
        isActive = true;
    }
    return (
        <Link {...rest}>
            {cloneElement(children, {
                color: isActive ? 'pink.400' : 'gray.50'
            })}
        </Link>
    )
}