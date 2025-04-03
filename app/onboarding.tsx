import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Dimensions, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuthToken } from './network/AuthStorage';

const { width } = Dimensions.get('window');

const slides = [
    {
        image: require('../assets/images/bg_slide_1.png'),
        text1: 'Speak your heart',
        text2: 'Express your thoughts aloud, and let AI respond in a way that helps you reflect and process your emotionss the first slide'
    },
    {
        image: require('../assets/images/bg_slide_2.png'),
        text1: 'Track your emotions',
        text2: 'Easily monitor your emotions on a daily, weekly, and monthly basis, gaining insights to help you understand your emotional journey'
    },
    {
        image: require('../assets/images/bg_slide_3.png'),
        text1: 'Embrace your growth',
        text2: 'Embrace your growth with AI-powered insights, helping you reflect and evolve'
    }
];

const OnboardingScreen = () => {
    const router = useRouter();
    const [currentSlide, setCurrentSlide] = useState(0);
    const pagerRef = useRef<PagerView>(null);

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            const nextSlide = currentSlide + 1;
            setCurrentSlide(nextSlide);
            pagerRef.current?.setPage(nextSlide);
        }
    };

    const handlePrevious = () => {
        if (currentSlide > 0) {
            const prevSlide = currentSlide - 1;
            setCurrentSlide(prevSlide);
            pagerRef.current?.setPage(prevSlide);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            const token = await getAuthToken();
            if (token) {
                router.replace("/homepage");
            }
        };
        checkAuth();
    }, []);
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.toolbar}>
                <Image
                    source={require('../assets/images/flow.png')}
                    style={{ width: 78, height: 31, marginLeft: 16 }}
                />
                <View style={{ flex: 1, alignItems: 'center' }}></View>
                <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text style={styles.toolbarText}>Skip</Text>
                </TouchableOpacity>
            </View>

            <PagerView style={styles.pager} ref={pagerRef} initialPage={0} onPageSelected={(e) => setCurrentSlide(e.nativeEvent.position)}>
                {slides.map((slide, index) => (
                    <View key={index} style={styles.page}>
                        <Image source={slide.image} style={styles.image} />
                        <Text style={styles.text1}>{slide.text1}</Text>
                        <Text style={styles.text2}>{slide.text2}</Text>
                    </View>
                ))}
            </PagerView>

            <View style={styles.progressContainer}>
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dash,
                            (currentSlide === index) && styles.activeDash,
                        ]}
                    />
                ))}
            </View>

            <View style={{ flex: 1 }}></View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.slideButton, (currentSlide === 0) && styles.slideButtonDisabled]}
                    onPress={handlePrevious}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.slideButton, (currentSlide === slides.length - 1) && styles.slideButtonDisabled]}
                    onPress={handleNext}>
                    <Ionicons name="arrow-forward" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    toolbar: {
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 24
    },
    toolbarText: {
        color: '#014E44',
        fontSize: 14,
        marginEnd: 16,
        fontFamily: 'DMSans-Regular',
        fontWeight: '700'
    },
    image: {
        width: '100%',
        height: 256,
        resizeMode: 'contain',
        marginBottom: 49,
    },
    text1: {
        fontSize: 18,
        marginBottom: 4,
        fontFamily: 'DMSans-Regular',
        fontWeight: '700',
        color: '#333333',
        marginStart: 16,
        marginEnd: 16,
        textAlign: 'center',
    },
    text2: {
        fontSize: 14,
        marginBottom: 32,
        fontFamily: 'DMSans-Regular',
        fontWeight: '300',
        marginStart: 16,
        marginEnd: 16,
        color: '#333333',
        opacity: 0.8,
        textAlign: 'center',
    },
    progressContainer: {
        width: '100%',
        height: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10
    },
    dash: {
        width: 12,
        height: 4,
        opacity: 0.9,
        backgroundColor: '#eaeaea',
        marginHorizontal: 4,
        borderRadius: 2,
    },
    activeDash: {
        backgroundColor: '#949494',
    },
    buttonContainer: {
        width: 95,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        display: 'flex',
        marginBottom: 20,
        marginTop: 32,
        alignSelf: 'center',
    },
    pager: {
        width: '100%',
        height: 395,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    slideButton: {
        display: 'flex',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#014E44'
    },
    slideButtonDisabled: {
        opacity: 0.5,
    }
});

export default OnboardingScreen;
