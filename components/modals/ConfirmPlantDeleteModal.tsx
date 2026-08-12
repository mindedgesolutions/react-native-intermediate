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
import useShowSuccess from '../alert-hooks/show.success';
import { usePlantStore } from '@/store/plant.store';
import { themeColors } from '@/theme';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

type DeletePlantProps = {
  id: string;
  redirectLink?: string;
  buttonOrIcon?: boolean;
};

const ConfirmPlantDeleteModal = ({
  id,
  redirectLink,
  buttonOrIcon = true,
}: DeletePlantProps) => {
  const [showModal, setShowModal] = useState(false);
  const { removePlant } = usePlantStore();
  const success = useShowSuccess();
  const router = useRouter();

  const deletePlant = () => {
    setShowModal(false);
    removePlant(id);
    success('Plant deleted successfully');
    redirectLink && router.replace(redirectLink);
  };

  return (
    <>
      {buttonOrIcon ? (
        <Button variant="ghost" size="icon" onPress={() => setShowModal(true)}>
          <ButtonText>
            <Feather name="trash-2" size={20} color={themeColors.colorRed} />
          </ButtonText>
        </Button>
      ) : (
        <Button size="lg" variant="outline" onPress={() => setShowModal(true)}>
          <ButtonText className="text-sm font-bold tracking-widest">
            Delete plant
          </ButtonText>
        </Button>
      )}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent className="p-4">
          <ModalHeader>
            <Heading size="lg">Confirm</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>Delete plant details permanently?</Text>
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
            <Button size="sm" onPress={deletePlant}>
              <ButtonText>Done!</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ConfirmPlantDeleteModal;
