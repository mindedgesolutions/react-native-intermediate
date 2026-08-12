import { themeColors } from '@/theme';
import { Button, ButtonSpinner, ButtonText } from '../ui/button';

type SubmitButtonProps = {
  onPress: () => void;
  isSubmitting?: boolean;
  title?: string;
  isSubmittingTitle?: string;
};

const FormButton = ({
  onPress,
  isSubmitting = false,
  title = 'Submit',
  isSubmittingTitle = 'Submitting ...',
}: SubmitButtonProps) => {
  return (
    <Button
      className={`mt-2 ${isSubmitting ? 'opacity-60' : undefined}`}
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
