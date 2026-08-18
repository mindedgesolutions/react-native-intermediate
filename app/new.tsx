import ScreenHeader from '@/components/layout/ScreenHeader';
import { themeColors } from '@/theme';
import Entypo from '@expo/vector-icons/Entypo';
import { Image, Platform, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, type ProjectSchema } from '@/schema/project.schema';
import { VStack } from '@/components/ui/vstack';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import { Text } from '@/components/ui/text';
import FormInput from '@/components/form/FormInput';
import FormButton from '@/components/form/FormButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useProjectStore } from '@/store/project.store';
import { useRouter } from 'expo-router';
import useShowSuccess from '@/components/alert-hooks/show.success';
import { Button, ButtonText } from '@/components/ui/button';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import FormRequired from '@/components/form/FormRequired';
import Ionicons from '@expo/vector-icons/Ionicons';
import FormTextarea from '@/components/form/FormTextarea';
import FormDatepicker from '@/components/form/FormDatepicker';

const NewPlantScreen = () => {
  const [imageUri, setImageUri] = useState<string>();
  const { addProject } = useProjectStore();
  const router = useRouter();
  const success = useShowSuccess();

  const {
    formState: { errors, isSubmitting },
    ...form
  } = useForm<ProjectSchema>({
    defaultValues: {
      name: '',
      startDate: undefined,
      timeline: '',
      projectDetails: '',
      otherDetails: '',
    },
    mode: 'all',
    resolver: zodResolver(projectSchema),
  });

  const handleSubmit = async (data: ProjectSchema) => {
    await new Promise((t) => setTimeout(t, 300));
    addProject({
      name: data.name,
      startDate: data.startDate as Date,
      timeline: Number(data.timeline),
      projectDetails: data.projectDetails ?? undefined,
      otherDetails: data.otherDetails ?? undefined,
      imageUri: imageUri ?? undefined,
    });
    form.reset();
    success('Project added successfully');
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
        title="Add new project"
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
                  <Image
                    src={imageUri}
                    width={200}
                    height={200}
                    className="rounded-2xl"
                  />
                ) : (
                  <View className="h-50 opacity-40">
                    <FontAwesome
                      name="image"
                      size={200}
                      color={themeColors.colorLightOrage}
                    />
                  </View>
                )}
              </ButtonText>
            </Button>
            <View>
              <View className="flex flex-row gap-1">
                <Text className="text-primary">Name of the project</Text>
                <FormRequired />
              </View>
              <FormInput
                control={form.control}
                name="name"
                placeholder="Enter name of the project"
                returnKeyType="next"
                errorMsg={errors.name?.message}
                iconPosition="right"
                icon={
                  <Ionicons
                    name="briefcase-outline"
                    size={20}
                    color={themeColors.colorLightGray}
                  />
                }
              />
            </View>
            <View>
              <View className="flex flex-row gap-1">
                <Text className="text-primary">Tentative start date</Text>
                <FormRequired />
              </View>
              <FormDatepicker
                control={form.control}
                name="startDate"
                minYear={new Date().getFullYear() - 5}
                maxYear={new Date().getFullYear() + 5}
              />
            </View>
            <View>
              <View className="flex flex-row gap-1">
                <Text className="text-primary">
                  Tentative complition timeline (in days)
                </Text>
                <FormRequired />
              </View>
              <FormInput
                control={form.control}
                name="timeline"
                placeholder="Enter timeline"
                returnKeyType="done"
                keyboardType="number-pad"
                errorMsg={errors.timeline?.message}
                iconPosition="right"
                icon={
                  <AntDesign
                    name="clock-circle"
                    size={20}
                    color={themeColors.colorLightGray}
                  />
                }
              />
            </View>
            <View>
              <Text className="text-primary">Project details</Text>
              <FormTextarea
                control={form.control}
                name="projectDetails"
                placeholder="Enter timeline"
                errorMsg={errors.projectDetails?.message}
              />
            </View>
            <View>
              <Text className="text-primary">Other details</Text>
              <FormTextarea
                control={form.control}
                name="otherDetails"
                placeholder="Enter timeline"
                errorMsg={errors.otherDetails?.message}
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
          </VStack>
        </ScreenWrapper>
      </KeyboardAwareScrollView>
    </>
  );
};
export default NewPlantScreen;
