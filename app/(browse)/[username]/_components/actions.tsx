'use client'

import { onBlock, onUnblock } from "@/actions/block"
import { onFollow, onUnfollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"

interface ActionsProps {
    isFollowing: boolean,
    userId: string
}

export const Actions = ({
    isFollowing,
    userId
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition()

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch(() => toast.error('Something went wrong'))
        })
    }

    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
                .catch(() => toast.error('Something went wrong'))
        })
    }

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => toast.success(`Blocked the user ${data?.blocked.username}`))
                .catch(() => toast.error('Something went wrong'))
        })
    }

    const onClick = () => {
        if (isFollowing) {
            handleUnFollow()
        } else {
            handleFollow()
        }
    }

    return (
        <>
            <Button
                disabled={isPending}
                onClick={onClick}
                variant='primary'
                className="w-full"
            >
                {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
            <Button
                className="w-full my-2"
                disabled={isPending}
                onClick={handleBlock}
            >
                Block
            </Button>
        </>
    )
}
