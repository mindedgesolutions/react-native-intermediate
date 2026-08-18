import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as FileSystem from 'expo-file-system';

export type ProjectType = {
  id: string;
  name: string;
  startDate: Date;
  timeline: number;
  projectDetails?: string;
  otherDetails?: string;
  imageUri?: string;
  lastWateredAtTimestamp?: number;
};

type AddProjectProps = {
  name: string;
  startDate: Date;
  timeline: number;
  projectDetails?: string;
  otherDetails?: string;
  imageUri?: string;
};

type EditProjectProps = {
  projectId: string;
  name: string;
  startDate: Date;
  timeline: number;
  projectDetails?: string;
  otherDetails?: string;
  imageUri?: string;
  removeImage?: boolean;
};

type ProjectState = {
  nextId: number;
  projects: ProjectType[];
  addProject: ({
    name,
    startDate,
    timeline,
    projectDetails,
    otherDetails,
    imageUri,
  }: AddProjectProps) => void;
  editProject: ({
    name,
    startDate,
    timeline,
    projectDetails,
    otherDetails,
    imageUri,
    projectId,
    removeImage,
  }: EditProjectProps) => void;
  removeProject: (projectId: string) => void;
  toggleProject: (projectId: string, status: string) => void;
};

// Store name changed

export const useProjectStore = create(
  persist<ProjectState>(
    (set) => ({
      projects: [],
      nextId: 1,
      addProject: async ({
        name,
        startDate,
        timeline,
        projectDetails,
        otherDetails,
        imageUri,
      }: AddProjectProps) => {
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
            projects: [
              {
                id: String(state.nextId),
                name,
                startDate,
                timeline,
                projectDetails,
                otherDetails,
                imageUri: savedImg ? savedImg?.uri : undefined,
              },
              ...state.projects,
            ],
          };
        });
      },
      editProject: async ({
        name,
        startDate,
        timeline,
        projectDetails,
        otherDetails,
        imageUri,
        projectId,
        removeImage,
      }: EditProjectProps) => {
        const existingPlant = useProjectStore
          .getState()
          .projects.find((pr) => pr.id === projectId);

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
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  name,
                  startDate,
                  timeline,
                  projectDetails,
                  otherDetails,
                  imageUri: newImageUri,
                }
              : project,
          ),
        }));
      },
      removeProject: (projectId: string) => {
        set((state) => {
          return {
            ...state,
            projects: state.projects.filter((pr) => pr.id !== projectId),
          };
        });
      },
      toggleProject: (projectId: string, status: string) => {
        set((state) => {
          return {
            ...state,
            projects: state.projects.map((project) => {
              if (project.id === projectId) {
                const lastUpdated =
                  status === 'incomplete' ? undefined : Date.now();
                return {
                  ...project,
                  lastWateredAtTimestamp: lastUpdated,
                };
              }
              return project;
            }),
          };
        });
      },
    }),
    {
      name: 'project-mgmt-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
