import { createSlice } from "@reduxjs/toolkit";

export const collectionsSlice = createSlice({
    name:"collections",
    initialState:{
        legaCollections:[],
        legaCollectionArtifact:null,
        objectCollections:[],
        objectCollectionABI:null

    },
    reducers:{   

        setLegaCollection:(state,action)=>{
            state.legaCollections.push(action.payload);
        },
        setObjectCollection:(state,action)=>{
            state.objectCollections.push(action.payload);
        },

        setLegaCollectionsArtifact:(state,action)=>{
            state.legaCollectionArtifact = action.payload;
        },
        setObjectCollectionsABI:(state,action)=>{
            state.objectCollectionABI = action.payload;
        },
      
        
    }
});

export const {setLegaCollections,setObjectCollections,setLegaCollectionsArtifact,setObjectCollectionsABI} = collectionsSlice.actions;
export default collectionsSlice.reducer;
