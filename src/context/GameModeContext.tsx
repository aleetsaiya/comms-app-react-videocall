import React, { useState, createContext, useContext, useMemo } from 'react';
import { useParticipants, useConference } from '@dolbyio/comms-uikit-react';
import useConferenceCreate from '@src/hooks/useConferenceCreate';
import axios from 'axios';

type GameModeContext = {
  isGameModeActive: boolean;
  toggleGameMode: () => void;
};

const GameModeContext = createContext<GameModeContext>({} as GameModeContext);

type AppProviderProps = { children: React.ReactNode };

export const GameModeProvider = ({ children }: AppProviderProps) => {
  const [isGameModeActive, setIsGameModeActivate] = useState(false);
  
  const { conference } = useConference();
  const { participants } = useParticipants();
  const { username } = useConferenceCreate();

  console.log('username:', username);

  console.log('participants', participants);

  const toggleGameMode = async () => {
    const conferenceID = conference?.id;
    // Send message to all participants
    console.log('cid', conferenceID);
    const me = participants.find(p => p.info.name === username);
    // @ts-ignore
    const from = me.id;
    const to = [];
    for (let p of participants) {
      if (p.id !== from) {
        to.push(p.id);
      }
    }

    console.log('from:', from);
    console.log('to:', to);

    if (conferenceID) {
      // const headers = {
      //   'accept': 'application/json',
      //   'authorization': 'eyJ0eXAiOiJKV1QiLCJraWQiOiI1ODExQjE0RS1DQzVCLTQ4QkQtQTNEOC1DREQxQzUzQ0ZDNUMiLCJhbGciOiJSUzUxMiJ9.eyJpc3MiOiJkb2xieS5pbyIsImlhdCI6MTY4ODQxNTIzOCwic3ViIjoieHRoRW9WeVpzYjJYZHFQTHZPSEYxdz09IiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DVVNUT01FUiJdLCJ0YXJnZXQiOiJhcGkiLCJvaWQiOiJjYjNkYzc3YS04OGZlLTRiMDUtYjQ4NS04ZGRjYTlmYmMyYjgiLCJhaWQiOiJiMTAzOGVmOS0wZmYzLTQzOGUtODhiOC0zMTIyMmVmMzhjZjQiLCJiaWQiOiI4YTM2OGU2Mjg5MDE3NTZiMDE4OTFiMDQ5MWU4MmU5YSIsImV4cCI6MTY4ODQxNzAzOH0.GOn1hxJiZM2uG2PXtru4BaiAx094TOUzmdJuDUzVrDO5kPhXQodnHUBGFhyZvYK7p3Ra4-pnbXD6UYxlcXVZTW8O3mOtKkoCxx-uiDhA8mIaFTAkXLVaWIyq8S7UmGywjf_jTV_gUvueY5rYTMNOCgO64wp2bGo_pv3-S9Pq-zXnn3XgRJSdJLjB4-TKvOSZvxmHeEJXNwdZ9Aphh6rj69uRBqI5qaX_2XfjL6tfI89D10kBxCa3g6vxm2CyfonoHOlch2bjqzO-yiUqLNv6P_DIy2WhwVdL7LQbL8NgQrLV_aeCb-PG2-KqV8pjYTglEttZBzz3VHFNnqLjb6WltVp5wMo_c3exhLbJsIiYkowpYRuPXxJw8l9en8XoSFIc2YR_56RBolf_9yuuMKJhwZo7KcSwgzZjOiphQnxLacDNKSl_hCo9p8aj7_M_8lS3tf-LIDU0awrHYTvBvGEMr6ASSqTQWsrZVdD9evZ7ag9lLZXpma3xtHmcT7W4WUSkjt5TabeippdxcuZO_mMqsT1VgkkhvstoRL1o71kTz3W9UrvqYSYlcUMiC3wdcB4kHULJglm7C-rqYdaT-5plawTjbiatRSRTnu9Z7uqF6wrMSAUmrz8lqxkHVBigazgq6LGUClQgyvXZbxfMpQG5iFZQx9Gjf1bVpcvn7yr5TyU',
      //   'content-type': 'application/json'
      // }
      // const data = {
      //   from,
      //   to,
      //   message: 'TestingMessage. Yo!!!!!'
      // };
      // const res = await axios.post(`https://comms.api.dolby.io/v2/conferences/${conferenceID}/message`, data, {
      //   headers: headers
      // });
      // console.log('Sent message!', res.status);
      setIsGameModeActivate(!isGameModeActive);

    }
  }

  const contextValue: GameModeContext = useMemo(() => ({
    toggleGameMode,
    isGameModeActive
  }), [isGameModeActive, toggleGameMode])

  return <GameModeContext.Provider value={contextValue}>{children}</GameModeContext.Provider>
}

export const useGameMode = () => {
  return useContext(GameModeContext);
}