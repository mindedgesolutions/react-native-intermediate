import { cn } from '@gluestack-ui/utils/nativewind-utils';
import { View } from 'react-native';

export default function ScreenWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <View className={cn('p-4', className)}>{children}</View>;
}
