'use client'

import { useMemo, useState } from "react"
import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import Heading from "../Heading"
import CountrySelect from "../inputs/CountrySelect"
import { categories } from "../navbar/Categories"
import CategoryInput from "../inputs/CategoryInput"
import { useForm, FieldValues } from "react-hook-form"
import dynamic from "next/dynamic"

enum STEPS {
    CATEGORY = 0,
    LOCATION =  1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {

    const rentModal = useRentModal()
    const [step, setStep] = useState(STEPS.CATEGORY)

    const {register, handleSubmit, setValue, watch, formState:{errors,}, reset} = useForm<FieldValues>({
        defaultValues: {
            category:'',
            location: '',
            guestCount:'',
            roomCount:'',
            bathroomCount: 1,
            price:'',
            title: '',
            description:''
        }
    })

    const category = watch('category')
    const location = watch('location')

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])

    // makes sure the page is re-rendered since setValue does not
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty:true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep((value) => value-1)
    }

    const onNext =() => {
        setStep((value) => value + 1)
    }

    const actionLabel = useMemo(() => {
        if(step===STEPS.PRICE){
            return 'Create'
        }
        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if(step=== STEPS.CATEGORY){
            return undefined
        }
    }, [step])
    
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title='Which of these best describes your place' 
                subtitle="Pick a category" 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className='col-span-1'>
                        <CategoryInput onClick={(category)=> setCustomValue('category', category)} selected={category === item.label} label={item.label} icon={item.icon} />
                    </div>
                ))}
            </div>

        </div>
    )

    if (step === STEPS.LOCATION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Where is your place located?" subtitle="Help guests find you" />
                <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)} />
                <Map center={location ?. latlng } />
            </div>
        )
    }

    if (step===STEPS.INFO){
        bodyContent = (
            <div className="flex flex-com gap-8">
                <Heading title="Share some basic information about your place" subtitle="What amenities do you have?"/>
                
            </div>
        )
    }

    return (
        <Modal 
            isOpen={rentModal.isOpen} 
            onClose={rentModal.onClose} 
            onSubmit={onNext} 
            actionLabel={actionLabel} 
            secondaryActionLabel={secondaryActionLabel} 
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack } 
            title="Laundro your machine" 
            body={bodyContent} 
        />
    )
}

export default RentModal