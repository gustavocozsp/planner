import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { AddNewGuestModal } from "./add-new-guest-modal";

interface Participant {
    id: string
    name: string | null
    email: string
    is_confirmed: boolean
}

export function Guests() {
    const { tripId } = useParams()
    const [participants, setParticipants] = useState<Participant[]>([])

    useEffect(() => {
        api.get(`/trips/${tripId}/participants`)
            .then(response => setParticipants(response.data.participants))
    }, [tripId])

    const [isAddNewGuestModal, setAddNewGuestModal] = useState(false)

    function openAddNewGuestModal() {
        setAddNewGuestModal(true)
    }

    function closeAddNewGuestModal() {
        setAddNewGuestModal(false)
    }

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>
            <div className="space-y-5">
                {participants.map((participant, index) => {
                    return (
                        <div key={participant.id} className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                <span className="block font-medium text-zinc-100">{participant.name ?? `Convidado ${index}`}</span>
                                <span className="block text-sm text-zinc-400 truncate">
                                    {participant.email}
                                </span>
                            </div>
                            {participant.is_confirmed ? (
                                <CheckCircle2 className="size-5 shrink-0 text-green-400" />
                            ) : (
                                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                            )}
                        </div>
                    )
                })}
            </div>

            <Button onClick={openAddNewGuestModal} variant="secondary" size="full">
                <UserCog className='size-5' />
                Gerenciar convidados
            </Button>

            {isAddNewGuestModal && (
                <AddNewGuestModal closeAddNewGuestModal={closeAddNewGuestModal} />
            )}
        </div>
    )
}
