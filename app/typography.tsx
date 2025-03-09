import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Text } from 'react-native';
import { H1, H2, H3, H4, Body, Caption, Typography } from './components/Typography';
import { useTheme } from './theme/ThemeContext';

export default function TypographyShowcase() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.section}>
          <H1>Typography Examples</H1>
          <Body style={styles.description}>
            This screen shows examples of all available text styles in the application.
          </Body>
        </View>

        <View style={styles.section}>
          <H2>Heading Styles</H2>
          
          <View style={styles.example}>
            <H1>Heading 1 (xxl)</H1>
            <Caption style={styles.caption}>
              Font size: {theme.typography.fontSize.xxl}px • Bold
            </Caption>
          </View>
          
          <View style={styles.example}>
            <H2>Heading 2 (xl)</H2>
            <Caption style={styles.caption}>
              Font size: {theme.typography.fontSize.xl}px • Bold
            </Caption>
          </View>
          
          <View style={styles.example}>
            <H3>Heading 3 (lg)</H3>
            <Caption style={styles.caption}>
              Font size: {theme.typography.fontSize.lg}px • Bold
            </Caption>
          </View>
          
          <View style={styles.example}>
            <H4>Heading 4 (md)</H4>
            <Caption style={styles.caption}>
              Font size: {theme.typography.fontSize.md}px • Medium
            </Caption>
          </View>
        </View>

        <View style={styles.section}>
          <H2>Body Text</H2>
          
          <View style={styles.example}>
            <Body>
              Body text is used for the main content of the application. 
              It uses the regular font weight and has good readability.
              The line height is optimized for comfortable reading.
            </Body>
            <Caption style={styles.caption}>
              Font size: {theme.typography.fontSize.md}px • Regular
            </Caption>
          </View>
        </View>

        <View style={styles.section}>
          <H2>Caption Text</H2>
          
          <View style={styles.example}>
            <Caption>
              Caption text is used for secondary information, hints, and smaller text elements.
              It's smaller and can be used for less important information.
            </Caption>
            <Caption style={styles.caption}>
              Font size: {theme.typography.fontSize.xs}px • Regular
            </Caption>
          </View>
        </View>

        <View style={styles.section}>
          <H2>Color Variations</H2>
          
          <View style={styles.example}>
            <Typography style={{ color: theme.colors.primary }}>Primary Color</Typography>
            <Typography style={{ color: theme.colors.secondary }}>Secondary Color</Typography>
            <Typography style={{ color: theme.colors.tertiary }}>Tertiary Color</Typography>
            <Typography style={{ color: theme.colors.error }}>Error Color</Typography>
            <Typography style={{ color: theme.colors.success }}>Success Color</Typography>
          </View>
        </View>

        <View style={styles.section}>
          <H2>All Defined Colors</H2>
          {Object.entries(theme.colors).map(([colorName, colorValue]) => (
            <View key={colorName} style={styles.colorExample}>
              <View style={[styles.colorBox, { backgroundColor: colorValue }]} />
              <Text style={styles.colorName}>{colorName}</Text>
              <Text style={styles.colorValue}>{colorValue}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  example: {
    marginVertical: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  caption: {
    marginTop: 8,
  },
  description: {
    marginTop: 8,
    marginBottom: 16,
  },
  colorExample: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  colorBox: {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: 4,
  },
  colorName: {
    flex: 1,
    fontSize: 16,
  },
  colorValue: {
    fontSize: 16,
    color: 'gray',
  },
});