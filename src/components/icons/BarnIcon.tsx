import { Image } from 'react-native';
import React from 'react';

const BarnIcon = () => {
    return (
        <Image
            source={require('../../../public/barn.png')} // Local do png
            style={{ width: 35, height: 35 }} // Dimensões
        />
    );
};

export default BarnIcon;
