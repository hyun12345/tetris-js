import { useState } from 'react';
import { createCanvas } from '../settingGame';

export const useCanvas = () => {
    const[canvas, setCanvas] = useState(createCanvas());

    return [canvas, setCanvas];
}