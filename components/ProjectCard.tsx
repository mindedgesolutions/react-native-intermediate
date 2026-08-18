import { Image, View } from 'react-native';
import { AppLogo } from './AppLogo';
import { Text } from './ui/text';
import { ProjectType } from '@/store/project.store';
import ConfirmPlantDeleteModal from './modals/ConfirmPlantDeleteModal';
import { Link } from 'expo-router';
import StatusBadge from './layout/StatusBadge';

const ProjectCard = ({ project }: { project: ProjectType }) => {
  return (
    <Link href={`/plants/${project.id}`} className="p-2.5 bg-card rounded-lg">
      <View className="w-full flex flex-row justify-between items-center">
        <View className="flex flex-row justify-start items-center gap-4">
          {project.imageUri ? (
            <Image
              src={project.imageUri}
              width={100}
              height={100}
              className="rounded-lg"
            />
          ) : (
            <View className="w-25 h-25 flex justify-center items-center">
              <AppLogo width={40} height={70} />
            </View>
          )}
          <View className="flex gap-4">
            <Text className="text-base text-app-orange-foreground font-bold tracking-wider">
              {project.name}
            </Text>
            <View className="flex flex-row gap-3">
              <Text className="text-sm text-muted-foreground font-medium tracking-wider">
                {project.timeline} days
              </Text>
              <StatusBadge
                label={
                  project.lastWateredAtTimestamp ? 'completed' : 'on-going'
                }
                className={
                  project.lastWateredAtTimestamp ? 'bg-app-orange' : undefined
                }
              />
            </View>
          </View>
        </View>
        <ConfirmPlantDeleteModal id={project.id} />
      </View>
    </Link>
  );
};
export default ProjectCard;
