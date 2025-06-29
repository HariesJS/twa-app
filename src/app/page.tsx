"use client"

import {useEffect, useState} from "react"
import styles from "./page.module.css"
import WebApp from "@twa-dev/sdk"

interface UserData {
    id: number
    first_name: string
    last_name?: string
    username?: string
    language_code: string
    is_premiuim?: boolean
}

export default function Home() {
    const [userData, setuserData] = useState<UserData | null>(null)

    useEffect(() => {
        if (WebApp.initDataUnsafe.user) {
            setuserData(WebApp.initDataUnsafe.user as UserData)
        }
    }, [])

    return (
        <div className={styles.page}>
            <h1>TON-TRON</h1>
            {userData ? (
                <div>
                    <p>ID: {userData.id}</p>
                    <p>First Name: {userData.first_name}</p>
                    <p>Last Name: {userData.last_name}</p>
                    <p>Premium: {userData.is_premiuim}</p>
                    <p>Language: {userData.language_code}</p>
                    <p>Username: {userData.username}</p>
                </div>
            ) : (
                <div>
                    <span>Loading user data...</span>
                </div>
            )}
        </div>
    )
}
