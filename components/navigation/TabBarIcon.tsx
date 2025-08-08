import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function TabBarIcon({
    style,
    size = 28,
    ...rest
}: IconProps<ComponentProps<typeof Ionicons>['name']> & { size?: number }) {
    return (
        <Ionicons
            size={size}
            style={[{ marginBottom: -3 }, style]}
            {...rest}
        />
    );
}
