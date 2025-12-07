// app/_components/AudioManager.jsx
"use client";
import { useAudio } from "../_context/AudioContext";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AudioManager() {
    const { changeSource, isReady, isPaused } = useAudio(false);
    const pathname = usePathname();

    useEffect(() => {
        if (!isReady && isPaused) {
            changeSource("/audio/horror_ambiance.mp3", true);
        }
    }, []);

    return null;
}
