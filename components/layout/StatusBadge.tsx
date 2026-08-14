import { cn } from '@gluestack-ui/utils/nativewind-utils';
import { Badge, BadgeText } from '../ui/badge';

type BadgeProps = {
  label: string;
  className?: string;
};

const StatusBadge = ({ label, className }: BadgeProps) => {
  return (
    <Badge variant="default" className={cn('rounded-lg', className)}>
      <BadgeText>{label}</BadgeText>
    </Badge>
  );
};
export default StatusBadge;
