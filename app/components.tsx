import React, { ReactNode } from 'react';
import { View, StyleSheet, ScrollView, Pressable, GestureResponderEvent } from 'react-native';
import { H1, H2, H3, Body, Caption } from './components/Typography';
import { useTheme } from './theme/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { NavLink } from './components/NavLink';
import { router } from 'expo-router';

export default function ComponentsShowcase() {
  const { theme } = useTheme();
  
  // Sample button component using typography
  interface ButtonProps {
    title: string;
    variant?: 'primary' | 'secondary';
    onPress: (event: GestureResponderEvent) => void;
  }
  
  const Button: React.FC<ButtonProps> = ({ title, variant = 'primary', onPress }) => {
    const isPrimary = variant === 'primary';
    
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: isPrimary ? theme.colors.primary : 'transparent',
            borderColor: theme.colors.primary,
            borderWidth: isPrimary ? 0 : 1,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <Body style={{ 
          color: isPrimary ? theme.colors.onPrimary : theme.colors.primary,
          fontFamily: theme.typography.fontFamily.medium, 
          textAlign: 'center'
        }}>
          {title}
        </Body>
      </Pressable>
    );
  };

  // Sample card component
  interface CardProps {
    title?: string;
    description?: string;
    children: ReactNode;
  }
  
  const Card: React.FC<CardProps> = ({ title, description, children }) => {
    return (
      <View style={[
        styles.card,
        { 
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        }
      ]}>
        {title && <H3 style={styles.cardTitle}>{title}</H3>}
        {description && <Body style={styles.cardDescription}>{description}</Body>}
        {children}
      </View>
    );
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]} 
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.section}>
        <H1>UI Components</H1>
        <Body style={styles.description}>
          Examples of UI components using our typography system
        </Body>
      </View>

      <View style={styles.section}>
        <H2>Buttons</H2>
        <View style={styles.buttonRow}>
          <Button 
            title="Primary Button" 
            variant="primary"
            onPress={() => console.log('Primary button pressed')}
          />
          <Button 
            title="Secondary Button" 
            variant="secondary"
            onPress={() => console.log('Secondary button pressed')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <H2>Cards</H2>
        <Card 
          title="Card Title"
          description="This is a sample card component using our typography system for consistent text styling."
        >
          <Body style={{ marginVertical: 8 }}>
            Cards can contain additional content like buttons, images, or other components.
          </Body>
          <Button 
            title="Card Action" 
            variant="secondary" 
            onPress={() => console.log('Card action pressed')}
          />
        </Card>

        <Card title="Information Card">
          <Body style={{ marginVertical: 8 }}>
            Information cards can be used to display important information or tips to users.
          </Body>
          <Caption>Last updated: Today</Caption>
        </Card>
      </View>

      <View style={styles.section}>
        <H2>Navigation & Links</H2>
        <Card>
          <NavLink to="/typography">Go to Typography Showcase</NavLink>
          <View style={{ height: 16 }} />
          <NavLink to="/homepage">Go to Homepage</NavLink>
        </Card>
      </View>

      <View style={styles.section}>
        <H2>Theme Toggle</H2>
        <Card description="Switch between light and dark themes:">
          <View style={styles.toggleContainer}>
            <ThemeToggle />
          </View>
        </Card>
      </View>
      
      <View style={styles.section}>
        <Button 
          title="Back to Home" 
          variant="primary"
          onPress={() => router.push('/homepage')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  description: {
    marginTop: 8,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 150,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
  },
  cardTitle: {
    marginBottom: 8,
  },
  cardDescription: {
    marginBottom: 12,
  },
  toggleContainer: {
    alignItems: 'center',
    marginVertical: 8,
  }
});