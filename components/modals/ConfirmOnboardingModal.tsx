import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@/components/ui/modal';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Icon, CloseIcon } from '@/components/ui/icon';
import { useState } from 'react';
import { useUserStore } from '@/store/user.store';
import { useRouter } from 'expo-router';
import useShowSuccess from '../alert-hooks/show.success';

const ConfirmOnboardingModal = () => {
  const [showModal, setShowModal] = useState(false);
  const { toggleHadOnboarded } = useUserStore();
  const router = useRouter();
  const success = useShowSuccess();

  const handleComplete = () => {
    setShowModal(false);
    toggleHadOnboarded();
    success('Onboarding completed! Welcome user');
    router.replace(`/(home)`);
  };

  return (
    <>
      <Button
        variant="default"
        size="default"
        className="max-w-32 bg-app-orange-foreground"
        onPress={() => setShowModal(true)}
      >
        <ButtonText>Let me in!</ButtonText>
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent className="p-4 bg-card">
          <ModalHeader>
            <Heading size="lg">Confirm</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>Complete on boarding?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              className="mr-2"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button size="sm" onPress={handleComplete}>
              <ButtonText>Done!</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConfirmOnboardingModal;
