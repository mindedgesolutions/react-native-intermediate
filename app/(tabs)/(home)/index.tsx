import useShowSuccess from '@/components/alert-hooks/show.success';
import ScreenHeader from '@/components/layout/ScreenHeader';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import { Button, ButtonText } from '@/components/ui/button';
import { useUserStore } from '@/store/user.store';
import { FlatList, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { themeColors } from '@/theme';
import { Link } from 'expo-router';
import PlantCard from '@/components/PlantCard';
import { usePlantStore } from '@/store/plant.store';
import TextWrapper from '@/components/layout/TextWrapper';

export default function App() {
  const { toggleHadOnboarded } = useUserStore();
  const success = useShowSuccess();
  const { plants } = usePlantStore();

  const handleClick = () => {
    toggleHadOnboarded();
    success(`You've logged out successfully`);
  };

  return (
    <>
      <ScreenHeader title="Home screen" />
      <ScreenWrapper className="flex-1 p-6">
        <View className="flex-1 gap-8">
          <View className="flex flex-row justify-between items-center">
            <TextWrapper>This is the landing screen</TextWrapper>
            <Link href={`/new`} asChild>
              <Button variant="ghost">
                <AntDesign
                  name="plus-circle"
                  size={24}
                  color={themeColors.colorOrange}
                />
              </Button>
            </Link>
          </View>
          <FlatList
            className="flex-1"
            data={plants}
            renderItem={({ item }) => <PlantCard plant={item} />}
            contentContainerClassName="gap-4 mb-4"
          />
          <Button
            className="mt-8 bg-app-orange-foreground active:bg-app-orange-foreground/70 max-w-32"
            onPress={handleClick}
          >
            <ButtonText>Ok! I'm done</ButtonText>
          </Button>
        </View>
      </ScreenWrapper>
    </>
  );
}
