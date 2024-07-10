import { X, User2, Calendar } from "lucide-react";
import { Button } from "../../components/button"
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from 'date-fns'
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface UpdateDestinationAndDateStepProps {
    closeUpdateTripInfosModal: () => void
}

export function UpdateTrip({
    closeUpdateTripInfosModal,
}: UpdateDestinationAndDateStepProps) {
    const { tripId } = useParams()

    async function SendUpdates(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const destination = data.get('destination')?.toString()

        if (!destination) {
            return
        }

        if (!UpdateEventStartAndEndDates?.from || !UpdateEventStartAndEndDates?.to) {
            return
        }

        await api.put(`/trips/${tripId}`, {
            destination,
            starts_at: UpdateEventStartAndEndDates.from,
            ends_at: UpdateEventStartAndEndDates.to,
        })

        window.document.location.reload()
    }

    const [UpdateEventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()
    const displayedDate = UpdateEventStartAndEndDates && UpdateEventStartAndEndDates.from && UpdateEventStartAndEndDates.to
        ? format(UpdateEventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(UpdateEventStartAndEndDates.to, "d' de 'LLL"))
        : null
    const [isUpdateDatePickerOpen, setUpdateDatePickerOpen] = useState(false)

    function openUpdateDatePicker() {
        return setUpdateDatePickerOpen(true)
    }

    function closeUpdateDatePicker() {
        return setUpdateDatePickerOpen(false)
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Alterar informações da viagem</h2>
                        <button type="button" onClick={closeUpdateTripInfosModal}>
                            <X className="size-5 text-zinc-400" />
                        </button>
                    </div>
                    <p className="text-sm text-zinc-400">
                        Insara as informações para realizar as alterações da sua viagem.
                    </p>
                </div>

                <form onClick={SendUpdates} className="space-y-3">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <User2 className="text-zinc-400 size-5 " />
                        <input
                            name='destination'
                            placeholder="Qual será o novo destino da sua viagem?"
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                        />
                    </div>

                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Calendar className="text-zinc-400 size-5 " />
                        <span onClick={openUpdateDatePicker} className="text-lg text-zinc-400 w-40 flex-1">
                            {displayedDate ?? 'Quando?'}
                        </span>
                    </div>
                    <Button variant="primary" size="full">
                        Realizar alterações
                    </Button>
                </form>

                {isUpdateDatePickerOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                        <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">Selecione a nova data</h2>
                                    <button type="button" onClick={closeUpdateDatePicker}>
                                        <X className="size-5 text-zinc-400" />
                                    </button>
                                </div>
                            </div>
                            <DayPicker mode="range" selected={UpdateEventStartAndEndDates} onSelect={setEventStartAndEndDates} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
