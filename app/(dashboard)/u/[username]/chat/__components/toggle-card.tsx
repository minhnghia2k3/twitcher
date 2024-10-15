"use client"

import { updateStream } from "@/actions/stream"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { useTransition } from "react"
import { toast } from "sonner"

type FieldTypes = "is_chat_enabled" | "is_chat_followers_only" | "is_chat_delayed"

interface ToggleCardProps {
    label: string
    value: boolean
    field: FieldTypes
}

export const ToggleCard = ({
    label,
    value = false,
    field
}: ToggleCardProps) => {
    const [isPending, startTransition] = useTransition()

    const onChange = () => {
        startTransition(() => {
            updateStream({ [field]: !value })
                .then(() => toast.success("Chat settings updated"))
                .catch(() => toast.error("Failed to update chat settings"))
        })
    }
    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{label}</p>
                <div className="space-y-2">
                    <Switch
                        disabled={isPending}
                        onCheckedChange={onChange}
                        checked={value}>{value ? "On" : "Off"}
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export const ToggleCardSkeleton = () => {
    return (
        <Skeleton className="rounded-xl p-10 w-full"/>
    )
}