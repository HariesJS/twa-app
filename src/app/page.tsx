"use client"

import {useEffect, useState} from "react"
import styles from "./page.module.css"

interface UserData {
    id: number
    first_name: string
    last_name?: string
    username?: string
    language_code: string
    is_premiuim?: boolean
    photo_url?: string
}

export default function Home() {
    const [userData, setuserData] = useState<UserData | null>(null)

    useEffect(() => {
        const init = async () => {
            const {default: WebApp} = await import("@twa-dev/sdk")
            WebApp.ready()
            if (WebApp.initDataUnsafe.user) {
                setuserData(WebApp.initDataUnsafe.user as UserData)
            }
        }

        if (typeof window !== "undefined") {
            init()
        }
    }, [])

    return (
        <div className={styles.page}>
            <h1>TON-TRON</h1>
            {userData ? (
                <div>
                    {userData.photo_url ? (
                        <img
                            src={userData.photo_url}
                            alt=""
                            width={100}
                            height={100}
                            style={{borderRadius: 20}}
                        />
                    ) : null}
                    <p>ID: {userData.id}</p>
                    <p>First Name: {userData.first_name || "-"}</p>
                    <p>Last Name: {userData.last_name || "-"}</p>
                    <p>Premium: {userData.is_premiuim ? "Yes" : "No"}</p>
                    <p>Language: {userData.language_code}</p>
                    <p>Username: {userData.username || "-"}</p>
                </div>
            ) : (
                <div>
                    <span>Loading user data...</span>
                </div>
            )}
        </div>
    )
}
