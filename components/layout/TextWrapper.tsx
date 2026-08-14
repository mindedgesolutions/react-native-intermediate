import { cn } from '@gluestack-ui/utils/nativewind-utils';
import { Text } from '../ui/text';

const TextWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Text
      className={cn(
        `text-base font-medium tracking-wide text-primary`,
        className,
      )}
    >
      {children}
    </Text>
  );
};
export default TextWrapper;
