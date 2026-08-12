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
};

type PlantsState = {
  nextId: number;
  plants: PlantType[];
  addPlant: ({ name, frequency, imageUri }: AddPlantProps) => void;
  removePlant: (plantId: string) => void;
  waterPlant: (plantId: string) => void;
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

        const filename = `${new Date().getTime()}-${imageUri?.split('/').slice(-1)[0]}`;

        const savedImg = new FileSystem.File(
          FileSystem.Paths.document,
          filename,
        );

        await selectedImg?.copy(savedImg);

        set((state) => {
          return {
            ...state,
            nextId: state.nextId + 1,
            plants: [
              {
                id: String(state.nextId),
                name,
                frequency,
                imageUri: savedImg.uri,
              },
              ...state.plants,
            ],
          };
        });
      },
      removePlant: (plantId: string) => {
        set((state) => {
          return {
            ...state,
            plants: state.plants.filter((plant) => plant.id !== plantId),
          };
        });
      },
      waterPlant: (plantId: string) => {
        set((state) => {
          return {
            ...state,
            plants: state.plants.map((plant) => {
              if (plant.id === plantId) {
                return {
                  ...plant,
                  lastWateredAtTimestamp: Date.now(),
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
