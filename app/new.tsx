import ScreenHeader from '@/components/layout/ScreenHeader';
import { themeColors } from '@/theme';
import Entypo from '@expo/vector-icons/Entypo';
import { Image, Platform, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { plantSchema, PlantSchema } from '@/schema/plant.schema';
import { VStack } from '@/components/ui/vstack';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import { Text } from '@/components/ui/text';
import { AppLogo } from '@/components/AppLogo';
import FormInput from '@/components/form/FormInput';
import FormButton from '@/components/form/FormButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { usePlantStore } from '@/store/plant.store';
import { useRouter } from 'expo-router';
import useShowSuccess from '@/components/alert-hooks/show.success';
import { Button, ButtonText } from '@/components/ui/button';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const NewPlantScreen = () => {
  const [imageUri, setImageUri] = useState<string>();
  const { addPlant } = usePlantStore();
  const router = useRouter();
  const success = useShowSuccess();

  const {
    formState: { errors, isSubmitting },
    ...form
  } = useForm<PlantSchema>({
    defaultValues: { name: '', frequency: '' },
    mode: 'all',
    resolver: zodResolver(plantSchema),
  });

  const handleSubmit = async (data: PlantSchema) => {
    await new Promise((t) => setTimeout(t, 1000));
    addPlant({
      name: data.name,
      frequency: Number(data.frequency),
      imageUri: imageUri,
    });
    form.reset();
    success('Plant added successfully');
    router.navigate(`/(home)`);
  };

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

  const reset = () => {
    form.reset();
    setImageUri('');
  };

  return (
    <>
      <ScreenHeader
        title="New plant"
        link={`/(home)`}
        linkText="Back to home"
        linkIcon={
          <Entypo name="home" size={18} color={themeColors.colorWhite} />
        }
      />
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
      >
        <ScreenWrapper className="p-8 py-4">
          <VStack className="flex gap-4">
            <Button
              variant="link"
              className="flex-1 justify-center items-center mb-4"
              onPress={handleImage}
            >
              <ButtonText>
                {imageUri ? (
                  <Image src={imageUri} width={150} height={150} />
                ) : (
                  <AppLogo width={60} height={100} />
                )}
              </ButtonText>
            </Button>
            <View>
              <Text>Name of the plant</Text>
              <FormInput
                control={form.control}
                name="name"
                placeholder="Enter name of the plant"
                returnKeyType="next"
                errorMsg={errors.name?.message}
              />
            </View>
            <View>
              <Text>Watering frequency (every x days)</Text>
              <FormInput
                control={form.control}
                name="frequency"
                placeholder="Enter frequency"
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
            <Button variant="outline" onPress={reset}>
              <ButtonText>Reset</ButtonText>
            </Button>
          </VStack>
        </ScreenWrapper>
      </KeyboardAwareScrollView>
    </>
  );
};
export default NewPlantScreen;
