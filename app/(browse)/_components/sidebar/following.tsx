'use client'

import { userSidebar } from "@/store/use-sidebar"
import { Follow, User } from "@prisma/client"
import { UserItem } from "./user-item"

interface FollowingProps {
    data: (Follow & {
        following: User & {
            streams: {
                is_live: boolean
            } | null
        }
    })[]
}

export const Following = ({
    data
}: FollowingProps) => {
    const { collapsed } = userSidebar((state) => state)

    if (!data.length) {
        return null
    }

    return (
        <div>
            {!collapsed && (
                <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">
                        Following
                    </p>
                </div>
            )}
            <ul className="space-y-2 px-2">
                {data.map((follow) => (
                    <UserItem
                        key={follow.following.id}
                        username={follow.following.username}
                        imageUrl={follow.following.image_url}
                        isLive={follow.following.streams?.is_live}
                    />
                ))}
            </ul>
        </div>
    )
}
