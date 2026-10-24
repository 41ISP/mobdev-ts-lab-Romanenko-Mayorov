import { dateParts, formatMoney } from "../format"
import { IPayment } from "../types"
import { usePaymentsStore } from '../store';
import { CATEGORY_LABELS } from '../categories';
interface IPaymentItemProps {
  payment: IPayment
}

export default function PaymentItem({ payment }: IPaymentItemProps) {
  const { togglePaid, removePayment } = usePaymentsStore();
  if (!payment )
    {
return null;
    }
  const { month, day} = dateParts(payment.id);
const categoryLabel = CATEGORY_LABELS[payment.category] || payment.category;
  return (
    <li className={payment.paid ? "item paid" : "item"}>
      <input
        type="checkbox"
        checked={payment.paid}
        onChange={() => togglePaid(payment.id)}
      />
      <time dateTime={payment.id}>
        {day}.{month}
      </time>
      <span className={`tag ${payment.category}`}>
        {categoryLabel}
      </span>
      <span className="title">{payment.title}</span>
      <span className="price">{formatMoney(payment.amount)}</span>
      <button
        type="button"
        onClick={() => removePayment(payment.id)}
      >
        Удалить
      </button>
    </li>
  );
}
