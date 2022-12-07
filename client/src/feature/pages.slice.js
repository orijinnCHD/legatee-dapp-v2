import { createSlice } from "@reduxjs/toolkit";

export const pagesSlice = createSlice({
    name:"pages",
    initialState:{
        isTokeniseHome:null,
        choiceCreateCollection:null,
        collections:[],
        collectionsMP:[],
        tokens:[],
        NFTS:[],

    },
    reducers:{   
        setIsTokeniseHome:(state,action)=>{
            state.isTokeniseHome=action.payload;
        },
        setChoiceCreateCollection:(state,action)=>{
            state.choiceCreateCollection = action.payload;
        },
        setCollections:(state,action)=>{
            state.collections.push(action.payload);
        },
        setTokens:(state,action)=>{
            state.tokens.push(action.payload);
        },
        setCollectionsMP:(state,action)=>{
            state.collectionsMP.push(action.payload);
        },
        setNFTS:(state,action)=>{
            state.NFTS.push(action.payload);
        },
        
    }
});

export const {setIsTokeniseHome,setChoiceCreateCollection,setCollections,setTokens,setCollectionsMP,setNFTS} = pagesSlice.actions;
export default pagesSlice.reducer;
