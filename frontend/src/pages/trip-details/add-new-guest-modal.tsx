import { X, User2, Mail } from "lucide-react"
import { Button } from "../../components/button"
import { FormEvent } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../lib/axios"

interface AddNewGuestModalProps {
    closeAddNewGuestModal: () => void
}

export function AddNewGuestModal({
    closeAddNewGuestModal,
}: AddNewGuestModalProps) {
    const { tripId } = useParams()

    async function AddGuest(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const name = data.get('name')?.toString()
        const email = data.get('email')?.toString()

        await api.post(`/trips/${tripId}/invites`, {
            name,
            email,
        })

        window.document.location.reload()
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Adicionar novo convidado</h2>
                        <button type="button" onClick={closeAddNewGuestModal}>
                            <X className="size-5 text-zinc-400" />
                        </button>
                    </div>
                    <p className="text-sm text-zinc-400">
                        Insira as informações para convidar um convidado.
                    </p>
                </div>

                <form onSubmit={AddGuest} className="space-y-3">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <User2 className="text-zinc-400 size-5 " />
                        <input
                            name='name'
                            placeholder="Qual é o nome do convidado?"
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                        />
                    </div>

                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Mail className="text-zinc-400 size-5 " />
                        <input
                            name='email'
                            placeholder="Qual é o e-mail do convidado?"
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                        />
                    </div>
                    <Button variant="primary" size="full">
                        Adicionar convidado
                    </Button>
                </form>
            </div>
        </div>
    )
}
