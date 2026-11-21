import PaymentForm from "../components/PaymentForm"
import PaymentItem from "../components/PaymentItem"
import { formatMoney } from "../format"
import { useEffect, useState } from "react"
import { usePaymentsStore } from "../store"
import type { IPayment } from "../types"

export default function PaymentsPage() {
    const items = usePaymentsStore((state) => state.items)
    const [total, setTotal] = useState(0)
    const [paid, setPaid] = useState(0)
    const [sorted, setSorted] = useState<IPayment[]>([])

    useEffect(() => {
        setTotal(items.reduce((sum, payment) => sum + payment.amount, 0))

        setPaid(
            items.filter((payment) => payment.paid)
                .reduce((sum, payment) => sum + payment.amount, 0),
        )

        setSorted(
            [...items].sort((a, b) =>
                Number(a.paid) - Number(b.paid) || a.due.localeCompare(b.due),
            ),
        )
    }, [items])

    return (
        <>
            <section className="sum" aria-label="Итоги месяца">
                <small>Всего в месяц</small>
                <b>{formatMoney(total)}</b>
                <div className="split">
                    <div>
                        <small>Оплачено</small>
                        <strong>{formatMoney(paid)}</strong>
                    </div>
                    <div>
                        <small>Осталось</small>
                        <strong>{formatMoney(total - paid)}</strong>
                    </div>
                </div>
            </section>

            <PaymentForm />

            <h2 className="h plain">Ближайшие платежи</h2>
            {sorted.length === 0 ? (
                <p className="empty">
                    Подписок пока нет. Добавьте первую в форме выше.
                </p>
            ) : (
                <ul className="list">
                    {sorted.map((p) => (
                        <PaymentItem key={p.id} payment={p} />
                    ))}
                </ul>
            )}
        </>
    )
}
