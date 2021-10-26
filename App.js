import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import {
  TourGuideProvider, // Main provider
  TourGuideZone, // Main wrapper of highlight component
  TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
  useTourGuideController, // hook to start, etc.
} from 'rn-tourguide';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const uri =
  'https://pbs.twimg.com/profile_images/1223192265969016833/U8AX9Lfn_400x400.jpg';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const AppContent = () => {
    const iconProps = {size: 40, color: '#888'};
    // Use Hooks to control!
    const {start, canStart, stop, eventEmitter} = useTourGuideController();

    useEffect(() => {
      // start at mount
      if (canStart) {
        start();
      }
    }, [canStart]); // wait until everything is registered
    useEffect(() => {
      eventEmitter.on('start', () => console.log('start'));
      eventEmitter.on('stop', () => console.log('stop'));
      eventEmitter.on('stepChange', () => console.log(`stepChange`));
      return () => eventEmitter.off('*', null);
    }, []);

    return (
      <View style={styles.container}>
        <TourGuideZone
          keepTooltipPosition
          zone={2}
          text={'MVA 10 App Onboarding 🎉'}
          borderRadius={16}>
          <Text style={styles.title}>{'MVA SQUAD\n"MVA 10 App Tour"'}</Text>
        </TourGuideZone>
        <View style={styles.middleView}>
          <TouchableOpacity style={styles.button} onPress={() => start()}>
            <Text style={styles.buttonText}>START YOUR TOUR!</Text>
          </TouchableOpacity>
          <TourGuideZone zone={3} shape={'rectangle_and_keep'}>
            <TouchableOpacity style={styles.button} onPress={() => start(4)}>
              <Text style={styles.buttonText}>Move to Voda cash</Text>
            </TouchableOpacity>
          </TourGuideZone>
          <TouchableOpacity style={styles.button} onPress={() => start(5)}>
            <Text style={styles.buttonText}>Move to Tobi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={stop}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
          <TourGuideZone
            zone={7}
            shape="circle"
            text={'Click here to view your profile 🍮💯'}>
            <Image
              source={require('./vodafone_icon.png')}
              style={styles.profilePhoto}
            />
          </TourGuideZone>
        </View>
        <View style={styles.row}>
          <TourGuideZone
            zone={4}
            shape={'circle'}
            tooltipBottomOffset={10}
            text={'Click here to view your vodafone cash profile'}>
            <Image source={require('./cash.png')} style={styles.tobi} />
          </TourGuideZone>
          <Image source={require('./phone_book.png')} style={styles.tobi} />
          <TourGuideZone
            zone={5}
            shape={'circle'}
            text={'Click here to chat with tobi'}>
            <Image source={require('./tobi.png')} style={styles.tobi} />
          </TourGuideZone>
          <TourGuideZone
            zone={6}
            shape={'circle'}
            text={'Click here to switch app profiles'}>
            <Image source={require('./phone.png')} style={styles.tobi} />
          </TourGuideZone>
        </View>
        {/* <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              top: 250,
              left: 50,
              width: 64,
              height: 64,
              backgroundColor: 'red',
            },
          ]}
        /> */}
        {/* {Platform.OS !== 'web' ? (
          <TourGuideZoneByPosition
            zone={1}
            shape={'circle'}
            isTourGuide
            top={250}
            left={50}
            width={64}
            height={64}
          />
        ) : null} */}
      </View>
    );
  };

  return (
    <TourGuideProvider {...{borderRadius: 16, androidStatusBarVisible: true}}>
      <AppContent />
    </TourGuideProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginVertical: 20,
  },
  tobi: {
    width: 40,
    height: 40,
    borderRadius: 70,
    marginHorizontal: 20,
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  row: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
});

export default App;
