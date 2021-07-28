import React from 'react';

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IArtifactDb, IArtifactSetDb, ICharacterDb, IWeaponDb } from './data/types';

interface IState {
  characterIdMap: {[shortname: string]: string},
  selectedCharacter: string,
  artifactDb: IArtifactDb,
  artifactSetDb: IArtifactSetDb,
  characterDb: ICharacterDb,
  weaponDb: IWeaponDb,
  elementColor: string,
  dbLoaded: boolean
}

const initialState: IState = {
  characterIdMap: {},
  selectedCharacter: '',
  artifactSetDb: {},
  artifactDb: {},
  weaponDb: {},
  characterDb: {},
  elementColor: "",
  dbLoaded: false
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCharacterIdMap: (state, action: PayloadAction<{[shortname: string]: string}>) => {
      state.characterIdMap = action.payload
    },
    selectCharacter: (state, action: PayloadAction<string>) => {
      state.selectedCharacter = action.payload
    },
    setArtifactDb: (state, action: PayloadAction<IArtifactDb>) => {
      state.artifactDb = action.payload
    },
    setArtifactSetDb: (state, action: PayloadAction<IArtifactSetDb>) => {
      state.artifactSetDb = action.payload
    },
    setWeaponDb: (state, action: PayloadAction<IWeaponDb>) => {
      state.weaponDb = action.payload
    },
    setCharacterDb: (state, action: PayloadAction<ICharacterDb>) => {
      state.characterDb = action.payload
    },
    setElementColor: (state, action: PayloadAction<string>) => {
      state.elementColor = action.payload
    },
    setDbLoaded: (state, action: PayloadAction<boolean>) => {
      state.dbLoaded = action.payload
    }
  }
})

export const { 
  setCharacterIdMap,
  selectCharacter,
  setArtifactDb,
  setArtifactSetDb,
  setWeaponDb,
  setCharacterDb,
  setElementColor,
  setDbLoaded
} = dataSlice.actions;

const store = configureStore({ reducer: { data: dataSlice.reducer } })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;