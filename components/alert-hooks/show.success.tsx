import { Pressable } from 'react-native';
import { Toast, ToastDescription, ToastTitle, useToast } from '../ui/toast';
import { HStack } from '@/components/ui/hstack';
import { Icon, CloseIcon } from '@/components/ui/icon';
import { VStack } from '../ui/vstack';

const useShowSuccess = () => {
  const toast = useToast();

  return (msg: string) =>
    toast.show({
      placement: 'top right',
      duration: 3000,
      render: ({ id }) => (
        <Toast
          nativeID={`toast-${id}`}
          action="success"
          className="p-4 gap-3 w-80 max-w-100 bg-card shadow-lg"
        >
          <HStack className="flex flex-row justify-between">
            <VStack>
              <ToastTitle className="font-semibold text-app-orange">
                Success!
              </ToastTitle>
              <ToastDescription size="sm">{msg}</ToastDescription>
            </VStack>
            <Pressable onPress={() => toast.close(id)}>
              <Icon as={CloseIcon} />
            </Pressable>
          </HStack>
        </Toast>
      ),
    });
};
export default useShowSuccess;
