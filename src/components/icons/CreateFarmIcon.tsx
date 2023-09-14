import { Image } from 'react-native';
import React from 'react';

const CreateFarmIcon = () => {
    return (
        <Image
            source={require('../../../public/farmers.png')} // Local do png
            style={{ width: 35, height: 35 }} // Dimensões
        />
    );
};

export default CreateFarmIcon;
