'use client'
import { CldUploadWidget } from "next-cloudinary"
import Image from 'next/image'
import { useCallback } from "react"
import { TbPhotoPlus } from "react-icons/tb"

declare global {
    var cloudinary: any;
}

interface Im

const ImageUpload = () => {
  return (
    <div>ImageUpload</div>
  )
}

export default ImageUpload