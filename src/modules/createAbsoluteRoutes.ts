import { ComponentType } from 'react';
import { IRelativeRoutesConfig, IAbsoluteRoutesConfig } from './types';

export const absoluteRoutes: IAbsoluteRoutesConfig = {};
const createAbsoluteRoutes = (relativeRoutes: IRelativeRoutesConfig): IAbsoluteRoutesConfig => {
    const getRoute = (routeName: string): { component: ComponentType; path: string } => {
        const route = relativeRoutes[routeName];
        const parentRoute = route.parent ? getRoute(route.parent) : { path: null };

        return {
            ...route,
            component: route.component,
            path: (parentRoute.path || '') + route.path,
        };
    };

    Object.keys(relativeRoutes).forEach(routeName => {
        absoluteRoutes[routeName] = getRoute(routeName);
    });

    return absoluteRoutes;
};
export default createAbsoluteRoutes;
