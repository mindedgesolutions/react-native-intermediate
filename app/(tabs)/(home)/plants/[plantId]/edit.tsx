import ScreenHeader from '@/components/layout/ScreenHeader';
import Entypo from '@expo/vector-icons/Entypo';
import { themeColors } from '@/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Platform, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { usePlantStore } from '@/store/plant.store';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { PlantSchema } from '@/schema/plant.schema';
import { useEffect, useState } from 'react';
import useShowSuccess from '@/components/alert-hooks/show.success';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FormInput from '@/components/form/FormInput';
import FormButton from '@/components/form/FormButton';
import * as ImagePicker from 'expo-image-picker';
import ConfirmPlantDeleteModal from '@/components/modals/ConfirmPlantDeleteModal';

const EditPlantDetails = () => {
  const { plantId } = useLocalSearchParams();
  const { plants, editPlant } = usePlantStore();
  const plant = plants.find((i) => i.id === plantId);

  const label =
    plant?.name && plant?.name.length > 20
      ? plant?.name.substring(0, 20) + ' ...'
      : plant?.name;

  const [imageUri, setImageUri] = useState<string>();
  const router = useRouter();
  const success = useShowSuccess();

  const {
    formState: { errors, isSubmitting },
    ...form
  } = useForm<PlantSchema>({
    defaultValues: { name: '', frequency: '' },
  });

  const handleImage = async () => {
    if (Platform.OS === 'web') return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      legacy: true,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async (data: PlantSchema) => {
    await new Promise((t) => setTimeout(t, 1000));
    editPlant({
      name: data.name,
      frequency: Number(data.frequency),
      plantId: String(plantId),
      imageUri: imageUri ?? undefined,
      removeImage: false,
    });
    form.reset();
    success('Plant added successfully');
    router.navigate(`/(home)`);
  };

  const reset = () => {
    form.reset();
    setImageUri('');
  };

  useEffect(() => {
    plant
      ? form.reset({ name: plant.name, frequency: String(plant.frequency) })
      : form.reset({ name: '', frequency: '' });
  }, [plantId]);

  return (
    <>
      <ScreenHeader
        title={plant ? `${label}` : 'Edit project details'}
        link={`/plants/${plantId}`}
        linkText="Back to project"
        linkIcon={
          <Entypo name="home" size={18} color={themeColors.colorWhite} />
        }
      />
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: themeColors.colorWhite }}
      >
        <ScreenWrapper className="p-8 py-4">
          <VStack className="flex gap-4">
            <Button
              variant="link"
              className="flex-1 justify-center items-center"
              onPress={handleImage}
            >
              <ButtonText>
                {imageUri ? (
                  <Image src={imageUri} width={150} height={150} />
                ) : (
                  <View className="h-37.5 opacity-40">
                    <FontAwesome
                      name="image"
                      size={150}
                      color={themeColors.colorLightOrage}
                    />
                  </View>
                )}
              </ButtonText>
            </Button>
            <View>
              <Text className="text-primary">Name of the project</Text>
              <FormInput
                control={form.control}
                name="name"
                placeholder="Enter name of the project"
                returnKeyType="next"
                errorMsg={errors.name?.message}
              />
            </View>
            <View>
              <Text className="text-primary">
                Tentative complition timeline (in days)
              </Text>
              <FormInput
                control={form.control}
                name="frequency"
                placeholder="Enter timeline"
                returnKeyType="done"
                keyboardType="number-pad"
                errorMsg={errors.frequency?.message}
              />
            </View>
            <FormButton
              onPress={form.handleSubmit(handleSubmit)}
              isSubmitting={isSubmitting}
              title="Submit"
              isSubmittingTitle="Submitting ..."
            />
            <Button variant="secondary" onPress={reset}>
              <ButtonText className={themeColors.colorBlack}>Reset</ButtonText>
            </Button>
            <ConfirmPlantDeleteModal
              id={String(plantId)}
              buttonOrIcon={false}
              redirectLink={`/(home)`}
            />
          </VStack>
        </ScreenWrapper>
      </KeyboardAwareScrollView>
    </>
  );
};
export default EditPlantDetails;
