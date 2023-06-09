import React, { useEffect, useState } from 'react'
import Popup from './Popup'
import { useGetProfileQuery, useCreateProfileMutation, useUpdateProfileMutation, useLazyGetProfileQuery } from '../features/profileApi'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from './Loader'
import { togglePopup } from '../features/localSlice'

function ProfileUpdate({ data }) {

    const dispatch = useDispatch()
    const [file, setFile] = useState()
    const [formData, setFormData] = useState(null)
    const { popup } = useSelector(state => state.local)
    const [createProfile, createProfileData] = useCreateProfileMutation()
    const [updateProfile, updateProfileData] = useUpdateProfileMutation()
    const [getProfileData, updatedProfileData] = useLazyGetProfileQuery()


    const updateFormHandler = async (e) => {

        e.preventDefault()
        console.log(data);
        if (!data) {

            console.log("form ");

            if (e.target.image.files && e.target.image.files[0]) {
                const data = new FormData()
                data.append('file', e.target.image.files[0])
                data.append('upload_preset', 'profile_images')
                try {
                    const responce = await fetch('https://api.cloudinary.com/v1_1/dts5uxlug/image/upload', {
                        method: "POST",
                        body: data
                    })
                    const result = await responce.json()
                    if (result) {
                        console.log(result.secure_url);
                        createProfile({
                            profile_image: result.secure_url,
                            dob: e.target.dob.value,
                            address: e.target.address.value,
                            profession: e.target.profession.value,
                            hobby: e.target.hobby.value,
                            name: e.target.names.value,
                        })

                    }

                } catch (error) {
                    console.log(error);
                }
            } else {
                createProfile({
                    dob: e.target.dob.value,
                    address: e.target.address.value,
                    profession: e.target.profession.value,
                    hobby: e.target.hobby.value,
                    name: e.target.names.value,
                })
            }

            if (createProfileData.isSuccess) {
                toast.success("Successfully Created")
            } else if (createProfileData.isError) {
                toast.error("Something went wrong try again later!")
            }


        } else {

            if (e.target.image.files && e.target.image.files[0]) {
                const data = new FormData()
                data.append('file', e.target.image.files[0])
                data.append('upload_preset', 'profile_images')
                try {
                    const responce = await fetch('https://api.cloudinary.com/v1_1/dts5uxlug/image/upload', {
                        method: "POST",
                        body: data
                    })
                    const result = await responce.json()
                    if (result) {
                        console.log(result.secure_url);
                        updateProfile({
                            profile_image: result.secure_url,
                            dob: e.target.dob.value || formData.data?.dob,
                            address: e.target.address.value,
                            profession: e.target.profession.value,
                            hobby: e.target.hobby.value,
                            name: e.target.names.value,
                        })
                        dispatch(togglePopup())
                    }

                } catch (error) {
                    console.log(error);
                }
            } else {
                updateProfile({
                    dob: e.target.dob.value || formData.data?.dob,
                    address: e.target.address.value,
                    profession: e.target.profession.value,
                    hobby: e.target.hobby.value,
                    name: e.target.names.value,
                })
                dispatch(togglePopup())
            }

            if (updateProfileData.isSuccess) {
                toast.success("Successfully Updated")

            } else if (updateProfileData.isError) {
                toast.error("Something went wrong try again later!")
            }

        }
    }


    useEffect(() => {
        setFormData(data);
    }, [data])

    return (
        popup &&
        <Popup>
            <div className="profile-popup">
                <form onSubmit={updateFormHandler} >
                    <div className="input-container">
                        <label >Image</label>
                        <input type="file" name='image' value={file} accept="image/png, image/gif, image/jpeg, image/jpg" />
                    </div>
                    <div className="input-container">
                        <label >Name</label>
                        <input type="text" name='names' />
                    </div>
                    <div className="input-container">
                        <label >Location</label>
                        <input type="text" name='address' />
                    </div>
                    <div className="input-container">
                        <label >Creator Type</label>
                        <input type="text" name='profession' />
                    </div>
                    <div className="input-container">
                        <label >Sign</label>
                        <input type="date" name='dob' />
                    </div>
                    <div className="input-container">
                        <label >Interests</label>
                        <input type="text" name='hobby' />
                    </div>

                    <button type='submit' >{updateProfileData.isLoading || createProfileData.isLoading ? <Loader /> : 'Update'}</button>
                </form>
            </div>
        </Popup>

    )
}

export default ProfileUpdate
