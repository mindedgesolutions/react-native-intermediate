import ScreenHeader from '@/components/layout/ScreenHeader';
import Entypo from '@expo/vector-icons/Entypo';
import { themeColors } from '@/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Platform, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { useProjectStore } from '@/store/project.store';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { projectSchema, type ProjectSchema } from '@/schema/project.schema';
import { useEffect, useState } from 'react';
import useShowSuccess from '@/components/alert-hooks/show.success';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FormInput from '@/components/form/FormInput';
import FormButton from '@/components/form/FormButton';
import * as ImagePicker from 'expo-image-picker';
import ConfirmPlantDeleteModal from '@/components/modals/ConfirmPlantDeleteModal';
import { zodResolver } from '@hookform/resolvers/zod';
import FormRequired from '@/components/form/FormRequired';
import FormDatepicker from '@/components/form/FormDatepicker';
import AntDesign from '@expo/vector-icons/AntDesign';
import FormTextarea from '@/components/form/FormTextarea';

const EditPlantDetails = () => {
  const { plantId } = useLocalSearchParams();
  const { projects, editProject } = useProjectStore();
  const project = projects.find((i) => i.id === plantId);

  const label =
    project?.name && project?.name.length > 20
      ? project?.name.substring(0, 20) + ' ...'
      : project?.name;

  const [imageUri, setImageUri] = useState<string>();
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

  const handleSubmit = async (data: ProjectSchema) => {
    await new Promise((t) => setTimeout(t, 300));
    editProject({
      name: data.name,
      startDate: data.startDate as Date,
      timeline: Number(data.timeline),
      projectDetails: data.projectDetails ?? undefined,
      otherDetails: data.otherDetails ?? undefined,
      imageUri: imageUri ?? undefined,
      projectId: String(plantId),
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
    if (project) {
      form.reset({
        name: project.name,
        startDate: project.startDate,
        timeline: String(project.timeline),
        projectDetails: project.projectDetails,
        otherDetails: project.otherDetails,
      });
      setImageUri(project.imageUri);
    } else {
      form.reset({
        name: '',
        startDate: undefined,
        timeline: '',
        projectDetails: '',
        otherDetails: '',
      });
      setImageUri('');
    }
  }, [plantId]);

  return (
    <>
      <ScreenHeader
        title={project ? `${label}` : 'Edit project details'}
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
                  <Image
                    src={imageUri}
                    width={200}
                    height={200}
                    className="rounded-lg"
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
