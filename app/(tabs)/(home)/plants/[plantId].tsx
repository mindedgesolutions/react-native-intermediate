import ScreenHeader from '@/components/layout/ScreenHeader';
import { Text } from '@/components/ui/text';
import { usePlantStore } from '@/store/plant.store';
import { useLocalSearchParams } from 'expo-router';
import { Image, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { themeColors } from '@/theme';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import { format } from 'date-fns';
import { Button, ButtonText } from '@/components/ui/button';
import ConfirmPlantDeleteModal from '@/components/modals/ConfirmPlantDeleteModal';
import useShowSuccess from '@/components/alert-hooks/show.success';

const PlantDetails = () => {
  const { plantId } = useLocalSearchParams();
  const { plants } = usePlantStore();
  const { waterPlant } = usePlantStore();
  const success = useShowSuccess();

  const plant = plants.find((i) => i.id === plantId);

  const handleSubmit = () => {
    waterPlant(String(plantId));
    success('Done!');
  };

  return (
    <>
      <ScreenHeader
        title={plant?.name || 'Plant details'}
        link={`/(home)`}
        linkIcon={
          <Entypo name="home" size={20} color={themeColors.colorWhite} />
        }
        linkText="Back to home"
      />
      <ScreenWrapper className="mt-8">
        <View className="flex justify-center items-center gap-8">
          <Image
            src={plant?.imageUri}
            width={250}
            height={250}
            className="rounded-2xl"
          />
          <Text className="text-xl font-bold text-app-orange-foreground tracking-wider uppercase">
            {plant?.name}
          </Text>
          <View className="flex justify-center items-center gap-2">
            <Text className="text-base font-medium tracking-wider">
              Watering frequency:{' '}
            </Text>
            <Text className="text-base font-medium tracking-wider">
              Once in every {plant?.frequency} days
            </Text>
          </View>
          <Text className="text-base font-medium tracking-wider">
            Last watered on:{' '}
            {plant?.lastWateredAtTimestamp
              ? format(new Date(plant?.lastWateredAtTimestamp), 'dd/MM/yyyy')
              : `N/A`}
          </Text>
          <Text className="text-base font-medium tracking-wider">
            Next watering on:{' '}
            {plant?.lastWateredAtTimestamp
              ? format(new Date(plant?.lastWateredAtTimestamp), 'dd/MM/yyyy')
              : `N/A`}
          </Text>
          <View className="flex gap-4">
            <Button
              size="lg"
              className="bg-app-orange-foreground"
              onPress={handleSubmit}
            >
              <ButtonText className="text-sm tracking-widest">
                Water me!
              </ButtonText>
            </Button>
            <ConfirmPlantDeleteModal
              id={String(plantId)}
              buttonOrIcon={false}
              redirectLink={`/(home)`}
            />
          </View>
        </View>
      </ScreenWrapper>
    </>
  );
};
export default PlantDetails;
