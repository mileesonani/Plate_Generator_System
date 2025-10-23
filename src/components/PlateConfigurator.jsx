import React from "react"
import DimensionInput from "./DimensionInput"
import { WIDTH_MIN, WIDTH_MAX, HEIGHT_MIN, HEIGHT_MAX } from "../../constants"
import { useTranslation } from 'react-i18next';

const PlateConfigurator = ({
    plate,
    index,
    unit,
    onRemove,
    onUpdate,
    isOnlyPlate
}) => {

    const { t } = useTranslation();

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-3 rounded-xl gap-3 w-fit mx-auto shadow-sm">
            <div className="flex items-center justify-center w-7 h-7 rounded-md border font-medium bg-white">
                {index + 1}
            </div>
            <div className="flex items-center gap-3">
                <DimensionInput
                    label={t('width')}
                    unit={unit}
                    value={plate.width}
                    minCm={WIDTH_MIN}
                    maxCm={WIDTH_MAX}
                    onChange={value => onUpdate("width", value)}
                />
                <span className="text-lg">×</span>
                <DimensionInput
                    label={t('height')}
                    unit={unit}
                    value={plate.height}
                    minCm={HEIGHT_MIN}
                    maxCm={HEIGHT_MAX}
                    onChange={value => onUpdate("height", value)}
                />
            </div>
            <button
                onClick={onRemove}
                disabled={isOnlyPlate}
                style={{ height: "22px", width: "24px" }}
                className="border border-red-100 bg-red-100 rounded-lg text-center text-red-500 disabled:cursor-not-allowed transition-colors font-medium"
            >
                <span style={{ display: "ruby-text" }}>
                    –
                </span>
            </button>
        </div>
    )
}

export default PlateConfigurator
