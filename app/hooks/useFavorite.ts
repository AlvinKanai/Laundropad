import axios from 'axios'
import{useRouter} from 'next/navigation'
import { useCallback, useMemo } from 'react'
import {toast} from 'react-hot-toast'
import { SafeUser } from '../types'
import useLoginModal from './useLoginModal'

interface IUseFavorite {
    listingId: string
    currentUser?: SafeUser | null
}

const useFavorite = ({listingId, currentUser}: IUseFavorite) => {
    const router = useRouter()
    const loginModal = useLoginModal()

    const isFavourite = useMemo(() => {
        const list = currentUser?.favoriteIds || []

        return list.includes(listingId)
    }, [currentUser, listingId])

    const toggleFavourite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        if(!currentUser){
            return loginModal.onOpen()
        }

        try {
            let request

            if(isFavourite){
                request = () => axios.delete(`/api/favourites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favourites/${listingId}`)
            }

            await request()
            router.refresh()
            toast.success('Success')
        }catch (error) {
            toast.error('Something went wrong')
        }
    }, [currentUser, isFavourite, listingId, loginModal, router])

    return {isFavourite, toggleFavourite}
}

export default useFavorite