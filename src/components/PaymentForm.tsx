import { useState, type FormEvent } from "react"
import { CATEGORY_LABELS, CATEGORY_LIST } from "../categories"
import { todayISO } from "../format"
import { usePaymentsStore } from "../store"
import type { TCategory } from "../types"

export default function PaymentForm() {
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")
    const [due, setDue] = useState(todayISO)
    const [category, setCategory] = useState<TCategory>("video")
    const [error, setError] = useState("")
    const addPayment = usePaymentsStore((state) => state.addPayment)

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const cleanTitle = title.trim()
        const price = Number(amount.trim().replace(",", "."))

        if (!cleanTitle) {
            setError("Введите название")
            return
        }

        if (!Number.isFinite(price) || price <= 0) {
            setError("Введите цену больше нуля")
            return
        }

        if (!due) {
            setError("Укажите дату")
            return
        }

        addPayment({ title: cleanTitle, amount: price, due, category })
        setTitle("")
        setAmount("")
        setError("")
    }

    return (
        <form className="box" onSubmit={handleSubmit}>
            <h2 className="h">Новая подписка</h2>

            <label className="field">
                <span>Название</span>
                <input
                    type="text"
                    placeholder="Например, Figma"
                    maxLength={60}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>

            <div className="two">
                <label className="field">
                    <span>Цена, ₽</span>
                    <input
                        type="text"
                        inputMode="decimal"
                        placeholder="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </label>

                <label className="field">
                    <span>Оплатить до</span>
                    <input
                        type="date"
                        value={due}
                        onChange={(e) => setDue(e.target.value)}
                    />
                </label>
            </div>

            <label className="field">
                <span>Категория</span>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as TCategory)}
                >
                    {CATEGORY_LIST.map((value) => (
                        <option key={value} value={value}>
                            {CATEGORY_LABELS[value]}
                        </option>
                    ))}
                </select>
            </label>

            {error && <p className="error" role="alert">{error}</p>}

            <button className="btn" type="submit">
                Добавить
            </button>
        </form>
    )
}