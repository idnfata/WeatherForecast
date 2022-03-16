import React, {useEffect} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {Container} from '../../components';
import {colors} from '../../utils';

const Splash = ({navigation}) => {
  // console.log(props);

  useEffect(() => {
    console.log(navigation);
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  }, []);
  return (
    <Container>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator color={colors.default} size="large" />
      </View>
    </Container>
  );
};

export default Splash;
