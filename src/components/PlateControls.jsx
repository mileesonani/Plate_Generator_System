import React, { useState } from "react"
import PlateConfigurator from "./PlateConfigurator"
import { MAX_PLATES, MIN_PLATES } from "../../constants"
import { useTranslation } from 'react-i18next';

const Section = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            {title}
        </h3>
        {children}
    </div>
)

const PlateControls = props => {
    const { t } = useTranslation();
    const {
        plates,
        unit,
        onAddPlate,
        onRemovePlate,
        onUpdatePlateDimension,
        onReorderPlates,
        onUnitChange,
        onTriggerUpload,
        onResetMotif,
        onExport
    } = props
    const [isDragging, setIsDragging] = useState(false)
    const dragItem = React.useRef(null)
    const dragOverItem = React.useRef(null)

    const handleDragStart = (e, index) => {
        dragItem.current = index
        setIsDragging(true)
        // Necessary for Firefox to enable dragging
        e.dataTransfer.setData("text/plain", index.toString())
        e.dataTransfer.effectAllowed = "move"
    }

    const handleDragEnter = index => {
        dragOverItem.current = index
    }

    const handleDragEnd = () => {
        if (
            dragItem.current !== null &&
            dragOverItem.current !== null &&
            dragItem.current !== dragOverItem.current
        ) {
            onReorderPlates(dragItem.current, dragOverItem.current)
        }
        dragItem.current = null
        dragOverItem.current = null
        setIsDragging(false)
    }

    return (
        <div className="h-full flex flex-col">

            <div className="flex justify-between items-baseline mb-3">
                <h3 className="font-semibold tracking-wider">
                    {t('dimensions')}. {t('enter')}.
                </h3>
            </div>

            <div className="space-y-4 overflow-y-auto pr-2 -mr-4 py-1">
                {plates.map((plate, index) => (
                    <div
                        key={plate.id}
                        onDragStart={e => handleDragStart(e, index)}
                        onDragEnter={() => handleDragEnter(index)}
                        onDragEnd={handleDragEnd}
                        onDragOver={e => e.preventDefault()}
                        draggable
                        className={
                            isDragging && dragItem.current === index
                                ? "drag-ghost"
                                : "transition-shadow"
                        }
                    >
                        <PlateConfigurator
                            plate={plate}
                            index={index}
                            unit={unit}
                            onRemove={() => onRemovePlate(plate.id)}
                            onUpdate={(dimension, value) =>
                                onUpdatePlateDimension(plate.id, dimension, value)
                            }
                            isOnlyPlate={plates.length <= MIN_PLATES}
                        />
                    </div>
                ))}
            </div>

            <div className="mt-6 flex-shrink-0 flex justify-end">
                <button
                    onClick={onAddPlate}
                    disabled={plates.length >= MAX_PLATES}
                    className="border border-green-600 text-green-600 font-bold py-3 px-4 rounded-lg hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    {t('addBtn')} +
                </button>
            </div>
        </div>
    )
}

export default PlateControls
