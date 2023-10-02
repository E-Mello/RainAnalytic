import { Image } from 'react-native';
import React from 'react';

const FieldIcon = () => {
    return (
        <Image
            source={require('../../public/field.png')} // Local do png
            style={{ width: 49, height: 49 }} // Dimensões
        />
    );
};

export default FieldIcon;
