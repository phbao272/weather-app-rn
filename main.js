import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as Location from 'expo-location'

import {
    getWeatherData,
    setLocationActive,
} from './src/redux/slices/weatherSlice'

import Detail from './src/components/Detail'

import { ConvertKToC, ConvertUnixTimeToUTC } from './src/utils'

const Main = () => {
    const dispatch = useDispatch()
    const [coordinates, setCoordinates] = useState({})
    const [weatherData, setWeatherData] = useState({})
    // TODO: Ưu cầu bật định vị ở điện thoại
    useEffect(() => {
        handleTurnOnLocation()
    }, [])

    const handleTurnOnLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            console.log('permission denied')
            Alert.alert('permission denied')
            return
        }

        let location = await Location.getCurrentPositionAsync({})
        setCoordinates({
            lon: location.coords.longitude,
            lat: location.coords.latitude,
        })
    }

    // TODO: Lấy tên địa điểm
    useEffect(() => {
        if (coordinates.lon && coordinates.lat) {
            console.log(coordinates)
            dispatch(
                setLocationActive({
                    lon: coordinates.lon,
                    lat: coordinates.lat,
                }),
            )
        }
    }, [coordinates])

    // TODO: Lấy dữ liệu One Call
    useEffect(() => {
        if (coordinates.lon && coordinates.lat) {
            dispatch(
                getWeatherData({ lon: coordinates.lon, lat: coordinates.lat }),
            )
                .unwrap()
                .then((originalPromiseResult) => {
                    setWeatherData(originalPromiseResult)
                })
        }
    }, [coordinates])

    // useEffect(() => {
    //     console.log(coordinates)
    //     console.log(weatherData)
    // })

    const locationName = useSelector((state) => state.weather.locationActive)

    // console.log(locationName)

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{locationName}</Text>

            <View style={styles.flexRowCenterAlign}>
                <Text style={{ fontSize: 60, marginRight: 12 }}>
                    {ConvertKToC(weatherData?.current?.temp)}°C
                </Text>
                <View style={styles.flexRow}>
                    <Text
                        style={{
                            transform: [{ translateY: -5 }],
                            fontSize: 24,
                        }}
                    >
                        {ConvertKToC(
                            weatherData?.daily
                                ? weatherData?.daily[0]?.temp?.max
                                : null,
                        )}
                        °C
                    </Text>
                    <Text style={{ fontSize: 24, marginHorizontal: 4 }}>/</Text>
                    <Text
                        style={{
                            transform: [{ translateY: 5 }],
                            fontSize: 24,
                        }}
                    >
                        {ConvertKToC(
                            weatherData?.daily
                                ? weatherData?.daily[0]?.temp?.min
                                : null,
                        )}
                        °C
                    </Text>
                </View>
            </View>

            <Text style={styles.date}>
                {ConvertUnixTimeToUTC(
                    weatherData?.current?.dt,
                    'dddd, Do MMMM',
                )}
            </Text>

            <View style={{ marginTop: 12 }}>
                <Detail />
            </View>
        </View>
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 32,
        paddingHorizontal: 16,
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexRowCenterAlign: {
        alignItems: 'center',
        flexDirection: 'row',
    },
})
