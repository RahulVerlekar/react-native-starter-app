import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export const fonts = {
  'DMSans-Regular': require('../../assets/fonts/DMSans-Regular.ttf'),
  'DMSans-Medium': require('../../assets/fonts/DMSans-Medium.ttf'),
  'DMSans-Bold': require('../../assets/fonts/DMSans-Bold.ttf'),
  'DMSans-Italic': require('../../assets/fonts/DMSans-Italic.ttf'),
  'DMSans-MediumItalic': require('../../assets/fonts/DMSans-MediumItalic.ttf'),
  'DMSans-BoldItalic': require('../../assets/fonts/DMSans-BoldItalic.ttf'),
  'DMSerifDisplay-Regular': require('../../assets/fonts/DMSerifDisplay-Regular.ttf'),
  'DMSerifDisplay-Italic': require('../../assets/fonts/DMSerifDisplay-Italic.ttf'),
  'DMSerifText-Regular': require('../../assets/fonts/DMSerifText-Regular.ttf'),
  'DMSerifText-Italic': require('../../assets/fonts/DMSerifText-Italic.ttf'),
};

export async function loadFonts(): Promise<void> {
  try {
    await Font.loadAsync(fonts);
  } catch (e) {
    console.warn('Error loading fonts:', e);
    throw e;
  }
}
