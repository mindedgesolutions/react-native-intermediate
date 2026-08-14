import ScreenHeader from '@/components/layout/ScreenHeader';
import { Text } from '@/components/ui/text';
import { usePlantStore } from '@/store/plant.store';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { themeColors } from '@/theme';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import { format } from 'date-fns';
import { Button, ButtonText } from '@/components/ui/button';
import ConfirmPlantDeleteModal from '@/components/modals/ConfirmPlantDeleteModal';
import useShowSuccess from '@/components/alert-hooks/show.success';
import { AppLogo } from '@/components/AppLogo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const PlantDetails = () => {
  const { plantId } = useLocalSearchParams();
  const { plants } = usePlantStore();
  const { waterPlant } = usePlantStore();
  const success = useShowSuccess();
  const router = useRouter();

  const plant = plants.find((i) => i.id === plantId);

  const handleSubmit = (status: string) => {
    waterPlant(String(plantId), status);
    success(`Project status is marked as ${status}`);
    router.replace(`/`);
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
      <ScrollView>
        <ScreenWrapper className="mt-8">
          <View className="flex justify-center items-center gap-8">
            {plant?.imageUri ? (
              <Image
                src={plant?.imageUri}
                width={250}
                height={250}
                className="rounded-2xl"
              />
            ) : (
              <View>
                <AppLogo />
              </View>
            )}
            <View className="flex flex-row justify-center items-center gap-2">
              {plant?.lastWateredAtTimestamp ? (
                <MaterialIcons
                  name="verified"
                  size={20}
                  color={themeColors.colorOrange}
                />
              ) : undefined}
              <Text className="text-xl font-bold text-app-orange-foreground tracking-wider uppercase">
                {plant?.name}
              </Text>
            </View>
            <View className="flex justify-center items-center gap-2">
              <Text className="text-base font-medium tracking-wider">
                Project timeline:
              </Text>

              <Text className="text-base font-medium tracking-wider">
                {plant?.frequency} day(s)
              </Text>
            </View>
            <Text className="text-base font-medium tracking-wider">
              Last updated on:{' '}
              {plant?.lastWateredAtTimestamp
                ? format(new Date(plant?.lastWateredAtTimestamp), 'dd/MM/yyyy')
                : `N/A`}
            </Text>
            <View className="flex gap-4">
              <Link href={`/plants/${plant?.id}/edit`} asChild>
                <Button size="lg" variant="default">
                  <ButtonText className="text-sm tracking-widest">
                    Edit project
                  </ButtonText>
                </Button>
              </Link>
              {!plant?.lastWateredAtTimestamp && (
                <Button
                  size="lg"
                  className="bg-app-orange-foreground active:bg-app-orange-foreground/70"
                  onPress={() => handleSubmit('complete')}
                >
                  <ButtonText className="text-sm tracking-widest">
                    Mark as complete!
                  </ButtonText>
                </Button>
              )}
              {plant?.lastWateredAtTimestamp && (
                <Button
                  size="lg"
                  className="bg-app-orange-foreground active:bg-app-orange-foreground/70"
                  onPress={() => handleSubmit('incomplete')}
                >
                  <ButtonText className="text-sm tracking-widest">
                    Mark as incomplete!
                  </ButtonText>
                </Button>
              )}
              <ConfirmPlantDeleteModal
                id={String(plantId)}
                buttonOrIcon={false}
                redirectLink={`/(home)`}
              />
            </View>
          </View>
        </ScreenWrapper>
      </ScrollView>
    </>
  );
};
export default PlantDetails;
