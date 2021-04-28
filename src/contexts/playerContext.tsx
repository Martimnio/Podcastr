
import {createContext} from'react'
import {useState, useContext, ReactNode} from 'react'

type Episode = {
    title: string;
    members: string;
    thumbnail:string;
    duration:number;
    url:string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    hasNext: boolean;
    hasPrevious: boolean; 
    isLooping:boolean;
    isShuffling:boolean;
    
    play: (episode: Episode) => void;
    playList: (episode: Episode[], index:number) => void;
    togglePlay:() =>void;
    toggleLoop:() =>void;
    toggleShuffle:() =>void;
    setPlayingState:(state: boolean) =>void;
    clearPlayerState:()=>void;
    playNext:() =>void;
    playPrevious:() =>void;


}

export const PlayerContext = createContext({} as PlayerContextData);

type playerContextProviderProps = {
    children:ReactNode;
}

export function PlayerContextProvider({children}) {
    const [episodeList,setEpisodeList] = useState([])
    const [currentEpisodeIndex,setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)


    function play(episode: Episode){
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
    }

    function playList(list:Episode[], index:number){
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    const hasPrevious = currentEpisodeIndex>0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

    function playNext(){

        if(isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex)
        }else  if (hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex+1);
        }
       
        
    }
    function playPrevious(){   
        if (hasPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex-1);
        }
        
    }

    function togglePlay(){
        setIsPlaying(!isPlaying)
    }
    function toggleShuffle(){
        setIsShuffling(!isShuffling)
    }

    function toggleLoop(){
        setIsLooping(!isLooping)
        }

    function setPlayingState(state:boolean){
    setIsPlaying(state);

    }
    function clearPlayerState(){
        setEpisodeList([])
        setCurrentEpisodeIndex(0)
    }

  return(
    <PlayerContext.Provider 
    value={{
        isPlaying,episodeList , 
        currentEpisodeIndex, 
        play, 
        playList,
        playNext,
        playPrevious,
        togglePlay,
        toggleShuffle,
        isShuffling,
        setPlayingState,
        clearPlayerState, 
        hasNext,
        hasPrevious,
        isLooping,
        toggleLoop
        }}>

        {children}

    </PlayerContext.Provider>
  )
}
export const usePlayer = () =>{
    return useContext(PlayerContext)
}