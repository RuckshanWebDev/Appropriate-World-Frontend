import React, { useEffect, useState } from 'react'
import Popup from './Popup'
import { useGetProfileQuery, useCreateProfileMutation, useUpdateProfileMutation } from '../features/profileApi'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function ProfileUpdate(data) {

    const { popup } = useSelector(state => state.local)
    const [createProfile, createProfileData] = useCreateProfileMutation()
    const [updateProfile, updateProfileData] = useUpdateProfileMutation()
    const [formData, setFormData] = useState(null)

    const updateFormHandler = (e) => {

        e.preventDefault()
        console.log(data);
        if (!data.data) {

            console.log("form ");

            createProfile({
                dob: e.target.dob.value,
                address: e.target.address.value,
                profession: e.target.profession.value,
                hobby: e.target.hobby.value,
                name: e.target.names.value,
            })


        } else {

            updateProfile({
                dob: e.target.dob.value || formData.data?.dob,
                address: e.target.address.value,
                profession: e.target.profession.value,
                hobby: e.target.hobby.value,
                name: e.target.names.value,
            })


            if (updateProfileData.isSuccess) {
                toast.success("Successfully Updated")
            } else if (updateProfileData.isError) {
                toast.error("Something went wrong try again later!")
            }

        }
    }

    useEffect(() => {
        setFormData(data.data);
    }, [data])

    return (
        popup &&
        <Popup>
            <div className="profile-popup">
                <form onSubmit={updateFormHandler} >
                    <div className="input-container">
                        <label >Image</label>
                        <input type="file" name='image' />
                    </div>
                    <div className="input-container">
                        <label >Name</label>
                        <input type="text" name='names' />
                    </div>
                    <div className="input-container">
                        <label >Address</label>
                        <input type="text" name='address' />
                    </div>
                    <div className="input-container">
                        <label >profession</label>
                        <input type="text" name='profession' />
                    </div>
                    <div className="input-container">
                        <label >DOB</label>
                        <input type="date" name='dob' />
                    </div>
                    <div className="input-container">
                        <label >Hobby</label>
                        <input type="text" name='hobby' />
                    </div>

                    <button type='submit' >Update</button>
                </form>
            </div>
        </Popup>

    )
}

export default ProfileUpdate
