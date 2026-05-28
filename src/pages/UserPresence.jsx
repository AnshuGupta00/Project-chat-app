import {useEffect, useState} from 'react';
import {ref, set, onDisconnect,serverTimestamp} from 'firebase/database';
import {rtdb} from '../firebase';

export const UserPresence =(userID )=> {
    useEffect(() => {
        if (!userID) return;
        const userStatusRef =ref(rtdb, `status/${userID}`);

        // Set Online when online 

        set(userStatusRef, {
            state:"online",
            lastChanged: serverTimestamp()
        });

        // Auto Set Offline when offline

        onDisconnect(userStatusRef).set({
            state:"offline",
            lastChanged: serverTimestamp(),
        });

        return ()=>{
            set(userStatusRef,{
                state:"offline",
                lastChanged: serverTimestamp(),
            });
        };

    },[userID]);

};