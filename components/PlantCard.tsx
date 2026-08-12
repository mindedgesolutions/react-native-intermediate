import { Image, View } from 'react-native';
import { AppLogo } from './AppLogo';
import { Text } from './ui/text';
import { PlantType } from '@/store/plant.store';
import ConfirmPlantDeleteModal from './modals/ConfirmPlantDeleteModal';
import { Link } from 'expo-router';

const PlantCard = ({ plant }: { plant: PlantType }) => {
  return (
    <Link href={`/plants/${plant.id}`} className="p-2.5 bg-white rounded-lg">
      <View className="w-full flex flex-row justify-between items-center">
        <View className="flex flex-row justify-start items-center gap-4">
          {plant.imageUri ? (
            <Image
              src={plant.imageUri}
              width={100}
              height={100}
              className="rounded-lg"
            />
          ) : (
            <View className="w-25 h-25 flex justify-center items-center">
              <AppLogo width={60} height={100} />
            </View>
          )}
          <View className="flex gap-1">
            <Text className="text-base text-app-orange-foreground font-bold tracking-wider">
              {plant.name}
            </Text>
            <Text className="text-sm text-muted-foreground font-medium tracking-wider">
              {plant.frequency} days
            </Text>
          </View>
        </View>
        <ConfirmPlantDeleteModal id={plant.id} />
      </View>
    </Link>
  );
};
export default PlantCard;
