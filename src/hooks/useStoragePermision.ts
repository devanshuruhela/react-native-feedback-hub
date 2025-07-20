import { useCallback, useState } from 'react';
import { Platform, PermissionsAndroid, Alert, Linking } from 'react-native';

export const useStoragePermission = () => {
  const [granted, setGranted] = useState(false);

  const isAndroid11OrAbove =
    Platform.OS === 'android' && Platform.Version >= 30;

  const requestPermission = useCallback(async () => {
    if (Platform.OS !== 'android' || isAndroid11OrAbove) {
      setGranted(true);
      return true;
    }

    try {
      const readGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message:
            'This app needs access to your storage to generate thumbnails.',
          buttonPositive: 'OK',
        },
      );

      const writeGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Write Access Needed',
          message: 'We need write permission to save feedback recordings.',
          buttonPositive: 'OK',
        },
      );

      const allGranted =
        readGranted === PermissionsAndroid.RESULTS.GRANTED &&
        writeGranted === PermissionsAndroid.RESULTS.GRANTED;

      if (!allGranted) {
        Alert.alert(
          'Permission Required',
          'Please grant storage permissions from Settings to continue.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        return false;
      }

      setGranted(true);
      return true;
    } catch (err) {
      console.warn('Permission error', err);
      return false;
    }
  }, [isAndroid11OrAbove]);

  return { granted, requestPermission };
};
