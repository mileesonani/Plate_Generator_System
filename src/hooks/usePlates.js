import { useState, useEffect, useCallback } from "react"
import {
    DEFAULT_PLATE,
    FIRST_PLATE,
    MAX_PLATES,
    MIN_PLATES,
    // MOTIF_IMAGE_URL
} from "../../constants"
import motifImage from '../assets/Image/Image.jpg';

const LOCAL_STORAGE_KEY = "plateGeneratorConfig_v2"

export const MOTIF_IMAGE_URL = motifImage;


export const usePlates = () => {
    const [plates, setPlates] = useState([])
    const [unit, setUnit] = useState("cm")
    const [motifUrl, setMotifUrl] = useState(MOTIF_IMAGE_URL)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        try {
            const storedConfig = window.localStorage.getItem(LOCAL_STORAGE_KEY)
            if (storedConfig) {
                const config = JSON.parse(storedConfig)
                if (config.plates && config.plates.length > 0) {
                    setPlates(config.plates)
                    setUnit(config.unit || "cm")
                    setMotifUrl(config.motifUrl || MOTIF_IMAGE_URL)
                } else {
                    setPlates([{ ...DEFAULT_PLATE, id: Date.now().toString() }])
                }
            } else {
                setPlates([{ ...FIRST_PLATE, id: Date.now().toString() }])
            }
        } catch (error) {
            console.error("Failed to load config from localStorage", error)
            setPlates([{ ...DEFAULT_PLATE, id: Date.now().toString() }])
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!isLoading) {
            try {
                const config = { plates, unit, motifUrl }
                window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config))
            } catch (error) {
                console.error("Failed to save config to localStorage", error)
            }
        }
    }, [plates, unit, motifUrl, isLoading])

    const addPlate = useCallback(() => {
        setPlates(prevPlates => {
            if (prevPlates.length >= MAX_PLATES) return prevPlates
            const newPlate = {
                ...DEFAULT_PLATE,
                id: Date.now().toString()
            }
            return [...prevPlates, newPlate]
        })
    }, [])

    const removePlate = useCallback(id => {
        setPlates(prevPlates => {
            if (prevPlates.length <= MIN_PLATES) return prevPlates
            return prevPlates.filter(plate => plate.id !== id)
        })
    }, [])

    const updatePlateDimension = useCallback((id, dimension, value) => {
        setPlates(prevPlates =>
            prevPlates.map(plate =>
                plate.id === id ? { ...plate, [dimension]: value } : plate
            )
        )
    }, [])

    const reorderPlates = useCallback((startIndex, endIndex) => {
        setPlates(prevPlates => {
            const result = Array.from(prevPlates)
            const [removed] = result.splice(startIndex, 1)
            result.splice(endIndex, 0, removed)
            return result
        })
    }, [])

    return {
        plates,
        addPlate,
        removePlate,
        updatePlateDimension,
        reorderPlates,
        isLoading,
        unit,
        setUnit,
        motifUrl,
        setMotifUrl
    }
}
