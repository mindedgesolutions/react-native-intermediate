import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as FileSystem from 'expo-file-system';

export type PlantType = {
  id: string;
  name: string;
  frequency: number;
  imageUri?: string;
  lastWateredAtTimestamp?: number;
};

type AddPlantProps = {
  name: string;
  frequency: number;
  imageUri?: string;
  plantId?: string;
};

type EditPlantProps = {
  plantId: string;
  name: string;
  frequency: number;
  imageUri?: string;
  removeImage?: boolean;
};

type PlantsState = {
  nextId: number;
  plants: PlantType[];
  addPlant: ({ name, frequency, imageUri }: AddPlantProps) => void;
  editPlant: ({
    name,
    frequency,
    imageUri,
    plantId,
    removeImage,
  }: EditPlantProps) => void;
  removePlant: (plantId: string) => void;
  waterPlant: (plantId: string, status: string) => void;
};

export const usePlantStore = create(
  persist<PlantsState>(
    (set) => ({
      plants: [],
      nextId: 1,
      addPlant: async ({ name, frequency, imageUri }: AddPlantProps) => {
        const selectedImg = imageUri
          ? new FileSystem.File(imageUri)
          : undefined;

        const filename = imageUri
          ? `${new Date().getTime()}-${imageUri?.split('/').slice(-1)[0]}`
          : undefined;

        const savedImg =
          filename && new FileSystem.File(FileSystem.Paths.document, filename);

        savedImg && (await selectedImg?.copy(savedImg));

        set((state) => {
          return {
            ...state,
            nextId: state.nextId + 1,
            plants: [
              {
                id: String(state.nextId),
                name,
                frequency,
                imageUri: savedImg ? savedImg?.uri : undefined,
              },
              ...state.plants,
            ],
          };
        });
      },
      editPlant: async ({
        name,
        frequency,
        imageUri,
        plantId,
        removeImage,
      }: EditPlantProps) => {
        const existingPlant = usePlantStore
          .getState()
          .plants.find((plant) => plant.id === plantId);

        if (!existingPlant) return;

        let newImageUri = existingPlant.imageUri;

        if (imageUri) {
          const filename = `${Date.now()}-${imageUri.split('/').pop()}`;

          const sourceFile = new FileSystem.File(imageUri);
          const destinationFile = new FileSystem.File(
            FileSystem.Paths.document,
            filename,
          );

          await sourceFile.copy(destinationFile);

          newImageUri = destinationFile.uri;

          // Delete the old image after the new one has been copied successfully
          if (existingPlant.imageUri) {
            try {
              const oldFile = new FileSystem.File(existingPlant.imageUri);

              if (oldFile.exists) {
                oldFile.delete();
              }
            } catch (error) {
              console.warn('Failed to delete old plant image', error);
            }
          }
        }

        // User explicitly removed the image
        if (removeImage && existingPlant.imageUri) {
          try {
            const oldFile = new FileSystem.File(existingPlant.imageUri);

            if (oldFile.exists) {
              oldFile.delete();
            }
          } catch (error) {
            console.warn('Failed to delete plant image', error);
          }

          newImageUri = undefined;
        }

        set((state) => ({
          plants: state.plants.map((plant) =>
            plant.id === plantId
              ? {
                  ...plant,
                  name,
                  frequency,
                  imageUri: newImageUri,
                }
              : plant,
          ),
        }));
      },
      removePlant: (plantId: string) => {
        set((state) => {
          return {
            ...state,
            plants: state.plants.filter((plant) => plant.id !== plantId),
          };
        });
      },
      waterPlant: (plantId: string, status: string) => {
        set((state) => {
          return {
            ...state,
            plants: state.plants.map((plant) => {
              if (plant.id === plantId) {
                const lastUpdated =
                  status === 'incomplete' ? undefined : Date.now();
                return {
                  ...plant,
                  lastWateredAtTimestamp: lastUpdated,
                };
              }
              return plant;
            }),
          };
        });
      },
    }),
    {
      name: 'plantly-plants-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
