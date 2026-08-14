import { themeColors } from '@/theme';
import { Button, ButtonSpinner, ButtonText } from '../ui/button';
import { cn } from '@gluestack-ui/utils/nativewind-utils';

type SubmitButtonProps = {
  onPress: () => void;
  isSubmitting?: boolean;
  title?: string;
  isSubmittingTitle?: string;
  className?: string;
};

const FormButton = ({
  onPress,
  isSubmitting = false,
  title = 'Submit',
  isSubmittingTitle = 'Submitting ...',
  className,
}: SubmitButtonProps) => {
  return (
    <Button
      className={cn(
        `mt-2 bg-primary ${isSubmitting ? 'opacity-60' : ''}`,
        className,
      )}
      variant="default"
      onPress={onPress}
      disabled={isSubmitting}
    >
      {isSubmitting && (
        <ButtonSpinner color={themeColors.colorWhite} size={16} />
      )}
      <ButtonText className="ml-1">
        {isSubmitting ? isSubmittingTitle : title}
      </ButtonText>
    </Button>
  );
};
export default FormButton;
